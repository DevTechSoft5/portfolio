import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  UserCheck, 
  Code, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { ContactCtaSection } from '../components/common/ContactCtaSection';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Page Header */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'About DevTechSoft' }]} />
          
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200/80 mb-4 mt-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Independent Solo-Founded Engineering Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Engineering Digital Experiences. Automating What's Next.
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            DevTechSoft combines software engineering, enterprise automation, and modern AI technologies to help businesses build better digital products.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Studio Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            About the Studio
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            DevTechSoft was founded to solve a pervasive frustration in enterprise software delivery: bloated agency hierarchies, account managers who don't understand code, junior engineers learning on client retainers, and slideware prototypes that break the moment real business users touch them.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            We operate as a high-velocity, solo-founded software development studio. When you hire DevTechSoft, you partner directly with a senior full-stack architect and enterprise automation consultant who leads every phase—from initial systems modeling and database schema design to automated unit testing, cloud infrastructure deployment, and production cutover.
          </p>
        </section>

        {/* Founder Profile */}
        <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              DT
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Senior Full-Stack Architect &amp; Studio Founder</h3>
              <p className="text-xs text-slate-500 mt-0.5">Enterprise Software Consultant &bull; Systems Engineer &bull; AI Automation Specialist</p>
            </div>
          </div>

          <div className="text-slate-600 text-sm leading-relaxed space-y-3 pt-2 border-t border-slate-200/80">
            <p>
              With extensive hands-on experience designing distributed architectures, low-code enterprise ecosystems (Power Platform &amp; ServiceNow), data engineering lakehouses, and autonomous AI agents, the founder acts as your direct technical co-pilot.
            </p>
            <p>
              Rather than inventing fictitious customer logos, fake review ratings, or fabricated employee rosters, DevTechSoft lets working software speak for itself. Every demonstration system on this platform was built independently to prove architectural competence, security diligence, and meticulous design execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Direct Engagement</span>
              <span className="font-bold text-slate-900 mt-1 block">Zero Account Managers</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Code Ownership</span>
              <span className="font-bold text-slate-900 mt-1 block">100% IP Transfer</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Delivery Standard</span>
              <span className="font-bold text-slate-900 mt-1 block">Milestone-Backed Guarantees</span>
            </div>
          </div>
        </section>

        {/* Engineering Philosophy */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Our Engineering Philosophy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Working Software Over Slides',
                desc: 'We never present static wireframes without a concrete technical path to implementation. We build interactive prototypes with real relational state so you validate workflows before production investment.',
                icon: Terminal
              },
              {
                title: 'Deterministic AI Guardrails',
                desc: 'We do not build gimmicky chatbots. We architect pragmatic agentic workflows with strict schema tool calling (MCP), verified retrieval (RAG), and deterministic fallbacks to eliminate hallucinations.',
                icon: Cpu
              },
              {
                title: 'Radical Transparency',
                desc: 'You receive weekly staging deployments, access to the Git repository, and clear time-tracking logs. If an architectural decision poses trade-offs, we explain it candidly with zero sugarcoating.',
                icon: ShieldCheck
              },
              {
                title: 'Maintainable, Low-Debt Systems',
                desc: 'We write strict TypeScript, clean domain services, and well-structured database schemas. When our engagement concludes, your internal engineers can easily understand, deploy, and expand the code.',
                icon: Code
              }
            ].map((phil, idx) => {
              const Icon = phil.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{phil.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{phil.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Development Process */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How We Partner With You
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Engagements begin with a complimentary 30-minute discovery call to review your goals, existing technical debt, and target launch window. Within 48 hours, DevTechSoft delivers a concrete architectural specification document with fixed milestone pricing.
          </p>

          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
            >
              <span>Schedule an Architectural Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>

      <ContactCtaSection />

    </div>
  );
};
