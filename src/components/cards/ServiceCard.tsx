import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Layers, 
  ServerCrash, 
  Bot, 
  Database, 
  Code2, 
  LayoutDashboard, 
  Sparkles, 
  Play 
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { SERVICES } from '../../data/services';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5", strokeWidth: 1.75 };
    switch (iconName) {
      case 'Layers': return <Layers {...props} className="w-5 h-5 text-blue-600" />;
      case 'ServerCrash': return <ServerCrash {...props} className="w-5 h-5 text-cyan-600" />;
      case 'Bot': return <Bot {...props} className="w-5 h-5 text-indigo-600" />;
      case 'Database': return <Database {...props} className="w-5 h-5 text-emerald-600" />;
      case 'Code2': return <Code2 {...props} className="w-5 h-5 text-violet-600" />;
      case 'LayoutDashboard': return <LayoutDashboard {...props} className="w-5 h-5 text-amber-600" />;
      default: return <Sparkles {...props} className="w-5 h-5 text-blue-600" />;
    }
  };

  const serviceIndex = SERVICES.findIndex(s => s.id === service.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400/60 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Top Header */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all shadow-2xs">
            {getIcon(service.iconName)}
          </div>
          <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/70">
            0{serviceIndex >= 0 ? serviceIndex + 1 : 1}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 tracking-tight">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {service.shortDesc}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {service.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200/70"
            >
              {tech}
            </span>
          ))}
          {service.technologies.length > 4 && (
            <span className="text-[11px] text-slate-400 self-center pl-1 font-mono">
              +{service.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
        <Link
          to={`/services/${service.slug}`}
          className="text-slate-700 hover:text-blue-600 flex items-center gap-1.5 py-1 transition-colors"
        >
          <span>Service Details</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </Link>

        <Link
          to={`/demo/${service.demoSlug}`}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg shadow-xs hover:shadow transition-all"
        >
          <span>Live Demo</span>
          <Play className="w-3 h-3 fill-white" />
        </Link>
      </div>

    </div>
  );
};
