---
title: "Project Vision & Scope"
description: "The official, persistent blueprint of the Cosmicrafts Web2.5 AI-Driven Creator Economy."
order: 5
---

# Cosmicrafts Project Blueprint & Technical Specification

This document serves as the permanent **Source of Truth** for the vision, scope, tokenomics, and smart contract architecture of the Cosmicrafts project. It ensures that the team, the founders, and all future development agents work under a unified, un-drifting specification.

---

## 🚀 The Pivot

Cosmicrafts started as a fully on-chain game experiment. We respect that work and everyone who contributed to it.

But we're shifting gears to make this thing real:

- **Hybrid cloud + Ethereum**: Game state, matchmaking, profiles — all on cloud servers. Fast, no gas fees. SPIRAL lives on Ethereum as a standard ERC-20. Permanent, liquid, no cycle management.
- **Lower costs**: This setup costs a fraction of what we were burning. That means we can keep delivering instead of watching overhead eat the runway.
- **No free airdrops**: Every token is bought or earned. That's it.

This is not a betrayal of the original vision — it's the only way to ship something people can actually use. We owe that to the people who believed in this.

---

## 🎯 1. The Core Vision: The AI-Driven Space Sandbox

Cosmicrafts is building an **AI-powered creator sandbox** for sci-fi assets.

- **The Forge**: Users prompt an AI engine (generating 3D spaceships, characters, or avatar items from text or 2D image inputs).
- **The Utility**: The generated assets are instantly usable inside the game client or tradeable on our internal ledger.
- **The Token**: The `SPIRAL` token is the universal gas that powers this AI generator, staking mechanisms, and governance.

---

## 🪙 2. Tokenomics & Capped Allocations (No Giveaways)

Total Fixed Supply: **1,000,000,000 SPIRAL Tokens (1 Billion)**
Pegged Value (Public Sale): **$1.00 USD = 1 SPIRAL** (operating legally like V-Bucks/Robux).

| Allocation Group | Percentage | Token Allocation | Lock & Vesting Terms |
| :--- | :---: | :---: | :--- |
| **Seed Investors** | **2.6%** | **26,000,000** | Fully preserved, non-diluted, and honored. |
| **Former Team** | **1.3%** | **13,000,000** | Capped at exactly half of the Seed Investors' share to protect investor significance. |
| **Founder Allocation** | **7.0%** | **70,000,000** | Retained by the founder, locked in a secure vesting contract. |
| **Public Sale** | **10.0%** | **100,000,000** | Offered publicly at $1.00 per token. |
| **DAO Treasury** | **79.1%** | **791,000,000** | Controlled by the Treasury contract, released by DAO votes. |

---

## 🏗️ 3. Hybrid Ledger & Transfer Mechanics

To eliminate the $20–$50 gas fee per asset generation on Ethereum Mainnet, the project uses a **Web2.5 Hybrid Ledger**:

1. **On-Chain Layer (Ethereum)**: The base ERC-20 `SPIRAL` token contract, the Sales Contract, and the Vesting locks live here.
2. **Off-Chain Layer (Database Vault)**: Players deposit Ethereum `SPIRAL` into the game. Our backend credits them with an identical **In-Game Balance**. All AI generation, cosmetic item purchases, and internal trading use this database balance with **zero gas fees and sub-second execution speeds**.
3. **The Exit (Transfer Fee)**: When moving tokens from the In-Game Balance back to the on-chain Ethereum wallet, a standard **Transfer Fee** is charged to cover gas costs and protocol maintenance.
4. **No Free Giveaways**: There are no free community airdrops. Every token in circulation represents real capital input or utility value.

---

## ⛓️ 4. The 4-Contract Solidity Architecture

All smart contracts will be built using audit-proven, industry-standard **OpenZeppelin** modules:

### Contract 1: Base ERC-20 Token (`SpiralToken.sol`)
- Standard, non-burnable, non-pausable ERC-20 contract.
- Mints 1,000,000,000 tokens on creation to the deployer.

### Contract 2: Vesting / Timelock Contract (`SpiralVesting.sol`)
- Implements linear vesting with a cliff.
- Automatically handles the 7% Founder and 2.6% Seed releases to prevent manual key manipulation.

### Contract 3: Sales Contract (`SpiralSale.sol`)
- Implements a fixed-price sale ($1.00 USD equivalent in Stablecoins or ETH) to sell the 10% public allocation.
- Functions legally like a digital currency store (V-Bucks).

### Contract 4: Treasury Vault (`SpiralTreasury.sol`)
- Holds the 79.1% DAO Treasury.
- Integrates with **GitHub Actions / CI workflows**. Transactions can be proposed during GitHub PR approvals and executed on-chain via multi-sig authorization, bridging code-merges directly to financial execution.
