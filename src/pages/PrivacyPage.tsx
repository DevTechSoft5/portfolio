import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-200/80 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Overview</h2>
          <p>
            DevTechSoft ("we", "our", or "the studio") respects your privacy. This policy outlines how information submitted through our portfolio and demonstration platform is handled.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Demonstration Data &amp; Local Persistence</h2>
          <p>
            All demonstration applications (including BusinessFlow 360, ServiceOps 360, NexaAI, DataPulse, BizCore, and VistaDash) run within your browser environment using browser LocalStorage. No synthetic demonstration data (e.g. simulated customer records, tickets, or shopping cart items) is transmitted to external servers. You can clear this data at any time using the "Reset Demo Data" button.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Contact Inquiries</h2>
          <p>
            Information submitted through our project inquiry form (including your name, email, company, and project description) is collected solely for the purpose of communicating regarding potential engineering engagements. We do not sell, rent, or distribute your contact details to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Optional API Keys</h2>
          <p>
            If you choose to test our NexaAI agent using your own OpenAI API key, that key remains strictly within your browser's client-side memory session and is never logged or saved to any DevTechSoft server.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Contact</h2>
          <p>
            For privacy inquiries, please contact <a href="mailto:devtechsoft5@gmail.com" className="text-blue-600 font-mono hover:underline">devtechsoft5@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
