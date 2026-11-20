import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Copy, 
  Sliders, 
  Camera, 
  Layers, 
  Compass, 
  Check,
  ShieldCheck
} from 'lucide-react';

export const FeaturedProductShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      
      {/* Background glow and subtle dot matrix */}
      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-xs font-semibold text-blue-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Independently Developed Digital Product</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Product: PromptImageLab
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              An independent AI-focused digital platform designed to make AI prompting, learning, and productivity tools more accessible. Conceived, architected, and operated by DevTechSoft.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/projects/promptimagelab"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-700/80 hover:bg-slate-800 transition-colors"
            >
              Read Case Study
            </Link>
            <a
              href="https://promptimagelab.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all active:scale-95"
            >
              <span>Explore PromptImageLab</span>
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* Product Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  AI Tools &amp; Digital Product Development
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Active Live Web App</span>
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Empowering Creators with Generative Visual AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                PromptImageLab bridges the gap between complex diffusion parameters (Midjourney, DALL-E, Stable Diffusion, Flux) and creators. It offers structured visual prompt generators, curated modifier libraries, and educational resources.
              </p>
            </div>

            {/* Core Features */}
            <div className="space-y-3 pt-2">
              {[
                { title: 'Curated Prompt Blueprints', desc: 'Pre-tested prompts categorized by photography style, cinematic lighting, and 3D architectural rendering.' },
                { title: 'Interactive Modifier Matrix', desc: 'One-click adjustments for aspect ratios (--ar 16:9), camera lenses (85mm f/1.4), and stylization flags.' },
                { title: 'Instant Clipboard Export', desc: 'Copy-ready formatted strings designed for seamless copy-pasting into Midjourney Discord and web interfaces.' },
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-md bg-blue-950 border border-blue-800/80 flex items-center justify-center shrink-0 mt-0.5 text-blue-400">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="font-bold text-white">{feat.title}:</span>{' '}
                    <span className="text-slate-400">{feat.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs">
              <a
                href="https://promptimagelab.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Visit PromptImageLab.com</span>
                <ExternalLink className="w-4 h-4" strokeWidth={2} />
              </a>

              <span className="text-slate-500 text-[11px] font-mono">
                Independent Studio Release
              </span>
            </div>
          </div>

          {/* Right: High-Fidelity UI Mockup of PromptImageLab */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f172a] rounded-2xl border border-slate-700/80 shadow-2xl p-5 space-y-4">
              
              {/* Browser chrome header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-slate-400 font-mono text-[11px] ml-2 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-slate-500" />
                    <span>promptimagelab.com</span>
                  </span>
                </div>
                <span className="text-[10px] bg-blue-950 text-blue-300 font-mono px-2 py-0.5 rounded border border-blue-800">
                  Live Web Product
                </span>
              </div>

              {/* Mockup Body: Prompt Blueprint Explorer */}
              <div className="bg-[#0a0f1d] rounded-xl p-4 border border-slate-800 space-y-3 font-sans">
                
                {/* Search & Style Filter Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80 text-[11px]">
                  <span className="font-bold text-white tracking-tight">AI Prompt Blueprint Engine</span>
                  <div className="flex gap-1.5 font-mono text-[10px]">
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-semibold">Photorealism</span>
                    <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Cinematic</span>
                    <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Cyberpunk</span>
                  </div>
                </div>

                {/* Sample Prompt Card 1 */}
                <div className="bg-[#131b2e] p-3.5 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="text-blue-400 font-semibold">Category: Architectural Visuals</span>
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">Midjourney v6.1</span>
                  </div>
                  <p className="text-xs text-slate-200 font-mono leading-relaxed bg-[#0a0f1d] p-2.5 rounded border border-slate-800/80">
                    "Ultra-minimalist Brutalist villa built into Norwegian fjord cliffs, floor-to-ceiling glass, golden hour volumetric haze, shot on Hasselblad H6D-100c, 35mm lens, raw photo --ar 16:9 --style raw --v 6.1"
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-400 text-[10px]">Aspect: 16:9 &bull; Style: Raw &bull; Clean Lighting</span>
                    <span className="text-emerald-400 font-semibold text-[10px] flex items-center gap-1 font-mono">
                      <Check className="w-3 h-3" />
                      <span>Validated Syntax</span>
                    </span>
                  </div>
                </div>

                {/* Sample Prompt Card 2 */}
                <div className="bg-[#131b2e] p-3.5 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="text-purple-400 font-semibold">Category: Sci-Fi Industrial Product Design</span>
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">DALL-E 3 &amp; Flux</span>
                  </div>
                  <p className="text-xs text-slate-200 font-mono leading-relaxed bg-[#0a0f1d] p-2.5 rounded border border-slate-800/80 truncate">
                    "Modular tactical smartwatch, matte titanium casing, glowing sapphire dial, exploded engineering diagram..."
                  </p>
                </div>

              </div>

              {/* Bottom bar of preview */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                <span>Production Status: ONLINE</span>
                <span className="text-blue-400 font-semibold">https://promptimagelab.com/ &rarr;</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
