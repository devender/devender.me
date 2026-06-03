---
title: "The Lights Are Back On"
date: 2026-06-04T08:00:00-07:00
slug: "the-lights-are-back-on"
categories: ["General"]
---

TL;DR — I stopped writing here in 2019. I didn't stop building. I'm back, and the
blog itself is the first artifact.

## Where I went

The last post on this blog was an AWS Kinesis demo in November 2019. Then work ate
the writing.

In fairness, it was the good kind of eating. Over those years I got to build the
guts of a regulated investment platform: a secondary market for private securities,
escrow and custody integrations, the cap-table machinery, and more recently the
part I'd have called science fiction in 2019 — production AI systems whose output
gets reviewed by compliance officers and regulators, not just users.

Along the way I co-authored
[ERC-1450](https://github.com/ethereum/ERCs/pull/1335), an Ethereum standard for
transfer-agent-controlled security tokens — the
[reference implementation](https://github.com/StartEngine/erc1450-reference) is
public and security-audited. Over a billion dollars of securities has been issued
on that pattern now, which is the kind of sentence you don't get to write about
most side quests.

The writing never actually stopped, it turns out. It just went internal — hundreds
of design docs, runbooks, and explainers on a company wiki. At some point I noticed
that I'd quietly become the person who documents everything, and that almost none
of it was visible outside a login page. This blog restart is me fixing that.

## What happened to the blog

This site has run on WordPress since 2003 — before that I was on JRoller, which
tells you something about how long I've been doing this. WordPress served me fine
for two decades of occasional posting. But when I came back to it this week and
tried to make it look and behave the way I wanted — real typography, syntax
highlighting for code, a design I actually own — I kept hitting platform walls.

So I did the engineer thing. The blog is now a static site: every post is a
markdown file in a [git repo](https://github.com/devender/devender.me), built with
Astro, served from GitHub Pages. All 121 posts back to 2003 came along, at their
original URLs. The 2009 Clojure posts have syntax highlighting now — they waited
sixteen years for it.

I left the old posts up, unedited. Some of them are about RethinkDB and Maven and
upgrading to Snow Leopard. That's fine. They're an honest record of what building
software looked like at the time, and pretending otherwise would be revisionism.

## What's next

Two things, mostly.

**[mcpwright](https://mcpwright.com)** — a suite of open-source MCP servers I've
been building that put public data inside AI agents:
[SEC EDGAR filings](https://github.com/mcpwright/edgar-mcp),
[U.S. Census data](https://github.com/mcpwright/census-mcp), more coming — all on
[github.com/mcpwright](https://github.com/mcpwright). Each one is small, typed,
tested, and installable in Claude Desktop with one click. There's a surprising
amount of craft in making a good tool surface for a language model, and I'll be
writing about it.

**The backlog** — twenty years of internal writing has left me with a pile of
things worth saying publicly: how we evaluated token standards, what production
LLM systems in a regulated company actually look like, why a knapsack algorithm
ended up allocating ad budgets, and the unreasonable effectiveness of writing
things down.

If you've read this far: hello again. The pens are inked, the ukulele is roughly
in tune, and the lights are back on.
