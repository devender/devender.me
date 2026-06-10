---
title: "When a Tool Description Is the Difference Between Right and Wrong"
date: 2026-06-10T12:00:00-07:00
slug: "tool-descriptions-measured"
categories: ["Tech"]
---

A few days ago I [argued](/2026/06/04/good-mcp-tool-surface/) that an MCP server is an API whose only consumer is a language model, and that this should change how you build it. One of the claims was that **the description *is* the API** — that for a model, a tool's description isn't documentation about the interface, it *is* the interface, and so it has to carry the caveats: the places where a naïve assumption produces a confident, wrong answer.

I also admitted I couldn't yet prove it. I'd measured the *few-tools* claim and [watched it mostly not hold](/2026/06/04/good-mcp-tool-surface/). The descriptions claim I left as "a well-motivated argument," with a promise: I'd measure the rules I hand you, and say so plainly when the numbers don't cooperate.

Here are the numbers. This time they cooperated — and the honest version is more interesting than the slogan.

## The caveat I was using as an example didn't exist

My go-to example for "a description that carries behavior" is top-coding. The Census Bureau caps some values: a household-income figure of $250,001 doesn't mean $250,001, it means *"at least $250,000 — we won't say how much more."* Median home value caps at $2,000,001 the same way. Atherton, California hits both. If a model reports "$250,001" as the answer, it's confidently wrong; the honest answer is "at least $250k."

So I went to wire up the experiment — and found that my own census server's `get_income` description *didn't actually mention top-coding.* I'd written the essay as if it did. The caveat existed in my head, not in the API the model sees.

That's the whole thesis biting me in miniature. So the first fix was to the [real server](https://github.com/mcpwright/census-mcp/pull/17): add the top-code caveat to `get_income` and `get_housing`, ship it. Only then could I measure it — and the experiment now compares the server as it actually ships against the same server with one sentence removed.

## The setup

Two surfaces. The **control** is census as shipped, caveat and all. The **stripped** arm is byte-for-byte identical except the one sentence — `Note: ACS top-codes median household income at $250,001…` — is cut. Nothing else differs.

A short agent loop runs each task: the model is given the census tools plus a neutral "submit your answer" tool, under a system prompt that never mentions caps or precision. It calls a tool, gets a result, answers. The result is served from a fixture that returns the **raw capped integer with no annotation** — so the only place the "this is a cap" signal can come from is the description (or the model's own prior knowledge, which turns out to matter).

Grading is a fixed, published regex — **no LLM judge.** Does the answer flag the value as a floor ("at least," "or more," "top-coded," "$250k+")? Top-coded questions are correct only if it does; *ordinary* ZIPs, whose values are nowhere near a cap, are correct only if it *doesn't* — a guard against a model that just hedges everything. Five trials each, two models. The [harness is open](https://github.com/mcpwright/mcp-tool-surface-eval); you can reproduce it or break it.

## The result

| Model | With the caveat | Caveat removed |
|---|--:|--:|
| Claude Haiku 4.5 | **100%** flag the cap | **0%** |
| Claude Sonnet 4.6 | **100%** | **80%** |

Neither model ever raised a false alarm on an ordinary ZIP — 0% both ways, both models. The effect is real signal, not reflexive hedging.

Read Haiku's row again. Without the caveat, it reported the capped value as the exact answer **every single time** — twenty for twenty, confidently wrong. Add one sentence to the description and it gets it right every time. For that model, on that question, the description is the entire difference between a right answer and a wrong one.

Sonnet tells the subtler half. It already knows: $250,001 is a suspiciously specific number, and a capable model recognizes the ACS sentinel and hedges on its own 80% of the time with no help from me. The caveat closes the last 20% — and the per-task breakdown shows exactly where. The gap is entirely on the formally-phrased question, *"What is the median household income in Atherton?"* — the framing that most invites quoting a clean statistic. On the casual *"what does a home there cost?"*, Sonnet hedges either way.

## What it actually means

My essay's slogan — "the description is the API" — is true but too coarse. The sharper version the data supports:

> A description's behavioral caveats are load-bearing in proportion to how little the model already knows about the data's quirks.

For a frontier model on a famous dataset, much of the caveat is redundant with its priors. For a smaller, cheaper model — or any model on an obscure dataset where it has no priors to fall back on — the caveat is doing *all* the work. And that smaller-model, obscurer-data regime is precisely where people deploy MCP servers to extend what a model can do. The warning has to live in the server, because the model can't supply it.

There's a clean contrast with the [few-tools result](/2026/06/04/good-mcp-tool-surface/) from the first essay, which found that tool *selection* barely cared whether I exposed 11 tools or 26. Put the two together:

> Tool **selection** is robust to how you shape the surface. Tool-result **interpretation** is not — it leans hard on what the description tells the model, most of all where the model is flying blind.

That also rescues a prediction I got wrong the first time. I'd guessed the weaker model would benefit more from good surface design; for tool selection, it didn't. For description caveats, it absolutely does — Haiku's 100-point swing versus Sonnet's 20.

## The fine print

I'd rather state the limits than have you find them. Twenty trials per cell: Haiku's 0%-vs-100% split is unambiguous, but Sonnet's 80→100 has confidence intervals that overlap — directionally clear, not a tight estimate. The capped integers (250001, 2000001) are themselves recognizable sentinels, which is *why* Sonnet does well unaided; a less telegraphing value would probably widen its gap too, and I haven't tested that. And this is one dataset and one kind of caveat. Stale-window caveats, suppressed cells, unit ambiguity — all unmeasured. This isn't the last word on "descriptions are the API." It's one caveat, measured honestly, with the harness left open so the next one is easier.

But the direction is not in doubt, and it's the practical takeaway for anyone building one of these: **write the caveat into the description, even the one that feels obvious.** The model you're serving today might know better. The cheaper one you swap in next quarter won't — and it will tell your user, with total confidence, that the median household income in Atherton is exactly $250,001.

*The server change is [census-mcp #17](https://github.com/mcpwright/census-mcp/pull/17); the eval harness, tasks, and raw per-model results are at [mcp-tool-surface-eval](https://github.com/mcpwright/mcp-tool-surface-eval).*
