# IdeaBucket

A dark-mode, neo-brutalist directory of 1,697 venture ideas ranked from strongest to weakest.

**Live site:** https://ideabucket.blocpodcreative.chatgpt.site

## What it includes

- Complete 1–1,697 ranking with no missing entries
- Full-text search across names, categories, and concepts
- Category and verdict filters
- Rank, score, and alphabetical sorting
- Responsive pagination
- Detailed scorecards with rationale, concern, risk, strategic fit, feasibility, defensibility, distribution, buyer budget, urgency, and market size
- Source timestamps and OCR confidence metadata
- Responsive dark-mode interface

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
```

The ranked dataset is stored in `app/data/ideas.json`.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui primitives
- Vinext / Vite
