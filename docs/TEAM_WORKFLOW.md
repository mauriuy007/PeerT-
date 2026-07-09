# Team workflow: PM + Designer + Developer (autonomous agents) + you

Mirrors the "Team & Ways of Working" page in the project's Notion hub. This file is the versioned copy.

## Where this runs

This workflow works the same whether you drive it from Cowork (chat) or from **Claude Code** in this repo's terminal — both read/write the same Notion board and Figma file, so progress made in one shows up in the other.

For Claude Code specifically:
- Roles are real subagents: `.claude/agents/pm.md`, `.claude/agents/designer.md`, `.claude/agents/developer.md`. Invoke by name ("use the pm subagent") or let Claude Code pick them up from context.
- `/run-team` (`.claude/commands/run-team.md`) runs PM → Designer → Developer in sequence, same as saying "run the team" in Cowork.
- `.mcp.json` at the repo root wires up the Notion MCP server. The Figma MCP URL is a placeholder — fill it in from Figma's Dev Mode MCP settings (Figma app → menu → Settings → Dev Mode MCP Server), then run `claude mcp add` or just let Claude Code pick up `.mcp.json` on next start. Each surface (Cowork vs. Claude Code) authenticates to Notion/Figma separately the first time, even though the config is shared.

## How it's triggered

Say **"run the team"** in chat. That launches three autonomous agents in sequence:

1. **PM agent** — reads the Kanban + Product Notes in Notion, prioritizes, writes specs/acceptance criteria, moves tickets Backlog → To Do, flags decisions that need your input.
2. **Designer agent** — owns UX/UI of the real mobile app. Reviews/aligns existing screens (Login, Register, Splash in `mobile/components`) and designs new ones in Figma. Leaves specs on the ticket.
3. **Developer agent** — implements the top "To Do" ticket(s) in this repo (backend `src/` or `mobile/`), commits locally, moves the ticket to "In Review". Never pushes to GitHub or marks "Done" on its own.

## The loop

1. Backlog → PM prioritizes/specifies.
2. Backlog → To Do → Designer defines the experience for user-facing work.
3. To Do → Developer implements.
4. In Review → you review the diff and decide.
5. Done → you mark it.

## What's on you

- Answer escalated product/design decisions.
- Review code before approving.
- Code directly whatever you want to keep for yourself.
- Approve and perform the push to GitHub (`origin` → https://github.com/mauriuy007/PeerT-.git).

## Project context

PeerT is a travel companion app (Node/TS/Express/Prisma backend + Expo/React Native mobile). See the root `README.md` for architecture, tech stack, and setup instructions. See Notion → "Product Notes & Roadmap" for open product questions and the external API integration order (Mapbox, Amadeus, Hotels API, OpenWeather, OpenTripMap, ExchangeRate API, dLocal).
