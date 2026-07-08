---
title: "Architecture"
description: "Technical specifications of the hybrid Rust backend, multi-wallet auth, and GitOps governance."
order: 2
---

## Hybrid Ledger & Backend

To eliminate transaction latency and gas fees during gameplay, we utilize a dual-layer approach:

1. **Rust Backend (Web2 Core)**: Implemented in Rust and hosted inside a secure FreeBSD jail. Valkey manages real-time session states, matchmaking queues, and player statistics with in-memory performance.
2. **On-Chain Settlement (Web3 Layer)**: Ethereum Mainnet manages the standard ERC-20 `SPIRAL` ledger, token sales, and linear vesting schedules.

---

## Multi-Chain Identity

Users can bind multiple on-chain identities to their unified cloud game profile, using proven multi-chain integration patterns (similar to `ionicswap`):
- **MetaMask (Ethereum)**: Used to verify `SPIRAL` token balances, claim staking rewards, and sign governance proposals.
- **Phantom (Solana)** & **Internet Identity (ICP)**: Integrated to track cross-chain assets and historical achievements.

---

## Official Marketplace: NFTropoly

All in-game trading, user-generated AI assets, and cosmetic items are settled on **NFTropoly**, the official marketplace engine for Cosmicrafts.
- **Legacy Integration**: Legacy NFTs originally minted on ICP canisters are indexed and tradeable.
- **Performance**: High-frequency trading and bid-matching are managed by NFTropoly's specialized Rust-based exchange backend to ensure instant trade resolution.

---

## GitOps Governance

DAO governance is automated directly through open-source contribution workflows on GitHub:
1. **Pull Requests as Proposals**: Any codebase updates, configuration changes, or treasury funding requests are submitted as a GitHub Pull Request (PR).
2. **Review & Multi-Sig Authorization**: Once the PR is approved by the community and merged, a secure GitHub Action workflow triggers.
3. **Smart Contract Trigger**: The cryptographic runner interacts directly with the `SpiralTreasury.sol` contract to execute or propose the required on-chain transaction automatically.
