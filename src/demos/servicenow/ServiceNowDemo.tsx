import React, { useState, useEffect } from 'react';
import { 
  ServerCrash, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Search, 
  Plus, 
  FileText, 
  BookOpen, 
  Laptop, 
  Key, 
  HardDrive, 
  Layers, 
  HelpCircle,
  Eye,
  Activity,
  User,
  RotateCcw,
  Check,
  Send,
  Sliders,
  Filter
} from 'lucide-react';
import { DemoBanner } from '../../components/common/DemoBanner';

interface Incident {
  id: string;
  caller: string;
  shortDesc: string;
  category: 'Software' | 'Hardware' | 'Network' | 'Security' | 'Database';
  priority: '1 - Critical' | '2 - High' | '3 - Moderate' | '4 - Low';
  impact: 'High' | 'Medium' | 'Low';
  urgency: 'High' | 'Medium' | 'Low';
  assignmentGroup: 'Service Desk Tier 1' | 'Cloud Ops' | 'Database Admins' | 'InfoSec';
  state: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  slaBreachTime: string;
  slaStatus: 'Met' | 'Warning' | 'Breached';
  resolutionNotes?: string;
  workNotes?: string[];
}

interface ProblemRecord {
  id: string;
  title: string;
  rootCause: string;
  knownError: boolean;
  workaround: string;
  linkedIncidents: string[];
  state: 'Open' | 'Under Investigation' | 'Resolved';
}

interface ChangeRequest {
  id: string;
  title: string;
  risk: 'High' | 'Moderate' | 'Low';
  type: 'Normal' | 'Standard' | 'Emergency';
  cabApproval: 'Approved' | 'Pending CAB' | 'Rejected';
  scheduledDate: string;
  implementedBy: string;
}

interface CatalogItem {
  id: string;
  name: string;
  category: 'Hardware' | 'Software' | 'Access';
  description: string;
  deliveryTime: string;
  icon: any;
}

interface KnowledgeArticle {
  id: string;
  title: string;
  category: 'Network' | 'Software' | 'Security';
  views: number;
  helpfulCount: number;
  content: string;
}

const INITIAL_INCIDENTS: Incident[] = [
  { id: 'INC0010412', caller: 'Sarah Jenkins', shortDesc: 'Production PostgreSQL Read Replica Connection Timeout', category: 'Database', priority: '1 - Critical', impact: 'High', urgency: 'High', assignmentGroup: 'Database Admins', state: 'In Progress', createdAt: '10 mins ago', slaBreachTime: '00:48:12', slaStatus: 'Warning', workNotes: ['Agent investigating slow query lock on customer transaction table.'] },
  { id: 'INC0010413', caller: 'Michael Chang', shortDesc: 'VPN Gateway authentication rejecting Okta MFA tokens', category: 'Security', priority: '2 - High', impact: 'High', urgency: 'Medium', assignmentGroup: 'InfoSec', state: 'New', createdAt: '25 mins ago', slaBreachTime: '01:34:00', slaStatus: 'Met', workNotes: ['Ticket received via monitoring alert.'] },
  { id: 'INC0010414', caller: 'Emily Watson', shortDesc: 'Developer Macbook M3 Pro battery failure', category: 'Hardware', priority: '3 - Moderate', impact: 'Medium', urgency: 'Low', assignmentGroup: 'Service Desk Tier 1', state: 'In Progress', createdAt: '2 hours ago', slaBreachTime: '05:12:00', slaStatus: 'Met' },
  { id: 'INC0010415', caller: 'David Ross', shortDesc: 'Kubernetes ingress controller 502 Bad Gateway', category: 'Network', priority: '1 - Critical', impact: 'High', urgency: 'High', assignmentGroup: 'Cloud Ops', state: 'Resolved', createdAt: '4 hours ago', slaBreachTime: '00:00:00', slaStatus: 'Met', resolutionNotes: 'Ingress pod memory limits increased from 2Gi to 4Gi.' },
  { id: 'INC0010416', caller: 'Amanda Perez', shortDesc: 'Legacy CRM export report timeout', category: 'Software', priority: '4 - Low', impact: 'Low', urgency: 'Low', assignmentGroup: 'Service Desk Tier 1', state: 'Closed', createdAt: '1 day ago', slaBreachTime: '00:00:00', slaStatus: 'Met', resolutionNotes: 'Scheduled cron job adjusted.' },
];

