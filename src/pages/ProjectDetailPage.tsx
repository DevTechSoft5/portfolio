import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Play, 
  AlertTriangle,
  GitBranch,
  Workflow,
  Sparkles,
  Globe
} from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ContactCtaSection } from '../components/common/ContactCtaSection';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const isExternal = Boolean(project.externalUrl);

  // Visual Architecture Diagram Renderer
  const renderArchitectureFlow = () => {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-blue-400" strokeWidth={1.75} />
            <h3 className="font-bold text-sm text-white">System Architecture &amp; Data Flow Topology</h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
            Validated Enterprise Pattern
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {project.architecture.overview}
        </p>

        {/* 3-Tier Layered Architecture Graphic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {project.architecture.layers.map((layer, idx) => (
            <div key={idx} className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">Layer 0{idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>
              <h4 className="font-bold text-sm text-white">{layer.name}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">{layer.description}</p>
              
              <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-1">
                {layer.tech.map((t, tIdx) => (
                  <span key={tIdx} className="text-[10px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      
      {/* 1. Project Title & Executive Header */}
      <div className="bg-slate-50/80 border-b border-slate-200/80 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: 'Projects', href: '/projects' },
              { label: project.title }
            ]} 
          />

          <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              {project.serviceName}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${
              project.isLiveProduct ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
              <span>{project.badge}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-3xl mb-6">
            {project.tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {isExternal ? (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>{project.ctaLabel || 'Explore PromptImageLab'}</span>
                <ExternalLink className="w-4 h-4" strokeWidth={2} />
              </a>
            ) : (
              <Link
                to={project.demoRoute}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch Live Demonstration App</span>
              </Link>
            )}

            <Link
              to={`/contact?category=${encodeURIComponent(project.serviceName)}`}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold px-5 py-3 rounded-xl border border-slate-300 transition-all shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Discuss a Similar Project</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Case Study Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 flex-1">
        
        {/* 2. Business Problem & 3. Proposed Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" strokeWidth={2} />
              <span>The Problem &amp; Context</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Operational Challenges &amp; Bottlenecks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.businessProblem}
            </p>
          </section>

          <section className="bg-blue-50/60 rounded-2xl p-6 sm:p-7 border border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" strokeWidth={2} />
              <span>DevTechSoft Engineering Solution</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Unified Architecture &amp; Delivery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.proposedSolution}
            </p>
          </section>
        </div>

        {/* 4. Main Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Core Features &amp; Functional Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.features.map((feat, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2} />
                  <h3 className="font-bold text-sm text-slate-900">{feat.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Technology Stack */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Technology Stack &amp; Foundations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.techStack.map((cat, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
                  {cat.category}
                </span>
                <div className="space-y-1">
                  {cat.items.map((item, iIdx) => (
                    <div key={iIdx} className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Architecture Diagram */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Architecture Blueprint &amp; Layer Design
          </h2>
          {renderArchitectureFlow()}
        </section>

        {/* 7. Product Screenshots / Interface Previews */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Implemented Product Interface
            </h2>
            {isExternal ? (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Visit promptimagelab.com</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
              </a>
            ) : (
              <Link
                to={project.demoRoute}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Open live interactive demo</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            )}
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
              <span className="font-mono text-slate-400">Application Sandbox: {project.title}</span>
              <span className="text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                {isExternal ? 'Live Production Application' : '100% Functional in Browser'}
              </span>
            </div>

            <div className="bg-[#0b1120] rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
                {isExternal ? <Globe className="w-6 h-6" strokeWidth={1.75} /> : <Play className="w-6 h-6 fill-current" />}
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="font-bold text-base text-white">Experience {project.title} Directly</h4>
                <p className="text-xs text-slate-400 mt-1">
                  {isExternal 
                    ? 'Explore the live digital product, prompt libraries, and tool workflows directly at promptimagelab.com.' 
                    : 'Interact with real forms, create records, trigger workflows, and view live state persistence in browser storage.'}
                </p>
              </div>

              {isExternal ? (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-md transition-all active:scale-95"
                >
                  <span>{project.ctaLabel || 'Explore PromptImageLab'}</span>
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
                </a>
              ) : (
                <Link
                  to={project.demoRoute}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-md transition-all active:scale-95"
                >
                  <span>Launch {project.title} Demo Now</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* 8. Key Workflows */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Key Operational Workflows
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.keyWorkflows.map((flow, idx) => (
              <div key={idx} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider font-mono">
                  <Workflow className="w-4 h-4" strokeWidth={1.75} />
                  <span>Workflow {idx + 1}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900">{flow.name}</h3>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal pl-4 leading-relaxed">
                  {flow.steps.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Implementation Details */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Implementation Details &amp; Engineering Decisions
          </h2>
          <div className="space-y-3">
            {project.implementationDetails.map((detail, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2} />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Limitations and Production Cloud Integrations */}
        <section className="bg-slate-900 text-slate-300 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4" strokeWidth={2} />
            <span>Production Deployment &amp; Cloud Integration Roadmap</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Enterprise Architecture &amp; Scale
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
            DevTechSoft provides full-lifecycle engineering from initial proof of concept to global cloud infrastructure:
          </p>

          <div className="space-y-2 pt-2 text-xs">
            {project.productionIntegrationNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-200">
                <span className="text-blue-400 font-mono font-bold">&bull;</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Conversion CTA Section */}
      <ContactCtaSection />

    </div>
  );
};
