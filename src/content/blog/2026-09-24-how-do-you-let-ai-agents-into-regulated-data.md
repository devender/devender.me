---
title: "How Do You Let AI Agents Into Regulated Data?"
date: 2026-09-24T12:00:00-07:00
slug: "how-do-you-let-ai-agents-into-regulated-data"
categories: ["Tech"]
---


TL;DR: Everyone at a regulated company wants AI agents on the company's data. Contracts with
the AI vendors are step zero, and they took us the longest. But a contract only covers what
the vendor does with your data. It says nothing about who on your side can pull what, or
whether you can prove it later.

Then there's the hard part. Cloud agents run on the vendor's servers, and those servers run
agents for every one of the vendor's customers. So we had to open a door to the vendor's
cloud that only *our* staff can walk through, not the vendor's other clients. Allowing the
vendor's IP addresses doesn't do that, because every customer shares them. What does it:
each AI tool gets a secret that only we issue, and each person signs in with their own
company account. Anyone else on the same vendor gets nothing.

That part is architecture. Ours is one small gateway, three rules, and a BI tool I set up six
years ago for a completely different reason.

## The question everyone is asking

I work at a regulated fintech. We hold investor data, payment data, and records a regulator
can ask to see. So when people started asking "can the AI just look at our data?", the answer
couldn't be "sure, here's a database password."

And they did ask. Everyone asks now. Finance wants a daily list of failed payments. Ops wants
counts. Product wants to know what happened last week. The AI agents are good enough to do
this work. The question is how to let them without handing our data to anything that asks.

## Step zero: the contracts

Before any code, we needed two promises from every AI vendor we use: **zero data retention**
(ZDR), so the vendor keeps nothing after it answers, and **no training on our data**.

That sounds like a checkbox. It wasn't. We contacted each vendor, one at a time. We got the
agreements in writing. Then we checked that we were on a plan that actually honors them,
because the consumer tier and the enterprise tier of the same product often have different
rules. Compliance was involved from the first conversation, not the last. This took far longer
than the engineering that came after it.

So if you're starting down this road, start there. Nothing below matters if the vendor can
keep or train on what your agent sees.

But here is what the contracts don't answer:

- Which of *our* employees can pull which data through the agent?
- Can someone at another company, using the same AI vendor, reach our systems?
- Six months from now, can we prove who asked for what?

A regulator will ask all three. No vendor agreement answers them. They're questions about
our side of the wire.

## The foundation I didn't know I was building

In 2020 I introduced Metabase at the company. It was meant for dashboards. I set it up so
that it connects to our databases **only with read-only database users**. Metabase groups
decide who sees which databases and tables. Metabase logs every query under the name of the
person who ran it. And it sat behind our VPN.

For about two years, that was also how our AI reached data. You ran the AI on your own laptop,
you connected to the VPN, and the AI talked to Metabase's MCP server as you. It was safe. It
was also stuck on your laptop.

Then the agents moved to the cloud. You use a cloud agent so it can work while your laptop is
closed. It runs on the vendor's servers, and the vendor's servers will never be
on our VPN. The old path couldn't reach them.

## Two obvious answers, both wrong

**Obvious answer one: put Metabase on the internet.** Metabase has its own login and its own
MCP server. Just expose it?

I didn't trust it at the edge, and I had reasons:

1. Metabase's login would become our only wall. Metabase has had serious vulnerabilities that
   worked *before* login. When the login is the only wall, a bug like that is a bad day.
2. An MCP login uses a browser page: sign in, then consent. That page must be public. A browser
   page cannot carry a secret header, so anyone could reach it.
3. "Only allow the AI vendor's IP addresses" sounds like a fix. It isn't. The vendor's servers
   run agents for *every* customer. Allowing the vendor's IPs allows every one of them.
4. I wanted our own audit trail, in storage we control, that no one can edit. Metabase's query
   log is a table in its own database. Someone with enough access can change a table.

**Obvious answer two: build our own.** Our own query API, our own permission model, our own
audit. That's months of work to rebuild what Metabase already does well, and a second
permission model that must always agree with the first. Two permission models will
eventually disagree, and you'll find out at the worst time.

## One guarded door

The answer was in between. We built a small gateway. It is the **only** part that faces the
internet. Metabase and the databases stay private. The agent never gets a path into our
network. It gets answers from the gateway, and nothing else.