const INITIAL_PROBLEMS: ProblemRecord[] = [
  { id: 'PRB000401', title: 'Recurring High Memory Leaks on Ingress Gateway', rootCause: 'Underlying Go websocket proxy buffering unbounded telemetry streams', knownError: true, workaround: 'Gracefully recycle ingress deployment every 48 hours until v2.4 patch', linkedIncidents: ['INC0010415', 'INC0010389'], state: 'Under Investigation' },
  { id: 'PRB000402', title: 'PostgreSQL Connection Exhaustion During Batch Billing', rootCause: 'Unclosed pool handles in legacy billing microservice', knownError: true, workaround: 'Temporarily increase pgbouncer max_client_conn to 1000', linkedIncidents: ['INC0010412'], state: 'Open' }
];

const INITIAL_CHANGES: ChangeRequest[] = [
  { id: 'CHG0001290', title: 'Upgrade Production Kubernetes Cluster to v1.31', risk: 'High', type: 'Normal', cabApproval: 'Approved', scheduledDate: '2026-03-28 02:00 UTC', implementedBy: 'DevTech Cloud Ops' },
  { id: 'CHG0001291', title: 'Rotate Corporate VPN Root Certificate Authority', risk: 'Moderate', type: 'Standard', cabApproval: 'Approved', scheduledDate: '2026-03-24 18:00 UTC', implementedBy: 'InfoSec Team' },
  { id: 'CHG0001292', title: 'Deploy Emergency Hotfix for Billing Pool Leak', risk: 'High', type: 'Emergency', cabApproval: 'Pending CAB', scheduledDate: '2026-03-20 23:00 UTC', implementedBy: 'Senior Backend Architect' }
];

const CATALOG_ITEMS: CatalogItem[] = [
  { id: 'CAT-01', name: 'MacBook Pro M3 Max Engineering Bundle', category: 'Hardware', description: '64GB RAM, 1TB SSD developer workstation pre-imaged with corporate security profile.', deliveryTime: '2 Business Days', icon: Laptop },
  { id: 'CAT-02', name: 'AWS & Azure Cloud Sandbox Access', category: 'Access', description: 'Developer isolation sandbox with $500 monthly budget threshold and IAM role.', deliveryTime: '1 Hour (Auto)', icon: Key },
  { id: 'CAT-03', name: 'JetBrains All Products License', category: 'Software', description: 'Enterprise developer tooling license linked to corporate SSO.', deliveryTime: 'Instant Approval', icon: Layers },
  { id: 'CAT-04', name: 'Ergonomic 4K Dual Monitor Desk Setup', category: 'Hardware', description: 'Two 27" Dell UltraSharp 4K USB-C monitors with adjustable gas-spring arm.', deliveryTime: '3 Business Days', icon: HardDrive },
];

const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  { id: 'KB001089', title: 'How to Reset Corporate VPN MFA Tokens with Okta', category: 'Security', views: 1240, helpfulCount: 94, content: 'If your VPN connection fails with "Authentication Denied", ensure your mobile authenticator time is synchronized. Open Okta Verify, tap Settings -> Force Sync Clock. Then re-attempt login on gateway vpn.devtechsoft.dev.' },
  { id: 'KB001090', title: 'PostgreSQL Read Replica Lag Mitigation Guide', category: 'Network', views: 820, helpfulCount: 78, content: 'When replica lag exceeds 100MB, execute SELECT * FROM pg_stat_replication. Check for long-running analytical queries locking table schemas.' },
  { id: 'KB001091', title: 'Requesting Emergency Changes (CAB Fast-Track)', category: 'Software', views: 450, helpfulCount: 42, content: 'Emergency changes require verbal approval from the On-Call Engineering Lead and P1 incident reference number. File CHG record marked "Emergency" with immediate CAB review.' }
];

