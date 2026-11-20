import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { HeroShowcase } from '../components/home/HeroShowcase';
import { ServiceCard } from '../components/cards/ServiceCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { FeaturedProductShowcase } from '../components/home/FeaturedProductShowcase';
import { HowWeWork } from '../components/home/HowWeWork';
import { TechStackSection } from '../components/home/TechStackSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { FaqSection } from '../components/home/FaqSection';
import { ContactCtaSection } from '../components/common/ContactCtaSection';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section with Overlapping Application Showcase */}
      <HeroShowcase />

      {/* 2. What We Build — Six Interactive Service Cards */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-200/80" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Core Specializations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What We Build
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Every service includes full architectural planning, production development, automated testing, and a live working prototype.
            </p>
          </div>

          {/* 6 Interactive Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Explore all enterprise capabilities in detail</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. Featured Independent Digital Product: PromptImageLab */}
      <FeaturedProductShowcase />

      {/* 4. Featured Projects & Case Studies */}
      <section className="py-20 bg-white border-b border-slate-200/80" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
                <span>Interactive Software Demonstrations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Featured Architecture &amp; Case Studies
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                Rather than static mockups or fabricated client logos, we provide fully functioning software applications you can launch and test right now.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-colors shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. How We Work */}
      <HowWeWork />

      {/* 6. Technology Stack */}
      <TechStackSection />

      {/* 7. Why DevTechSoft */}
      <WhyChooseUs />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Conversion CTA Section: "Have a Project in Mind?" */}
      <ContactCtaSection />

    </div>
  );
};
