---
title: "One MCP Server, All Your HubSpot Portals"
date: 2026-08-28T12:00:00-07:00
slug: "one-mcp-server-all-your-hubspot-portals"
categories: ["Tech"]
---

HubSpot's own Claude connector is one account per connection. If you only have one portal, that's fine. If you have several — an acquisition that never got merged, separate portals for two brands, a sandbox sitting next to production — there's no supported way to point a single connection at all of them, and Claude won't let you add the same connector twice to fake it.

I ran into exactly this, so I built **hubspot-multi-mcp**: a small, local, read-only MCP server that connects Claude Desktop to as many HubSpot portals as you want. You give each one a short name, and then you just talk: *"in the sales hubspot, pull the deal for Acme."* When you don't know which portal a record lives in, one tool — `hubspot_find_across` — searches all of them at once and tells you. That last part is the thing a one-account connector structurally can't do.

Two design choices I'd defend.

## Read-only by construction

The client only ever issues reads. There is no create, update, or delete path anywhere in the code — so even if you hand it a token with write scope, it cannot change a thing. That's a stronger guarantee than "please don't," and it's the same shape as the compliance-gated systems I build for a living: put the safety in what the system *can't* do, not in how nicely you ask it. A reviewer can confirm the property by grepping for a single POST — the CRM `/search` call, which is a read despite the verb — and finding nothing else.

## Your keys stay yours

Tokens are stored with `600` permissions *outside* the package, redacted from every error message, hidden as you paste them during setup, and never sent anywhere but HubSpot's own API. Nothing is hosted. The only network traffic is read requests going from your machine to HubSpot and back.

## The surface

It's seven small tools — list your portals, list and describe objects (including custom ones, via schema discovery), search, fetch by id, list owners, and search-across-all. I tried to build it to the [tool-surface principles](/2026/06/04/good-mcp-tool-surface/) I've written about here before: few orthogonal tools, descriptions that carry the actual contract, lean structured returns. Install is one command:

```
npx hubspot-multi-mcp setup
```

Name each portal, paste its read-only private-app token, restart Claude Desktop, and ask *"list my hubspot portals."* It's MIT-licensed and unofficial — not affiliated with HubSpot.

**Chase the sources**

- **npm** — [hubspot-multi-mcp](https://www.npmjs.com/package/hubspot-multi-mcp): one command, `npx hubspot-multi-mcp setup`.
- **Source** — [github.com/devender/hubspot-multi-mcp](https://github.com/devender/hubspot-multi-mcp): the whole thing, MIT, read-only by construction.
- **The wall it works around** — HubSpot's official MCP servers bind a connection to one portal over OAuth; that one-account limit is exactly what multiplexing by name gets past.
