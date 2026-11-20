import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, CheckCircle2, Globe, Play } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isExternal = Boolean(project.externalUrl);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400/60 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Top Banner with Badges */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-md border border-blue-200/60">
            {project.serviceName}
          </span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
            project.isLiveProduct 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold' 
              : 'bg-slate-100 text-slate-600 border-slate-200/80'
          }`}>
            {project.badge}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 tracking-tight">
          {project.title}
        </h3>

        <p className="text-xs font-medium text-slate-500 mb-4 line-clamp-1">
          {project.tagline}
        </p>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
          {project.summary}
        </p>

        {/* Key Features preview */}
        <div className="space-y-2 mb-6 mt-auto">
          {project.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2} />
              <span className="line-clamp-1"><strong className="text-slate-900 font-medium">{feat.title}:</strong> {feat.description}</span>
            </div>
          ))}
        </div>

        {/* Technologies preview */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
          {project.techStack.flatMap(ts => ts.items).slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
        <Link
          to={`/projects/${project.slug}`}
          className="text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors py-1"
        >
          <span>Read Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </Link>

        {isExternal ? (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg shadow-xs hover:shadow transition-all"
          >
            <span>{project.ctaLabel || 'Explore Product'}</span>
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
          </a>
        ) : (
          <Link
            to={project.demoRoute}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg shadow-xs hover:shadow transition-all"
          >
            <span>Launch Demo</span>
            <Play className="w-3 h-3 fill-white" />
          </Link>
        )}
      </div>

    </div>
  );
};
