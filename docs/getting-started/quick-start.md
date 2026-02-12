---
sidebar_position: 2
---

# Quick Start

Get your first Polkadot dapp running in just a few minutes!

## Prerequisites

Make sure you've completed the [Installation](./installation) steps before proceeding.

## Local Development Setup

### Terminal 1: Start All Services

```bash
yarn hub
```

This single command starts:
- Local Polkadot node (`revive-dev-node`)
- Ethereum RPC bridge
- NextJS frontend at **http://localhost:3000**

### Terminal 2: Deploy Your Contract

```bash
yarn deploy
```

That's it. Your dapp is running.

## What You Get

Your running dapp includes:

- 🏠 **Home Page** (`/`) - Landing page with wallet connection
- 🐛 **Debug Contracts** (`/debug`) - Interact with your deployed contracts
- 🔍 **Block Explorer** (`/blockexplorer`) - Browse blocks, transactions, and contracts
- 📝 **Example Contract** - A simple greeting contract you can modify

## Exploring the Dapp

### 1. Connect Your Wallet

Click the "Connect Wallet" button in the top right. You can:
- Use MetaMask or any WalletConnect-compatible wallet
- Sign in with email (OTP verification)
- Use social login (Google, Twitter, GitHub, etc.)

### 2. Interact with Your Contract

Navigate to the **Debug Contracts** page to:
- Read contract state (e.g., view the greeting)
- Write to the contract (e.g., set a new greeting)
- Watch contract events in real-time

### 3. Use the Burner Wallet

For quick testing, Scaffold-DOT provides a burner wallet:
- Click the faucet button in the header to fund it
- Perfect for development
- Don't use for real funds!

## Project Structure

Your dapp has this structure:

```
scaffold-dot/
├── packages/
│   ├── hardhat/
│   │   ├── contracts/              # Your Solidity contracts
│   │   │   └── YourContract.sol
│   │   ├── ignition/modules/       # Deployment scripts
│   │   │   └── YourContract.ts
│   │   ├── test/                   # Contract tests
│   │   └── hardhat.config.ts       # Hardhat configuration
│   │
│   ├── nextjs/
│   │   ├── app/                    # NextJS pages (App Router)
│   │   ├── components/             # React components
│   │   ├── contracts/              # Generated contract ABIs
│   │   ├── hooks/                  # Custom React hooks
│   │   └── scaffold.config.ts      # Frontend configuration
│   │
│   └── asset-hub-pvm/
│       └── bin/                    # Polkadot binaries
```

## Making Changes

### Modify Your Smart Contract

1. Edit `packages/hardhat/contracts/YourContract.sol`
2. Save the file
3. In Terminal 3, redeploy:
   ```bash
   yarn deploy
   ```
4. Your frontend automatically updates with the new contract!

### Customize the Frontend

1. Edit pages in `packages/nextjs/app/`
2. Use components from `packages/nextjs/components/scaffold-eth/`
3. Leverage hooks from `packages/nextjs/hooks/scaffold-eth/`
4. Changes hot-reload automatically

## Next Steps

- Read [Basic Usage](../guides/basic-usage) to learn about development workflows
- Explore [Advanced Features](../guides/advanced-features) for customization
- Check the [API Reference](../api/overview) for detailed documentation
- Review [Scaffold-ETH 2 docs](https://docs.scaffoldeth.io) for additional guides (most features are compatible)
