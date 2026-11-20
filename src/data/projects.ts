import { ProjectItem } from '../types';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'powerapps-crm',
    slug: 'powerapps-crm',
    title: 'BusinessFlow 360',
    tagline: 'Enterprise Business Operations & Low-Code CRM Platform',
    serviceId: 'power-platform',
    serviceName: 'Power Platform Development',
    badge: 'Independent Demo Project',
    demoRoute: '/demo/powerapps-crm',
    summary: 'A realistic, full-featured Microsoft Power Apps-style business operations platform integrating customer relationship management, sales pipeline tracking, multi-tier approvals, and embedded Power BI performance reporting.',
    businessProblem: 'Growing enterprises frequently suffer from fragmented customer data spread across disconnected spreadsheets, lost sales opportunities due to manual lead handoffs, and delayed managerial approvals that slow down commercial momentum.',
    proposedSolution: 'DevTechSoft engineered BusinessFlow 360 to demonstrate how a unified low-code Dataverse architecture consolidates customer records, automates lead status progression, enforces governance through auditable approval steps, and delivers live executive revenue insights.',
    features: [
      {
        title: 'Executive KPI Dashboard',
        description: 'Instant overview of total active customers, pipeline opportunities, pending approval requests, and monthly revenue with simulated variance indicators.'
      },
      {
        title: 'Complete Customer Directory (CRM)',
        description: 'Searchable, filterable client registry with full CRUD operations (Create, Read, Update, Delete), industry classification, contact details, and modal editing.'
      },
      {
        title: 'Visual Lead Pipeline (Kanban)',
        description: 'Interactive stage tracking from New to Contacted, Proposal, and Closed-Won with sales representative assignment and one-click opportunity conversion.'
      },
      {
        title: 'Governance & Approval Workflows',
        description: 'Multi-stage approval module allowing department leads to review, approve, or reject purchase and contract submissions with auditable reason logs.'
      },
      {
        title: 'Power BI Style Reports & Export',
        description: 'Interactive revenue distribution charts, pipeline volume breakdowns, and one-click CSV data export for offline operational auditing.'
      }
    ],
    techStack: [
      { category: 'Platform & Data', items: ['Microsoft Power Apps', 'Microsoft Dataverse', 'SharePoint Online'] },
      { category: 'Automation & Logic', items: ['Power Automate Cloud Flows', 'Business Process Flows (BPF)', 'Formula Columns'] },
      { category: 'Analytics & Viz', items: ['Power BI Embedded', 'Interactive Recharts Analytics', 'Tabular Data Grids'] },
      { category: 'Frontend Simulation', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'LocalStorage Persistence'] }
    ],
    architecture: {
      overview: 'Modeled after an enterprise Microsoft Power Apps Model-Driven architecture backed by Dataverse tables, role-based access security, and automated event triggers.',
      layers: [
        {
          name: 'Presentation Layer',
          description: 'Power Apps Modern UI / Fluent Design components providing unified desktop and tablet interfaces.',
          tech: ['Power Apps Canvas/Model UI', 'React/Tailwind Design System', 'Lucide Enterprise Icons']
        },
        {
          name: 'Workflow & Business Logic',
          description: 'Automated Power Automate triggers listening for record modifications, SLA timeouts, and approval requests.',
          tech: ['Power Automate Flow Engine', 'State Transition Handlers', 'Validation Logic']
        },
        {
          name: 'Dataverse Storage Layer',
          description: 'Relational entity tables with foreign key constraints connecting Accounts, Contacts, Leads, and Approval Tasks.',
          tech: ['Microsoft Dataverse Entities', 'Role-Based Access Control', 'Audit Logs']
        }
      ]
    },
    keyWorkflows: [
      {
        name: 'Lead-to-Opportunity Progression',
        steps: [
          'Inbound lead captured via form or integration with initial score and source attribution.',
          'Lead assigned to qualified account executive based on industry and deal territory.',
          'Status advanced through Qualified and Proposal review stages.',
          'One-click conversion generates an active Customer Account and creates associated Revenue Opportunity.'
        ]
      },
      {
        name: 'Two-Tier Purchase Approval',
        steps: [
          'Staff member submits purchase request with budgetary justifications and vendor quote.',
          'System triggers automated notification to primary department approver.',
          'Approver reviews proposal inside the Approval Module and executes Approve or Reject with remarks.',
          'Full audit trail is timestamped and saved with immutable status updates.'
        ]
      }
    ],
    implementationDetails: [
      'Built with persistent browser storage so customer additions, status updates, and approvals survive page refreshes.',
      'Includes one-click "Reset Sample Data" utility so evaluators can test custom data inputs and restore baseline state anytime.',
      'CSV export generator creates well-formatted comma-separated operational reports ready for Excel or external BI tools.'
    ],
    productionIntegrationNotes: [
      'In a production enterprise deployment, the Dataverse tables would be provisioned in the client’s Microsoft 365 / Azure tenant.',
      'User authentication synchronizes seamlessly with Microsoft Entra ID (formerly Azure Active Directory) with conditional access.',
      'Power Automate flows would dispatch automated notifications directly into Microsoft Teams and Outlook email.'
    ]
  },
  {
    id: 'servicenow-incident',
    slug: 'servicenow-incident',
    title: 'ServiceOps 360',
    tagline: 'Enterprise IT Service Management (ITSM) Platform',
    serviceId: 'servicenow',
    serviceName: 'ServiceNow Solutions',
    badge: 'Independent Demo Project',
    demoRoute: '/demo/servicenow',
    summary: 'A ServiceNow-inspired IT Service Management (ITSM) control center featuring incident lifecycle management, problem tracking, change advisory workflows, an interactive self-service catalog, and real-time SLA breach monitoring.',
    businessProblem: 'Enterprise IT departments frequently struggle with chaotic incident queues, untracked changes that cause production outages, breached service-level agreements, and redundant tickets that could be resolved through self-service.',
    proposedSolution: 'ServiceOps 360 models modern ITIL best practices. It centralizes ticket logging with priority-impact matrices, links recurring incidents to root-cause problem records, tracks change approvals, and surfaces live SLA breach countdowns.',
    features: [
      {
        title: 'Incident Lifecycle Management',
        description: 'Auto-generated incident IDs (INC0010xxx), urgency-impact priority calculation, assignment group dispatch, and state flow from New to In Progress, Resolved, and Closed.'
      },
      {
        title: 'Problem Management & Root Cause',
        description: 'Isolate root causes, document known workarounds, and associate multiple related incident records to prevent repeat system failures.'
      },
      {
        title: 'Change Management & Risk Scoring',
        description: 'Formal change requests (Standard, Normal, Emergency) with risk classification, scheduled execution windows, and CAB approval milestones.'
      },
      {
        title: 'Self-Service Catalog',
        description: 'Interactive ordering of enterprise hardware, cloud software licenses, and VPN credentials with dynamic request parameters and RITM order codes.'
      },
      {
        title: 'SLA Dashboard & Breach Monitoring',
        description: 'Real-time response and resolution SLA tracking with visual warning thresholds, breach indicators, and MTTR compliance metrics.'
      },
      {
        title: 'IT Knowledge Base',
        description: 'Categorized technical articles with instant search, article feedback rating, and one-click insertion of verified resolutions into active tickets.'
      }
    ],
    techStack: [
      { category: 'ITIL Framework', items: ['ITSM Incident Management', 'Problem Management', 'Change Advisory (CAB)', 'Service Catalog'] },
      { category: 'ServiceNow Concepts', items: ['GlideRecord State Patterns', 'Assignment Rules', 'SLA Milestone Engine', 'Knowledge Management'] },
      { category: 'Architecture & UI', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Recharts SLA Gauges', 'LocalStorage Engine'] }
    ],
    architecture: {
      overview: 'Structured around the ITIL v4 framework, mimicking ServiceNow’s data dictionary with interrelated records (Incidents, Problems, Changes, and RITMs).',
      layers: [
        {
          name: 'IT Service Portal & Workspace',
          description: 'Dual view for IT agents and end-users, providing both detailed ticket triage and simplified self-service ordering.',
          tech: ['ServiceNow Agent Workspace Pattern', 'Responsive Data Tables', 'Filter Chips']
        },
        {
          name: 'Workflow & SLA Orchestration',
          description: 'Calculates priority based on Impact x Urgency matrix, schedules SLA breach timers, and enforces approval gates for changes.',
          tech: ['ITIL Matrix Calculator', 'SLA Timer Engine', 'State Transition Guards']
        },
        {
          name: 'ITSM Repository',
          description: 'Persists incidents, notes, historical state transitions, and linked knowledge base references.',
          tech: ['Structured JSON Schema', 'Relational Entity Mappings', 'Audit Trail Storage']
        }
      ]
    },
    keyWorkflows: [
      {
        name: 'Critical Incident Triage & Resolution',
        steps: [
          'High-impact outage logged by user or monitoring tool; system assigns Priority 1 (Critical).',
          'SLA countdown starts immediately (1-hour response SLA, 4-hour resolution SLA).',
          'Agent claims ticket, sets state to In Progress, and links relevant Knowledge Base article.',
          'Agent logs work notes and resolution details; ticket transitions to Resolved with SLA stopped.'
        ]
      },
      {
        name: 'Service Catalog Hardware Provisioning',
        steps: [
          'Employee selects "Developer Laptop Bundle" from Service Catalog.',
          'Customizes CPU/RAM specifications and enters cost center approval code.',
          'System generates request item (RITM) and automatically routes to asset manager queue.',
          'Manager approves, trigger signals warehouse fulfillment, and ticket status is updated to Delivered.'
        ]
      }
    ],
    implementationDetails: [
      'Full ticket creation modal with auto-incrementing ID sequences (INC0010041, etc.).',
      'Realistic IT status transitions: Tickets cannot be resolved without inputting resolution notes.',
      'SLA calculation calculates warning thresholds (75%) and breach triggers (100%) dynamically.'
    ],
    productionIntegrationNotes: [
      'In a live ServiceNow production instance, this connects via ServiceNow Table API / Scripted REST APIs.',
      'Single Sign-On (SSO) leverages SAML 2.0 / Okta / Azure AD for zero-trust enterprise identity.',
      'Mid Server integrations would handle on-premises Active Directory password resets and asset discovery.'
    ]
  },
  {
    id: 'ai-support-agent',
    slug: 'ai-support-agent',
    title: 'NexaAI',
    tagline: 'Enterprise Autonomous AI Support Agent & Tool-Calling Platform',
    serviceId: 'ai-automation',
    serviceName: 'AI & Agentic Automation',
    badge: 'Independent Demo Project',
    demoRoute: '/demo/ai-agent',
    summary: 'A multi-step autonomous AI agent dashboard combining modern conversational chat, Retrieval-Augmented Generation (RAG) over enterprise documentation, real-time tool execution, and transparent agent thought traces.',
    businessProblem: 'Traditional customer support chatbots are rigid, frequently hallucinate false information, cannot query live business databases, and leave human agents with zero visibility into how answers were derived.',
    proposedSolution: 'NexaAI showcases how modern agentic workflows (LangGraph style) route complex user requests through verified RAG retrieval, invoke deterministic backend tools (database queries, ticket status lookups, order checks), and display full step-by-step reasoning.',
    features: [
      {
        title: 'Interactive Agent Chat Workspace',
        description: 'Streaming-style typewriter response generation, pre-built business starter prompts, tool call status pills, and verified source citations.'
      },
      {
        title: 'Private Enterprise Knowledge Base (RAG)',
        description: 'Search indexed policy documents, technical specs, and SLAs with vector similarity score previews and client-side document upload/indexing.'
      },
      {
        title: 'Deterministic Agent Tools Sandbox',
        description: 'Inspect and manually invoke agent tools: ticket_lookup, search_knowledge_base, customer_profile_lookup, and create_ticket_simulation.'
      },
      {
        title: 'Agent Execution Trace & Graph',
        description: 'Full transparency into the agent reasoning loop: Input Intent -> Guardrail Check -> RAG Query -> Tool Calling -> Synthesis -> Verified Output.'
      },
      {
        title: 'Operational Telemetry & Metrics',
        description: 'Analytics tracking simulated conversations, tool execution distribution, average response latency, and resolution rate.'
      },
      {
        title: 'Dual Execution Modes',
        description: 'Works 100% offline using a deterministic enterprise mock adapter, with optional direct client-side OpenAI API key testing that never sends keys to our server.'
      }
    ],
    techStack: [
      { category: 'AI & Agent Framework', items: ['LangGraph Architecture Pattern', 'Retrieval-Augmented Generation (RAG)', 'Tool Calling Protocol (MCP)'] },
      { category: 'Backend Models', items: ['OpenAI / Claude Compatible Schema', 'Deterministic Mock Adapter', 'Semantic Search Logic'] },
      { category: 'Frontend & Telemetry', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Recharts Analytics', 'Client Storage'] }
    ],
    architecture: {
      overview: 'Follows a stateful LangGraph cycle where the agent coordinates between user intent evaluation, vector document retrieval, and tool execution before generating grounded responses.',
      layers: [
        {
          name: 'Orchestrator & Guardrails',
          description: 'Evaluates prompt safety, identifies user intent, and determines whether RAG or tool invocation is required.',
          tech: ['Intent Router', 'Prompt Guardrails', 'LangGraph State Graph']
        },
        {
          name: 'Tool & Retrieval Execution',
          description: 'Queries vector database embeddings for enterprise documentation and invokes back-office API tools.',
          tech: ['Vector Cosine Similarity', 'Simulated MCP Tool Server', 'API Query Resolvers']
        },
        {
          name: 'Response Synthesis & Citations',
          description: 'Synthesizes tool observations and retrieved text chunks into grounded markdown with source citation tags.',
          tech: ['Grounded Generation', 'Citation Formatter', 'Execution Tracer']
        }
      ]
    },
    keyWorkflows: [
      {
        name: 'Autonomous Ticket Status & Resolution Flow',
        steps: [
          'User asks: "Can you check on ticket INC-4091 and explain why our VPN is still failing?"',
          'Agent recognizes intent requires ticket_lookup tool call with parameter id: "INC-4091".',
          'Tool returns live ticket status ("Resolved - Certificate Expired").',
          'Agent queries Knowledge Base for "VPN Certificate Update Guide".',
          'Agent synthesizes final answer with step-by-step certificate renewal steps and cites both the ticket and doc.'
        ]
      },
      {
        name: 'Document Upload & Instant Indexing Flow',
        steps: [
          'User adds custom company refund policy document in the Knowledge Base tab.',
          'System tokenizes and creates index chunks in local persistent memory.',
          'User asks a question regarding the newly added policy.',
          'Agent retrieves the fresh chunk with high similarity score and quotes the exact paragraph.'
        ]
      }
    ],
    implementationDetails: [
      'Zero API keys required by default: includes an intelligent rule-based simulated reasoning engine with 15+ comprehensive response paths.',
      'Allows users to optionally enter an OpenAI API key for live browser-direct queries with full security (key remains strictly in browser memory).',
      'Realistic typewriter streaming animation replicates production LLM inference latency.'
    ],
    productionIntegrationNotes: [
      'In production, the backend runs on Python FastAPI + LangGraph deployed on AWS ECS or Azure Container Apps.',
      'Vector storage leverages Pinecone, Qdrant, or pgvector on PostgreSQL with chunking and hybrid dense/sparse search.',
      'Observability and guardrails integrate with LangSmith or Arize Phoenix for trace logging and cost monitoring.'
    ]
  },
  {
    id: 'data-analytics',
    slug: 'data-analytics',
    title: 'DataPulse',
    tagline: 'Enterprise Data Analytics & Pipeline Monitoring Platform',
    serviceId: 'data-engineering',
    serviceName: 'Data Engineering & Analytics',
    badge: 'Independent Demo Project',
    demoRoute: '/demo/data-engineering',
    summary: 'A comprehensive data engineering operations console monitoring ETL/ELT pipelines, automated data quality scoring, execution logs, and an interactive data explorer with CSV download and upload capabilities.',
    businessProblem: 'Silent data corruption, unmonitored batch pipeline failures, duplicate customer records, and lack of visibility into data latency cost businesses millions in flawed reporting and compliance penalties.',
    proposedSolution: 'DataPulse provides an end-to-end data control room. It tracks Bronze-to-Gold medallion pipeline states, runs real-time automated data quality rules (null checks, duplicate detection, schema validation), displays execution logs, and allows dataset exploration.',
    features: [
      {
        title: 'Pipeline Health & Metrics Dashboard',
        description: 'Live KPI summary of total daily data volume processed (GB), active/idle/failed pipeline runs, SLA success rate, and duration charts.'
      },
      {
        title: 'Interactive Pipeline Manager',
        description: 'Trigger manual pipeline runs with simulated multi-stage progress (Ingest -> Transform -> Validate -> Gold Load), stop runs, or retry failures.'
      },
      {
        title: 'Real-Time Execution Logs Viewer',
        description: 'Timestamped, color-coded operational logs (INFO, WARN, ERROR) showing PySpark job outputs, partition counts, and Delta Lake commit hashes.'
      },
      {
        title: 'Automated Data Quality Engine',
        description: 'Calculates an overall Data Quality Score (e.g. 98.4%) across schema checks, null constraints, duplicate tests, and lists corrupted rows.'
      },
      {
        title: 'Dataset Explorer with CSV Export/Import',
        description: 'Search, sort, and paginate through sample enterprise transaction and user event records, or upload a custom CSV to inspect schema quality.'
      },
      {
        title: 'Data Volume & Execution Trends',
        description: 'Visual Recharts graphs mapping 7-day data volume ingestion trends, hourly throughput, and failure distribution.'
      }
    ],
    techStack: [
      { category: 'Data Architecture', items: ['Medallion Architecture (Bronze/Silver/Gold)', 'Delta Lake Format', 'ETL/ELT Orchestration'] },
      { category: 'Cloud Stack Simulation', items: ['Azure Data Factory', 'Databricks PySpark', 'Azure Data Lake Storage Gen2', 'SQL Analytics'] },
      { category: 'Control UI', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Recharts Visuals', 'CSV Parser / Exporter'] }
    ],
    architecture: {
      overview: 'Simulates a cloud lakehouse architecture where raw operational streams are ingested, cleansed in Silver, and aggregated into analytical Gold tables.',
      layers: [
        {
          name: 'Ingestion & Orchestration Layer',
          description: 'Azure Data Factory triggers scheduled pipelines pulling transactional logs from ERP and CRM sources into Bronze Delta tables.',
          tech: ['Azure Data Factory', 'API Ingestion', 'Blob Storage']
        },
        {
          name: 'Processing & Quality Guardrails',
          description: 'PySpark jobs running on Databricks clusters perform schema enforcement, deduplication, and Great Expectations style tests.',
          tech: ['Databricks PySpark', 'Delta Lake ACID', 'Data Quality Rules']
        },
        {
          name: 'Serving & Analytical Layer',
          description: 'Curated Gold data marts exposed to Power BI, SQL endpoints, and executive operational dashboards.',
          tech: ['SQL Data Warehouse', 'Power BI DirectQuery', 'REST Analytics API']
        }
      ]
    },
    keyWorkflows: [
      {
        name: 'Manual Pipeline Run & Log Monitoring',
        steps: [
          'Data Engineer clicks "Run Pipeline" on "Customer_360_PySpark_Silver".',
          'Pipeline transitions from Idle to Running status with an animated progress indicator.',
          'Execution log streams step-by-step: reading raw parquet partitions, executing regex cleaning, writing to Delta format.',
          'Data Quality check runs: verifies 0 null customer IDs and schema match.',
          'Pipeline finishes with Success status, updating the daily processed volume and logs.'
        ]
      },
      {
        name: 'Data Quality Error Quarantine',
        steps: [
          'A transaction dataset containing negative amounts and missing timestamps is ingested.',
          'Data Quality engine detects anomalies and flags 3 rejected records.',
          'Corrupted records are isolated in the Error Records table with error codes.',
          'Clean records are safely committed to the analytics table without polluting downstream BI.'
        ]
      }
    ],
    implementationDetails: [
      'Interactive pipeline trigger simulates asynchronous cloud execution with live progress bar and realistic log lines.',
      'CSV upload feature reads client files directly in browser, computes summary stats, and displays rows in the explorer table.',
      'One-click CSV download exports current dataset with correct headers and sanitization.'
    ],
    productionIntegrationNotes: [
      'In production environments, this control console communicates with Azure Data Factory REST APIs or Databricks Jobs API.',
      'Telemetry integrates with Azure Monitor, Application Insights, or Datadog for 24/7 on-call alerting via PagerDuty.',
      'Storage leverages Azure Data Lake Storage Gen2 (ADLS) with hierarchical namespace and fine-grained ACLs.'
    ]
  },
  {
    id: 'business-management',
    slug: 'business-management',
    title: 'BizCore',
    tagline: 'Modern Business Management & E-Commerce Operations Platform',
    serviceId: 'full-stack',
    serviceName: 'Full-Stack Development',
    badge: 'Independent Demo Project',
    demoRoute: '/demo/fullstack',
    summary: 'A full-stack business management application bridging customer-facing commerce (catalog, shopping cart, promo codes, checkout simulation) with a comprehensive administrative control room (products, orders, customers, and inventory).',
    businessProblem: 'Growing SMBs and B2B distributors often juggle disconnected software: one for their web store, another for warehouse inventory, and another for customer tracking—resulting in inventory desynchronization and missed fulfillment deadlines.',
    proposedSolution: 'BizCore demonstrates a modern unified architecture. It integrates a responsive product catalog, dynamic shopping cart, order placement simulation, and back-office administrative portals into a cohesive, high-performance web application.',
    features: [
      {
        title: 'Dual-Role Experience (Customer & Admin)',
        description: 'Switch between Storefront Customer mode and Admin Operations mode with a single toggle, testing both ends of the commercial workflow.'
      },
      {
        title: 'Faceted Product Catalog',
        description: 'Searchable, filterable inventory across enterprise hardware, cloud software licenses, and support subscriptions with stock status badges.'
      },
      {
        title: 'Shopping Cart & Checkout Simulation',
        description: 'Interactive slide-over cart with quantity adjustment, promo code validation (e.g. "DEVTECH10"), tax calculation, and order generation.'
      },
      {
        title: 'Customer Order History & Tracking',
        description: 'Review placed orders, order tracking status (Processing, Shipped, Delivered), item breakdowns, and receipt printing simulation.'
      },
      {
        title: 'Admin Management Suite',
        description: 'Comprehensive control center: Product CRUD (add/edit items and pricing), real-time inventory restock actions, and customer account management.'
      },
      {
        title: 'Executive Sales Reports & Analytics',
        description: 'Visual Recharts graphs tracking total sales revenue, order counts, average order value, and top-selling products.'
      }
    ],
    techStack: [
      { category: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Lucide Enterprise Icons'] },
      { category: 'State & Logic', items: ['Custom Shopping Cart Hook', 'Client State Persistence', 'Role-Based Navigation'] },
      { category: 'Backend Architecture', items: ['RESTful API Patterns', 'Simulated Database Schema', 'JSON Data Store'] }
    ],
    architecture: {
      overview: 'Structured around modular domain services (Catalog, Cart, Orders, Admin, Inventory) with clear separation between stateful operations and presentation components.',
      layers: [
        {
          name: 'Client Interface Layer',
          description: 'Responsive desktop and mobile storefront paired with an administrative operational cockpit.',
          tech: ['React Components', 'Tailwind Styling', 'Interactive Modals']
        },
        {
          name: 'Domain Logic & Persistence',
          description: 'Calculates cart totals, applies discount rules, decrements stock on checkout, and writes to browser database.',
          tech: ['Cart Reducer', 'Inventory Manager', 'LocalStorage Engine']
        },
        {
          name: 'Data Contracts & Security',
          description: 'Strict TypeScript interfaces governing products, orders, user roles, and transactional receipts.',
          tech: ['Type-Safe DTOs', 'Validation Schemas', 'Audit Records']
        }
      ]
    },
    keyWorkflows: [
      {
        name: 'End-to-End Customer Purchase Flow',
        steps: [
          'User browses catalog, filters by "Cloud Hardware", and adds "Enterprise Server Blade" to cart.',
          'Opens cart drawer, applies promo code "DEVTECH10" for 10% instant discount.',
          'Proceeds to simulated checkout, fills shipping information, and clicks "Confirm Order".',
          'System generates confirmed order ID (e.g. ORD-9821), decrements product inventory, and saves order to user history.'
        ]
      },
      {
        name: 'Admin Inventory Restock & Pricing Update',
        steps: [
          'Operator switches to Admin mode, views Low Stock alert badge on "DevTech Cloud Key".',
          'Clicks "Restock (+25 Units)" to replenish available units immediately.',
          'Edits unit price and saves changes; catalog immediately reflects new price and in-stock badge.'
        ]
      }
    ],
    implementationDetails: [
      'Orders and inventory changes update client database state in real-time without external server dependency.',
      'Includes sample seed dataset with 8 realistic enterprise products, initial orders, and customer accounts.',
      'Includes one-click "Reset Database" utility for testing repetitive purchase cycles.'
    ],
    productionIntegrationNotes: [
      'In production, the backend is powered by Node.js/Express or NestJS paired with PostgreSQL and Prisma ORM.',
      'Payment collection integrates securely with Stripe Checkout or Stripe Elements via server-side webhooks.',
      'Deployment runs on Docker containers managed via AWS ECS or Vercel with Redis for cart session caching.'
    ]
  },
  {
    id: 'frontend-dashboard',
    slug: 'frontend-dashboard',
    title: 'VistaDash',
    tagline: 'High-Density Enterprise SaaS Analytics & Operations Console',
    serviceId: 'frontend',
    serviceName: 'Frontend Engineering',
    badge: 'Independent Demo Project',
    demoRoute: '/demo/frontend',
    summary: 'A modern, high-density enterprise analytics dashboard built with meticulous attention to typography, micro-interactions, responsive sidebars, theme modes, and interactive data visualization.',
    businessProblem: 'Many enterprise web dashboards feel sluggish, suffer from cluttered visual hierarchies, break on tablet and mobile viewports, and fail to provide quick filtering over high-volume tabular information.',
    proposedSolution: 'VistaDash embodies modern frontend craftsmanship inspired by Linear and Vercel. It features a collapsible navigation rail, global search, interactive Recharts time series, live notification feeds, theme switching, and quick column filtering.',
    features: [
      {
        title: 'Modern Layout & Collapsible Sidebar',
        description: 'Smooth toggle between expanded and collapsed icon-only sidebar with active route indicators and workspace switcher.'
      },
      {
        title: 'Interactive Executive Metrics Cards',
        description: 'KPI summary tiles (Monthly Recurring Revenue, Active Users, Conversion Rate, Net Retention) with sparkline trends and positive/negative indicators.'
      },
      {
        title: 'Multi-Chart Visual Analytics',
        description: 'Interactive Area chart (Revenue vs Target), Bar chart (Conversion Funnel), and Donut chart (Platform Traffic Distribution) with custom tooltips.'
      },
      {
        title: 'High-Density Data Table',
        description: 'Filterable, searchable tabular grid with status pills, customer avatars, payment method tags, and sorting controls.'
      },
      {
        title: 'Live Notification Drawer',
        description: 'Slide-over activity drawer with unread badges, time-relative alerts, and one-click "Mark All as Read" action.'
      },
      {
        title: 'Theme & Density Controls',
        description: 'Customizable visual modes: Light, Dark, and High Contrast presets with persistent preferences.'
      }
    ],
    techStack: [
      { category: 'Core Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite Build Tool'] },
      { category: 'Data Visualization', items: ['Recharts (Area, Bar, Pie, Sparkline)', 'Custom SVG Tooltips', 'Adaptive Viewports'] },
      { category: 'UX & Accessibility', items: ['Lucide Icons', 'WCAG 2.1 AA Contrast', 'Keyboard Focus Rings', 'Responsive Drawers'] }
    ],
    architecture: {
      overview: 'Built using an atomic, composable design system that separates structural shell layouts from reusable UI primitives, cards, and data visualization containers.',
      layers: [
        {
          name: 'Shell & Navigation Framework',
          description: 'Orchestrates the responsive layout, sidebar collapse state, top header search, and drawer overlays.',
          tech: ['AppShell Container', 'Collapsible Rail', 'Overlay Modals']
        },
        {
          name: 'Data Visualization Components',
          description: 'Wraps Recharts primitives with responsive containers and custom styling to maintain enterprise aesthetic.',
          tech: ['Recharts ResponsiveContainer', 'Custom Tooltip Formatters', 'Color Palette Tokens']
        },
        {
          name: 'Tabular Data Engine',
          description: 'Performs client-side column search, multi-condition filtering, pagination, and action dispatching.',
          tech: ['Memoized Filter Pipelines', 'Pagination Hooks', 'Sort Comparators']
        }
      ]
    },
    keyWorkflows: [
      {
        name: 'Date Range & Filtered Analysis',
        steps: [
          'User changes date filter from "Last 30 Days" to "Last 7 Days".',
          'Metrics cards animate and recalculate totals with updated percentage deltas.',
          'Revenue chart redraws time axis and updates target projection curves.',
          'Table updates to display transactions matching the selected temporal window.'
        ]
      },
      {
        name: 'Notification Management Flow',
        steps: [
          'User sees unread notification badge on the top header bell icon.',
          'Clicks bell to slide open the activity panel showing recent system alerts.',
          'Interacts with specific notification or clicks "Mark all as read" to clear unread counter.'
        ]
      }
    ],
    implementationDetails: [
      'Responsive design down to 320px mobile viewports with an adaptive bottom sheet / drawer menu.',
      'Instant search filter over the customer table with zero lag or frame drops.',
      'Custom theme switcher dynamically toggles slate and dark mode accents.'
    ],
    productionIntegrationNotes: [
      'In production, data feeds stream over WebSocket connections or Server-Sent Events (SSE) for sub-second updates.',
      'Configured with Vite chunk splitting and gzip/brotli compression for sub-second initial paint.',
      'Ready for embedding into micro-frontend shells or standalone SaaS applications.'
    ]
  },
  {
    id: 'promptimagelab',
    slug: 'promptimagelab',
    title: 'PromptImageLab',
    tagline: 'Independent AI-Focused Digital Platform & Prompt Engineering Suite',
    serviceId: 'digital-products',
    serviceName: 'Digital Products',
    badge: 'Live Digital Product',
    demoRoute: 'https://promptimagelab.com/',
    externalUrl: 'https://promptimagelab.com/',
    isLiveProduct: true,
    ctaLabel: 'Explore PromptImageLab',
    summary: 'An independent AI-focused digital platform designed to make AI prompting, learning, and productivity tools more accessible. Owned and operated by DevTechSoft as an active digital product.',
    businessProblem: 'Creators and businesses adopting generative visual AI frequently struggle with erratic outputs, opaque prompt parameters, and disorganized experimentation across Midjourney, DALL-E, and Stable Diffusion.',
    proposedSolution: 'DevTechSoft designed and built PromptImageLab as a specialized digital product offering curated prompt matrices, visual modifier tools, and productivity resources that streamline the creative AI workflow.',
    features: [
      {
        title: 'Curated Prompt Blueprints',
        description: 'Structured prompt templates categorized by architectural visualization, photorealism, cinematic lighting, and 3D rendering.'
      },
      {
        title: 'Visual Prompt Builder',
        description: 'Interactive keyword composer combining camera parameters, lighting modifiers, and aspect ratios into validated generation strings.'
      },
      {
        title: 'One-Click Prompt Export',
        description: 'Instant formatted clipboard copying optimized for direct pasting into Midjourney Discord bots and web LLM interfaces.'
      },
      {
        title: 'AI Tools & Educational Library',
        description: 'Practical guides and curated tool listings designed to lower the barrier to high-fidelity AI asset production.'
      },
      {
        title: 'Edge-Delivered Web Architecture',
        description: 'Lightweight, ultra-fast responsive client optimized for zero layout shift across desktop and mobile devices.'
      }
    ],
    techStack: [
      { category: 'Application Architecture', items: ['Modern Web Architecture', 'Responsive Layouts', 'Client State Optimization'] },
      { category: 'AI & Diffusion Domains', items: ['Prompt Engineering Syntax', 'Midjourney Parameter Tuning', 'Diffusion Token Structuring'] },
      { category: 'Cloud & Delivery', items: ['Cloudflare Edge CDN', 'Fast Global DNS', 'SSL/TLS Security'] },
      { category: 'UX & Accessibility', items: ['Tailwind Design Tokens', 'Lucide Line Icons', 'Mobile First Hierarchy'] }
    ],
    architecture: {
      overview: 'Engineered as an edge-cached digital product with instantaneous client-side search, category taxonomy indexing, and high-performance asset delivery.',
      layers: [
        {
          name: 'Presentation & Builder UI',
          description: 'Responsive catalog and modifier matrix allowing users to filter, inspect, and compose AI prompts.',
          tech: ['Modern Responsive Frontend', 'Modifier Controls', 'Clipboard APIs']
        },
        {
          name: 'Taxonomy & Prompt Engine',
          description: 'Structured metadata catalog organizing prompt modifiers by style, lighting, lens, and subject.',
          tech: ['Taxonomy Indexer', 'Parameter Formatter', 'Client Caching']
        },
        {
          name: 'Edge Hosting & CDN Delivery',
          description: 'Global content delivery network ensuring fast global TTFB and high availability.',
          tech: ['Global Edge CDN', 'Automated SSL', 'Optimized Assets']
        }
      ]
    },
    keyWorkflows: [
      {
        name: 'Prompt Discovery & Copy Workflow',
        steps: [
          'User accesses prompt catalog and filters by aesthetic style (e.g. Cinematic Photorealism).',
          'Inspects generation parameters, seed settings, and negative prompt recommendations.',
          'Clicks "Copy Prompt" for instant clipboard delivery with all flags properly escaped.',
          'Pastes prompt into target AI generation tool for consistent output.'
        ]
      },
      {
        name: 'Digital Product Evolution',
        steps: [
          'Continuous curation of emerging diffusion model features (Flux, Midjourney v6, SDXL).',
          'Rapid iterative deployments of new prompt collections and tool directories.'
        ]
      }
    ],
    implementationDetails: [
      'Live commercial digital product accessible at https://promptimagelab.com/.',
      'Demonstrates DevTechSoft’s end-to-end capability to conceive, build, launch, and operate independent digital products.',
      'Designed with clean typography, high readability, and responsive controls.'
    ],
    productionIntegrationNotes: [
      'Operated on production cloud infrastructure with continuous monitoring and automated deployment pipelines.',
      'Integrated with analytics for user experience optimization.'
    ]
  }
];
