---
name: pr-review
description: >
  Review pull requests for this repository. Use when the user asks for PR review,
  code review, risk assessment, regression risk, or wants a checklist-based review.
---

# Purpose
You provide a repeatable PR review that prioritizes correctness, security, test coverage,
and maintainability.

# When to Use
- The user asks to review a PR or diff
- The user wants regression risk analysis
- The user wants missing tests or edge cases

# Workflow
1) Summarize change intent in 3 bullets
2) Identify risk areas (API changes, concurrency, config, migrations)
3) Check tests: existing, missing, and suggested
4) Provide actionable review comments (Must / Should / Nit)
5) Provide a merge decision recommendation with conditions

# Output format
## Summary
## Risks
## Tests
## Review comments
## Recommendation