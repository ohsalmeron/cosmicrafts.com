---
title: "Architecture"
description: "A hybrid approach of robust cloud engines and standard Ethereum consensus."
order: 2
---

## Hybrid Consensus & Server Design

To ensure optimal performance and security, Cosmicrafts uses a split-plane hybrid architecture:

```
┌─────────────────────────────────┐
│     Centralized Cloud Server    │ <--- Matchmaking, Player Profiles,
│  (No Gas, Zero Latency, 60 FPS) │      Real-time Battle State Engine
└────────────────┬────────────────┘
                 │
                 │ State Proofs
                 ▼
┌─────────────────────────────────┐
│        Ethereum Mainnet         │ <--- ERC-20 SPIRAL Token,
│      (Secure, Permanent)        │      Immutable Asset Ledgers
└─────────────────────────────────┘
```

### 1. Centralized Cloud Engine
- **Gameplay Matchmaking**: Player matchmaking, game state calculation, and leaderboard updates are hosted on specialized, high-performance cloud servers.
- **Frictionless Experience**: Players can enjoy the fully featured 3D game client without needing a crypto wallet connected for every action, resulting in **zero transaction latency and zero gas fees** during play.

### 2. Decentralized Asset Layer (Ethereum)
- **SPIRAL ERC-20 Token**: The financial foundation of the franchise is deployed on the Ethereum mainnet.
- **Permanent Ledger Storage**: Ethereum provides an indestructible smart contract environment. No single entity, including the development team, can alter or shut down the ledger state, giving investors and holders total transparency and security.
