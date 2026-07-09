---
description: Run PM, then Designer, then Developer in sequence on the current PeerT backlog.
---

Run the PeerT team in order, reporting a summary after each step before moving to the next:

1. Invoke the `pm` subagent to groom and prioritize the Notion Kanban.
2. Invoke the `designer` subagent to define/design the UX for whatever the PM moved to "To Do".
3. Invoke the `developer` subagent to implement the top-priority spec'd ticket(s), commit locally, and move them to "In Review".

Never push to GitHub and never mark a ticket "Done" — stop after step 3 and hand control back to Mauricio for review.
