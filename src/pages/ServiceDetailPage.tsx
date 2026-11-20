import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  ServerCrash, 
  Bot, 
  Database, 
  Code2, 
  LayoutDashboard,
  Cpu,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ContactCtaSection } from '../components/common/ContactCtaSection';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const linkedProject = PROJECTS.find(p => p.slug === service.projectSlug);

  const getServiceIcon = (iconName: string) => {
    const props = { className: "w-8 h-8 text-blue-600" };
    switch (iconName) {
      case 'Layers': return <Layers {...props} />;
      case 'ServerCrash': return <ServerCrash {...props} className="w-8 h-8 text-cyan-600" />;
      case 'Bot': return <Bot {...props} className="w-8 h-8 text-indigo-600" />;
      case 'Database': return <Database {...props} className="w-8 h-8 text-emerald-600" />;
      case 'Code2': return <Code2 {...props} className="w-8 h-8 text-violet-600" />;
      case 'LayoutDashboard': return <LayoutDashboard {...props} className="w-8 h-8 text-amber-600" />;
      default: return <Cpu {...props} />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: 'Services', href: '/services' },
              { label: service.title }
            ]} 
          />

          <div className="flex items-center gap-4 mt-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              {getServiceIcon(service.iconName)}
            </div>
            <div>
              <span className="text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider">
                Enterprise Capability
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {service.title}
              </h1>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            {service.fullDesc}
          </p>

          {/* Quick CTA row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={`/demo/${service.demoSlug}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <span>Launch Working Demonstration</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {linkedProject && (
              <Link
                to={`/projects/${linkedProject.slug}`}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-300 transition-all"
              >
                <span>Read Project Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <Link
              to={`/contact?category=${encodeURIComponent(service.title)}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 py-2.5 px-3"
            >
              <Send className="w-3 h-3" />
              <span>Discuss Similar Project</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Deliverables */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            What We Deliver in This Practice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Core Technologies &amp; Platforms
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="bg-white text-slate-800 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-slate-200/90 shadow-2xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Common Business Use Cases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.useCases.map((uc, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <span className="text-xs font-bold text-slate-900">{uc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Business Benefits */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Business Value &amp; ROI
          </h2>
          <div className="space-y-3">
            {service.keyBenefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Live Working Demo Teaser Card */}
        {linkedProject && (
          <section className="p-8 bg-slate-900 rounded-2xl text-white border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                Independent Demonstration Project Available
              </span>
              <span className="text-xs text-slate-400">Interactive Application</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              Test {linkedProject.title} in Your Browser
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {linkedProject.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={linkedProject.demoRoute}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-md flex items-center gap-2 transition-all"
              >
                <span>Launch {linkedProject.title}</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                to={`/projects/${linkedProject.slug}`}
                className="text-slate-300 hover:text-white font-semibold text-xs underline"
              >
                View Architecture &amp; Case Study &rarr;
              </Link>
            </div>
          </section>
        )}

      </div>

      <ContactCtaSection />

    </div>
  );
};
