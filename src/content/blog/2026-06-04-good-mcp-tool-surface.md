---
title: "What Makes a Good MCP Tool Surface for an LLM"
date: 2026-06-04T12:00:00-07:00
slug: "good-mcp-tool-surface"
categories: ["Tech"]
---

An MCP server is an API whose only consumer is a language model.

That one fact should change most of the decisions you'd make building it. A model can't read your
docs site. It can't poke at endpoints in a REPL, can't grep your source, can't hold a Slack thread
with you about what a field means. On each turn it sees a flat list of tool names, their
descriptions, the parameter schemas, and whatever JSON you chose to hand back — all of it competing
for room in a finite, expensive context window. That's the whole interface. There is nothing else.

I build agentic AI in regulated finance, and I've spent the last couple of weeks open-sourcing the
public-data layer I kept wishing existed — a small suite of MCP servers called
[mcpwright](https://mcpwright.com): SEC EDGAR, US Census, and IRS income statistics, all read-only,
all typed. Writing three servers to the same standard forced me to get explicit about what I was
actually optimizing for. It turns out that "design for a model, not a programmer" is not a slogan —
it changes concrete choices. Here are the ones that mattered.

## 1. Few orthogonal tools beat many specific ones

A human API can afford to be large. You read the reference, you find the one endpoint you need, you
ignore the other two hundred. A model can't do that. Every tool you expose is in the prompt on every
turn, and every tool is a distraction from every other tool. The model has to *choose*, repeatedly,
from the whole list — and a longer list means more chances to choose wrong.

So the unit of a good tool surface isn't the endpoint. It's the **intent**. One parameterized tool
that covers a family of questions beats the family of tools.

EDGAR could easily justify fifty tools — the corpus is enormous. [edgar-mcp](https://github.com/mcpwright/edgar-mcp)
exposes eleven, and each one maps to a distinct thing a person actually wants to *do*, not to a
distinct upstream route. There's one `get_recent_offerings(form=C|D|A, state=…)`, not three
near-identical "browse Reg CF / browse Reg D / browse Reg A" tools. In census-mcp there's one
`compare_zips(zips, metric)`, not a per-metric tool family.

The test I use: *if two tools would always be reached for together, or they differ only by the value
of one argument, they're one tool.* Collapse them and let a parameter carry the difference. The
model is much better at filling in a parameter than at picking the right needle from a haystack of
tool names.

## 2. Return lean, model-shaped data — not raw upstream JSON

The fastest way to ruin an otherwise good tool is to return whatever the upstream API gave you.

A raw EDGAR submissions blob is huge. A raw Census API response is a matrix of opaque variable codes.
The IRS gives you roughly 150 columns per ZIP code. Almost none of that is what the model asked for,
and here's the thing people miss: **the model's context window is the scarcest resource in the whole
system.** Every token of upstream cruft you pass through is a token the user pays for, a token that
pushes something useful out of the window, and a token the model can get distracted by and reason
about incorrectly.

So every tool in the suite returns a filtered, typed [pydantic](https://docs.pydantic.dev) model —
not the source JSON. The IRS [Income model](https://github.com/mcpwright/soi-mcp) is the clearest
case: out of ~150 raw columns, the model gets AGI bands, the mean and median, and the tax figures —
the handful of fields that answer income questions, each with a name a model can reason about. The
raw row never touches the context.

This also gives you a typed schema for free. The SDK derives the output schema from the model, so the
LLM knows the *shape* of what's coming back before it ever calls the tool. Curate the return like
you're paying for every field. You are.

## 3. The description *is* the API

For a human-facing API, documentation is a courtesy — nice to have, often stale, and the user can
always fall back to reading the code. For an LLM, the tool and parameter descriptions are not
documentation *about* the interface. They **are** the interface. They're literally the text the model
programs against. A stale or thin description isn't a docs bug; it's a wrong API.

Which means descriptions have to carry behavior, not just shape. Especially the caveats — the places
where a naïve assumption produces a confident, wrong answer:

- **ZIP ≈ ZCTA.** Census data is keyed by ZCTA, not ZIP, and about 2% of ZIPs have no ZCTA. The tool
  says so, so the model expects a clean error on those instead of treating a failure as a zero.
- **ACS top-coding.** An income field of `$250,001` means "capped at 250k," not "exactly 250,001."
  If the model doesn't know that, it will happily report a fictitious precise figure.
- **EDGAR's recent-submissions window.** The "recent" feed only goes back so far; the tool description
  states the boundary so the model doesn't conclude a filing doesn't exist when it's just outside the
  window.

If you don't tell the model the caveat, it bluffs — and it bluffs *fluently*, which is worse than
crashing. A good description is the difference between "I can't get a ZCTA for that ZIP" and a
plausible, fabricated median income. Write descriptions as if they're the only thing standing between
your tool and a confident lie. They are.

## 4. Match the data's shape, not a one-size caching rule

When you have more than one server, the temptation is to standardize the data layer. Resist it —
standardize the *interface*, not the plumbing. The right strategy falls directly out of asking one
question about the source: **is this data living or static, large or small?**

EDGAR is a huge, constantly-changing corpus. You can't download it; you wouldn't want a stale copy
anyway. So it makes live per-request calls, fronted by an in-memory TTL cache with a byte budget and
LRU eviction — fast on repeat access, never stale for long, bounded in memory.

Census and IRS data are the opposite: small, static, published once a year. For those, the live-API
model is the wrong shape entirely. They bulk-download once into a local SQLite store, and after that
every lookup is offline, instant, and immune to rate limits. The SQLite store *is* the "don't refetch"
layer — it plays the role EDGAR's cache plays, for a completely different kind of data.

One suite, two data strategies, on purpose. The lesson generalizes: don't start from "how should I
cache this." Start from "what *is* this data," and the caching falls out. (All three share the same
HTTP client, retry/backoff, and store machinery via a small shared library,
[mcpwright-core](https://github.com/mcpwright/mcpwright-core) — so "different strategy" costs almost
nothing in duplicated code.)

## 5. Be honestly read-only — and annotate it

Every tool in the suite is marked `readOnlyHint`. This is a small thing that buys a large thing.

An honest read-only annotation lets a client — or an agent driving the tools autonomously — reason
about what's safe. Safe to call without asking the user first. Safe to retry on a timeout. Safe to
run several in parallel. A surface that's truthfully read-only can be driven *harder* and with less
human babysitting than one where every call might mutate something. The annotation isn't a compliance
checkbox; it's a capability you're granting the agent.

The corollary is to actually earn the annotation. There's a real honesty question with the
store-backed servers: they read from a local SQLite file, but the *first* run downloads it. They stay
`readOnlyHint = true` because no tool ever mutates source data — but the `openWorldHint` gets set
truthfully to reflect that first-run fetch. Annotate what's actually true, not what's flattering.

## 6. Zero-config wherever the data allows it

Here's the failure mode that kills adoption before the model ever gets a turn: the human installs your
server, hits a required API key or an env var they don't have, and gives up. Every mandatory
configuration step is a cliff people fall off between "installed" and "first useful answer."

So the default should be zero-config. EDGAR has no API key at all, and the one thing the SEC *does*
require — a descriptive `User-Agent` with contact info, so they can reach you if you hammer their
servers — ships with a sensible default. It's `uvx mcpwright-edgar` and you're live; setting your own
contact (`EDGAR_MCP_USER_AGENT="your-app you@example.com"`) is recommended etiquette, not a barrier to
the first call. IRS SOI is bulk public data, so it's zero-config too: the first tool call lazily
triggers the one-time download and then it's local forever. The user does nothing.

When a key is genuinely unavoidable — Census requires a free one — the move is to *fail fast and
useful*: a startup error with the exact URL to get the key and the exact env var to set, not a
mysterious 403 three calls deep. Make the unavoidable step a thirty-second one with the answer in the
error message.

The fewer steps between install and first useful answer, the more the tool actually gets used. That's
true for any software, but it bites harder here, because there's a model on the other side waiting to
do useful work the instant the human gets out of the way.

## The one rule underneath all of these

Step back and every principle above is the same discipline applied at a different layer:

**Treat the model as the user, and the context window as the budget.**

Few orthogonal tools — don't make the user choose from a haystack. Lean typed returns — don't spend
the budget on noise. Descriptions as API — the user only knows what you tell them. Data-shaped
caching — give the user fast, fresh-enough answers. Honest read-only — tell the user what's safe.
Zero-config — get out of the user's way. Once you internalize that the consumer is a language model
with a finite attention budget and no way to read the manual, most of the hard design questions answer
themselves.

The three servers above are where I worked this out, and the code is the proof — typed, tested,
CI-gated, and read-only, at [github.com/mcpwright](https://github.com/mcpwright). If you build one,
I'd genuinely like to hear where these principles broke down for you. That's the part the essay can't
tell me.
