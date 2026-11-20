# DevTechSoft — Enterprise Software Development Studio
> **Engineering Digital Experiences. Automating What's Next.**

DevTechSoft is an independent, solo-founded software engineering studio delivering high-performance digital solutions, enterprise automation, and modern AI systems for businesses, startups, and enterprise clients.

---

## Strategic Positioning & Credibility

DevTechSoft is intentionally positioned as a focused, senior-led software studio rather than a fictitious large agency:
- **Direct Architect Collaboration:** Clients work directly with the senior full-stack architect and enterprise automation consultant who designs, codes, tests, and deploys the solution.
- **No Fictitious Claims:** Zero fabricated client logos, fake revenue figures, or synthetic review scores.
- **Proof of Capability:** The portfolio features **six fully working, interactive demonstration applications** engineered with real relational state, form validation, workflow state machines, and data visualization, plus live commercial product showcase.

---

## Live Demonstration Applications & Featured Products

Every demo is accessible via direct routing and retains local state via browser storage:

| Service Practice | Demonstration Platform | Route | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **Power Platform** | **BusinessFlow 360** | `/demo/powerapps-crm` | Low-code Dataverse CRM, customer directory, lead pipeline (Kanban), multi-tier approval workflows, Power BI charts, CSV export. |
| **ServiceNow Solutions** | **ServiceOps 360** | `/demo/servicenow` | ITIL v4 ITSM workspace: incident triage & state machine, root-cause problem records, change management (CAB), interactive service catalog (RITMs), and SLA breach monitor. |
| **AI & Agentic Automation** | **NexaAI** | `/demo/ai-agent` | LangGraph agent workspace, RAG vector document search, deterministic tool calling (`ticket_lookup`, `customer_profile_lookup`), reasoning trace graphs, dual-mode (mock adapter or custom OpenAI key). |
| **Data Engineering** | **DataPulse** | `/demo/data-engineering` | Lakehouse control room: Medallion architecture (Bronze -> Silver -> Gold), live ADF pipeline triggers, PySpark logs viewer, automated Great Expectations quality rules, CSV export/upload. |
| **Full-Stack Systems** | **BizCore** | `/demo/fullstack` | Dual-mode platform: Customer Storefront (catalog, interactive cart, coupon code `DEVTECH10`, checkout simulation) & Admin Operations (inventory alerts, quick restock, sales reports). |
| **Frontend Engineering** | **VistaDash** | `/demo/frontend` | High-density enterprise SaaS dashboard: collapsible sidebar, dark/light theme switcher, time-series area charts, notification drawer, high-density sortable data grid. |
| **Digital Products** | **PromptImageLab** | `https://promptimagelab.com/` | Independent AI-focused digital platform designed to make AI prompting, learning, and productivity tools more accessible. |

---

## Website Route Architecture

### Public Website Routes
- `/` — Homepage with interactive hero, 6 service cards, PromptImageLab showcase, featured projects, engineering methodology, technology stack, and FAQs.
- `/about` — Studio introduction, founder profile, and engineering philosophy.
- `/services` — Services directory and technology filters.
- `/services/power-platform` — Dedicated Power Platform service page.
- `/services/servicenow` — Dedicated ServiceNow ITSM service page.
- `/services/ai-automation` — Dedicated AI & Agentic Automation service page.
- `/services/data-engineering` — Dedicated Data Engineering & Lakehouse service page.
- `/services/full-stack` — Dedicated Full-Stack Web Development service page.
- `/services/frontend` — Dedicated High-Performance Frontend service page.
- `/projects` — Project directory with category filtering (including Digital Products) and keyword search.
- `/projects/powerapps-crm` — BusinessFlow 360 architectural case study.
- `/projects/servicenow-incident` — ServiceOps 360 architectural case study.
- `/projects/ai-support-agent` — NexaAI architectural case study.
- `/projects/data-analytics` — DataPulse architectural case study.
- `/projects/business-management` — BizCore architectural case study.
- `/projects/frontend-dashboard` — VistaDash architectural case study.
- `/projects/promptimagelab` — PromptImageLab digital product case study.
- `/contact` — Lead generation form with input validation, honeypot spam protection, and inquiry clipboard copy.
- `/privacy` — Privacy policy and data storage transparency.
- `/terms` — Terms of service and demonstration disclaimers.
- `/*` — Custom 404 page with return paths.

---

## Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling & UI:** Tailwind CSS v4 + Inter & Manrope Fonts + JetBrains Mono
- **Motion:** Framer Motion
- **Icons:** Lucide React (standard enterprise line icons)
- **Data Visualization:** Recharts (Area, Bar, Pie, Sparklines)
- **Routing:** React Router v7 with single-page app (SPA) fallback rules
- **State & Persistence:** Custom reactive domain stores with browser `localStorage` engine

---

## Local Development Setup

### 1. Prerequisites
- Node.js >= 18.0.0 (v20+ recommended)
- npm >= 9.0.0

### 2. Installation
```bash
git clone https://github.com/devtechsoft/devtechsoft-portfolio.git
cd devtechsoft-portfolio
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized static build will be generated in `/dist`.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## Production Deployment

The project is pre-configured with SPA rewrite rules for all major hosting providers:

### Option A: Cloudflare Pages
1. Link your Git repository to Cloudflare Pages.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Routing: Handled automatically by `public/_redirects`.

### Option B: Vercel
1. Run `vercel` or connect through Vercel Dashboard.
2. The included `vercel.json` ensures direct route refreshes resolve to `/index.html`.

### Option C: Netlify
1. Connect repository in Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `public/_redirects` ensures proper 200 HTTP rewrite for all sub-routes.

---

## License & Intellectual Property

&copy; 2026 DevTechSoft. All rights reserved.
Demonstrations represent architectural prototypes engineered by DevTechSoft.
Client contracts receive 100% intellectual property transfer upon milestone completion.