<figure style="min-width:0;max-width:100%">
<div style="overflow-x:auto;max-width:100%">
<svg viewBox="0 0 720 720" role="img" aria-label="Architecture: AI agents in the vendor's cloud pass an IP filter to reach our gateway. Only our staff's agents, with a registered client secret and a staff sign-in, get through. The gateway writes an audit log first, then asks private Metabase as that person. Metabase reads production databases with a read-only user." style="display:block;min-width:600px;width:100%;height:auto;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="aa-acc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--accent)"/></marker>
    <marker id="aa-amb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:#d29922"/></marker>
    <marker id="aa-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:#f85149"/></marker>
    <marker id="aa-txt" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--text)"/></marker>
  </defs>
  <rect x="10" y="10" width="700" height="140" rx="10" style="fill:none;stroke:var(--border);stroke-dasharray:6 4"/>
  <text x="26" y="34" font-size="12" letter-spacing="1" style="fill:var(--muted);font-family:var(--mono)">AI VENDOR'S CLOUD · SHARED BY EVERY CUSTOMER</text>
  <rect x="40" y="55" width="280" height="70" rx="8" style="fill:var(--panel);stroke:var(--accent);stroke-width:2"/>
  <text x="56" y="85" font-size="16" font-weight="600" style="fill:var(--text)">Our staff's agents</text>
  <text x="56" y="107" font-size="13" style="fill:var(--muted)">work while the laptop is closed</text>
  <rect x="400" y="55" width="280" height="70" rx="8" style="fill:var(--panel);stroke:var(--border);stroke-dasharray:4 3"/>
  <text x="416" y="85" font-size="16" font-weight="600" style="fill:var(--muted)">Other companies' agents</text>
  <text x="416" y="107" font-size="13" style="fill:var(--muted)">same servers, same IP addresses</text>
  <rect x="10" y="165" width="700" height="290" rx="10" style="fill:none;stroke:var(--border)"/>
  <rect x="40" y="202" width="640" height="30" rx="6" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/>
  <text x="360" y="222" font-size="13" text-anchor="middle" style="fill:var(--muted)">IP filter: vendor's addresses only (lets in every customer)</text>
  <rect x="24" y="318" width="150" height="90" rx="8" style="fill:var(--panel);stroke:var(--text)"/>
  <text x="38" y="345" font-size="15" font-weight="600" style="fill:var(--text)">Employee</text>
  <text x="38" y="366" font-size="12.5" style="fill:var(--muted)">signs in once,</text>
  <text x="38" y="384" font-size="12.5" style="fill:var(--muted)">company account</text>
  <path d="M174,363 L194,363" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:5 4" marker-end="url(#aa-acc)"/>
  <rect x="200" y="250" width="320" height="185" rx="10" style="fill:var(--panel);stroke:var(--accent);stroke-width:2"/>
  <text x="218" y="280" font-size="18" font-weight="700" style="fill:var(--accent)">Gateway</text>
  <text x="218" y="299" font-size="12.5" style="fill:var(--muted)">our code · small · the only public door</text>
  <line x1="218" y1="311" x2="502" y2="311" style="stroke:var(--border)"/>
  <text x="218" y="336" font-size="14" style="fill:var(--text)"><tspan font-weight="700" style="fill:var(--accent)">1</tspan>  Registered client: ID + secret</text>
  <text x="218" y="363" font-size="14" style="fill:var(--text)"><tspan font-weight="700" style="fill:var(--accent)">2</tspan>  Each person signs in as themselves</text>
  <text x="218" y="390" font-size="14" style="fill:var(--text)"><tspan font-weight="700" style="fill:var(--accent)">3</tspan>  Log first, then answer</text>
  <text x="218" y="417" font-size="13" style="fill:var(--muted)"><tspan font-weight="700">+</tspan>  Few tools · no raw SQL · kill switch</text>
  <path d="M290,125 L290,246" style="fill:none;stroke:var(--accent);stroke-width:2" marker-end="url(#aa-acc)"/>
  <path d="M600,125 L600,300 L532,300" style="fill:none;stroke:#f85149;stroke-width:1.6;stroke-dasharray:5 4" marker-end="url(#aa-red)"/>
  <text x="540" y="330" font-size="12.5" font-weight="600" style="fill:#f85149">Refused:</text>
  <text x="540" y="348" font-size="12.5" style="fill:#f85149">no client secret,</text>
  <text x="540" y="366" font-size="12.5" style="fill:#f85149">no staff sign-in,</text>
  <text x="540" y="384" font-size="12.5" style="fill:#f85149">no data</text>
  <text x="26" y="189" font-size="12" letter-spacing="1" style="fill:var(--muted);font-family:var(--mono)">OUR PUBLIC EDGE</text>
  <rect x="10" y="470" width="700" height="240" rx="10" style="fill:none;stroke:var(--border);stroke-dasharray:6 4"/>
  <text x="26" y="701" font-size="12" letter-spacing="1" style="fill:var(--muted);font-family:var(--mono)">PRIVATE NETWORK · NO INTERNET PATH</text>
  <rect x="30" y="560" width="200" height="110" rx="8" style="fill:var(--panel);stroke:#d29922;stroke-width:1.6"/>
  <text x="46" y="588" font-size="15" font-weight="600" style="fill:var(--text)">Audit archive</text>
  <text x="46" y="610" font-size="12.5" style="fill:var(--muted)">WORM: no one can edit it</text>
  <text x="46" y="629" font-size="12.5" style="fill:var(--muted)">kept 6 years</text>
  <text x="46" y="652" font-size="12.5" font-weight="600" style="fill:#d29922">no log, no answer</text>
  <path d="M250,435 L250,520 L130,520 L130,556" style="fill:none;stroke:#d29922;stroke-width:1.8" marker-end="url(#aa-amb)"/>
  <text x="140" y="542" font-size="12.5" style="fill:#d29922">1. log first</text>
  <rect x="265" y="535" width="230" height="150" rx="8" style="fill:var(--panel);stroke:var(--text);stroke-width:1.4"/>
  <text x="281" y="563" font-size="17" font-weight="700" style="fill:var(--text)">Metabase</text>
  <text x="281" y="587" font-size="13" style="fill:var(--text)">Acts as that person:</text>
  <text x="281" y="608" font-size="13" style="fill:var(--muted)">their permissions,</text>
  <text x="281" y="628" font-size="13" style="fill:var(--muted)">their time and rate limits,</text>
  <text x="281" y="648" font-size="13" style="fill:var(--muted)">query log in their name</text>
  <path d="M400,435 L400,531" style="fill:none;stroke:var(--accent);stroke-width:2" marker-end="url(#aa-acc)"/>
  <text x="410" y="515" font-size="12.5" style="fill:var(--accent)">2. then ask, as the user</text>
  <path d="M495,600 L556,600" style="fill:none;stroke:var(--text);stroke-width:1.8" marker-end="url(#aa-txt)"/>
  <text x="526" y="590" font-size="12" text-anchor="middle" style="fill:var(--muted)">read</text>
  <g style="fill:var(--panel);stroke:var(--text);stroke-width:1.4">
    <path d="M565,565 a55,12 0 0 0 110,0 v54 a55,12 0 0 1 -110,0 z"/>
    <ellipse cx="620" cy="565" rx="55" ry="12"/>
  </g>
  <text x="620" y="656" font-size="14" font-weight="600" text-anchor="middle" style="fill:var(--text)">Production DBs</text>
  <text x="620" y="675" font-size="12.5" text-anchor="middle" style="fill:var(--muted)">read-only user:</text>
  <text x="620" y="693" font-size="12.5" text-anchor="middle" style="fill:var(--muted)">writes impossible</text>
</svg>
</div>
<figcaption>Every agent runs on the same vendor servers and passes the same IP filter. Only our staff's agents get further: a client secret we issued, plus a person signed in with a company account. The gateway logs each request before it answers, then asks Metabase as that person.</figcaption>
</figure>

The gateway follows three rules:

1. **Register every AI client.** An AI tool cannot connect until we issue it its own client ID
   and secret. Each tool gets its own. We can tell tools apart, and we can revoke one without
   touching the others.
2. **Every person signs in as themselves.** Sign-in uses our company Google account. The
   gateway then opens a Metabase session *as that person*. There is no shared service account.
   The agent sees only what that person can already see in Metabase. When someone leaves the
   company, their access ends with their account.
3. **Log before you answer.** The gateway writes an audit record before it returns any data.
   The record goes to WORM storage, which no one can edit or delete, and which we keep for six
   years under the SEC's record-keeping rule. **If the gateway cannot write the record, the
   request fails.** No data leaves without a log.

A few more choices made it smaller than it sounds:

- **We reuse Metabase's own MCP tools.** The gateway passes requests through to Metabase. We
  wrote no query engine.
- **We allow only a short list of tools.** Read and query tools pass. Tools that create or
  change Metabase content do not.
- **No raw SQL.** An agent cannot run SQL that you write. It builds the request with
  Metabase's query builder, as you. This keeps queries inside the permissions Metabase already
  enforces.
- **Limits live in Metabase, per user.** Agents query eagerly. Metabase already sets query time
  limits and rate limits for each user, and it already restricts what each user can access.
  An agent works as its user, so it gets the same limits. We didn't build a second set.
- **There is a kill switch.** Turn off the gateway, or one client's secret, and AI access
  stops. People who use Metabase directly are not affected.

Yes, the gateway is new code facing the internet, so it's the part an attacker will aim at.
That's why it's thin. It checks the client secret, checks the sign-in, writes the log, and
passes the request through. It stores no query results and makes no permission decisions of its own.
Metabase still makes those. Every change went through code review before release.

## How strong is each layer?

Not all controls are equal, and most writing on this topic ranks them wrong.

| Control | What it stops | Strength |
|---|---|---|
| IP allowlist | Scanners and internet noise | Weak. Other customers of the same AI vendor share those IPs. |
| Client ID + secret | Other companies' agents | Strong. This is the real boundary between companies. |
| Per-person sign-in | Anyone who isn't one of our employees, shared logins, people who left | Strongest. |
| Metabase permissions | Access beyond what that person already has | Strong. |
| Read-only database user | Any change to data | Strong. The database enforces it, not a prompt. |

The IP allowlist is still worth having. It removes noise. But if your design depends on it,
your design lets in everyone else who uses that vendor.

## What it doesn't solve

I'd rather list these than have you find them.

- **Prompt injection through the data.** A read-only user stops writes. It does not stop leaks.
  If your data includes text that outsiders wrote, such as notes, descriptions or messages, an
  attacker can put instructions in that text, and the agent will read them. An agent with other
  tools, like web access or email, could be tricked into sending data out through one of them.
  A gateway cannot see this. It happens inside the agent. The best defenses I know of are
  keeping free-text fields out of what agents can reach, and not mixing data tools with
  outbound tools on the same task.
- **The vendor holds sign-in tokens.** After a person signs in, the AI vendor keeps a token so
  the agent can work as that person. If the vendor is breached, an attacker could use those
  tokens. We limit the damage: access tokens expire in minutes, each refresh checks the
  person's company account again, everyone signs in fully again every 30 days, and changing
  one client's secret ends all of that client's sessions. The risk gets smaller. It does not
  go away.
- **Agents are faster than people.** An agent can pull only what its user can see, but it can
  pull it much faster than a person clicking through dashboards. Per-user limits and the audit
  log matter more with agents, not less.
- **Every path needs the same rules.** A gateway protects only the traffic that goes through it.
  Find every way an AI tool can reach your data, and give each one the same controls. Don't
  claim "all AI access goes through the gateway" until you've checked.
- **The answer still goes to the vendor.** The results an agent reads reach the vendor's model.
  That's what the contracts in step zero are for. Architecture and contracts each cover what
  the other can't.

## Why it only took two days

The gateway took two days to build and ship. That isn't because it's simple. It's because
the hard decisions were made years ago. Read-only database users, per-group permissions, a
query log under each person's name: in 2020 those were just sensible BI hygiene. In 2026 they
turned out to be most of an AI security model.

The lesson I'd take from it: choose infrastructure whose controls still hold when the user
changes. Our BI tool's users changed from people to agents, and the controls didn't have to.

**Contracts govern the vendor. Architecture governs access.** You need both. If your company is
working through the same problem, I'd like to hear which of these layers you kept, and which
one you found you didn't need.

**Chase the sources**

- **SEC Rule 17a-4**: the broker-dealer record-keeping rule behind "WORM, six years, no one can
  edit it".
- **Metabase CVE-2023-38646**: a pre-authentication remote-code-execution bug from 2023. It's
  why the login page was never going to be our only wall. (Also CVE-2021-41277, a pre-auth
  file read.)
- **The MCP authorization spec**: how MCP clients sign in with OAuth, and why the consent page
  has to be public.
- **[What Makes a Good MCP Tool Surface for an LLM](/2026/06/04/good-mcp-tool-surface/)**: why
  a short tool allowlist is a feature, not a limitation.
- **[One MCP Server, All Your HubSpot Portals](/2026/08/28/one-mcp-server-all-your-hubspot-portals/)**:
  the same instinct at a smaller scale. Put the safety in what the system *can't* do.
