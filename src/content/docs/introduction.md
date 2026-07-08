---
title: "Overview"
description: "High-performance technical specifications and overview of Cosmicrafts."
order: 1
---

## Technical Pivot

Following a failed DAO launch on ICP, we shifted to a high-performance, cost-effective Web2.5 hybrid architecture:

- **Performance Core**: Matchmaking, lobbies, player progression, and in-game ledgers are handled by a high-efficiency Rust backend running in a secure FreeBSD jail. Valkey powers our memory storage, guaranteeing sub-millisecond database updates and zero in-game gas fees.
- **Ethereum Settlement**: The standard ERC-20 `SPIRAL` token is deployed on Ethereum Mainnet for permanent ledger stability and deep market liquidity.
- **Legacy Preservation**: Existing NFTs from the original fully on-chain experiment remain preserved and honored on ICP canisters.

---

## Technical Index

- **[Architecture & Integration](/docs/architecture)**: Rust-based design, multi-wallet auth, GitOps workflows, and the official `nftropoly` marketplace.
- **[Tokenomics](/docs/tokenomics)**: Allocation tables, lock/vesting specs, and the gasless hybrid ledger mechanics.
