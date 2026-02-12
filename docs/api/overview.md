---
sidebar_position: 1
---

# API Reference

Complete reference for Scaffold-DOT commands and configuration.

## Yarn Commands

### Development Commands

| Command | Description |
|---------|-------------|
| `yarn chain` | Start local Substrate node with PolkaVM support |
| `yarn rpc` | Start Ethereum RPC compatibility server |
| `yarn deploy` | Deploy smart contracts to configured network |
| `yarn start` | Start NextJS development server |
| `yarn hub` | Start all services (chain, rpc, frontend) concurrently |

### Smart Contract Commands

| Command | Description |
|---------|-------------|
| `yarn compile` | Compile Solidity contracts with resolc |
| `yarn test` | Run Hardhat contract tests with gas reporting |
| `yarn hardhat:clean` | Clean build artifacts |
| `yarn hardhat:flatten` | Flatten contract for verification |
| `yarn hardhat:verify` | Verify contract on block explorer |

### Account Management Commands

| Command | Description |
|---------|-------------|
| `yarn generate` | Generate new encrypted account (interactive) |
| `yarn account` | Display account details and balances |
| `yarn account:import` | Import existing private key (interactive) |
| `yarn account:reveal-pk` | Reveal encrypted private key (requires password) |
| `yarn fund` | Fund account on testnet via faucet |

### Build Commands

| Command | Description |
|---------|-------------|
| `yarn next:build` | Build NextJS for production |
| `yarn next:serve` | Serve production build locally |
| `yarn build` | Build Polkadot binaries (alias for polkadot:build) |

### Code Quality Commands

| Command | Description |
|---------|-------------|
| `yarn lint` | Lint all packages (frontend + contracts) |
| `yarn format` | Format code with Prettier |
| `yarn hardhat:check-types` | Type-check Hardhat package |
| `yarn next:check-types` | Type-check NextJS package |

### Deployment Commands

| Command | Description |
|---------|-------------|
| `yarn deploy` | Deploy to default network (localNode) |
| `yarn deploy --network passetHub` | Deploy to Paseo testnet |
| `yarn deploy --network kusamaHub` | Deploy to Kusama Asset Hub |
| `yarn vercel` | Deploy frontend to Vercel |
| `yarn ipfs` | Deploy frontend to IPFS |

## Configuration Files

### hardhat.config.ts

Main Hardhat configuration file.

**Location:** `packages/hardhat/hardhat.config.ts`

**Key Settings:**

```typescript
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  // Solidity compiler version
  solidity: {
    version: "0.8.28",
    settings: {
      evmVersion: "cancun",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  // PolkaVM compiler settings
  resolc: {
    compilerSource: "npm",
    version: "latest",
  },

  // Default network
  defaultNetwork: "localNode",

  // Network configurations
  networks: {
    localNode: {
      url: "http://127.0.0.1:8545",
      chainId: 420420420,
      polkavm: true, // Required!
      accounts: [getEncryptedAccount()],
    },
    passetHub: {
      url: "https://paseo-asset-hub-eth-rpc.polkadot.io",
      chainId: 420420422,
      polkavm: true,
      accounts: [getEncryptedAccount()],
    },
    kusamaHub: {
      url: "https://kusama-asset-hub-eth-rpc.polkadot.io",
      chainId: 420420418,
      polkavm: true,
      accounts: [getEncryptedAccount()],
    },
  },

  // Gas reporter for tests
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
};
```

**Network Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | string | ✓ | RPC endpoint URL |
| `chainId` | number | ✓ | Network chain ID |
| `polkavm` | boolean | ✓ | Must be `true` for PolkaVM networks |
| `accounts` | array | - | Account private keys or getEncryptedAccount() |

### scaffold.config.ts

Frontend configuration file.

**Location:** `packages/nextjs/scaffold.config.ts`

**Configuration Options:**

```typescript
import { ScaffoldConfig } from "~~/utils/scaffold-eth/contract";
import { localNode, passetHub, kusamaHub } from "./utils/scaffold-eth/chains";

const scaffoldConfig = {
  // Networks your frontend will support
  targetNetworks: [localNode],

  // Whether to display connection status
  showNetworkIndicator: true,

  // WalletConnect project ID (get from https://cloud.walletconnect.com)
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,

  // Auto-connect to previous wallet
  walletAutoConnect: true,

  // Only use burner wallet on local network
  onlyLocalBurnerWallet: true,

  // Wallet provider: "appkit" or "rainbowkit"
  walletProvider: "appkit",

  // Block explorer API key for contract verification
  etherscanApiKey: process.env.ETHERSCAN_API_KEY,
} as const satisfies ScaffoldConfig;
```

**Chain Definitions:**

```typescript
import { defineChain } from "viem";

export const localNode = defineChain({
  id: 420420420,
  name: "Local Revive Node",
  nativeCurrency: {
    decimals: 18,
    name: "DOT",
    symbol: "DOT",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
  blockExplorers: {
    default: {
      name: "Local Explorer",
      url: "http://localhost:3000/blockexplorer",
    },
  },
});
```

### Deployment Configuration

**Ignition Module Format:**

**Location:** `packages/hardhat/ignition/modules/YourContract.ts`

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const YourContractModule = buildModule("YourContractModule", (m) => {
  // Define parameters
  const greeting = m.getParameter("greeting", "Hello Polkadot!");

  // Deploy contract
  const yourContract = m.contract("YourContract", [greeting]);

  // Return deployed contract
  return { yourContract };
});

