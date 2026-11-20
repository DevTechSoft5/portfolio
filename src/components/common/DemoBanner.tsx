import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, RotateCcw, Send, ExternalLink, ShieldAlert } from 'lucide-react';

interface DemoBannerProps {
  projectName: string;
  projectSlug: string;
  category: string;
  onResetData?: () => void;
  resetLabel?: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  projectName,
  projectSlug,
  category,
  onResetData,
  resetLabel = 'Reset Sample Data'
}) => {
  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 sticky top-0 z-50 px-4 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Indicator & Case Study link */}
        <div className="flex items-center gap-3">
          <Link 
            to={`/projects/${projectSlug}`}
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded border border-slate-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
            <span>Case Study</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white tracking-tight">{projectName}</span>
            <span className="hidden sm:inline text-slate-400">&bull;</span>
            <span className="hidden sm:inline-block bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded text-[11px] font-medium border border-blue-700/50">
              Interactive Prototype
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 ml-auto">
          {onResetData && (
            <button
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1 rounded border border-slate-700/80 transition-colors text-[11px]"
              title="Restore demo to initial sample state"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>{resetLabel}</span>
            </button>
          )}

          <Link
            to={`/contact?category=${encodeURIComponent(category)}`}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1 rounded transition-colors text-[11px] shadow-sm active:scale-95"
          >
            <Send className="w-3 h-3" />
            <span>Hire DevTechSoft</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
