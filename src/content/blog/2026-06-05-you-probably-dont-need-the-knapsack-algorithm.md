---
title: "You Probably Don't Need the Knapsack Algorithm"
date: 2026-06-05T12:00:00-07:00
slug: "you-probably-dont-need-the-knapsack-algorithm"
categories: ["Tech"]
---

A while back I watched a team reach for the knapsack algorithm to split an advertising budget. It's
a clever algorithm, and I understand the pull — the problem *feels* like it wants something
sophisticated. But it was the wrong tool here, and the wrong tool doesn't fail loudly; it just
quietly hands you a worse answer than plain common sense would. I've seen that mistake enough times
that I wanted to write down how to spot it.

So: say you have a fixed amount of money and several places you could put it, and you want the most
bang for your buck. It comes up everywhere — a marketing budget, a savings plan, even how you spend
a free Saturday. Here's the punchline up front: **most budgets behave like water, and water just
wants to be spread** — no fancy algorithm required. The trick is knowing when you're *not* in that
case. Here's how to tell, in plain terms.

## First, a single idea: diminishing returns

Think about pizza. The first slice when you're hungry is fantastic. The second is great. By the
sixth, you're barely enjoying it. Each extra slice is worth *less* than the one before. That's
**diminishing returns**, and almost everything in life works this way — including advertising. The
first $1,000 you spend reaching customers finds the easiest, most interested people. Spend more
and more, and you start paying to reach people who were never going to buy.

Hold onto that, because it changes the whole answer.

## The one question that decides everything

Ask: **can I put in any amount I like, or is it all-or-nothing?**

Two everyday pictures make the difference obvious.

**Picture 1: pouring water into glasses.** You have a pitcher and several glasses, and you can
pour any amount into each. If filling a glass gives you less and less benefit as it gets fuller
(diminishing returns, like the pizza), the smart move is simple: keep pouring the next splash into
whichever glass would benefit most *right now*, and stop when every glass would benefit about the
same. You naturally end up **spreading** the water around. You don't need a clever trick — this
nibble-by-nibble approach *is* the best you can do.

**This is what a marketing budget usually looks like.** Money is dial-able (you can spend $3,200
here and $6,800 there), and every channel has diminishing returns. So the right instinct is to
keep moving the next dollar to wherever it's currently doing the most good — and spread it out.

A quick made-up example. Say you have $9,000 and three channels. The first $3,000 into search
brings in 60 new customers; a *second* $3,000 into search brings only 25 — diminishing returns
kicking in. But that same $3,000 put into a fresh channel brings 45, so you move it there instead.
Keep following the best *next* dollar like that and you naturally end up spread across channels,
not piled into the single "best" one.

**Picture 2: packing a backpack with whole objects.** Now imagine you're choosing items to carry —
a laptop, a camera, a toolbox — and the bag holds only so much weight. You **can't take half a
laptop.** It's take-it-or-leave-it for each thing. Here, clever combinations really matter:
sometimes leaving out the single "best" item lets you fit two others that together are worth more.
*This* is the situation where you genuinely need a careful method (computer scientists call it the
**"knapsack" problem**, after exactly this backpack image).

## Why people get it wrong

The backpack method sounds impressive, so people grab it even when their budget is really water.
But to use it at all, you first have to *pretend* your dial-able money comes in whole, fixed lumps
that are each either "in" or "out." That's the actual mistake — you've mis-described the problem
before you've even started. Forced into all-or-nothing chunks, you throw away the one move that
wins for water — "a little less here, a little more there" — so the answer comes out worse. The fix
isn't a fancier algorithm; it's matching the method to the real shape of the decision.

So the rule of thumb is:

> **Figure out whether your money is "water" or "backpack objects" first.**
> - **Water** (you can spend any amount, and more gives diminishing returns): keep adding the next
>   bit wherever it helps most, and spread it. Simple — and it's the best possible.
> - **Backpack objects** (whole, all-or-nothing choices — a TV ad, a one-time sponsorship —
>   especially with rules like "we can't do both A and B" or "if we do C we must also do D"): now
>   you need the careful method.

Most marketing budgets are water. Whole, chunky commitments are backpack objects.

## A catch: it depends on the shape of the curve

The "just spread it" rule leans on one quiet assumption — that every channel has *diminishing*
returns, where the first dollars do the most and each extra dollar does a little less. That's the
blue curve below, and it's why spreading wins: the next dollar is always worth more somewhere
less-funded.

But spending doesn't always behave that way. Some channels barely move until you cross a minimum —
you can't run *half* a TV campaign and expect a quarter of the result. They start slow, take off
once you've committed enough, then flatten. That's the orange **S-curve**.

<figure>
<svg viewBox="0 0 340 210" role="img" aria-label="Two payoff curves: diminishing returns versus an S-curve" style="max-width:440px;width:100%;height:auto;font-family:system-ui,sans-serif">
  <line x1="45" y1="180" x2="320" y2="180" stroke="#6e7681" stroke-width="1.5"/>
  <line x1="45" y1="180" x2="45" y2="20" stroke="#6e7681" stroke-width="1.5"/>
  <text x="320" y="198" text-anchor="end" fill="#9198a1" font-size="11">spend →</text>
  <text x="40" y="15" text-anchor="start" fill="#9198a1" font-size="11">return ↑</text>
  <path d="M45,180 Q120,45 320,40" fill="none" stroke="#58a6ff" stroke-width="2.5"/>
  <text x="146" y="58" fill="#58a6ff" font-size="11">diminishing returns</text>
  <path d="M45,180 C175,180 175,60 320,60" fill="none" stroke="#d29922" stroke-width="2.5"/>
  <text x="120" y="152" fill="#d29922" font-size="11">S-curve (slow start)</text>
</svg>
<figcaption>Diminishing returns (blue) reward spreading. An S-curve (orange) can punish it —
dribbling a little everywhere may never get any channel past its slow start.</figcaption>
</figure>

When a channel looks like the orange curve, "pour the next dollar where it helps most" can stall: a
trickle into a slow-starter looks worthless, so it never gets enough to prove itself. These cases
behave a bit like the backpack after all — it's *commit properly or skip it*, not dribble-a-bit-
everywhere. So before you trust the spreading rule, ask whether each channel really has diminishing
returns the whole way, or a slow start you have to get past first.

## One honest reality check

All of this assumes you actually *know* how well each option pays off. In real life you don't —
those numbers are educated guesses, they change over time, and the options affect each other
(spending more on one platform can quietly help, or hurt, another). So don't agonize over finding
the mathematically perfect split of numbers that are really just estimates. The bigger win is
getting better at *measuring* how each option actually performs. Once your estimates are honest,
the "spread it where it helps most" rule will take you most of the way there.

---

> **For the technically inclined.** The "water" case is maximizing a sum of *concave*
> (diminishing-return) payoff functions under a budget constraint — the classic **water-filling**
> solution: keep allocating until the marginal return is equal across channels (the KKT condition).
> Greedy "next dollar to the highest current marginal return" reaches that point and is *provably
> optimal* — but only when the payoff curves are concave. The "backpack" case is the **0/1 knapsack**
> problem; once you add side constraints ("not both A and B", "if C then also D") it's integer
> programming. And the S-curve catch is **non-concavity**: with a slow-start (increasing-returns)
> region, greedy can stall in a local optimum, and you genuinely need a global method — e.g. dynamic
> programming over discretized spend levels — *even though the budget is perfectly divisible*. The
> everyday rule of thumb and the formal result agree: match the method to the shape of the curve.
