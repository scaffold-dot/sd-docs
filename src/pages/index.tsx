import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started 🚀
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="https://github.com/scaffold-dot/scaffold-dot"
            style={{ marginLeft: '1rem' }}>
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Open-source toolkit for building dapps on Polkadot with Solidity">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🚀 Quick Start</Heading>
                  <p>
                    Get a full-stack dapp running on Polkadot in minutes. Deploy
                    Solidity contracts and build UIs with familiar web3 tools.
                  </p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">⚡ Contract Hot Reload</Heading>
                  <p>
                    Your frontend automatically adapts to smart contract changes.
                    Edit, deploy, and see updates instantly with TypeScript support.
                  </p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🔧 Modern Tooling</Heading>
                  <p>
                    Built on NextJS, Hardhat, Wagmi, and Viem. Write Solidity for
                    Polkadot's PolkaVM with familiar Ethereum tooling.
                  </p>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: '2rem' }}>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🪝 Custom Hooks</Heading>
                  <p>
                    React hooks for reading/writing contracts, watching events,
                    and managing transactions with full TypeScript autocompletion.
                  </p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🔐 Wallet Integration</Heading>
                  <p>
                    Connect with MetaMask, WalletConnect, email login, social auth,
                    and 700+ wallets. Burner wallet for quick testing.
                  </p>
                </div>
              </div>
              <div className={clsx('col col--4')}>
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">🧱 Web3 Components</Heading>
                  <p>
                    Pre-built UI components for addresses, balances, inputs, and
                    more. Focus on your dapp logic, not boilerplate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ padding: '2rem 0', textAlign: 'center', background: 'var(--ifm-color-emphasis-100)' }}>
          <div className="container">
            <Heading as="h2">Built for Polkadot Developers</Heading>
            <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '1rem auto' }}>
              Scaffold-DOT is a fork of Scaffold-ETH 2, adapted for Polkadot's Asset Hub using PolkaVM.
              Write Solidity smart contracts and deploy them to Polkadot with the same developer experience
              you know from Ethereum.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started/installation">
                Install Now
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                to="https://docs.polkadot.com/smart-contracts/overview/"
                style={{ marginLeft: '1rem' }}>
                Polkadot Smart Contracts Docs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
