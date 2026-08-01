# Ketovore Canada

A polished Next.js site for Ketovore Canada with sections for the introductory message, Rick Couchman, resources, updates, the journey, and a daily log concept.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

## Build

```bash
npm run build
```

## Cloudflare deployment

This project is set up as a standard Next.js static export and is ready to be connected to a GitHub repository and deployed through Cloudflare Pages.

### Recommended deployment flow

1. Push the repository to GitHub.
2. In Cloudflare Pages, create a new project from the GitHub repository.
3. Use the following build settings:
   - Build command: npm run build
   - Output directory: out
4. Deploy the site and connect it to the ketovorecanada.com domain.

The app is also compatible with local preview using:

```bash
npm run dev
```
