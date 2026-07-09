# PeerT — Project Context for Claude Code

PeerT is a travel companion app: Node.js/TypeScript/Express/Prisma backend (this repo root) + Expo/React Native mobile app (`mobile/`). See @README.md for architecture, tech stack, and setup (Docker, Prisma migrations, env vars).

## Team workflow

This project is worked on jointly across Cowork (chat-driven sessions) and Claude Code (this terminal), using the same three-role workflow in both places. Full details: @docs/TEAM_WORKFLOW.md

Short version: three roles — PM, Designer, Developer — prioritize/spec/build in that order, backed by a shared Notion workspace (Kanban + Product Notes & Roadmap) and a shared Figma file for UX/UI. Mauricio supervises: answers escalated decisions, reviews code before it's marked done, and is the only one who pushes to GitHub.

Use the subagents in `.claude/agents/` (`pm`, `designer`, `developer`) to work in-role. Say "run the team" (or use `/run-team`) to run all three in sequence on the current backlog.

## Conventions

- Backend code lives in `src/` (routes/controllers/services/middlewares/validators/errors/types), Prisma schema in `prisma/schema.prisma`.
- Mobile code lives in `mobile/` (Expo). See @mobile/CLAUDE.md for Expo-specific notes.
- Never push to GitHub or mark Notion tickets "Done" without Mauricio's explicit approval.
- Commit locally with descriptive messages as work is completed; leave the push to Mauricio.
