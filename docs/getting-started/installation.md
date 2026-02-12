---
sidebar_position: 1
---

# Installation

Learn how to set up Scaffold-DOT on your system.

## Prerequisites

Before installing Scaffold-DOT, make sure you have the following tools installed:

- **[Node.js](https://nodejs.org/en/download/)** (>= v20.18.3)
- **[Yarn](https://classic.yarnpkg.com/en/docs/install/)** (v1) or **[Yarn v2+](https://yarnpkg.com/getting-started/install)**
- **[Git](https://git-scm.com/downloads)**

:::info Platform Support
Scaffold-DOT currently supports Linux and macOS (x64 and ARM64). Windows is not supported at this time.
:::

## Install Scaffold-DOT

### 1. Clone the Repository

```bash
git clone https://github.com/scaffold-dot/scaffold-dot.git
cd scaffold-dot
```

### 2. Install Dependencies

```bash
yarn install
```

This command will:
- Install all Node.js dependencies
- Download the correct prebuilt Asset Hub binaries for your system
- Set up the monorepo structure

The installation script automatically detects your platform and downloads:
- `revive-dev-node`: Local Substrate node with PolkaVM support
- `eth-rpc`: Ethereum RPC compatibility layer

### 3. Verify Installation

Check that all binaries were downloaded correctly:

```bash
ls packages/asset-hub-pvm/bin/
```

You should see:
- `revive-dev-node`
- `eth-rpc`

## Project Structure

After installation, your project will have this structure:

```
scaffold-dot/
├── packages/
│   ├── hardhat/          # Smart contract development
│   ├── nextjs/           # Frontend application
│   └── asset-hub-pvm/    # Polkadot binaries
├── package.json
└── yarn.lock
```

## Troubleshooting

### Binary Download Issues

If binaries fail to download during installation:

```bash
yarn setup:binaries
```

This manually runs the binary download script.

### Permission Errors

On Linux/macOS, ensure the binaries are executable:

```bash
chmod +x packages/asset-hub-pvm/bin/*
```

### Platform Not Supported

If you receive a "platform not supported" error, your OS/architecture combination may not have prebuilt binaries. Supported platforms:
- `linux-x64`
- `darwin-x64` (macOS Intel)
- `darwin-arm64` (macOS Apple Silicon)

### Node Version Issues

Ensure you're using Node.js >= 20.18.3:

```bash
node --version
```

Use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions:

```bash
nvm install 20
nvm use 20
```

## Next Steps

Now that you have Scaffold-DOT installed, check out the [Quick Start Guide](./quick-start) to build your first dapp!
