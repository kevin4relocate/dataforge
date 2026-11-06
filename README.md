# DataForge

Browser-based fictional data generators built with React, Vite and ExcelJS. Each tool has a dedicated URL, user-configurable parameters, previews, pagination, reset, and CSV/XLSX export.

## Current delivery: 103 functional generators

- Original 10 tools: `src/engine.js`
- 41 additional tools: `src/expansion.js`
- 52 additional tools: `src/expansion3.js`
- Categories: QA & Testing, Project Management, Finance & Accounting, Sales & Marketing, HR & Employees, Inventory & Operations, Education & Training, Data Cleaning & Validation, and Customer Support.
- Both export formats are generated from the same in-memory records.
- Automated tests cover data generation, uniqueness, formulas, CSV syntax, and cross-format value matching.

## Cloudflare Pages

Connect GitHub repository `kevin4relocate/dataforge` and select the `main` branch.

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Build command | `npm run build` |
| Build output | `dist` |
| Root | `/` |
| Node.js | 22 |

Cloudflare Pages deploys commits pushed to `main` after the repository is connected.

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

## Roadmap: 1,000 meaningful tools

The target is 1,000 tools, but **103 are currently implemented**. No placeholders should be counted as working tools.

- Milestone 150: additional QA, HR, and data-processing utilities.
- Milestone 300: financial, operations, and reporting tools plus uploaded-data workflows.
- Milestone 500: specialized industry calculators, accessibility and large-scale search.
- Milestone 1,000: all agreed categories with tested business logic and import/export parity.

Quality gate: tests and build must pass. Full end-to-end browser testing and deployment smoke checks still need to be performed before production certification.
