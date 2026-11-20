import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Layers, 
  ServerCrash, 
  Bot, 
  Database, 
  Code2, 
  LayoutDashboard,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SERVICES } from '../../data/services';
import { PROJECTS } from '../../data/projects';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setProjectsDropdown(false);
  }, [location.pathname]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-4 h-4 text-blue-600" />;
      case 'ServerCrash': return <ServerCrash className="w-4 h-4 text-cyan-600" />;
      case 'Bot': return <Bot className="w-4 h-4 text-indigo-600" />;
      case 'Database': return <Database className="w-4 h-4 text-emerald-600" />;
      case 'Code2': return <Code2 className="w-4 h-4 text-violet-600" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-4 h-4 text-amber-600" />;
      default: return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3' 
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-105">
              <img 
                src="/devtechsoft-logo.png" 
                alt="DevTechSoft Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                DevTechSoft
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200/60">
                  Studio
                </span>
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:block tracking-wide">
                Engineering &amp; Automation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-blue-600 bg-blue-50/60 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <Link
                to="/services"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith('/services') 
                    ? 'text-blue-600 bg-blue-50/60 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Link>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-80 pt-2 animate-fadeIn z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 p-2 space-y-1">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Enterprise Capabilities
                    </div>
                    {SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        to={`/services/${s.slug}`}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                          {getServiceIcon(s.iconName)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                            {s.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">
                            {s.shortDesc}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-slate-100 px-2">
                      <Link 
                        to="/services" 
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center justify-between p-1.5"
                      >
                        <span>View All 6 Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProjectsDropdown(true)}
              onMouseLeave={() => setProjectsDropdown(false)}
            >
              <Link
                to="/projects"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith('/projects') 
                    ? 'text-blue-600 bg-blue-50/60 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Projects &amp; Demos
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Link>

              {projectsDropdown && (
                <div className="absolute top-full left-0 w-96 pt-2 animate-fadeIn z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 p-2 space-y-1">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Working Demonstrations</span>
                      <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Live Systems
                      </span>
                    </div>
                    {PROJECTS.map((p) => (
                      <Link
                        key={p.id}
                        to={`/projects/${p.slug}`}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                              {p.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {p.serviceName.split(' ')[0]}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">
                            {p.tagline}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-slate-100 px-2 flex items-center justify-between">
                      <Link 
                        to="/projects" 
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 p-1.5"
                      >
                        <span>Case Studies Overview</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/about' 
                  ? 'text-blue-600 bg-blue-50/60 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About Studio
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/contact' 
                  ? 'text-blue-600 bg-blue-50/60 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/projects"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Independent Studio</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-95"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              to="/contact"
              className="bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              Contact
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 pb-4 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
            >
              Home
            </Link>
            <div className="px-3 py-1 font-semibold text-xs text-slate-400 uppercase tracking-wider">
              Services
            </div>
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                to={`/services/${s.slug}`}
                className="block pl-6 pr-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
              >
                {s.title}
              </Link>
            ))}
            <div className="px-3 py-1 font-semibold text-xs text-slate-400 uppercase tracking-wider pt-2">
              Demonstration Projects
            </div>
            {PROJECTS.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.slug}`}
                className="block pl-6 pr-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
              >
                {p.title} <span className="text-xs text-slate-400">({p.serviceName})</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/about"
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
              >
                About DevTechSoft
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-lg text-base font-medium text-blue-600 hover:bg-blue-50 font-semibold"
              >
                Discuss a Project
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
