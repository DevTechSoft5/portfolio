import React from 'react';
import { Search, Compass, Cpu, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowWeWork: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Architectural Discovery',
      description: 'We analyze your workflows, data structures, and operational bottlenecks. We define concrete deliverables, tech stacks, and delivery milestones upfront with zero ambiguity.',
      icon: Search,
      deliverable: 'Technical Architecture & Fixed Scope Proposal'
    },
    {
      step: '02',
      title: 'Interactive Prototype',
      description: 'Before writing heavyweight production code, we build an interactive system skeleton. You test real workflows, entity models, and screen transitions to validate business logic.',
      icon: Compass,
      deliverable: 'Clickable Working Prototype & Data Models'
    },
    {
      step: '03',
      title: 'Iterative Engineering',
      description: 'Clean, test-driven development delivered in weekly milestone demos. You have continuous visibility into the code, automated test suites, and staging environments.',
      icon: Cpu,
      deliverable: 'Weekly Staging Deploys & Code Access'
    },
    {
      step: '04',
      title: 'Production Handover',
      description: 'We orchestrate secure cloud deployments, configure CI/CD pipelines, conduct staff training sessions, and deliver complete documentation with full IP transfer.',
      icon: Rocket,
      deliverable: '100% IP Transfer, Runbooks & Warranty'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3">
            <span>Our Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How DevTechSoft Delivers Results
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            A disciplined, engineer-first approach built on clear milestones, transparent code, and zero communication middlemen.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Core Outcome
                  </div>
                  <div className="text-xs font-medium text-slate-800 mt-0.5">
                    {item.deliverable}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>Have a project in mind? Let's discuss timelines and budget</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
