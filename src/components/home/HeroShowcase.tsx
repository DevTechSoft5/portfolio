import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Play, 
  Terminal, 
  Bot, 
  Database, 
  Layers, 
  Clock, 
  BarChart3,
  ExternalLink
} from 'lucide-react';

export const HeroShowcase: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-100">
      
      {/* Subtle Background Enterprise Grid */}
      <div className="absolute inset-0 bg-enterprise-grid [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 bg-blue-50/90 border border-blue-200/80 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Independent Software Studio &bull; Available for Enterprise Work</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Building Software That Moves Businesses Forward.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              From enterprise applications and intelligent automation to AI-powered systems, DevTechSoft transforms complex business requirements into practical digital solutions.
            </p>

            {/* Credibility badges */}
            <div className="text-xs sm:text-sm text-slate-500 flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                Solo-Founded Senior Studio
              </span>
              <span className="text-slate-300 hidden sm:inline">&bull;</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                6 Live Interactive Demos
              </span>
              <span className="text-slate-300 hidden sm:inline">&bull;</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                Zero Agency Markup
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                to="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3.5 rounded-xl border border-slate-300/90 shadow-2xs hover:border-slate-400 transition-all text-sm"
              >
                <span>Start a Project</span>
              </Link>
            </div>

            {/* Fast Demo Bar */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5 font-mono">
                Explore Working Demonstration Applications:
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {[
                  { name: 'Power Platform CRM', route: '/demo/powerapps-crm' },
                  { name: 'ServiceNow ITSM', route: '/demo/servicenow' },
                  { name: 'NexaAI Agent', route: '/demo/ai-agent' },
                  { name: 'DataPulse Lakehouse', route: '/demo/data-engineering' },
                  { name: 'BizCore Commerce', route: '/demo/fullstack' },
                  { name: 'VistaDash Analytics', route: '/demo/frontend' },
                ].map((demo, idx) => (
                  <Link
                    key={idx}
                    to={demo.route}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50/80 px-2.5 py-1 rounded-md border border-slate-200/90 hover:border-blue-200 transition-colors shadow-2xs"
                  >
                    <Play className="w-2.5 h-2.5 text-blue-500 fill-blue-500" />
                    <span>{demo.name}</span>
                  </Link>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Realistic Overlapping Product Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Back Card: ServiceNow Incident SLA Preview */}
              <div className="absolute -top-6 -right-3 sm:-right-6 w-11/12 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 p-4 transform rotate-1 hidden sm:block pointer-events-none opacity-90">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 mb-2 font-mono">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>ServiceOps 360 &bull; ITSM Triage</span>
                  </span>
                  <span className="text-emerald-400 font-bold">SLA: 99.4% Met</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-mono border border-rose-800">INC001092</span>
                  <span className="truncate text-slate-200">PostgreSQL Read Replica Lag Escalation</span>
                  <span className="ml-auto text-amber-400 font-mono text-[10px]">00:48:12</span>
                </div>
              </div>

              {/* Main Card: Power Platform & Dataverse CRM */}
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 sm:p-6 relative z-10 space-y-4">
                
                {/* Window Controls */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="text-xs font-bold text-slate-800 ml-2 tracking-tight">BusinessFlow 360</span>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                    Dataverse Live
                  </span>
                </div>

                {/* Dashboard Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-medium text-slate-500">Active Pipeline</span>
                    <div className="text-xl font-extrabold text-slate-900 mt-0.5 font-mono">$1,845,000</div>
                    <span className="text-[10px] text-emerald-600 font-semibold">+14.2% MoM</span>
                  </div>
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-medium text-slate-500">Pending Approvals</span>
                    <div className="text-xl font-extrabold text-slate-900 mt-0.5 font-mono">3 Requests</div>
                    <span className="text-[10px] text-amber-600 font-semibold">1 Critical Capex</span>
                  </div>
                </div>

                {/* Live Customer Table preview */}
                <div className="space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Recent Customer Accounts
                  </div>
                  {[
                    { name: 'Apex Health Systems', stage: 'Enterprise', val: '$420,000', rep: 'Sarah K.' },
                    { name: 'Vanguard Logistics', stage: 'Contract Won', val: '$280,000', rep: 'Marcus L.' },
                    { name: 'Strata Cloud Solutions', stage: 'Proposal Review', val: '$195,000', rep: 'Alex P.' },
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-100 text-[11px]">
                      <div>
                        <div className="font-semibold text-slate-900">{row.name}</div>
                        <div className="text-slate-400 text-[10px]">{row.stage} &bull; {row.rep}</div>
                      </div>
                      <div className="font-mono font-bold text-slate-700">{row.val}</div>
                    </div>
                  ))}
                </div>

                {/* Card CTA Footer */}
                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                  <span className="text-slate-400 text-[11px]">Synthetic demo telemetry</span>
                  <Link
                    to="/demo/powerapps-crm"
                    className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Interact with this app</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </div>
              </div>

              {/* Floating Bottom Card: NexaAI Agent Execution Trace */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 w-10/12 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 p-3.5 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-white truncate">NexaAI Autonomous Agent</span>
                      <span className="text-indigo-400 font-mono text-[10px]">LangGraph</span>
                    </div>
                    <div className="text-[10px] text-slate-300 truncate mt-0.5">
                      Executed: <code className="text-indigo-300 font-mono">ticket_lookup(id="INC-4091")</code>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
