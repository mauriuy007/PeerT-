# Team workflow: PM + Designer + Developer (autonomous agents) + you

Mirrors the "Team & Ways of Working" page in the project's Notion hub. This file is the versioned copy.

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
