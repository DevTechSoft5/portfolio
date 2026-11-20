export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FaqItem[] = [
  {
    category: 'Engagement & Studio Model',
    question: 'What is DevTechSoft, and how does your studio operate?',
    answer: 'DevTechSoft is an independent, solo-founded software engineering studio founded by a senior full-stack architect and enterprise automation consultant. Rather than dealing with agency layers, account managers, or offshore handoffs, you work directly with the senior engineer who designs, writes, tests, and deploys your software.'
  },
  {
    category: 'Demonstrations & Proof of Work',
    question: 'Are the live applications on this website real software?',
    answer: 'Yes! Every demonstration application on DevTechSoft is a fully functioning, interactive software system built specifically to showcase architectural depth, UX polish, and business workflows. They run on realistic mock databases with state persistence, allowing you to test forms, state transitions, pipelines, and analytics before starting your own project.'
  },
  {
    category: 'Services & Technologies',
    question: 'Which enterprise platforms and stacks do you specialize in?',
    answer: 'Our core expertise covers six key disciplines: Microsoft Power Platform (Power Apps, Dataverse, Power Automate, Power BI), ServiceNow ITSM and workflow scripting, AI & Agentic Automation (LangGraph, Python, RAG, MCP tool-calling), Data Engineering (PySpark, Databricks, Azure Data Factory, Delta Lake), Full-Stack web development (React, TypeScript, Node.js, PostgreSQL), and High-Performance Frontend Systems.'
  },
  {
    category: 'Project Scoping & Delivery',
    question: 'How do you handle project timelines and fixed vs. milestone billing?',
    answer: 'We typically operate on clear milestone-based contracts or dedicated weekly sprints. After an initial technical discovery call, we deliver a concrete architectural proposal with defined deliverables, timelines, and fixed milestones so you never encounter unexpected budget overruns.'
  },
  {
    category: 'Security & Enterprise Governance',
    question: 'How do you ensure security, confidentiality, and IP ownership?',
    answer: 'All intellectual property, source code, data schemas, and documentation developed during your engagement belong 100% to your organization upon project completion. We operate under strict mutual Non-Disclosure Agreements (NDAs) and adhere to industry standard security best practices (OAuth 2.0 / SAML SSO, encrypted secrets management, and least-privilege cloud IAM).'
  },
  {
    category: 'Support & Post-Launch',
    question: 'What happens after the software is deployed to production?',
    answer: 'We provide structured post-launch warranty support, comprehensive architectural documentation, staff training, and optional ongoing maintenance retainers to ensure your systems remain stable, secure, and ready to evolve with your business.'
  }
];
