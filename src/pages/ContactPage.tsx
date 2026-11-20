import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Video, 
  ShieldCheck, 
  Clock, 
  Copy, 
  Check, 
  HelpCircle,
  Sparkles,
  Lock
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ContactSubmission } from '../types';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    category: categoryParam || 'Full Stack',
    budget: '$10,000 - $25,000',
    description: '',
    preferredContact: 'email' as 'email' | 'phone' | 'video',
    honeypot: '' // spam protection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [submissionRecord, setSubmissionRecord] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    if (categoryParam) {
      setFormData(prev => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 20) {
      newErrors.description = 'Please provide at least 20 characters describing your project goals.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // bot detected
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const record: ContactSubmission = {
        id: `INQ-${Date.now().toString().slice(-6)}`,
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Not Specified',
        category: formData.category,
        budget: formData.budget,
        description: formData.description,
        preferredContact: formData.preferredContact,
        createdAt: new Date().toLocaleString()
      };

      // Save submission in localStorage
      const existing = JSON.parse(localStorage.getItem('devtech_inquiries') || '[]');
      localStorage.setItem('devtech_inquiries', JSON.stringify([record, ...existing]));

      setSubmissionRecord(record);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleCopySummary = () => {
    if (!submissionRecord) return;
    const text = `DevTechSoft Project Inquiry:\nID: ${submissionRecord.id}\nName: ${submissionRecord.name}\nEmail: ${submissionRecord.email}\nCompany: ${submissionRecord.company}\nCategory: ${submissionRecord.category}\nBudget: ${submissionRecord.budget}\nPreferred Contact: ${submissionRecord.preferredContact}\n\nDescription:\n${submissionRecord.description}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Contact & Inquiries' }]} />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 mt-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Architect Access</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Discuss Your Next Project
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Reach out directly to DevTechSoft. We respond within 24 hours with an initial architectural perspective and delivery roadmap.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            {isSubmitted && submissionRecord ? (
              <div className="bg-slate-50 rounded-2xl p-8 border border-emerald-200 space-y-6 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Inquiry Reference: {submissionRecord.id}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">
                    Inquiry Received Successfully!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Thank you, {submissionRecord.name}. Your project details have been logged in our studio queue. We will review your requirements and respond to <strong className="text-slate-900">{submissionRecord.email}</strong> within 24 business hours.
                  </p>
                </div>

                {/* Submission Summary Card */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between text-slate-500">
                    <span>Category:</span>
                    <strong className="text-slate-900">{submissionRecord.category}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Target Budget:</span>
                    <strong className="text-slate-900">{submissionRecord.budget}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Contact Channel:</span>
                    <strong className="text-slate-900 uppercase">{submissionRecord.preferredContact}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 px-3.5 py-2 rounded-lg text-slate-700 transition-colors"
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? 'Copied to Clipboard' : 'Copy Inquiry Summary'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmissionRecord(null);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        category: 'Full Stack',
                        budget: '$10,000 - $25,000',
                        description: '',
                        preferredContact: 'email',
                        honeypot: ''
                      });
                    }}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
                
                {/* Honeypot field for spam bots */}
                <div className="hidden">
                  <input
                    type="text"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Johnathan Miller"
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-rose-300 bg-rose-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="user@organization.com"
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-rose-300 bg-rose-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Vanguard Logistics"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Project Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="Power Platform">Power Platform Development</option>
                      <option value="ServiceNow">ServiceNow Solutions</option>
                      <option value="AI & Agentic Automation">AI &amp; Agentic Automation</option>
                      <option value="Data Engineering">Data Engineering &amp; Analytics</option>
                      <option value="Full Stack">Full-Stack Development</option>
                      <option value="Frontend Development">Frontend Engineering</option>
                      <option value="AI Tools & Digital Products">AI Tools &amp; Digital Products</option>
                      <option value="Other">Other / Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Expected Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="$5,000 - $10,000">$5,000 - $10,000 (Scoping &amp; Prototype)</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000 (Standard MVP / Automation)</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000 (Full Enterprise System)</option>
                    <option value="$50,000+">$50,000+ (Multi-stage Cloud Architecture)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Project Goals &amp; Technical Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us about your business problem, systems to integrate, and timeline expectations..."
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description ? 'border-rose-300 bg-rose-50/50' : 'border-slate-300'
                    }`}
                  />
                  {errors.description && <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    {[
                      { id: 'email', label: 'Email', icon: Mail },
                      { id: 'video', label: 'Video Call', icon: Video },
                      { id: 'phone', label: 'Phone', icon: Phone },
                    ].map(method => {
                      const Icon = method.icon;
                      const isSelected = formData.preferredContact === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContact: method.id as any })}
                          className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-semibold transition-all ${
                            isSelected 
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs' 
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
                  >
                    {isSubmitting ? (
                      <span>Validating &amp; Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Studio Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
              <h3 className="font-bold text-base text-slate-900">What to Expect</h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>24-Hour Response:</strong> We answer all business inquiries promptly with technical feasibility notes.</span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Mutual NDA Protection:</strong> We are glad to sign your standard non-disclosure agreement before sharing proprietary architectures.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span><strong>No Sales Spam:</strong> Your email and contact details are stored strictly in private studio memory and never shared with marketers.</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl text-white border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Studio Availability</span>
              </div>
              <h4 className="font-bold text-base text-white">Booking Q2 &amp; Q3 Sprints</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                DevTechSoft deliberately limits simultaneous engagements to ensure deep architectural focus and sub-millisecond responsiveness on your builds.
              </p>
            </div>

            <div className="p-6 bg-blue-50/70 rounded-2xl border border-blue-200/80 space-y-3">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Direct Founder Inbox</span>
              <h4 className="font-bold text-base text-slate-900">Prefer Direct Email?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send your RFP, project scope, or technical questions directly to DevTechSoft:
              </p>
              <a 
                href="mailto:devtechsoft5@gmail.com" 
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-700 hover:text-blue-900 bg-white px-3.5 py-2.5 rounded-xl border border-blue-200 shadow-2xs hover:border-blue-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>devtechsoft5@gmail.com</span>
              </a>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
