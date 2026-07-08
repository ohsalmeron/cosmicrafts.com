---
title: "Tokenomics & Contracts"
description: "Distribution allocations, hybrid ledger design, and smart contract specifications."
order: 3
---

## Token Distribution Strategy

Total Fixed Supply: **1,000,000,000 SPIRAL Tokens (1 Billion)**
Pegged Value: **$1.00 USD = 1 SPIRAL** (operates legally like in-game V-Bucks or Robux).

| Allocation Group | Percentage | Token Allocation | Vesting & Release Terms |
| :--- | :---: | :---: | :--- |
| **Seed Investors** | **2.6%** | **26,000,000** | Fully preserved, non-diluted, and honored. |
| **Former Team** | **1.3%** | **13,000,000** | Capped at exactly 50% of the Seed share to protect investor weight. |
| **Founder Allocation** | **7.0%** | **70,000,000** | Retained by founders, locked in a secure linear vesting contract. |
| **Public Sale** | **10.0%** | **100,000,000** | Offered publicly at a fixed rate of $1.00 per token. |
| **DAO Treasury** | **79.1%** | **791,000,000** | Controlled by the on-chain treasury vault. |

No free community airdrops are conducted. Every circulating token represents capital input or active utility.

---

## Hybrid Ledger Mechanics

To avoid high gas fees during gameplay, we deploy a hybrid ledger:
- **On-Chain Balance**: ERC-20 `SPIRAL` tokens held inside users' wallets.
- **In-Game Balance**: Users deposit ERC-20 `SPIRAL` to receive an identical internal database balance. All in-game expenditures, marketplace purchases, and trades run through this fast database balance.
- **The Exit**: Withdrawing back to Ethereum mainnet incurs a standard transfer fee to cover transaction gas and maintenance.

---

## Smart Contract Architecture

The token ecosystem is governed by four standard, OpenZeppelin-audited Solidity contracts:

1. **`SpiralToken.sol`**: A standard, non-burnable ERC-20 contract that mints the fixed 1 Billion supply on creation.
2. **`SpiralVesting.sol`**: Implements linear vesting with a cliff for Founder and Seed locks.
3. **`SpiralSale.sol`**: Coordinates public token distribution ($1.00 per token fixed price).
4. **`SpiralTreasury.sol`**: Holds the 79.1% DAO treasury. It is integrated with our GitOps Action runners to release funds automatically upon approved GitHub code merges.
