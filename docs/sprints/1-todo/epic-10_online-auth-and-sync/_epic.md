---
epic: 10
title: "Online Auth and Sync"
status: planning
created: 2026-05-11
started: null
completed: null
---

# Epic 10: Online Auth and Sync

## Overview

Begin v2.0 — the Online tier. Sign-in (Apple + email), Supabase schema, local-to-cloud sync engine, and the monthly subscription IAP.

## Success Criteria

- [ ] User can sign in with Apple or email/password and a Supabase user row is created.
- [ ] On first sign-in, user is prompted to sync local decks; auto-merge runs cleanly.
- [ ] Last-write-wins resolution handles concurrent edits across devices.
- [ ] Images sync to Supabase Storage with proper user-scoped paths.
- [ ] Subscription IAP unlocks Messages tab and other Online-only features.
- [ ] Cancelling subscription downgrades cleanly; local decks remain intact.

## Sprints

| Sprint | Title | Status |
|--------|-------|--------|
| 26 | Sign in with Apple and email auth | planned |
| 27 | Supabase schema and sync engine | planned |
| 28 | Subscription IAP and tier gating | planned |

## Notes

Created: 2026-05-11