export default YourContractModule;
```

**Deployment with Parameters:**

```typescript
// Define default parameters
const YourContractModule = buildModule("YourContractModule", (m) => {
  const owner = m.getParameter("owner", m.getAccount(0));
  const initialSupply = m.getParameter("initialSupply", 1000000n);

  const token = m.contract("Token", [owner, initialSupply]);

  return { token };
});
```

## Environment Variables

### Hardhat Environment Variables

**File:** `packages/hardhat/.env` (gitignored)

```bash
# Encrypted account private key (generated by yarn generate)
ENCRYPTED_PRIVATE_KEY=...

# Password used for encryption (DO NOT commit)
ENCRYPTION_PASSWORD=...

# Optional: Block explorer API key
ETHERSCAN_API_KEY=...
```

### NextJS Environment Variables

**File:** `packages/nextjs/.env.local` (gitignored)

```bash
# Required: WalletConnect project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=...

# Optional: RPC provider API keys
NEXT_PUBLIC_ALCHEMY_API_KEY=...
NEXT_PUBLIC_INFURA_API_KEY=...
```

**Public Variables:**
- Must be prefixed with `NEXT_PUBLIC_` to be accessible in browser
- Used in `scaffold.config.ts`

**Server-Only Variables:**
- No prefix needed
- Only accessible in server-side code

## Contract Hooks API

### useScaffoldReadContract

Read data from smart contracts.

```typescript
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const { data, isLoading, error, refetch } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "greeting",
  args: [], // Optional: function arguments
  watch: true, // Optional: auto-refresh on new blocks
});
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contractName` | string | ✓ | Name of deployed contract |
| `functionName` | string | ✓ | Contract function to call |
| `args` | array | - | Function arguments |
| `watch` | boolean | - | Auto-refresh on new blocks (default: false) |

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `data` | any | Function return value |
| `isLoading` | boolean | Loading state |
| `error` | Error \| null | Error if call failed |
| `refetch` | function | Manually refetch data |

### useScaffoldWriteContract

Write data to smart contracts.

```typescript
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { parseEther } from "viem";

const { writeContractAsync, isPending } = useScaffoldWriteContract({
  contractName: "YourContract",
});

// Call the function
await writeContractAsync({
  functionName: "setGreeting",
  args: ["Hello Polkadot!"],
  value: parseEther("0.01"), // For payable functions
});
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contractName` | string | ✓ | Name of deployed contract |

**Write Function Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `functionName` | string | ✓ | Contract function to call |
| `args` | array | - | Function arguments |
| `value` | bigint | - | ETH/DOT to send (payable functions) |

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `writeContractAsync` | function | Execute transaction (async) |
| `isPending` | boolean | Transaction pending state |

### useScaffoldEventHistory

Get historical contract events.

```typescript
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const { data: events, isLoading } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "GreetingChanged",
  fromBlock: 0n,
  toBlock: "latest",
  watch: true,
});
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contractName` | string | ✓ | Name of deployed contract |
| `eventName` | string | ✓ | Event to watch |
| `fromBlock` | bigint | - | Start block (default: 0) |
| `toBlock` | bigint \| "latest" | - | End block (default: "latest") |
| `watch` | boolean | - | Watch for new events (default: false) |

## Component API

### Address

Display Ethereum/Polkadot addresses.

```tsx
import { Address } from "~~/components/scaffold-eth";

<Address address="0x..." />
<Address address="0x..." disableAddressLink />
<Address address="0x..." format="short" />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | string | - | Address to display |
| `disableAddressLink` | boolean | false | Disable block explorer link |
| `format` | "short" \| "long" | "short" | Display format |
| `size` | "xs" \| "sm" \| "base" \| "lg" \| "xl" | "base" | Font size |

### AddressInput

Input field for Ethereum/Polkadot addresses.

```tsx
import { AddressInput } from "~~/components/scaffold-eth";

const [address, setAddress] = useState("");

<AddressInput
  value={address}
  onChange={setAddress}
  placeholder="Enter address"
/>
```

### Balance

Display account balance.

```tsx
import { Balance } from "~~/components/scaffold-eth";

<Balance address="0x..." />
<Balance address="0x..." className="text-xl" />
```

### EtherInput

Input field with ETH/USD conversion.

```tsx
import { EtherInput } from "~~/components/scaffold-eth";

const [amount, setAmount] = useState("");

<EtherInput
  value={amount}
  onChange={setAmount}
  placeholder="Amount in DOT"
/>
```

## Gas Configuration

PolkaVM uses a **fixed fee model**:

```typescript
// packages/nextjs/scaffold.config.ts
export const LOCAL_CHAIN_GAS_CONFIG = {
  gasLimit: 1000000n,
  gasPriceMultiplier: 25000,
};
```

**Formula:** `gasLimit × gasPrice ≥ fixed_fee` (≈22 billion wei)

## Exit Codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 1 | General error |
| 128 + N | Fatal error signal N |

## Next Steps

- Review [Basic Usage](../guides/basic-usage) for practical examples
- Explore [Advanced Features](../guides/advanced-features) for deployment guides
- Check [Polkadot Smart Contracts Docs](https://docs.polkadot.com/smart-contracts/overview/)
