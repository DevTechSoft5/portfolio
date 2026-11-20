import React from 'react';
import { Layers, ServerCrash, Bot, Database, Globe, Shield } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const categories = [
    {
      title: 'Enterprise Low-Code & Microsoft',
      icon: Layers,
      color: 'text-blue-600',
      skills: ['Power Apps (Canvas & Model)', 'Power Automate', 'Power BI Embedded', 'Microsoft Dataverse', 'SharePoint Online', 'Azure Logic Apps']
    },
    {
      title: 'ServiceNow & IT Operations',
      icon: ServerCrash,
      color: 'text-cyan-600',
      skills: ['ServiceNow ITSM', 'Glide API & Scripting', 'Flow Designer', 'Service Catalog', 'SLA Milestone Engine', 'REST Integrations']
    },
    {
      title: 'AI & Autonomous Agent Systems',
      icon: Bot,
      color: 'text-indigo-600',
      skills: ['Python & FastAPI', 'LangGraph', 'Retrieval-Augmented Gen (RAG)', 'MCP Tool Calling', 'Vector Databases (Pinecone/Qdrant)', 'LLM Guardrails']
    },
    {
      title: 'Data Engineering & Cloud Lakehouses',
      icon: Database,
      color: 'text-emerald-600',
      skills: ['Apache Spark / PySpark', 'Databricks', 'Azure Data Factory', 'Delta Lake ACID', 'Data Quality Testing', 'SQL Warehousing']
    },
    {
      title: 'Modern Full-Stack & APIs',
      icon: Globe,
      color: 'text-violet-600',
      skills: ['React 19 & TypeScript', 'Node.js & Express', 'PostgreSQL & SQLite', 'RESTful & GraphQL APIs', 'Tailwind CSS', 'Vite & Next.js']
    },
    {
      title: 'Security, Cloud & Governance',
      icon: Shield,
      color: 'text-amber-600',
      skills: ['Azure Entra ID (SSO)', 'OAuth 2.0 / JWT', 'Docker Containers', 'CI/CD GitHub Actions', 'SOC 2 / ITIL Compliance', 'Cloudflare Pages & Workers']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-3">
            <span>Engineering Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Battle-Tested Technologies We Build With
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            We select technology stacks based on reliability, enterprise support, security postures, and long-term maintainability for your team.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
