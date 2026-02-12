import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Scaffold-DOT',
  tagline: 'Build dapps on Polkadot with Solidity smart contracts',
  favicon: 'img/favicon.ico',

  url: 'https://scaffold-dot.github.io',
  baseUrl: '/',

  organizationName: 'scaffold-dot',
  projectName: 'scaffold-dot',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/scaffold-dot/scaffold-dot-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/scaffold-dot/scaffold-dot-docs/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Scaffold-DOT',
      logo: {
        alt: 'Scaffold-DOT Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://docs.polkadot.com/smart-contracts/overview/',
          label: 'Polkadot Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/scaffold-dot/scaffold-dot',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Installation',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Quick Start',
              to: '/docs/getting-started/quick-start',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Polkadot Smart Contracts',
              href: 'https://docs.polkadot.com/smart-contracts/overview/',
            },
            {
              label: 'Scaffold-ETH 2 Docs',
              href: 'https://docs.scaffoldeth.io',
            },
            {
              label: 'Polkadot Faucet',
              href: 'https://faucet.polkadot.io/?parachain=1111',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/scaffold-dot/scaffold-dot',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Scaffold-DOT. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
