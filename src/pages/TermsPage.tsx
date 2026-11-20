import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-200/80 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing DevTechSoft's website and interactive demonstration applications, you agree to these Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Demonstration Software Disclaimer</h2>
          <p>
            The software applications presented under the <code className="text-blue-600 font-mono">/demo/*</code> routes are interactive prototypes engineered to showcase software architecture, user interface patterns, and workflow logic. All customer records, financial numbers, SLA incidents, and logs contained within are synthetic. They do not represent real-world corporate records or existing third-party client contracts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            The DevTechSoft name, brand identity, website source code, design systems, and original demonstration implementations are the property of DevTechSoft. Client project contracts grant 100% intellectual property ownership to the client upon milestone payment as specified in individual Master Services Agreements (MSAs).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            The demonstration systems are provided "as-is" for technical demonstration purposes without warranties of uninterrupted availability.
          </p>
        </section>
      </div>
    </div>
  );
};
