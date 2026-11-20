import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProjectCard } from '../components/cards/ProjectCard';
import { ContactCtaSection } from '../components/common/ContactCtaSection';
import { PROJECTS } from '../data/projects';
import { ShieldCheck, Search, Sparkles } from 'lucide-react';

export const ProjectsIndexPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Projects');

  const CATEGORY_TABS = [
    'All Projects',
    'Power Platform',
    'ServiceNow',
    'Artificial Intelligence',
    'Data Engineering',
    'Full Stack',
    'Frontend',
    'Digital Products'
  ];

  const filteredProjects = PROJECTS.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.tagline.toLowerCase().includes(search.toLowerCase()) ||
                        p.summary.toLowerCase().includes(search.toLowerCase()) ||
                        p.techStack.some(ts => ts.items.some(i => i.toLowerCase().includes(search.toLowerCase())));

    if (selectedFilter === 'All Projects') return matchSearch;
    if (selectedFilter === 'Power Platform') return matchSearch && p.serviceId === 'power-platform';
    if (selectedFilter === 'ServiceNow') return matchSearch && p.serviceId === 'servicenow';
    if (selectedFilter === 'Artificial Intelligence') return matchSearch && (p.serviceId === 'ai-automation' || p.serviceName.includes('AI'));
    if (selectedFilter === 'Data Engineering') return matchSearch && p.serviceId === 'data-engineering';
    if (selectedFilter === 'Full Stack') return matchSearch && p.serviceId === 'full-stack';
    if (selectedFilter === 'Frontend') return matchSearch && p.serviceId === 'frontend';
    if (selectedFilter === 'Digital Products') return matchSearch && (p.serviceId === 'digital-products' || Boolean(p.isLiveProduct));
    
    return matchSearch;
  });

  return (
    <div className="bg-white min-h-screen flex flex-col">
      
      {/* Header */}
      <div className="bg-slate-50/80 border-b border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Projects & Case Studies' }]} />

          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200/80 mb-3 mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
            <span>Interactive Demonstration Portfolio &amp; Live Digital Products</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Projects, Systems Architecture &amp; Live Products
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Every project below represents a real, working software application or live commercial digital product built by DevTechSoft. Explore architectural blueprints, inspect code implementations, or launch the live applications.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search projects, technologies, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Category Filter Pills (Exact requested set) */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No projects match your filter or search query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Conversion CTA Section */}
      <ContactCtaSection />

    </div>
  );
};
