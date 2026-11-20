import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

export const ContactCtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Background glow and subtle dot matrix */}
      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-6">
        
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 bg-blue-950/90 border border-blue-800/80 px-3.5 py-1 rounded-full text-xs font-semibold text-blue-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Direct Architectural Consultation</span>
        </div>

        {/* Heading mandated in prompt */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
          Have a Project in Mind?
        </h2>

        {/* Supporting text mandated in prompt */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Let's turn your business requirements into a reliable digital solution.
        </p>

        {/* Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2} />
            <span>24-Hour Technical Response</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2} />
            <span>Fixed-Milestone Scoping</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2} />
            <span>100% Intellectual Property Transfer</span>
          </span>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>

          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-semibold px-7 py-3.5 rounded-xl border border-slate-700 transition-all"
          >
            <span>Explore Working Demos First</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
