# Scaffold-DOT Documentation

Official documentation for [Scaffold-DOT](https://github.com/scaffold-dot/scaffold-dot) - an open-source toolkit for building dapps on Polkadot with Solidity smart contracts.

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens a browser at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory that can be served using any static hosting service.

## Serve Production Build

```bash
npm run serve
```

Serves the production build locally to test before deployment.

## Deployment

### GitHub Pages

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

This builds the website and pushes to the `gh-pages` branch.

### Other Hosting

The `build/` directory contains static files that can be deployed to:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3
- Any static hosting provider

## Project Structure

```
scaffold-dot-docs/
├── blog/                          # Blog posts
│   ├── authors.yml                # Author profiles
│   └── 2024-01-01-welcome.md      # Example post
├── docs/                          # Documentation
│   ├── intro.md                   # Introduction
│   ├── getting-started/
│   │   ├── installation.md
│   │   └── quick-start.md
│   ├── guides/
│   │   ├── basic-usage.md
│   │   └── advanced-features.md
│   └── api/
│       └── overview.md
├── src/
│   ├── css/
│   │   └── custom.css            # Custom styling
│   ├── pages/
│   │   ├── index.tsx             # Homepage
│   │   └── index.module.css
│   └── components/               # React components
├── static/
│   └── img/                      # Images and assets
├── docusaurus.config.ts          # Main configuration
├── sidebars.ts                   # Sidebar structure
├── tsconfig.json                 # TypeScript config
└── package.json
```

## Documentation Content

### Adding New Pages

1. Create a markdown file in `docs/` (e.g., `docs/new-page.md`)
2. Add frontmatter:
   ```markdown
   ---
   sidebar_position: 1
   ---

   # Page Title

   Content here...
   ```
3. Update `sidebars.ts` if needed

### Writing Blog Posts

1. Create a file in `blog/` with format: `YYYY-MM-DD-title.md`
2. Add frontmatter:
   ```markdown
   ---
   slug: post-slug
   title: Post Title
   authors: [author-key]
   tags: [tag1, tag2]
   ---
   ```
3. Add authors to `blog/authors.yml` if needed

## Customization

### Configuration

- **Site config**: Edit `docusaurus.config.ts`
- **Sidebar**: Edit `sidebars.ts`
- **Styling**: Edit `src/css/custom.css`
- **Homepage**: Edit `src/pages/index.tsx`

### Theme Colors

Update in `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #2e8555;
  /* ... other colors */
}
```

## Links to Update

Before deploying, update these URLs:

- [ ] `docusaurus.config.ts` - `url` and `baseUrl`
- [ ] `docusaurus.config.ts` - `editUrl` paths
- [ ] `docusaurus.config.ts` - `organizationName` and `projectName`

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-docs`)
3. Make your changes
4. Test locally (`npm start`)
5. Build to verify (`npm run build`)
6. Commit your changes (`git commit -m 'Add amazing documentation'`)
7. Push to the branch (`git push origin feature/amazing-docs`)
8. Open a Pull Request

## Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Scaffold-DOT Repository](https://github.com/scaffold-dot/scaffold-dot)
- [Polkadot Smart Contracts](https://docs.polkadot.com/smart-contracts/overview/)

## License

MIT
