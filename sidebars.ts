import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/quick-start'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/basic-usage', 'guides/advanced-features'],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['api/overview'],
    },
  ],
};

export default sidebars;