export const ServiceNowDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'incidents' | 'problems' | 'changes' | 'catalog' | 'sla' | 'kb'>('incidents');
  
  // Local persistent state
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    const saved = localStorage.getItem('devtech_servicenow_incidents');
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [changes, setChanges] = useState<ChangeRequest[]>(() => {
    const saved = localStorage.getItem('devtech_servicenow_changes');
    return saved ? JSON.parse(saved) : INITIAL_CHANGES;
  });

  const [requestedItems, setRequestedItems] = useState<{ ritm: string; item: string; date: string }[]>(() => {
    const saved = localStorage.getItem('devtech_servicenow_ritms');
    return saved ? JSON.parse(saved) : [
      { ritm: 'RITM0041890', item: 'JetBrains All Products License', date: 'Yesterday' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('devtech_servicenow_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('devtech_servicenow_changes', JSON.stringify(changes));
  }, [changes]);

  useEffect(() => {
    localStorage.setItem('devtech_servicenow_ritms', JSON.stringify(requestedItems));
  }, [requestedItems]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Create Incident Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newIncidentData, setNewIncidentData] = useState({
    caller: '',
    shortDesc: '',
    category: 'Software' as Incident['category'],
    impact: 'High' as Incident['impact'],
    urgency: 'High' as Incident['urgency'],
    assignmentGroup: 'Service Desk Tier 1' as Incident['assignmentGroup'],
  });

  // Selected Incident for Details / Resolve
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [resolutionInput, setResolutionInput] = useState('');
  const [workNoteInput, setWorkNoteInput] = useState('');

  // Catalog Request Modal
  const [catalogModalItem, setCatalogModalItem] = useState<CatalogItem | null>(null);
  const [justificationInput, setJustificationInput] = useState('');

  // Knowledge Base Search
  const [kbSearch, setKbSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  // Reset Demo
  const handleResetData = () => {
    setIncidents(INITIAL_INCIDENTS);
    setChanges(INITIAL_CHANGES);
    setRequestedItems([{ ritm: 'RITM0041890', item: 'JetBrains All Products License', date: 'Yesterday' }]);
    localStorage.removeItem('devtech_servicenow_incidents');
    localStorage.removeItem('devtech_servicenow_changes');
    localStorage.removeItem('devtech_servicenow_ritms');
  };

  // Filtered Incidents
  const filteredIncidents = incidents.filter(inc => {
    const matchSearch = inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inc.caller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchState = stateFilter === 'All' || inc.state === stateFilter;
    const matchPriority = priorityFilter === 'All' || inc.priority.includes(priorityFilter);
    return matchSearch && matchState && matchPriority;
  });

  // Priority Calculator
  const calculatePriority = (impact: Incident['impact'], urgency: Incident['urgency']): Incident['priority'] => {
    if (impact === 'High' && urgency === 'High') return '1 - Critical';
    if (impact === 'High' || urgency === 'High') return '2 - High';
    if (impact === 'Medium' || urgency === 'Medium') return '3 - Moderate';
    return '4 - Low';
  };

  // Handle Save Incident
  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncidentData.caller || !newIncidentData.shortDesc) return;

    const calcPri = calculatePriority(newIncidentData.impact, newIncidentData.urgency);
    const newInc: Incident = {
      id: `INC0010${420 + incidents.length + 1}`,
      caller: newIncidentData.caller,
      shortDesc: newIncidentData.shortDesc,
      category: newIncidentData.category,
      impact: newIncidentData.impact,
      urgency: newIncidentData.urgency,
      priority: calcPri,
      assignmentGroup: newIncidentData.assignmentGroup,
      state: 'New',
      createdAt: 'Just now',
      slaBreachTime: calcPri === '1 - Critical' ? '01:00:00' : '04:00:00',
      slaStatus: 'Met',
      workNotes: [`Incident logged by ${newIncidentData.caller} via ITSM Service Portal`]
    };

    setIncidents([newInc, ...incidents]);
    setIsCreateModalOpen(false);
    setNewIncidentData({
      caller: '',
      shortDesc: '',
      category: 'Software',
      impact: 'High',
      urgency: 'High',
      assignmentGroup: 'Service Desk Tier 1'
    });
  };

  // State Transition
  const handleUpdateIncidentState = (incId: string, newState: Incident['state']) => {
    if (newState === 'Resolved' && !resolutionInput.trim()) {
      alert('ITIL Governance: Resolution notes are required before resolving an incident.');
      return;
    }

    setIncidents(incidents.map(inc => {
      if (inc.id === incId) {
        return {
          ...inc,
          state: newState,
          resolutionNotes: newState === 'Resolved' ? resolutionInput : inc.resolutionNotes
        };
      }
      return inc;
    }));

    if (selectedIncident?.id === incId) {
      setSelectedIncident({
        ...selectedIncident,
        state: newState,
        resolutionNotes: newState === 'Resolved' ? resolutionInput : selectedIncident.resolutionNotes
      });
    }
    setResolutionInput('');
  };

  // Add Work Note
  const handleAddWorkNote = () => {
    if (!selectedIncident || !workNoteInput.trim()) return;
    const note = `[${new Date().toLocaleTimeString()}] Staff Note: ${workNoteInput}`;
    const updatedNotes = [...(selectedIncident.workNotes || []), note];

    setIncidents(incidents.map(inc => inc.id === selectedIncident.id ? {
      ...inc,
      workNotes: updatedNotes
    } : inc));

    setSelectedIncident({
      ...selectedIncident,
      workNotes: updatedNotes
    });
    setWorkNoteInput('');
  };

  // Handle Catalog Submission
  const handleSubmitCatalogItem = () => {
    if (!catalogModalItem) return;
    const newRitm = {
      ritm: `RITM0041${900 + requestedItems.length + 1}`,
      item: catalogModalItem.name,
      date: 'Just now'
    };
    setRequestedItems([newRitm, ...requestedItems]);
    setCatalogModalItem(null);
    setJustificationInput('');
    alert(`Request ${newRitm.ritm} logged! Automatically assigned to approval workflow.`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Banner */}
      <DemoBanner 
        projectName="ServiceOps 360"
        projectSlug="servicenow-incident"
        category="ServiceNow Solutions"
        onResetData={handleResetData}
        resetLabel="Reset ITSM Database"
      />

      {/* ServiceNow Header Bar */}
      <div className="bg-[#182330] border-b border-slate-700/80 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#81B441] text-slate-950 flex items-center justify-center font-black text-xs shadow-sm">
            NOW
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>ServiceOps 360 &bull; ITSM Workspace</span>
              <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                ITIL v4 Compliant
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Instance: devtechsoft-prod.service-now.com (San Diego Release)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:block text-right">
            <div className="font-semibold text-slate-200">Incident Commander</div>
            <div className="text-[10px] text-slate-400">Assignment: ITIL Agent</div>
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-xs text-white">
            IC
          </div>
        </div>
      </div>

      {/* Sub-Nav Module Tabs */}
      <div className="bg-[#1e2d3d] border-b border-slate-700 px-4 sm:px-6 py-1.5 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-1 sm:space-x-2">
          {[
            { id: 'incidents', label: `Incidents (${incidents.filter(i => i.state !== 'Closed').length})`, icon: ServerCrash },
            { id: 'problems', label: 'Problem & Root Cause', icon: AlertTriangle },
            { id: 'changes', label: 'Change Advisory (CAB)', icon: ShieldAlert },
            { id: 'catalog', label: 'Service Catalog', icon: Laptop },
            { id: 'sla', label: 'SLA Dashboard', icon: Clock },
            { id: 'kb', label: 'Knowledge Base', icon: BookOpen },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            MTTR: 28m (SLA Met 99.1%)
          </span>
        </div>
      </div>

      {/* Main ITSM Workspace Body */}
      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
        
        {/* MODULE 1: INCIDENT MANAGEMENT */}
        {activeTab === 'incidents' && (
          <div className="space-y-4">
            
            {/* Filter & Action Toolbar */}
            <div className="bg-[#182330] p-3 rounded-lg border border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-1 items-center gap-2 max-w-xl">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search incident ID, caller, description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#121a24] text-white pl-9 pr-3 py-1.5 rounded border border-slate-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="bg-[#121a24] text-slate-200 border border-slate-700 rounded py-1.5 px-2 focus:outline-none"
                >
                  <option value="All">All States</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-[#121a24] text-slate-200 border border-slate-700 rounded py-1.5 px-2 focus:outline-none"
                >
                  <option value="All">All Priorities</option>
                  <option value="1">P1 - Critical</option>
                  <option value="2">P2 - High</option>
                  <option value="3">P3 - Moderate</option>
                </select>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Incident</span>
              </button>
            </div>

            {/* Incident Records Table */}
            <div className="bg-[#182330] rounded-lg border border-slate-700 overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121a24] text-slate-400 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-4">Number</th>
                      <th className="py-2.5 px-4">Priority</th>
                      <th className="py-2.5 px-4">State</th>
                      <th className="py-2.5 px-4">Short Description</th>
                      <th className="py-2.5 px-4">Category</th>
                      <th className="py-2.5 px-4">Assignment Group</th>
                      <th className="py-2.5 px-4">SLA Countdown</th>
                      <th className="py-2.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-mono text-[11px]">
                    {filteredIncidents.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-500 font-sans">
                          No matching incidents found in queue.
                        </td>
                      </tr>
                    ) : (
                      filteredIncidents.map(inc => (
                        <tr key={inc.id} className="hover:bg-slate-800/60 transition-colors">
                          <td className="py-2.5 px-4 font-bold text-blue-400">
                            {inc.id}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              inc.priority.startsWith('1')
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : inc.priority.startsWith('2')
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {inc.priority.split(' ')[0]}
                            </span>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-medium ${
                              inc.state === 'Resolved' || inc.state === 'Closed'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : inc.state === 'In Progress'
                                ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {inc.state}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 font-sans text-slate-200 max-w-xs truncate">
                            {inc.shortDesc}
                          </td>
                          <td className="py-2.5 px-4 text-slate-400 font-sans">
                            {inc.category}
                          </td>
                          <td className="py-2.5 px-4 text-slate-300 font-sans">
                            {inc.assignmentGroup}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className={`text-[10px] font-bold ${
                              inc.slaStatus === 'Warning' ? 'text-amber-400' : 'text-emerald-400'
                            }`}>
                              {inc.slaBreachTime}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-right font-sans">
                            <button
                              onClick={() => setSelectedIncident(inc)}
                              className="text-blue-400 hover:text-blue-300 font-semibold text-[11px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded"
                            >
                              Open Record
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Incident Details & Workflow Modal */}
            {selectedIncident && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-[#182330] rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between border-b border-slate-700 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-mono font-bold text-base">{selectedIncident.id}</span>
                        <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono">
                          {selectedIncident.priority}
                        </span>
                        <span className="bg-blue-950 text-blue-300 text-[10px] px-2 py-0.5 rounded font-medium">
                          State: {selectedIncident.state}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{selectedIncident.shortDesc}</h3>
                      <p className="text-xs text-slate-400">Caller: {selectedIncident.caller} &bull; Group: {selectedIncident.assignmentGroup}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedIncident(null)}
                      className="text-slate-400 hover:text-white text-xl font-bold"
                    >
                      &times;
                    </button>
                  </div>

                  {/* State Progression Actions */}
                  <div className="bg-[#121a24] p-3 rounded-lg border border-slate-700/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">State Machine Transitions:</span>
                    <div className="flex items-center gap-2">
                      {selectedIncident.state === 'New' && (
                        <button
                          onClick={() => handleUpdateIncidentState(selectedIncident.id, 'In Progress')}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded font-semibold text-xs"
                        >
                          Assign &amp; Start Work
                        </button>
                      )}
                      {selectedIncident.state === 'In Progress' && (
                        <button
                          onClick={() => {
                            const res = prompt('Enter resolution notes to resolve this IT incident:');
                            if (res) {
                              setResolutionInput(res);
                              handleUpdateIncidentState(selectedIncident.id, 'Resolved');
                            }
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded font-semibold text-xs"
                        >
                          Resolve Incident
                        </button>
                      )}
                      {selectedIncident.state === 'Resolved' && (
                        <button
                          onClick={() => handleUpdateIncidentState(selectedIncident.id, 'Closed')}
                          className="bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1 rounded font-semibold text-xs"
                        >
                          Confirm &amp; Close Ticket
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Resolution Notes display if exists */}
                  {selectedIncident.resolutionNotes && (
                    <div className="bg-emerald-950/40 border border-emerald-800/80 p-3 rounded-lg text-xs space-y-1">
                      <div className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">
                        Resolution Notes
                      </div>
                      <div className="text-slate-200">{selectedIncident.resolutionNotes}</div>
                    </div>
                  )}

                  {/* Work Notes Stream */}
                  <div className="space-y-2 text-xs">
                    <div className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                      Work Notes &amp; Activity Stream
                    </div>
                    <div className="bg-[#121a24] p-3 rounded-lg border border-slate-700 space-y-2 max-h-40 overflow-y-auto font-mono text-[11px]">
                      {selectedIncident.workNotes && selectedIncident.workNotes.length > 0 ? (
                        selectedIncident.workNotes.map((note, idx) => (
                          <div key={idx} className="text-slate-300 border-b border-slate-800 pb-1">
                            {note}
                          </div>
                        ))
                      ) : (
                        <div className="text-slate-500">No activity notes recorded yet.</div>
                      )}
                    </div>

                    {/* Add note input */}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Type internal work note..."
                        value={workNoteInput}
                        onChange={(e) => setWorkNoteInput(e.target.value)}
                        className="flex-1 bg-[#121a24] border border-slate-700 text-white px-3 py-1.5 rounded text-xs focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={handleAddWorkNote}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-semibold text-xs"
                      >
                        Post Note
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedIncident(null)}
                      className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2 rounded"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Create Incident Modal */}
            {isCreateModalOpen && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-[#182330] rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-700">
                  <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-700">
                    Log New IT Incident Record
                  </h3>

                  <form onSubmit={handleCreateIncident} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Caller / Affected User</label>
                      <input
                        type="text"
                        required
                        value={newIncidentData.caller}
                        onChange={(e) => setNewIncidentData({ ...newIncidentData, caller: e.target.value })}
                        placeholder="e.g. Liam Gallagher"
                        className="w-full bg-[#121a24] border border-slate-700 text-white px-3 py-1.5 rounded focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Short Description of Issue</label>
                      <input
                        type="text"
                        required
                        value={newIncidentData.shortDesc}
                        onChange={(e) => setNewIncidentData({ ...newIncidentData, shortDesc: e.target.value })}
                        placeholder="e.g. SSL Certificate Expired on Staging API"
                        className="w-full bg-[#121a24] border border-slate-700 text-white px-3 py-1.5 rounded focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Category</label>
                        <select
                          value={newIncidentData.category}
                          onChange={(e) => setNewIncidentData({ ...newIncidentData, category: e.target.value as any })}
                          className="w-full bg-[#121a24] border border-slate-700 text-white px-2.5 py-1.5 rounded focus:outline-none"
                        >
                          <option value="Software">Software</option>
                          <option value="Hardware">Hardware</option>
                          <option value="Network">Network</option>
                          <option value="Security">Security</option>
                          <option value="Database">Database</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Assignment Group</label>
                        <select
                          value={newIncidentData.assignmentGroup}
                          onChange={(e) => setNewIncidentData({ ...newIncidentData, assignmentGroup: e.target.value as any })}
                          className="w-full bg-[#121a24] border border-slate-700 text-white px-2.5 py-1.5 rounded focus:outline-none"
                        >
                          <option value="Service Desk Tier 1">Service Desk Tier 1</option>
                          <option value="Cloud Ops">Cloud Ops</option>
                          <option value="Database Admins">Database Admins</option>
                          <option value="InfoSec">InfoSec</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Impact</label>
                        <select
                          value={newIncidentData.impact}
                          onChange={(e) => setNewIncidentData({ ...newIncidentData, impact: e.target.value as any })}
                          className="w-full bg-[#121a24] border border-slate-700 text-white px-2.5 py-1.5 rounded focus:outline-none"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Urgency</label>
                        <select
                          value={newIncidentData.urgency}
                          onChange={(e) => setNewIncidentData({ ...newIncidentData, urgency: e.target.value as any })}
                          className="w-full bg-[#121a24] border border-slate-700 text-white px-2.5 py-1.5 rounded focus:outline-none"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-2 bg-[#121a24] rounded border border-slate-700 text-[11px] text-slate-400">
                      Calculated ITIL Priority: <strong className="text-white">{calculatePriority(newIncidentData.impact, newIncidentData.urgency)}</strong>
                    </div>

                    <div className="pt-3 flex justify-end gap-2 border-t border-slate-700">
                      <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(false)}
                        className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-sm"
                      >
                        Submit Ticket
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* MODULE 2: PROBLEM MANAGEMENT */}
        {activeTab === 'problems' && (
          <div className="space-y-4">
            <div className="bg-[#182330] p-4 rounded-lg border border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Problem Records &amp; Known Error Database (KEDB)</h3>
                <p className="text-xs text-slate-400">Eliminate recurring incidents by identifying root causes and publishing workarounds</p>
              </div>
              <span className="text-xs font-mono bg-blue-950 text-blue-300 px-2.5 py-1 rounded border border-blue-800">
                {INITIAL_PROBLEMS.length} Active Problem Investigations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_PROBLEMS.map(prob => (
                <div key={prob.id} className="bg-[#182330] p-5 rounded-lg border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-blue-400">{prob.id}</span>
                    <span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded text-[10px] font-medium border border-amber-800">
                      {prob.state}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white">{prob.title}</h4>

                  <div className="p-3 bg-[#121a24] rounded border border-slate-700/80 text-xs space-y-1">
                    <div className="text-[10px] uppercase font-semibold text-rose-400">Root Cause</div>
                    <div className="text-slate-300">{prob.rootCause}</div>
                  </div>

                  <div className="p-3 bg-[#121a24] rounded border border-slate-700/80 text-xs space-y-1">
                    <div className="text-[10px] uppercase font-semibold text-emerald-400">Published Workaround</div>
                    <div className="text-slate-300">{prob.workaround}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                    <span>Linked Outages: {prob.linkedIncidents.join(', ')}</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Known Error: YES</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 3: CHANGE MANAGEMENT */}
        {activeTab === 'changes' && (
          <div className="space-y-4">
            <div className="bg-[#182330] p-4 rounded-lg border border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Change Advisory Board (CAB) Schedule</h3>
                <p className="text-xs text-slate-400">Structured change risk evaluations and maintenance windows</p>
              </div>
              <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded border border-emerald-800">
                0 Critical Outages in last 90 Days
              </span>
            </div>

            <div className="bg-[#182330] rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#121a24] text-slate-400 uppercase text-[10px] border-b border-slate-700 font-sans">
                  <tr>
                    <th className="py-2.5 px-4">Change ID</th>
                    <th className="py-2.5 px-4">Title</th>
                    <th className="py-2.5 px-4">Type</th>
                    <th className="py-2.5 px-4">Risk Level</th>
                    <th className="py-2.5 px-4">CAB Approval</th>
                    <th className="py-2.5 px-4">Scheduled Window</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-[11px]">
                  {changes.map(chg => (
                    <tr key={chg.id} className="hover:bg-slate-800/60">
                      <td className="py-2.5 px-4 text-blue-400 font-bold">{chg.id}</td>
                      <td className="py-2.5 px-4 font-sans text-white">{chg.title}</td>
                      <td className="py-2.5 px-4 font-sans text-slate-300">{chg.type}</td>
                      <td className="py-2.5 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          chg.risk === 'High' ? 'bg-rose-950 text-rose-300' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {chg.risk}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          chg.cabApproval === 'Approved' ? 'text-emerald-400 bg-emerald-950' : 'text-amber-400 bg-amber-950'
                        }`}>
                          {chg.cabApproval}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-300">{chg.scheduledDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 4: SERVICE CATALOG */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-[#182330] p-4 rounded-lg border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">IT Service Catalog &amp; Hardware Provisioning</h3>
                <p className="text-xs text-slate-400">Order standardized equipment, cloud access, and developer licenses</p>
              </div>
              <div className="text-xs font-mono text-emerald-400">
                Recent Orders: {requestedItems.length} RITMs
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATALOG_ITEMS.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="bg-[#182330] p-5 rounded-lg border border-slate-700 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-slate-400 font-mono">{item.category}</span>
                          <h4 className="font-bold text-sm text-white">{item.name}</h4>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">SLA: {item.deliveryTime}</span>
                      <button
                        onClick={() => setCatalogModalItem(item)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-semibold transition-colors"
                      >
                        Request Item
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Catalog Order Modal */}
            {catalogModalItem && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-[#182330] rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-700 space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-700 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-white">{catalogModalItem.name}</h3>
                      <p className="text-xs text-slate-400">Delivery SLA: {catalogModalItem.deliveryTime}</p>
                    </div>
                    <button onClick={() => setCatalogModalItem(null)} className="text-slate-400 text-lg font-bold">
                      &times;
                    </button>
                  </div>

                  <div className="text-xs space-y-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Business Justification &amp; Cost Center</label>
                      <textarea
                        rows={3}
                        required
                        value={justificationInput}
                        onChange={(e) => setJustificationInput(e.target.value)}
                        placeholder="e.g. Approved hire for Cloud Platform team; Cost Center CC-408"
                        className="w-full bg-[#121a24] border border-slate-700 text-white p-2.5 rounded focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2 border-t border-slate-700">
                    <button onClick={() => setCatalogModalItem(null)} className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs">
                      Cancel
                    </button>
                    <button onClick={handleSubmitCatalogItem} className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs">
                      Submit Order
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Past RITMs */}
            <div className="bg-[#182330] p-4 rounded-lg border border-slate-700">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">My Active Service Requests</h4>
              <div className="space-y-2">
                {requestedItems.map((ritm, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#121a24] text-xs">
                    <span className="font-mono text-blue-400">{ritm.ritm}</span>
                    <span className="text-slate-200">{ritm.item}</span>
                    <span className="text-emerald-400 font-medium">In Fulfillment</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* MODULE 5: SLA DASHBOARD */}
        {activeTab === 'sla' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#182330] p-5 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400 uppercase font-semibold">Response SLA Compliance</div>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">99.4%</div>
                <div className="text-[11px] text-slate-400 mt-1">Average First Response: 4.2 mins</div>
              </div>

              <div className="bg-[#182330] p-5 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400 uppercase font-semibold">Resolution SLA Compliance</div>
                <div className="text-3xl font-extrabold text-blue-400 mt-1 font-mono">98.1%</div>
                <div className="text-[11px] text-slate-400 mt-1">P1 Target: Under 1 hour</div>
              </div>

              <div className="bg-[#182330] p-5 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400 uppercase font-semibold">Active Breached Incidents</div>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">0</div>
                <div className="text-[11px] text-slate-400 mt-1">1 Incident approaching warning threshold</div>
              </div>
            </div>

            <div className="bg-[#182330] p-5 rounded-lg border border-slate-700 space-y-3">
              <h4 className="text-sm font-bold text-white">SLA Milestone Escalation Engine</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                ServiceOps 360 runs an automated background SLA calculation engine modeled on ServiceNow GlideSchedule. When an incident reaches 75% of its allocated resolution window, automated notifications dispatch to the Duty Manager queue.
              </p>
            </div>
          </div>
        )}

        {/* MODULE 6: KNOWLEDGE BASE */}
        {activeTab === 'kb' && (
          <div className="space-y-4">
            <div className="bg-[#182330] p-4 rounded-lg border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles, keywords, error codes..."
                  value={kbSearch}
                  onChange={(e) => setKbSearch(e.target.value)}
                  className="w-full bg-[#121a24] text-white pl-9 pr-3 py-1.5 rounded border border-slate-700 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <span className="text-xs text-slate-400">
                Knowledge Deflection Rate: <strong className="text-emerald-400">34.8%</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {KNOWLEDGE_ARTICLES.filter(a => a.title.toLowerCase().includes(kbSearch.toLowerCase()) || a.content.toLowerCase().includes(kbSearch.toLowerCase())).map(art => (
                <div key={art.id} className="bg-[#182330] p-5 rounded-lg border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
                      <span>{art.id}</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">{art.category}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white mb-2">{art.title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {art.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">{art.views} views</span>
                    <button
                      onClick={() => setSelectedArticle(art)}
                      className="text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      Read Article &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Article Modal */}
            {selectedArticle && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-[#182330] rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-700 space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-700 pb-3">
                    <div>
                      <span className="text-blue-400 font-mono text-xs">{selectedArticle.id} &bull; {selectedArticle.category}</span>
                      <h3 className="text-base font-bold text-white mt-1">{selectedArticle.title}</h3>
                    </div>
                    <button onClick={() => setSelectedArticle(null)} className="text-slate-400 text-lg font-bold">
                      &times;
                    </button>
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed bg-[#121a24] p-4 rounded-lg border border-slate-700/80">
                    {selectedArticle.content}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">{selectedArticle.helpfulCount} engineers found this helpful</span>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded"
                    >
                      Close Article
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
