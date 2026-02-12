---
sidebar_position: 2
---

# Advanced Features

Explore advanced capabilities including deployment, account management, and Polkadot-specific features.

## Account Management

### Generating a Deployment Account

For testnet/mainnet deployments, generate an encrypted account:

```bash
yarn generate
```

This creates an encrypted private key stored in `packages/hardhat/.env`. You'll be prompted to:
1. Enter a password (used for encryption)
2. Confirm the password

The account details are displayed including:
- Public address
- Mnemonic phrase (write this down!)

:::warning Security
- **Never commit** your `.env` file
- **Store your mnemonic** securely offline
- **Use different accounts** for development and production
:::

### Viewing Account Details

```bash
yarn account
```

Shows:
- Address
- Balance on all configured networks
- Network connection status

### Importing an Existing Account

Import a private key:

```bash
yarn account:import
```

You'll be prompted for:
- Your private key
- A password to encrypt it

### Revealing Private Key

If you need to export your encrypted private key:

```bash
yarn account:reveal-pk
```

Enter your password when prompted.

## Deploying to Testnets

### 1. Prepare Your Account

```bash
# Generate account
yarn generate

# Check balance
yarn account
```

### 2. Fund Your Account

Get testnet funds from the [Polkadot Faucet](https://faucet.polkadot.io/?parachain=1111).

Verify funding:

```bash
yarn account
```

### 3. Configure Network

Update `packages/hardhat/hardhat.config.ts`:

```typescript
const config: HardhatUserConfig = {
  defaultNetwork: "passetHub", // Change to your target network
  // ... rest of config
};
```

**Or** specify network in deploy command:

```bash
yarn deploy --network passetHub
```

### 4. Update Frontend Configuration

Edit `packages/nextjs/scaffold.config.ts`:

```typescript
import { passetHub } from "./utils/scaffold-eth/chains";

const scaffoldConfig = {
  targetNetworks: [passetHub], // Match your deployment network
  // ... rest of config
};
```

### 5. Deploy

```bash
yarn deploy --network passetHub
```

Enter your password when prompted. Deployment confirmation prints to console.

### 6. Verify Deployment

Your frontend automatically connects to the deployed contract on the configured network.

## Network Configuration

### Available Networks

Scaffold-DOT supports these networks out of the box:

| Network | Chain ID | RPC URL | Type |
|---------|----------|---------|------|
| localNode | 420420420 | http://127.0.0.1:8545 | Local Dev |
| Polkadot Hub TestNet | 420420417 | https://eth-rpc-testnet.polkadot.io | Testnet |
| Polkadot Hub | 420420419 | https://eth-rpc.polkadot.io | Mainnet |
| Kusama Hub | 420420418 | https://eth-rpc-kusama.polkadot.io | Mainnet |

### Adding Custom Networks

Define custom networks in both config files:

**hardhat.config.ts:**

```typescript
networks: {
  myCustomNetwork: {
    url: "https://rpc.example.com",
    chainId: 12345,
    polkavm: true, // Required for PolkaVM networks
    accounts: [getEncryptedAccount()],
  },
}
```

**scaffold.config.ts:**

```typescript
import { defineChain } from "viem";

export const myCustomNetwork = defineChain({
  id: 12345,
  name: "My Custom Network",
  nativeCurrency: {
    decimals: 18,
    name: "DOT",
    symbol: "DOT",
  },
  rpcUrls: {
    default: { http: ["https://rpc.example.com"] },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.example.com",
    },
  },
});
```

## Wallet Configuration

### Wallet Connection Options

Configure in `packages/nextjs/scaffold.config.ts`:

```typescript
const scaffoldConfig = {
  // Traditional wallets (MetaMask, WalletConnect, etc.)
  walletAutoConnect: true,

  // Only use burner wallet on local network
  onlyLocalBurnerWallet: true,

  // Wallet provider (appkit or rainbowkit)
  walletProvider: "appkit",
};
```

### Email & Social Login

Scaffold-DOT supports email and social login via **Reown AppKit** (default):

**Supported Methods:**
- 📧 Email (OTP verification)
- 🔵 Google
- 🐦 X (Twitter)
- 💻 GitHub
- 💬 Discord
- 🍎 Apple
- 📘 Facebook
- 🟪 Farcaster

Email and social logins are **enabled by default** when using AppKit.

### Advanced Wallet Providers

For advanced use cases:

- **[Privy](https://www.privy.io/)**: Embedded wallets with MPC security
- **[Web3Auth](https://web3auth.io/)**: Advanced authentication flows

Configure provider in `packages/nextjs/scaffold.config.ts`.

## PolkaVM-Specific Features

### Gas Configuration

PolkaVM uses a **fixed fee model**, unlike Ethereum's dynamic gas:

```typescript
// packages/nextjs/scaffold.config.ts
export const LOCAL_CHAIN_GAS_CONFIG = {
  gasLimit: 1000000n,
  gasPriceMultiplier: 25000,
};
```

The formula: `gasLimit × gasPrice ≥ fixed_fee` (≈22 billion wei)

### Compiler Configuration

Scaffold-DOT uses **resolc** (PolkaVM Solidity compiler):

```typescript
// packages/hardhat/hardhat.config.ts
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      evmVersion: "cancun",
    },
  },
  resolc: {
    compilerSource: "npm", // Uses resolc from npm
  },
};
```

## Contract Hot Reload

Scaffold-DOT automatically updates your frontend when contracts change:

1. Edit contract
2. Run `yarn deploy`
3. Frontend detects new ABI
4. TypeScript types update
5. UI reflects changes

This is powered by:
- **generateTsAbis.ts**: Converts ABIs to TypeScript
- **deployedContracts.ts**: Auto-generated contract definitions
- **TypeChain**: Generates contract types

## External Contracts

Interact with contracts not deployed by Scaffold-DOT:

```typescript
// packages/nextjs/contracts/externalContracts.ts
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
  420420422: { // Paseo Asset Hub
    MyExternalContract: {
      address: "0x...",
      abi: [...],
    },
  },
} as const satisfies GenericContractsDeclaration;

export default externalContracts;
```

Use with hooks:

```tsx
const { data } = useScaffoldReadContract({
  contractName: "MyExternalContract",
  functionName: "someFunction",
});
```

## Testing

### Writing Tests

```typescript
// packages/hardhat/test/YourContract.test.ts
import { expect } from "chai";
import { ethers } from "hardhat";
import { YourContract } from "../typechain-types";

describe("YourContract", function () {
  let contract: YourContract;

  beforeEach(async function () {
    const YourContractFactory = await ethers.getContractFactory("YourContract");
    contract = await YourContractFactory.deploy("Hello");
    await contract.waitForDeployment();
  });

  it("Should deploy with correct greeting", async function () {
    expect(await contract.greeting()).to.equal("Hello");
  });

  it("Should update greeting", async function () {
    await contract.setGreeting("Bonjour");
    expect(await contract.greeting()).to.equal("Bonjour");
  });
});
```

### Running Tests

```bash
# Run all tests
yarn test

# Run specific test file
yarn hardhat:test test/YourContract.test.ts

# Run with gas reporting
yarn test
```

## Production Deployment

### Best Practices

1. **Use Separate Accounts**: Different accounts for dev/staging/prod
2. **Test Thoroughly**: Deploy to testnet first
3. **Verify Contracts**: Use block explorer verification
4. **Monitor Deployment**: Check transaction status
5. **Update Frontend**: Ensure frontend points to correct network

### Environment Variables

Never commit sensitive data. Use `.env` files:

```bash
# packages/hardhat/.env (gitignored)
ENCRYPTED_PRIVATE_KEY=...
ENCRYPTION_PASSWORD=...

# packages/nextjs/.env.local (gitignored)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=...
```

### CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Deploy to Testnet
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: yarn install
      - name: Deploy contracts
        run: yarn deploy --network passetHub
        env:
          ENCRYPTION_PASSWORD: ${{ secrets.ENCRYPTION_PASSWORD }}
```

## Performance Optimization

### Frontend Optimization

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // ... component logic
});

// Debounce contract reads
import { useDebounce } from "use-debounce";

const [input, setInput] = useState("");
const [debouncedInput] = useDebounce(input, 500);

const { data } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "search",
  args: [debouncedInput],
});
```

### Contract Optimization

- Use `memory` instead of `storage` when possible
- Minimize state variables
- Batch operations
- Use events for historical data

## Troubleshooting

### Common Issues

**Contract Hot Reload Not Working:**
- Ensure `yarn deploy` completes successfully
- Check `packages/nextjs/contracts/deployedContracts.ts` updated
- Restart NextJS dev server

**Transaction Fails:**
- Check gas configuration (PolkaVM fixed fee)
- Verify account has sufficient balance
- Ensure contract function is `public` or `external`

**Type Errors:**
- Run `yarn compile` to regenerate types
- Check TypeChain types in `packages/hardhat/typechain-types/`

## Next Steps

- Review the [API Reference](../api/overview) for complete command documentation
- Check [Polkadot Smart Contracts Docs](https://docs.polkadot.com/smart-contracts/overview/)
- Join the Scaffold-DOT community for support
