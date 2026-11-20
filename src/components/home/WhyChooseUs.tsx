import React from 'react';
import { UserCheck, ShieldCheck, Zap, Lock, Code, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Direct Architect Collaboration',
      description: 'You work directly with the senior full-stack engineer and enterprise architect designing your solution. No junior developers learning on your budget, and no account managers distorting technical requirements.',
      icon: UserCheck
    },
    {
      title: 'Transparent Proof of Capability',
      description: 'Rather than presenting generic slide decks or stock screenshots, DevTechSoft develops live, interactive software applications you can click and test before signing any contract.',
      icon: ShieldCheck
    },
    {
      title: 'Enterprise-Grade Security Standards',
      description: 'We build with role-based access control (RBAC), SSO authentication (OAuth/SAML), strict input sanitization, least-privilege cloud IAM, and zero hardcoded credentials.',
      icon: Lock
    },
    {
      title: '100% IP Ownership & Clean Code',
      description: 'Every line of code, infrastructure configuration, data schema, and workflow script is fully transferred to your company with thorough documentation upon milestone completion.',
      icon: Code
    },
    {
      title: 'Rapid, Lean Execution',
      description: 'Without agency bureaucracy, our solo-studio model delivers functional prototypes in days and production-grade systems in weeks, saving you time and capital.',
      icon: Zap
    },
    {
      title: 'Zero Artificial Lock-In',
      description: 'We build on standard, widely supported open-source and enterprise platforms (Microsoft, ServiceNow, React, Python) so your internal engineers can easily maintain and extend the code.',
      icon: CheckCircle2
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-semibold text-blue-400 mb-3">
            <span>Studio Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why High-Growth Teams Choose DevTechSoft
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            The technical depth of a senior enterprise consultant combined with the execution speed and focus of an independent software studio.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-800/60 rounded-2xl p-7 border border-slate-700/80 hover:border-blue-500/80 transition-all flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
