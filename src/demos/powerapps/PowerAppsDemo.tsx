import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  Edit2, 
  Trash2, 
  Eye, 
  Layers, 
  ArrowRight, 
  FileText, 
  BarChart3, 
  Building2, 
  Mail, 
  Phone,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { DemoBanner } from '../../components/common/DemoBanner';

interface Customer {
  id: string;
  name: string;
  industry: string;
  contactName: string;
  email: string;
  phone: string;
  annualRevenue: number;
  status: 'Active' | 'Prospect' | 'Onboarding';
  assignedRep: string;
  createdAt: string;
}

interface Lead {
  id: string;
  company: string;
  contact: string;
  dealSize: number;
  stage: 'New' | 'Qualified' | 'Proposal' | 'Closed-Won';
  assignedRep: string;
  notes: string;
}

interface ApprovalItem {
  id: string;
  title: string;
  type: 'Capex' | 'Contract' | 'Vendor';
  requester: string;
  department: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedDate: string;
  notes?: string;
}

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'CUST-101', name: 'Apex Health Systems', industry: 'Healthcare', contactName: 'Dr. Evelyn Reed', email: 'ereed@apexhealth.org', phone: '+1 (555) 234-5678', annualRevenue: 420000, status: 'Active', assignedRep: 'Sarah K.', createdAt: '2026-01-12' },
  { id: 'CUST-102', name: 'Vanguard Logistics Corp', industry: 'Supply Chain', contactName: 'Marcus Vance', email: 'm.vance@vanguardlog.com', phone: '+1 (555) 345-6789', annualRevenue: 280000, status: 'Active', assignedRep: 'Marcus L.', createdAt: '2026-02-04' },
  { id: 'CUST-103', name: 'Strata Cloud Solutions', industry: 'Technology', contactName: 'Elena Rostova', email: 'elena@stratacloud.io', phone: '+1 (555) 456-7890', annualRevenue: 195000, status: 'Onboarding', assignedRep: 'Alex P.', createdAt: '2026-02-18' },
  { id: 'CUST-104', name: 'Meridian Capital Partners', industry: 'Financial Services', contactName: 'James Chen', email: 'jchen@meridiancap.com', phone: '+1 (555) 567-8901', annualRevenue: 510000, status: 'Active', assignedRep: 'Sarah K.', createdAt: '2026-01-29' },
  { id: 'CUST-105', name: 'BioGenix Diagnostics', industry: 'Biotechnology', contactName: 'Rachel Green', email: 'rachel.g@biogenix.com', phone: '+1 (555) 678-9012', annualRevenue: 340000, status: 'Prospect', assignedRep: 'Marcus L.', createdAt: '2026-03-01' }
];

const INITIAL_LEADS: Lead[] = [
  { id: 'LEAD-201', company: 'Nova Retail Group', contact: 'David Kim', dealSize: 120000, stage: 'New', assignedRep: 'Alex P.', notes: 'Looking to modernize inventory tracking.' },
  { id: 'LEAD-202', company: 'Horizon Aerospace', contact: 'Claire Bennett', dealSize: 350000, stage: 'Qualified', assignedRep: 'Sarah K.', notes: 'Security compliance review completed.' },
  { id: 'LEAD-203', company: 'Solstice Renewable Power', contact: 'Gregory Shaw', dealSize: 220000, stage: 'Proposal', assignedRep: 'Marcus L.', notes: 'Formal Power Apps quote submitted.' },
  { id: 'LEAD-204', company: 'Zenith Logistics Global', contact: 'Alicia Patel', dealSize: 180000, stage: 'Closed-Won', assignedRep: 'Sarah K.', notes: 'Master service agreement signed.' }
];

const INITIAL_APPROVALS: ApprovalItem[] = [
  { id: 'APR-301', title: 'Dataverse Storage Capacity Upgrade', type: 'Capex', requester: 'Thomas Wayne', department: 'Enterprise IT', amount: 14500, status: 'Pending', submittedDate: '2026-03-10' },
  { id: 'APR-302', title: 'Power BI Premium Dedicated Capacity', type: 'Contract', requester: 'Sophia Lin', department: 'Business Intelligence', amount: 32000, status: 'Pending', submittedDate: '2026-03-11' },
  { id: 'APR-303', title: 'External Security Pen-Testing Vendor', type: 'Vendor', requester: 'Liam O’Connor', department: 'InfoSec & Compliance', amount: 24000, status: 'Approved', submittedDate: '2026-03-05', notes: 'Approved as per annual SOC 2 compliance budget.' }
];

