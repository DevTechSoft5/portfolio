import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ServiceCard } from '../components/cards/ServiceCard';
import { SERVICES } from '../data/services';
import { ContactCtaSection } from '../components/common/ContactCtaSection';
import { Sparkles, Search } from 'lucide-react';

export const ServicesIndexPage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredServices = SERVICES.filter(s => 
    s.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.technologies.some(t => t.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="bg-white min-h-screen">
      
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Services' }]} />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 mt-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Technology Services &amp; Capabilities
          </h1>

          <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
            From low-code enterprise operations and ServiceNow ITSM to autonomous AI agents, PySpark data lakehouses, and high-density frontend applications.
          </p>

          {/* Search */}
          <div className="mt-6 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services or technologies (e.g. Dataverse, LangGraph, PySpark)..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      <ContactCtaSection />

    </div>
  );
};
