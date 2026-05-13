---
epic: 7
title: "AI Backend and Proxy"
status: planning
created: 2026-05-11
started: null
completed: null
---

# Epic 07: AI Backend and Proxy

## Overview

Stand up the backend infrastructure for the AI chatbot: a small server proxy that holds provider API keys, validates Apple receipts, integrates all five LLM providers, and computes Study Token costs.

## Success Criteria

- [ ] AI proxy server is deployed to production with HTTPS and Apple receipt validation.
- [ ] All five providers (OpenAI, Anthropic, Google, xAI, DeepSeek) respond via the proxy with streaming.
- [ ] Token cost estimation matches the formula in solution-spec.md and is reconciled post-response.
- [ ] Token ledger records purchases, spends, and gifts with full audit trail.
- [ ] No client ever sees a raw API key.

## Sprints

| Sprint | Title | Status |
|--------|-------|--------|
| 18 | Server proxy infrastructure | planned |
| 19 | Multi-provider AI integrations | planned |
| 20 | Token cost calculation | planned |

## Notes

Created: 2026-05-11