const MONTHLY_REVENUE_DATA = [
  { month: 'Oct', revenue: 98000, target: 85000 },
  { month: 'Nov', revenue: 112000, target: 95000 },
  { month: 'Dec', revenue: 135000, target: 110000 },
  { month: 'Jan', revenue: 124000, target: 115000 },
  { month: 'Feb', revenue: 148000, target: 125000 },
  { month: 'Mar', revenue: 165000, target: 140000 }
];

export const PowerAppsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'crm' | 'leads' | 'approvals' | 'reports'>('dashboard');
  
  // Local state initialized with LocalStorage
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('devtech_powerapps_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('devtech_powerapps_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [approvals, setApprovals] = useState<ApprovalItem[]>(() => {
    const saved = localStorage.getItem('devtech_powerapps_approvals');
    return saved ? JSON.parse(saved) : INITIAL_APPROVALS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('devtech_powerapps_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('devtech_powerapps_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('devtech_powerapps_approvals', JSON.stringify(approvals));
  }, [approvals]);

  // CRM Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');

  // Customer Modal State
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerFormData, setCustomerFormData] = useState({
    name: '',
    industry: 'Healthcare',
    contactName: '',
    email: '',
    phone: '',
    annualRevenue: 150000,
    status: 'Active' as 'Active' | 'Prospect' | 'Onboarding',
    assignedRep: 'Sarah K.'
  });

  // Selected customer for detail drawer
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Approval Modal
  const [approvalModalItem, setApprovalModalItem] = useState<ApprovalItem | null>(null);
  const [approvalDecision, setApprovalDecision] = useState<'Approved' | 'Rejected'>('Approved');
  const [approvalRemarks, setApprovalRemarks] = useState('');

  // Reset Demo Data
  const handleResetData = () => {
    setCustomers(INITIAL_CUSTOMERS);
    setLeads(INITIAL_LEADS);
    setApprovals(INITIAL_APPROVALS);
    localStorage.removeItem('devtech_powerapps_customers');
    localStorage.removeItem('devtech_powerapps_leads');
    localStorage.removeItem('devtech_powerapps_approvals');
  };

  // Filtered customers
  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || c.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  // Open modal for new customer
  const handleOpenAddCustomer = () => {
    setEditingCustomer(null);
    setCustomerFormData({
      name: '',
      industry: 'Technology',
      contactName: '',
      email: '',
      phone: '',
      annualRevenue: 250000,
      status: 'Active',
      assignedRep: 'Sarah K.'
    });
    setIsCustomerModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setCustomerFormData({
      name: customer.name,
      industry: customer.industry,
      contactName: customer.contactName,
      email: customer.email,
      phone: customer.phone,
      annualRevenue: customer.annualRevenue,
      status: customer.status,
      assignedRep: customer.assignedRep
    });
    setIsCustomerModalOpen(true);
  };

  // Save Customer
  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerFormData.name || !customerFormData.contactName) return;

    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? {
        ...c,
        ...customerFormData
      } : c));
    } else {
      const newCustomer: Customer = {
        id: `CUST-${100 + customers.length + 1}`,
        ...customerFormData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCustomers([newCustomer, ...customers]);
    }
    setIsCustomerModalOpen(false);
  };

  // Delete Customer
  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer record from Dataverse simulation?')) {
      setCustomers(customers.filter(c => c.id !== id));
      if (selectedCustomer?.id === id) setSelectedCustomer(null);
    }
  };

  // Move Lead Stage
  const handleAdvanceLead = (leadId: string) => {
    const stages: Lead['stage'][] = ['New', 'Qualified', 'Proposal', 'Closed-Won'];
    setLeads(leads.map(l => {
      if (l.id === leadId) {
        const currentIndex = stages.indexOf(l.stage);
        const nextStage = stages[Math.min(currentIndex + 1, stages.length - 1)];
        return { ...l, stage: nextStage };
      }
      return l;
    }));
  };

  // Convert Lead to Customer
  const handleConvertLead = (lead: Lead) => {
    const newCust: Customer = {
      id: `CUST-${100 + customers.length + 1}`,
      name: lead.company,
      industry: 'Technology',
      contactName: lead.contact,
      email: `${lead.contact.toLowerCase().replace(' ', '.')}@${lead.company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: '+1 (555) 901-2345',
      annualRevenue: lead.dealSize,
      status: 'Active',
      assignedRep: lead.assignedRep,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomers([newCust, ...customers]);
    setLeads(leads.filter(l => l.id !== lead.id));
    alert(`Lead "${lead.company}" successfully converted to active Dataverse customer account!`);
  };

  // Handle Approval Action
  const handleProcessApproval = () => {
    if (!approvalModalItem) return;
    setApprovals(approvals.map(a => a.id === approvalModalItem.id ? {
      ...a,
      status: approvalDecision,
      notes: approvalRemarks || `Decision processed as ${approvalDecision}`
    } : a));
    setApprovalModalItem(null);
    setApprovalRemarks('');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID,Company,Industry,Contact,Email,Phone,Revenue,Status,Rep,CreatedDate\n'];
    const rows = customers.map(c => 
      `"${c.id}","${c.name}","${c.industry}","${c.contactName}","${c.email}","${c.phone}",${c.annualRevenue},"${c.status}","${c.assignedRep}","${c.createdAt}"`
    );
    const blob = new Blob([headers.join('') + rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BusinessFlow360_Customers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculated Metrics
  const totalRevenue = customers.reduce((acc, c) => acc + c.annualRevenue, 0);
  const totalPipeline = leads.reduce((acc, l) => acc + l.dealSize, 0);
  const pendingApprovalsCount = approvals.filter(a => a.status === 'Pending').length;

  const PIPELINE_PIE_DATA = [
    { name: 'New', value: leads.filter(l => l.stage === 'New').length, color: '#3b82f6' },
    { name: 'Qualified', value: leads.filter(l => l.stage === 'Qualified').length, color: '#06b6d4' },
    { name: 'Proposal', value: leads.filter(l => l.stage === 'Proposal').length, color: '#f59e0b' },
    { name: 'Closed-Won', value: leads.filter(l => l.stage === 'Closed-Won').length, color: '#10b981' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Top Studio Demo Banner */}
      <DemoBanner 
        projectName="BusinessFlow 360"
        projectSlug="powerapps-crm"
        category="Power Platform Development"
        onResetData={handleResetData}
        resetLabel="Reset Dataverse Demo"
      />

      {/* Main App Container styled like Microsoft Power Apps Modern UI */}
      <div className="flex-1 flex flex-col">
        
        {/* Power Apps Top App Header */}
        <div className="bg-[#002050] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center font-bold text-xs tracking-wider shadow-inner">
              PA
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight flex items-center gap-2">
                <span>BusinessFlow 360</span>
                <span className="text-[10px] bg-blue-900/80 text-blue-200 px-2 py-0.5 rounded font-mono border border-blue-700">
                  Model-Driven App
                </span>
              </div>
              <div className="text-[10px] text-slate-300">
                Environment: DevTechSoft_Enterprise_Dataverse (US East)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">Director of Operations</div>
              <div className="text-[10px] text-slate-300">Role: Enterprise Approver</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs border border-blue-400">
              DO
            </div>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-1.5 flex items-center justify-between overflow-x-auto shadow-2xs">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {[
              { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3 },
              { id: 'crm', label: 'Customer Directory (CRM)', icon: Users },
              { id: 'leads', label: 'Lead Pipeline', icon: TrendingUp },
              { id: 'approvals', label: `Approval Workflows (${pendingApprovalsCount})`, icon: Clock },
              { id: 'reports', label: 'Power BI Analytics & Export', icon: FileText },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded border border-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Main Body Content */}
        <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Total Active Customers</span>
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{customers.length} Accounts</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Synchronized with Dataverse</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Active Pipeline</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">${(totalPipeline / 1000).toFixed(0)}k</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {leads.length} Active Sales Opportunities
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Pending Approvals</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-amber-600">{pendingApprovalsCount} Items</div>
                  <div className="text-[11px] text-amber-700 font-medium mt-1">
                    Requires Department Signoff
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Annual Managed ARR</span>
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">${(totalRevenue / 1000).toFixed(0)}k</div>
                  <div className="text-[11px] text-blue-600 font-medium mt-1">
                    Synthetic Demo Baseline
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Revenue Recharts Bar */}
                <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Monthly Operational Performance (Power BI View)</h3>
                      <p className="text-xs text-slate-500">Actual revenue vs. baseline target</p>
                    </div>
                    <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                      Live Telemetry
                    </span>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MONTHLY_REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `$${val/1000}k`} />
                        <Tooltip 
                          formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                          contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                        />
                        <Bar dataKey="revenue" name="Actual Revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" name="Target Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pipeline Stages Donut */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Lead Stage Distribution</h3>
                  <p className="text-xs text-slate-500 mb-4">Proportion of opportunities in pipeline</p>

                  <div className="h-48 w-full relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={PIPELINE_PIE_DATA}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {PIPELINE_PIE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-slate-100 text-xs">
                    {PIPELINE_PIE_DATA.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-600">{item.name}:</span>
                        <span className="font-bold text-slate-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Fast Action Links */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Experience Real Dataverse Synchronization</h4>
                    <p className="text-xs text-slate-600">Switch tabs above to create customers, advance pipeline deals, or approve capex budgets.</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('crm')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                  Go to CRM Directory &rarr;
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: CRM CUSTOMER DIRECTORY */}
          {activeTab === 'crm' && (
            <div className="space-y-4">
              
              {/* Controls bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by customer name, contact, ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="text-xs rounded-lg border border-slate-300 py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="All">All Industries</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Supply Chain">Supply Chain</option>
                    <option value="Technology">Technology</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Biotechnology">Biotechnology</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddCustomer}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Customer</span>
                  </button>
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Account ID</th>
                        <th className="py-3 px-4">Organization</th>
                        <th className="py-3 px-4">Industry</th>
                        <th className="py-3 px-4">Primary Contact</th>
                        <th className="py-3 px-4">Annual Revenue</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Assigned Rep</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCustomers.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-400">
                            No customers match your search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredCustomers.map(customer => (
                          <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono font-medium text-blue-600">
                              {customer.id}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-900">
                              {customer.name}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                                {customer.industry}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-medium text-slate-900">{customer.contactName}</div>
                              <div className="text-[10px] text-slate-400">{customer.email}</div>
                            </td>
                            <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                              ${customer.annualRevenue.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                customer.status === 'Active' 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                  : customer.status === 'Onboarding'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}>
                                {customer.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              {customer.assignedRep}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => setSelectedCustomer(customer)}
                                  className="p-1 text-slate-400 hover:text-blue-600 rounded"
                                  title="View details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleOpenEditCustomer(customer)}
                                  className="p-1 text-slate-400 hover:text-amber-600 rounded"
                                  title="Edit customer"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCustomer(customer.id)}
                                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                                  title="Delete customer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Customer Detail Drawer Modal */}
              {selectedCustomer && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                          {selectedCustomer.id}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedCustomer.name}</h3>
                        <p className="text-xs text-slate-500">{selectedCustomer.industry} Sector</p>
                      </div>
                      <button 
                        onClick={() => setSelectedCustomer(null)}
                        className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                      >
                        &times;
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Contact Person</div>
                        <div className="font-bold text-slate-900 mt-0.5">{selectedCustomer.contactName}</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Annual Revenue</div>
                        <div className="font-bold text-slate-900 mt-0.5 font-mono">${selectedCustomer.annualRevenue.toLocaleString()}</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Email</div>
                        <div className="text-slate-800 mt-0.5 truncate">{selectedCustomer.email}</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Phone</div>
                        <div className="text-slate-800 mt-0.5">{selectedCustomer.phone}</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Sales Representative</div>
                        <div className="text-slate-800 mt-0.5">{selectedCustomer.assignedRep}</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Onboard Date</div>
                        <div className="text-slate-800 mt-0.5 font-mono">{selectedCustomer.createdAt}</div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setSelectedCustomer(null)}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                      >
                        Close Details
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add / Edit Customer Modal */}
              {isCustomerModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
                    <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                      {editingCustomer ? 'Edit Dataverse Customer Record' : 'Create New Customer Account'}
                    </h3>

                    <form onSubmit={handleSaveCustomer} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Company / Organization Name</label>
                        <input
                          type="text"
                          required
                          value={customerFormData.name}
                          onChange={(e) => setCustomerFormData({ ...customerFormData, name: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g. Zenith Analytics Corp"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Industry</label>
                          <select
                            value={customerFormData.industry}
                            onChange={(e) => setCustomerFormData({ ...customerFormData, industry: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="Healthcare">Healthcare</option>
                            <option value="Supply Chain">Supply Chain</option>
                            <option value="Technology">Technology</option>
                            <option value="Financial Services">Financial Services</option>
                            <option value="Biotechnology">Biotechnology</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Status</label>
                          <select
                            value={customerFormData.status}
                            onChange={(e) => setCustomerFormData({ ...customerFormData, status: e.target.value as any })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="Active">Active</option>
                            <option value="Onboarding">Onboarding</option>
                            <option value="Prospect">Prospect</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Contact Name</label>
                          <input
                            type="text"
                            required
                            value={customerFormData.contactName}
                            onChange={(e) => setCustomerFormData({ ...customerFormData, contactName: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Assigned Sales Rep</label>
                          <select
                            value={customerFormData.assignedRep}
                            onChange={(e) => setCustomerFormData({ ...customerFormData, assignedRep: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="Sarah K.">Sarah K.</option>
                            <option value="Marcus L.">Marcus L.</option>
                            <option value="Alex P.">Alex P.</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Email</label>
                          <input
                            type="email"
                            required
                            value={customerFormData.email}
                            onChange={(e) => setCustomerFormData({ ...customerFormData, email: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                            placeholder="user@company.com"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                          <input
                            type="text"
                            value={customerFormData.phone}
                            onChange={(e) => setCustomerFormData({ ...customerFormData, phone: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Estimated Annual Revenue ($)</label>
                        <input
                          type="number"
                          value={customerFormData.annualRevenue}
                          onChange={(e) => setCustomerFormData({ ...customerFormData, annualRevenue: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setIsCustomerModalOpen(false)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
                        >
                          {editingCustomer ? 'Update Record' : 'Save Customer'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: LEAD PIPELINE (KANBAN) */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Lead Qualification Pipeline (Kanban)</h3>
                  <p className="text-xs text-slate-500">Advance leads through validation stages or convert to Dataverse accounts</p>
                </div>
                <div className="text-xs font-mono font-semibold text-slate-600">
                  Total Deal Volume: ${(totalPipeline / 1000).toFixed(0)}k
                </div>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {(['New', 'Qualified', 'Proposal', 'Closed-Won'] as Lead['stage'][]).map(stage => {
                  const stageLeads = leads.filter(l => l.stage === stage);
                  return (
                    <div key={stage} className="bg-slate-50 rounded-xl p-3 border border-slate-200/90 flex flex-col">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-800">{stage}</span>
                        <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-600">
                          {stageLeads.length}
                        </span>
                      </div>

                      <div className="space-y-2.5 flex-1">
                        {stageLeads.map(lead => (
                          <div key={lead.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs hover:shadow-sm transition-shadow">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                              <span>{lead.id}</span>
                              <span className="text-blue-600 font-bold">${(lead.dealSize / 1000).toFixed(0)}k</span>
                            </div>
                            <div className="font-bold text-slate-900 text-xs">{lead.company}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{lead.contact} &bull; {lead.assignedRep}</div>
                            <div className="text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded mt-2 italic">
                              "{lead.notes}"
                            </div>

                            <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                              {lead.stage !== 'Closed-Won' ? (
                                <button
                                  onClick={() => handleAdvanceLead(lead.id)}
                                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                                >
                                  <span>Advance</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleConvertLead(lead)}
                                  className="text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]"
                                >
                                  Convert to Customer
                                </button>
                              )}
                            </div>
                          </div>
                        ))}

                        {stageLeads.length === 0 && (
                          <div className="text-center py-6 text-slate-400 text-xs italic">
                            No deals in this stage
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: APPROVAL WORKFLOWS */}
          {activeTab === 'approvals' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Governance &amp; Multi-Tier Approvals</h3>
                  <p className="text-xs text-slate-500">Enforce compliance on capital expenditures, enterprise software, and vendor contracts</p>
                </div>
                <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md border border-amber-200">
                  {pendingApprovalsCount} Awaiting Review
                </span>
              </div>

              {/* Approvals Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Request ID</th>
                      <th className="py-3 px-4">Title / Purpose</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Requester &amp; Dept</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {approvals.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-slate-600">
                          {item.id}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{item.title}</div>
                          {item.notes && <div className="text-[10px] text-slate-500 italic mt-0.5">{item.notes}</div>}
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] border border-slate-200 font-mono">
                            {item.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-900">{item.requester}</div>
                          <div className="text-[10px] text-slate-400">{item.department}</div>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          ${item.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            item.status === 'Approved' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : item.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {item.status === 'Pending' ? (
                            <button
                              onClick={() => {
                                setApprovalModalItem(item);
                                setApprovalDecision('Approved');
                                setApprovalRemarks('');
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors"
                            >
                              Review &amp; Sign
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-mono">Archived</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Review Modal */}
              {approvalModalItem && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                          {approvalModalItem.id}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1">{approvalModalItem.title}</h3>
                        <p className="text-xs text-slate-500">{approvalModalItem.department} &bull; Requested by {approvalModalItem.requester}</p>
                      </div>
                      <button 
                        onClick={() => setApprovalModalItem(null)}
                        className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                      >
                        &times;
                      </button>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg text-xs">
                      <div className="text-slate-400 text-[10px] uppercase font-semibold">Expenditure Amount</div>
                      <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                        ${approvalModalItem.amount.toLocaleString()} USD
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <label className="block font-semibold text-slate-700">Governance Decision</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setApprovalDecision('Approved')}
                          className={`py-2 rounded-lg font-bold border text-xs flex items-center justify-center gap-1.5 ${
                            approvalDecision === 'Approved'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve Request</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setApprovalDecision('Rejected')}
                          className={`py-2 rounded-lg font-bold border text-xs flex items-center justify-center gap-1.5 ${
                            approvalDecision === 'Rejected'
                              ? 'bg-rose-600 text-white border-rose-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject Request</span>
                        </button>
                      </div>

                      <div className="pt-2">
                        <label className="block font-semibold text-slate-700 mb-1">Audit Notes &amp; Justification</label>
                        <textarea
                          rows={3}
                          value={approvalRemarks}
                          onChange={(e) => setApprovalRemarks(e.target.value)}
                          placeholder="Enter audit rationale for this decision..."
                          className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        onClick={() => setApprovalModalItem(null)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleProcessApproval}
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
                      >
                        Submit Signature
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 5: POWER BI ANALYTICS & EXPORT */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Embedded Power BI Reporting Module</h3>
                  <p className="text-xs text-slate-500">Live operational data synchronization with Microsoft Dataverse backend</p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Customers CSV Export</span>
                </button>
              </div>

              {/* Data Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Average Revenue / Customer</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    ${(totalRevenue / (customers.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Average Lead Deal Size</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    ${(totalPipeline / (leads.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Approval SLA Adherence</div>
                  <div className="text-xl font-bold text-emerald-600 mt-1">
                    99.2% on-time
                  </div>
                </div>
              </div>

              {/* Architectural Notice */}
              <div className="bg-slate-900 text-slate-300 p-5 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Enterprise Microsoft Power Platform Architecture</span>
                </div>
                <p className="leading-relaxed">
                  In a real production client rollout, this application is deployed directly to your organization's Microsoft 365 tenant. Dataverse tables hold the relational schemas with Entra ID role-based access security, while Power Automate flows handle real-time Teams and email notifications.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
