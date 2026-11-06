# DataForge

Browser-based fictional data generators built with React, Vite and ExcelJS. Each tool has a dedicated URL, user-configurable parameters, previews, pagination, reset, and CSV/XLSX export.

## Current delivery: 300 functional generators

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

## Synthetic-only identity policy

DataForge **does not generate realistic personal identities**. The central policy in `src/safeSamples.js` applies to **every generated dataset before preview and before either export**:

- People: `Example David 000001`, `First Example 000002`, `Sample Alex 000003` and similarly explicit sample names.
- Phone numbers: repeated-digit non-dialable placeholders such as `000000000`, `111111111`, `222222222` (cycled).
- Addresses: generic fictional placeholders such as `123 ABC Street, Sample District, 00000, USA`.
- Email: the reserved documentation-only `example.com` domain, e.g. `example000001@example.com`.
- Company, customer and supplier names: `Example Customer 000001`-style entries.

The Sample Contact Data Generator provides these fields together. The existing Phone Number Normalization tool intentionally marks these non-dialable placeholders as invalid rather than claiming valid E.164 contact numbers. The policy transforms **generated data only**; it must not be relied on to anonymize a user-uploaded dataset. No outputs should be used as real contact details.

## Roadmap: 1,000 meaningful tools

The target is 1,000 tools, but **300 are currently implemented**. No placeholders should be counted as working tools.

- Milestone 150: completed — additional QA, HR and data-processing utilities.
- Milestone 200: completed — calculation and report generators across major business functions.
- Milestone 300: 300 generators and calculators implemented; CSV upload processing remains a future enhancement.
- Milestone 500: specialized industry calculators, accessibility and large-scale search.
- Milestone 1,000: all agreed categories with tested business logic and import/export parity.

Quality gate: tests and build must pass. Full end-to-end browser testing and deployment smoke checks still need to be performed before production certification.
