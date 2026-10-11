---
title: "Architecture"
description: "Technical specifications of the Rust backend, unified account auth, and GitOps governance."
order: 2
---

# Cosmicrafts Architecture

## High-Performance Backend

To eliminate transaction latency during gameplay, the entire platform runs on a fast, unified core:

1. **Rust Backend**: Implemented in Rust and hosted inside a secure FreeBSD jail. Valkey manages real-time session states, matchmaking queues, and player statistics with in-memory performance.
2. **In-Game Ledger**: Player balances, rewards, and purchases live in the same low-latency database core — sub-second execution, no external dependencies, no per-transaction costs.

---

## Unified Identity

Users sign in with one World of Unreal Identity (WOU-ID) account — email or social login:
- **One Profile**: Your commander identity, progress, and inventory carry across every Cosmicrafts title.
- **Player Directory**: Public profiles are searchable and linkable across the ecosystem.

---

## Official Marketplace: NFTropoly

All in-game trading, user-generated AI assets, and cosmetic items are settled on **NFTropoly**, the official marketplace engine for Cosmicrafts.
- **Performance**: High-frequency trading and bid-matching are managed by NFTropoly's specialized Rust-based exchange backend to ensure instant trade resolution.

---

## GitOps Governance

Community governance is automated directly through open-source contribution workflows on GitHub:
1. **Pull Requests as Proposals**: Codebase updates, configuration changes, and community fund requests are submitted as a GitHub Pull Request (PR).
2. **Review & Sign-Off**: Once the PR is approved by the community and merged, a secure GitHub Action workflow triggers.
3. **Automated Execution**: The runner executes the approved change — deploying code or recording the funding decision — automatically.
