---
sidebar_position: 1
---

# Basic Usage

Learn the fundamental workflows for developing with Scaffold-DOT.

## Development Workflow

### Starting Development

Always start these services in order:

```bash
# Terminal 1: Blockchain node
yarn chain

# Terminal 2: Ethereum RPC bridge
yarn rpc

# Terminal 3: Deploy contracts
yarn deploy

# Terminal 4: Frontend
yarn start
```

:::tip Quick Start All Services
Use the `hub` command to start all services at once:
```bash
yarn hub
```
This runs chain, rpc, and frontend concurrently with proper wait times.
:::

### Making Contract Changes

The typical development cycle:

1. **Edit Contract**: Modify `packages/hardhat/contracts/YourContract.sol`
2. **Redeploy**: Run `yarn deploy` in Terminal 3
3. **Auto-Update**: Frontend automatically reloads with new contract ABI

Example contract modification:

```solidity
// packages/hardhat/contracts/YourContract.sol
contract YourContract {
    string public greeting = "Hello Polkadot!";

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
```

## Working with Smart Contracts

### Contract Development

Contracts are located in `packages/hardhat/contracts/`:

```bash
# Compile contracts
yarn compile

# Run tests
yarn test

# Clean build artifacts
yarn hardhat:clean
```

### Deployment

Scaffold-DOT uses **Hardhat Ignition** for deployments (not hardhat-deploy).

Create deployment modules in `packages/hardhat/ignition/modules/`:

```typescript
// packages/hardhat/ignition/modules/YourContract.ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const YourContractModule = buildModule("YourContractModule", (m) => {
  const yourContract = m.contract("YourContract", ["Hello Polkadot!"]);
  return { yourContract };
});

export default YourContractModule;
```

Deploy to different networks:

```bash
# Local network (default)
yarn deploy

# Paseo testnet
yarn deploy --network passetHub

# Kusama Asset Hub
yarn deploy --network kusamaHub
```

### Testing Contracts

Write tests in `packages/hardhat/test/`:

```typescript
import { expect } from "chai";
import { ethers } from "hardhat";

describe("YourContract", function () {
  it("Should set the greeting", async function () {
    const YourContract = await ethers.getContractFactory("YourContract");
    const contract = await YourContract.deploy("Hello");

    await contract.setGreeting("Bonjour");
    expect(await contract.greeting()).to.equal("Bonjour");
  });
});
```

Run tests:

```bash
yarn test
```

## Frontend Development

### Using Scaffold-ETH Hooks

**Always use these hooks** for contract interactions. They provide TypeScript autocompletion and automatic ABI handling.

#### Reading Contract Data

```tsx
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

function MyComponent() {
  const { data: greeting } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "greeting",
  });

  return <div>Greeting: {greeting}</div>;
}
```

#### Writing to Contracts

```tsx
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { parseEther } from "viem";

function MyComponent() {
  const { writeContractAsync } = useScaffoldWriteContract({
    contractName: "YourContract",
  });

  const handleSetGreeting = async () => {
    try {
      await writeContractAsync({
        functionName: "setGreeting",
        args: ["Hello Scaffold-DOT!"],
        value: parseEther("0.01"), // For payable functions
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={handleSetGreeting}>Set Greeting</button>;
}
```

#### Watching Contract Events

```tsx
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

function EventLog() {
  const { data: events } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChanged",
    fromBlock: 0n,
  });

  return (
    <div>
      {events?.map((event, i) => (
        <div key={i}>{event.args.greeting}</div>
      ))}
    </div>
  );
}
```

### Using Web3 Components

Scaffold-DOT provides pre-built components for common web3 UI patterns:

#### Address Display

```tsx
import { Address } from "~~/components/scaffold-eth";

<Address address="0x..." />
```

#### Address Input

```tsx
import { AddressInput } from "~~/components/scaffold-eth";

const [address, setAddress] = useState("");

<AddressInput value={address} onChange={setAddress} />
```

#### Balance Display

```tsx
import { Balance } from "~~/components/scaffold-eth";

<Balance address="0x..." />
```

#### Ether Input

```tsx
import { EtherInput } from "~~/components/scaffold-eth";

const [amount, setAmount] = useState("");

<EtherInput value={amount} onChange={setAmount} />
```

#### Faucet Button

```tsx
import { FaucetButton } from "~~/components/scaffold-eth";

<FaucetButton />
```

### Accessing Contract Information

Get deployed contract details:

```tsx
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

const { data: contractInfo } = useDeployedContractInfo("YourContract");
// Returns: { address, abi }
```

## Configuration

### Network Configuration

Configure networks in `packages/hardhat/hardhat.config.ts`:

```typescript
const config: HardhatUserConfig = {
  defaultNetwork: "localNode",
  networks: {
    localNode: {
      url: "http://127.0.0.1:8545",
      chainId: 420420420,
      polkavm: true,
    },
    passetHub: {
      url: "https://paseo-asset-hub-eth-rpc.polkadot.io",
      chainId: 420420422,
      polkavm: true,
    },
  },
};
```

### Frontend Configuration

Configure the frontend in `packages/nextjs/scaffold.config.ts`:

```typescript
const scaffoldConfig = {
  targetNetworks: [chains.localNode],
  walletConnectProjectId: "your-project-id",

  // Wallet connection mode
  walletAutoConnect: true,

  // Burner wallet settings
  onlyLocalBurnerWallet: true,
};
```

## Common Commands Reference

```bash
# Development
yarn chain              # Start local node
yarn rpc               # Start RPC server
yarn deploy            # Deploy contracts
yarn start             # Start frontend
yarn hub               # Start all services

# Smart Contracts
yarn compile           # Compile contracts
yarn test              # Run contract tests
yarn hardhat:clean     # Clean build artifacts

# Account Management
yarn generate          # Generate new account
yarn account           # View account details
yarn fund              # Fund account on testnet

# Code Quality
yarn lint              # Lint all packages
yarn format            # Format code
yarn hardhat:check-types  # Type check contracts
yarn next:check-types     # Type check frontend
```

## Next Steps

- Explore [Advanced Features](./advanced-features) for deployment and customization
- Check the [API Reference](../api/overview) for detailed documentation
- Visit [Scaffold-ETH 2 docs](https://docs.scaffoldeth.io) for additional guides
