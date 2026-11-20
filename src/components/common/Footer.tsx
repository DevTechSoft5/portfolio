import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { PROJECTS } from '../../data/projects';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/devtechsoft-logo.png" 
                  alt="DevTechSoft Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                DevTechSoft
              </span>
            </div>
            
            <p className="text-slate-300 text-sm font-medium">
              Engineering Digital Experiences. Automating What's Next.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              DevTechSoft is an independent software development studio delivering custom Power Platform, ServiceNow, AI agentic automations, data engineering pipelines, and scalable web platforms.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open for New Projects &amp; Enterprise Consultations</span>
            </div>

            <div className="pt-1">
              <a 
                href="mailto:devtechsoft5@gmail.com" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>devtechsoft5@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link 
                    to={`/services/${s.slug}`} 
                    className="hover:text-white transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects & Live Demos */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Live Demonstrations
            </h4>
            <ul className="space-y-2 text-xs">
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  {p.externalUrl ? (
                    <a 
                      href={p.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors flex items-center justify-between group"
                    >
                      <span>{p.title}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                    </a>
                  ) : (
                    <Link 
                      to={p.demoRoute} 
                      className="hover:text-white transition-colors flex items-center justify-between group"
                    >
                      <span>{p.title}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Studio & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Studio &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About DevTechSoft
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  Case Studies &amp; Architecture
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Project Inquiries
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Honest Engineering</span>
                </div>
                <p className="text-[10px] leading-tight text-slate-500">
                  All demonstration platforms represent working architectural prototypes independently designed and authored by DevTechSoft.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} DevTechSoft. All rights reserved.</span>
            <span>&bull;</span>
            <span>Independent Software Studio</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">
              Contact
            </Link>
            <span className="font-mono text-[11px] text-slate-600">v1.0.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
