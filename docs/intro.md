---
sidebar_position: 1
---

# Introduction

Welcome to **Scaffold-DOT** documentation!

🧪 Scaffold-DOT is an open-source, up-to-date toolkit for building decentralized applications (dapps) on Polkadot Hub blockchain with Solidity smart contracts. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

## What is Scaffold-DOT?

Scaffold-DOT is a fork of [Scaffold-ETH 2](https://scaffoldeth.io) adapted for the Polkadot ecosystem. It provides everything you need to start building dapps on Polkadot:

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it
- 🪝 **Custom Hooks**: Collection of React hooks around [wagmi](https://wagmi.sh/) to simplify smart contract interactions with TypeScript autocompletion
- 🧱 **Web3 Components**: Collection of common web3 components to quickly build your frontend
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet
- 🔐 **Wallet Integration**: Connect with MetaMask, WalletConnect, email login, social login, and 700+ wallets

## Tech Stack

⚙️ Built using modern web3 technologies:

- **Frontend**: NextJS (App Router), Reown AppKit, Wagmi, Viem, TypeScript
- **Smart Contracts**: Hardhat, Solidity, PolkaVM
- **Blockchain**: Polkadot Asset Hub with PolkaVM execution environment

## Why Scaffold-DOT?

- **Polkadot Native**: Purpose-built for Polkadot's Asset Hub blockchain
- **Familiar Tools**: Uses Solidity and familiar Ethereum tooling adapted for Polkadot
- **Quick Start**: Get a full-stack dapp running in minutes
- **Production Ready**: Includes deployment tools and testnet support

## Quick Example

```bash
# Clone the repository
git clone https://github.com/scaffold-dot/scaffold-dot.git
cd scaffold-dot

# Install dependencies (downloads platform-specific binaries)
yarn install

# Start everything (node + RPC + frontend)
yarn hub

# Deploy your smart contract (in a new terminal)
yarn deploy
```

Visit `http://localhost:3000` to see your dapp!

## Useful Resources

- [Polkadot Smart Contracts Documentation](https://docs.polkadot.com/smart-contracts/overview/)
- [Scaffold-ETH 2 Documentation](https://docs.scaffoldeth.io) (compatible with Scaffold-DOT)
- [Polkadot Faucet](https://faucet.polkadot.io/?parachain=1111)

## Next Steps

- [Installation](./getting-started/installation) - Set up your development environment
- [Quick Start](./getting-started/quick-start) - Build your first dapp
- [Basic Usage](./guides/basic-usage) - Learn the fundamentals
