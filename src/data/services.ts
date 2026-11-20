import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'power-platform',
    slug: 'power-platform',
    title: 'Power Platform Development',
    shortDesc: 'Automate enterprise workflows, modernize legacy forms, and deploy secure business applications on Microsoft Dataverse & Power Apps.',
    fullDesc: 'DevTechSoft crafts bespoke Microsoft Power Platform ecosystems designed to eliminate paper-based processes, connect disparate data silos, and enforce enterprise governance. We specialize in custom Canvas & Model-Driven apps, multi-stage Power Automate cloud flows, and rich embedded Power BI telemetry.',
    iconName: 'Layers',
    technologies: ['Microsoft Power Apps', 'Power Automate', 'Power BI', 'Dataverse', 'SharePoint Online', 'Azure Logic Apps'],
    deliverables: [
      'Model-Driven & Canvas Power Apps for sales, field, and back-office',
      'Automated multi-tier approval flows and SLA escalation logic',
      'Dataverse schema modeling, role-based security, and audit trails',
      'Custom connectors to REST APIs and internal ERP/CRM systems',
      'Interactive executive Power BI reporting dashboards'
    ],
    useCases: [
      'Customer Relationship & Pipeline Tracking',
      'Capital Expenditure & Purchase Request Approvals',
      'Equipment & Field Asset Inspection Management',
      'Employee Onboarding & Policy Compliance Workflows'
    ],
    keyBenefits: [
      'Rapid time-to-market leveraging low-code Microsoft cloud infrastructure',
      'Direct synchronization with Azure Active Directory (Entra ID) and Office 365',
      'Enterprise-grade auditability, access controls, and data residency compliance'
    ],
    demoSlug: 'powerapps-crm',
    projectSlug: 'powerapps-crm',
    architectureHighlight: 'Direct integration with Dataverse tables, Azure Entra ID RBAC, Power Automate webhook triggers, and embedded real-time Power BI reporting cards.'
  },
  {
    id: 'servicenow',
    slug: 'servicenow',
    title: 'ServiceNow Solutions',
    shortDesc: 'End-to-end IT Service Management (ITSM), incident resolution workflows, problem management, service catalogs, and SLA performance governance.',
    fullDesc: 'We architect and configure tailored ServiceNow ITSM implementations that streamline enterprise support teams, minimize MTTR (Mean Time to Resolution), and automate service fulfillment. From custom catalog item variables to complex SLA milestone notifications and Flow Designer automations, we deliver structured IT operations.',
    iconName: 'ServerCrash',
    technologies: ['ServiceNow ITSM', 'Glide API / Scripting', 'Flow Designer', 'Service Catalog', 'REST Integrations', 'SLA Engine', 'Knowledge Management'],
    deliverables: [
      'Configured Incident, Problem, and Change Management modules',
      'Self-service Service Catalog items with dynamic variables and routing',
      'Multi-level SLA definitions, breach warning escalations, and reporting',
      'Automated assignment rules, email notifications, and approval gates',
      'Structured Knowledge Base with keyword search and deflection metrics'
    ],
    useCases: [
      'Enterprise IT Helpdesk & Hardware/Software Provisioning',
      'Root-Cause Investigation & Known Error Database',
      'Change Advisory Board (CAB) Scheduling and Risk Assessment',
      'Strict SLA Contract Monitoring for internal and external stakeholders'
    ],
    keyBenefits: [
      'Drastically reduced resolution time with automated triage and routing',
      'Full visibility into infrastructure change risks to eliminate downtime',
      'Auditable ITIL-aligned processes for SOC 2 and ISO 27001 readiness'
    ],
    demoSlug: 'servicenow',
    projectSlug: 'servicenow-incident',
    architectureHighlight: 'ITIL v4-compliant incident lifecycle state machine, real-time SLA countdown timers, dynamic service catalog forms, and relation mapping between Incidents and Problems.'
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI & Agentic Automation',
    shortDesc: 'Production AI agents, autonomous tool calling, LangGraph workflows, Retrieval-Augmented Generation (RAG), and deterministic fallback systems.',
    fullDesc: 'DevTechSoft designs pragmatic, highly reliable AI agent architectures that move beyond simple chat bubbles. We build multi-step reasoning agents that consult private knowledge vectors, invoke secure back-office tools (CRM queries, ticket creation, ERP updates), and adhere strictly to guardrails and deterministic fallbacks.',
    iconName: 'Bot',
    technologies: ['Python', 'FastAPI', 'LangGraph', 'OpenAI / Anthropic APIs', 'RAG / Vector Databases', 'Tool Calling', 'Model Context Protocol (MCP)'],
    deliverables: [
      'Multi-agent orchestration workflows built on LangGraph state machines',
      'Private enterprise RAG pipelines with chunking and semantic vector search',
      'Deterministic tool calling for querying tickets, databases, and APIs',
      'Observability traces showing execution steps, latency, and tokens',
      'Dual-mode integration: Deterministic mock adapter + live API keys'
    ],
    useCases: [
      'Tier-1 Technical Support Autonomous Resolution',
      'Internal Policy & Technical Documentation Assistant',
      'Automated Ticket Categorization and Triage Dispatch',
      'Executive Summary & Data Extraction from PDF/Contracts'
    ],
    keyBenefits: [
      '24/7 autonomous first-touch resolution for routine inquiries',
      'Verifiable citations linked directly to verified enterprise source documents',
      'Zero hallucination guarantees through tool-verified database lookups'
    ],
    demoSlug: 'ai-agent',
    projectSlug: 'ai-support-agent',
    architectureHighlight: 'Stateful LangGraph agent graph: User Intent -> Guardrails -> RAG Semantic Search -> Dynamic Tool Invocation -> Grounded Response Synthesis with full telemetry.'
  },
  {
    id: 'data-engineering',
    slug: 'data-engineering',
    title: 'Data Engineering & Analytics',
    shortDesc: 'Resilient ETL/ELT pipelines, automated data quality scoring, lakehouse transformations, and pipeline telemetry dashboards.',
    fullDesc: 'We construct reliable, high-throughput data engineering pipelines that turn raw operational data into pristine analytical gold. From batch transformations using PySpark and Databricks to Azure Data Factory orchestrations and automated data health checks, DevTechSoft ensures data integrity at every hop.',
    iconName: 'Database',
    technologies: ['Python', 'SQL', 'PySpark', 'Databricks', 'Azure Data Factory', 'Azure Data Lake', 'Delta Lake', 'Power BI'],
    deliverables: [
      'Medallion architecture implementation (Bronze -> Silver -> Gold layers)',
      'Automated data quality validation (schema checks, null bounds, deduplication)',
      'Real-time pipeline monitoring dashboards with run states and execution logs',
      'Interactive data explorer with sorting, filtering, and CSV export/import',
      'Failure alerting, error isolation tables, and one-click retry mechanisms'
    ],
    useCases: [
      'Consolidating multi-system ERP and transactional sales data',
      'Clickstream telemetry ingestion and customer behavioral modeling',
      'Automated regulatory compliance reporting and data lineage tracking',
      'Data warehouse modeling for executive BI dashboards'
    ],
    keyBenefits: [
      'Eliminate silent data corruption with proactive quality gatekeepers',
      'Immediate visibility into pipeline health, bottleneck runs, and failure logs',
      'Scalable lakehouse foundation ready for machine learning and BI'
    ],
    demoSlug: 'data-engineering',
    projectSlug: 'data-analytics',
    architectureHighlight: 'Simulated Azure Data Factory orchestrator triggering Bronze-to-Gold Delta transformations with live execution logs, quality score calculus, and CSV datasets.'
  },
  {
    id: 'full-stack',
    slug: 'full-stack',
    title: 'Full-Stack Development',
    shortDesc: 'Scalable cloud applications, high-performance web systems, robust REST/GraphQL APIs, secure authentication, and administrative controls.',
    fullDesc: 'We engineer full-stack web platforms built for speed, reliability, and scale. Whether developing modern SaaS platforms, multi-tenant B2B portals, or integrated business management tools, DevTechSoft crafts secure backend services paired with intuitive, responsive user experiences.',
    iconName: 'Code2',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL / SQLite', 'REST APIs', 'JWT Authentication', 'Tailwind CSS'],
    deliverables: [
      'Complete business platform with dual roles (Customer Storefront + Admin)',
      'Product catalog with faceted search, categorization, and inventory count',
      'Interactive shopping cart, coupon validation, and order simulation',
      'Comprehensive administrative portal: product CRUD, stock alerts, orders',
      'Persistent local data store with sample seed database and export capability'
    ],
    useCases: [
      'B2B E-Commerce & Wholesale Ordering Portals',
      'Internal Operations, Inventory & Fulfillment Management',
      'Subscription SaaS Products with role-based member portals',
      'Custom ERP extensions connecting to legacy backend systems'
    ],
    keyBenefits: [
      'Clean modular architecture separated into domain services and reusable hooks',
      'Type-safe contracts across frontend and backend models',
      'Responsive, polished UI that converts visitors into paying customers'
    ],
    demoSlug: 'fullstack',
    projectSlug: 'business-management',
    architectureHighlight: 'Full-duplex application layer featuring customer checkout workflows, real-time inventory deduction, order fulfillment lifecycle, and executive sales analytics.'
  },
  {
    id: 'frontend',
    slug: 'frontend',
    title: 'Frontend Engineering',
    shortDesc: 'High-density enterprise analytics dashboards, responsive design systems, micro-interactions, and accessible UI component libraries.',
    fullDesc: 'We specialize in crafting front-end experiences of the highest caliber. Inspired by the meticulous standards of Linear, Stripe, and Vercel, our interfaces balance high data density with effortless readability, accessible keyboard navigation, instant response times, and customizable theming.',
    iconName: 'LayoutDashboard',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Lucide Icons', 'Accessibility (WCAG 2.1)', 'Responsive Design'],
    deliverables: [
      'Enterprise dashboard layout with collapsible sidebars and responsive header',
      'Interactive charts (Area, Bar, Donut, Sparklines) with custom tooltips',
      'High-performance data table with column filtering, sorting, and pagination',
      'Live notifications drawer, user settings modal, and theme switcher',
      'Complete modular design system with reusable buttons, badges, and cards'
    ],
    useCases: [
      'SaaS Executive Analytics & Revenue Intelligence',
      'High-frequency monitoring and operations command centers',
      'Complex data configuration tables and user management consoles',
      'Customer-facing analytics portals for reporting metrics'
    ],
    keyBenefits: [
      'Flawless responsiveness across ultra-wide monitors, laptops, and mobile screens',
      'Zero layout shifts, sub-100ms interaction feedback, and lightweight bundles',
      'Consistency guaranteed by a well-documented component system'
    ],
    demoSlug: 'frontend',
    projectSlug: 'frontend-dashboard',
    architectureHighlight: 'Component-driven frontend design system with theme tokens, stateful responsive navigation, Recharts visual analytics, and live search/filter pipelines.'
  }
];
