import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Database, 
  Terminal, 
  Copy, 
  Check, 
  Trash2, 
  Layers, 
  Clock, 
  FileText, 
  Key, 
  Search, 
  Plus, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  BarChart2
} from 'lucide-react';
import { DemoBanner } from '../../components/common/DemoBanner';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  toolCalls?: {
    tool: string;
    params: any;
    result: any;
  }[];
  citations?: {
    id: string;
    title: string;
    excerpt: string;
  }[];
  executionTrace?: {
    step: string;
    durationMs: number;
  }[];
}

interface DocItem {
  id: string;
  title: string;
  category: string;
  content: string;
  similarityScore?: number;
}

const DEFAULT_DOCUMENTS: DocItem[] = [
  {
    id: 'DOC-01',
    title: 'Enterprise VPN & Okta MFA Policy',
    category: 'Security',
    content: 'Corporate VPN requires TLS 1.3 and Okta Verify MFA. If credentials fail with error 401, verify that mobile authenticator clock is in sync. For certificate renewal, visit https://cert.devtechsoft.dev with corporate hardware.'
  },
  {
    id: 'DOC-02',
    title: 'Hardware Replacement & Refresh Lifecycle',
    category: 'Operations',
    content: 'Developer laptops are refreshed every 24 months. Standard bundle is MacBook Pro M3 Max or Dell Precision 5690 with 64GB RAM. Out-of-warranty replacements require manager cost-center approval.'
  },
  {
    id: 'DOC-03',
    title: 'Cloud Production Outage Escalation SLA',
    category: 'ITSM',
    content: 'P1 Critical outages require response within 15 minutes and resolution within 1 hour. On-call incident commanders must bridge on Zoom channel #incident-war-room and ping OnCallEngineering via PagerDuty.'
  },
  {
    id: 'DOC-04',
    title: 'B2B Software License Procurement Guidelines',
    category: 'Procurement',
    content: 'Software licenses under $5,000 are approved automatically by department lead. Subscriptions over $10,000 must pass Legal review and SOC 2 Type II vendor certification validation.'
  }
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-01',
    sender: 'assistant',
    text: "Hello! I am NexaAI, your enterprise autonomous support agent. I'm connected to your private knowledge base, ticket system, and CRM tools. How can I assist your operations today?",
    timestamp: '10:00 AM'
  }
];

export const AiAgentDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge' | 'tools' | 'trace' | 'analytics'>('chat');
  
  // Persistent state
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('devtech_ai_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [documents, setDocuments] = useState<DocItem[]>(() => {
    const saved = localStorage.getItem('devtech_ai_docs');
    return saved ? JSON.parse(saved) : DEFAULT_DOCUMENTS;
  });

  const [customApiKey, setCustomApiKey] = useState('');
  const [useRealApi, setUseRealApi] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Tools Test Sandbox
  const [selectedTool, setSelectedTool] = useState('ticket_lookup');
  const [toolParamInput, setToolParamInput] = useState('INC-4091');
  const [toolSandboxResult, setToolSandboxResult] = useState<any>(null);

  // New Document modal
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Security');
  const [newDocContent, setNewDocContent] = useState('');
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('devtech_ai_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('devtech_ai_docs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleResetData = () => {
    setMessages(INITIAL_MESSAGES);
    setDocuments(DEFAULT_DOCUMENTS);
    localStorage.removeItem('devtech_ai_messages');
    localStorage.removeItem('devtech_ai_docs');
  };

  // Copy text helper
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Deterministic Mock Agent Engine
  const runAgentReasoning = async (query: string): Promise<Message> => {
    const lower = query.toLowerCase();

    // Simulated Latency
    await new Promise(r => setTimeout(r, 900));

    // Route 1: Ticket Lookup
    if (lower.includes('ticket') || lower.includes('inc-') || lower.includes('status')) {
      const ticketId = query.match(/inc-\d+/i)?.[0]?.toUpperCase() || 'INC-4091';
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `I executed the \`ticket_lookup\` tool for **${ticketId}**.\n\n**Status:** In Progress (Priority 1 - Critical)\n**Summary:** Production PostgreSQL read replica timeout\n**Assigned Group:** Database Admins\n**SLA Time Remaining:** 48 minutes\n\nAccording to the on-call runbook, the primary DBA is currently recycling client connection pools. Would you like me to subscribe your email to real-time incident status alerts?`,
        toolCalls: [
          { tool: 'ticket_lookup', params: { id: ticketId }, result: { status: 'In Progress', priority: 'P1-Critical', team: 'DBA' } }
        ],
        citations: [
          { id: 'DOC-03', title: 'Cloud Outage Escalation SLA', excerpt: 'P1 Critical outages require response within 15 minutes and resolution within 1 hour.' }
        ],
        executionTrace: [
          { step: 'Guardrail & Intent Classification', durationMs: 42 },
          { step: 'Tool Call: ticket_lookup(id="INC-4091")', durationMs: 120 },
          { step: 'RAG Knowledge Vector Search', durationMs: 65 },
          { step: 'Grounded Response Synthesis', durationMs: 140 }
        ]
      };
    }

    // Route 2: VPN / Okta / Certificate
    if (lower.includes('vpn') || lower.includes('okta') || lower.includes('mfa') || lower.includes('certificate')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Based on verified policy in **DOC-01 (Enterprise VPN & Okta MFA Policy)**, here are the troubleshooting steps:\n\n1. **Clock Desynchronization**: Open Okta Verify on your mobile phone -> Settings -> tap **Force Sync Clock**.\n2. **Protocol Requirements**: Confirm your client is communicating over TLS 1.3 on gateway \`vpn.devtechsoft.dev\`.\n3. **Certificate Expiration**: If you receive error code \`CERT_HAS_EXPIRED\`, visit the hardware provisioning portal to download a signed corporate root certificate.\n\nAll connections require hardware-backed biometric verification.`,
        toolCalls: [
          { tool: 'search_knowledge_base', params: { query: 'VPN Okta MFA certificate' }, result: { matchesFound: 1, topScore: 0.94 } }
        ],
        citations: [
          { id: 'DOC-01', title: 'Enterprise VPN & Okta MFA Policy', excerpt: 'Corporate VPN requires TLS 1.3 and Okta Verify MFA. If credentials fail with error 401, verify clock sync.' }
        ],
        executionTrace: [
          { step: 'Intent Parsing: Policy Query', durationMs: 38 },
          { step: 'Semantic Embeddings Cosine Search', durationMs: 82 },
          { step: 'Context Re-ranking & Validation', durationMs: 45 },
          { step: 'Grounded Generation', durationMs: 110 }
        ]
      };
    }

    // Route 3: Customer / CRM Lookup
    if (lower.includes('customer') || lower.includes('apex') || lower.includes('account') || lower.includes('crm')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `I queried our Dataverse CRM database using the \`customer_profile_lookup\` tool for **Apex Health Systems**.\n\n- **Account ID:** CUST-101\n- **Industry:** Healthcare Sector\n- **Primary Contact:** Dr. Evelyn Reed (ereed@apexhealth.org)\n- **Annual Contract ARR:** $420,000 USD\n- **Account Executive:** Sarah K.\n- **Account Status:** Active (In good standing)\n\nNo outstanding P1 support tickets are open against their tenant.`,
        toolCalls: [
          { tool: 'customer_profile_lookup', params: { name: 'Apex Health Systems' }, result: { id: 'CUST-101', arr: 420000, rep: 'Sarah K.' } }
        ],
        executionTrace: [
          { step: 'Intent Classification: CRM Lookup', durationMs: 30 },
          { step: 'Tool Call: customer_profile_lookup', durationMs: 95 },
          { step: 'Output Grounding', durationMs: 80 }
        ]
      };
    }

    // Route 4: General / Fallback
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `I evaluated your inquiry against our indexed knowledge base and agent tools.\n\nQuery: "${query}"\n\nI can execute autonomous actions such as:\n- Looking up live tickets (e.g., "Check status of INC-4091")\n- Retrieving verified corporate policies (e.g., "What is our VPN procedure?")\n- Querying client records (e.g., "Lookup customer profile for Apex Health")\n- Simulating incident creation and triage\n\nHow would you like to proceed?`,
      toolCalls: [
        { tool: 'search_knowledge_base', params: { query }, result: { matchesFound: 0, topScore: 0.42 } }
      ],
      executionTrace: [
        { step: 'Intent Router & Guardrails', durationMs: 28 },
        { step: 'Vector Store Query', durationMs: 50 },
        { step: 'Fallback Synthesis', durationMs: 65 }
      ]
    };
  };

  // Submit Prompt
  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const responseMsg = await runAgentReasoning(textToSend);
      setMessages(prev => [...prev, responseMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  // Tool Sandbox Execution
  const handleExecuteTool = () => {
    if (selectedTool === 'ticket_lookup') {
      setToolSandboxResult({
        status: 'SUCCESS',
        tool: 'ticket_lookup',
        input: { id: toolParamInput },
        output: {
          ticket_id: toolParamInput,
          caller: 'Sarah Jenkins',
          priority: '1 - Critical',
          service: 'PostgreSQL Read Cluster',
          state: 'In Progress',
          sla_countdown: '00:48:12'
        }
      });
    } else if (selectedTool === 'search_knowledge_base') {
      const matched = documents.filter(d => d.title.toLowerCase().includes(toolParamInput.toLowerCase()) || d.content.toLowerCase().includes(toolParamInput.toLowerCase()));
      setToolSandboxResult({
        status: 'SUCCESS',
        tool: 'search_knowledge_base',
        input: { query: toolParamInput },
        output: {
          total_matches: matched.length,
          top_match: matched[0] ? { id: matched[0].id, title: matched[0].title, cosine_score: 0.92 } : null
        }
      });
    } else if (selectedTool === 'customer_profile_lookup') {
      setToolSandboxResult({
        status: 'SUCCESS',
        tool: 'customer_profile_lookup',
        input: { name: toolParamInput },
        output: {
          customer_name: toolParamInput,
          tier: 'Enterprise Platinum',
          contract_value: '$420,000 ARR',
          active_sso: true
        }
      });
    }
  };

  // Add custom doc
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle || !newDocContent) return;

    const newDoc: DocItem = {
      id: `DOC-0${documents.length + 1}`,
      title: newDocTitle,
      category: newDocCategory,
      content: newDocContent
    };

    setDocuments([newDoc, ...documents]);
    setIsDocModalOpen(false);
    setNewDocTitle('');
    setNewDocContent('');
    alert(`Document "${newDoc.title}" indexed into private vector memory!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Banner */}
      <DemoBanner 
        projectName="NexaAI Support Agent"
        projectSlug="ai-support-agent"
        category="AI & Agentic Automation"
        onResetData={handleResetData}
        resetLabel="Reset Agent Memory"
      />

      {/* Agent App Header */}
      <div className="bg-[#0b0f19] border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>NexaAI Enterprise Agent Workspace</span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 font-mono px-2 py-0.5 rounded border border-indigo-700/60">
                LangGraph State Machine
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Execution Mode: <span className="text-emerald-400 font-semibold">{useRealApi ? 'Live OpenAI API Key' : 'Deterministic Enterprise Mock Engine (100% Offline)'}</span>
            </div>
          </div>
        </div>

        {/* API Key Toggle Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseRealApi(!useRealApi)}
            className="text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Toggle between mock adapter and custom browser-only API key"
          >
            <Key className="w-3 h-3 text-indigo-400" />
            <span>{useRealApi ? 'Using Custom Key' : 'Using Mock Adapter'}</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="bg-[#0e1424] border-b border-slate-800 px-4 sm:px-6 py-1.5 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-1 sm:space-x-2">
          {[
            { id: 'chat', label: 'AI Chat Workspace', icon: Bot },
            { id: 'knowledge', label: `Knowledge Base (${documents.length})`, icon: Database },
            { id: 'tools', label: 'Deterministic Tools Sandbox', icon: Terminal },
            { id: 'trace', label: 'Agent Reasoning Traces', icon: Cpu },
            { id: 'analytics', label: 'Agent Analytics', icon: BarChart2 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Vector Index: 4 Chunks Active</span>
        </div>
      </div>

      {/* Workspace Body */}
      <div className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto flex flex-col">
        
        {/* TAB 1: AI CHAT WORKSPACE */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col bg-[#0b0f19] rounded-2xl border border-slate-800 shadow-xl overflow-hidden min-h-[550px]">
            
            {/* Chat Messages Log */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
              {messages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';
                return (
                  <div 
                    key={msg.id} 
                    className={`flex gap-3 max-w-3xl ${isAssistant ? '' : 'ml-auto flex-row-reverse'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                      isAssistant ? 'bg-indigo-600 shadow-sm' : 'bg-slate-700'
                    }`}>
                      {isAssistant ? <Bot className="w-4 h-4" /> : 'YOU'}
                    </div>

                    {/* Bubble */}
                    <div className="space-y-2 flex-1">
                      <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isAssistant 
                          ? 'bg-[#131b2e] text-slate-200 border border-slate-800/80 shadow-2xs' 
                          : 'bg-indigo-600 text-white shadow-sm ml-auto'
                      }`}>
                        <div className="whitespace-pre-wrap">{msg.text}</div>

                        {/* Tool Calls Pill */}
                        {msg.toolCalls && msg.toolCalls.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 font-mono text-[11px]">
                            {msg.toolCalls.map((tc, idx) => (
                              <div key={idx} className="bg-slate-900/80 p-2 rounded border border-indigo-900/40 text-indigo-300 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <Terminal className="w-3 h-3 text-indigo-400" />
                                  <span>tool_call: {tc.tool}()</span>
                                </span>
                                <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded">
                                  SUCCESS
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Citations Pill */}
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-800/60 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Source Evidence:</span>
                            {msg.citations.map((c, idx) => (
                              <div key={idx} className="bg-slate-900/60 p-1.5 rounded text-[11px] text-slate-300 border border-slate-800">
                                <strong className="text-indigo-400">{c.id} ({c.title}):</strong> "{c.excerpt}"
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      {isAssistant && (
                        <div className="flex items-center gap-3 text-[10px] text-slate-500 pl-1">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="hover:text-slate-300 flex items-center gap-1 transition-colors"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-3 max-w-md">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[#131b2e] p-3.5 rounded-2xl border border-slate-800 text-xs text-indigo-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                    <span>Reasoning across tools and knowledge graph...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Prompts */}
            <div className="px-4 py-2 bg-[#0e1424] border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[10px] uppercase font-semibold text-slate-400 whitespace-nowrap">
                Starter Prompts:
              </span>
              {[
                'Check status of ticket INC-4091',
                'What is our corporate VPN MFA procedure?',
                'Lookup customer profile for Apex Health Systems',
                'How do I request emergency change approval?'
              ].map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(starter)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap border border-slate-700 transition-colors"
                >
                  {starter}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#0b0f19] border-t border-slate-800">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask a technical policy question or trigger an autonomous tool command..."
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  className="flex-1 bg-[#131b2e] border border-slate-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={!inputPrompt.trim() || isTyping}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all shadow-md active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        )}

        {/* TAB 2: KNOWLEDGE BASE (RAG) */}
        {activeTab === 'knowledge' && (
          <div className="space-y-4">
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">Private Knowledge Base &amp; Vector Embeddings</h3>
                <p className="text-xs text-slate-400">All agent answers are grounded against these indexed source documents</p>
              </div>
              <button
                onClick={() => setIsDocModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Index New Document</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-[#0b0f19] p-5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-indigo-400 font-bold">{doc.id}</span>
                    <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono">
                      {doc.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{doc.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-[#131b2e] p-3 rounded-lg border border-slate-800">
                    {doc.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Doc Modal */}
            {isDocModalOpen && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-[#0b0f19] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white pb-2 border-b border-slate-800">
                    Index Document into Vector Memory
                  </h3>
                  <form onSubmit={handleAddDocument} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Document Title</label>
                      <input
                        type="text"
                        required
                        value={newDocTitle}
                        onChange={(e) => setNewDocTitle(e.target.value)}
                        placeholder="e.g. Remote Work Hardware Policy"
                        className="w-full bg-[#131b2e] border border-slate-700 text-white p-2 rounded focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Category</label>
                      <select
                        value={newDocCategory}
                        onChange={(e) => setNewDocCategory(e.target.value)}
                        className="w-full bg-[#131b2e] border border-slate-700 text-white p-2 rounded focus:outline-none"
                      >
                        <option value="Security">Security</option>
                        <option value="Operations">Operations</option>
                        <option value="ITSM">ITSM</option>
                        <option value="Procurement">Procurement</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Text Content (Simulated Vector Chunk)</label>
                      <textarea
                        rows={4}
                        required
                        value={newDocContent}
                        onChange={(e) => setNewDocContent(e.target.value)}
                        placeholder="Enter the full text content to be chunked and indexed..."
                        className="w-full bg-[#131b2e] border border-slate-700 text-white p-2 rounded focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsDocModalOpen(false)}
                        className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-sm"
                      >
                        Index Document
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TOOLS SANDBOX */}
        {activeTab === 'tools' && (
          <div className="space-y-4">
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white">Deterministic Agent Tools Sandbox</h3>
              <p className="text-xs text-slate-400">Simulate tool executions adhering to Model Context Protocol (MCP) tool schemas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="block text-xs font-semibold text-slate-300">Select Tool to Test</label>
                <select
                  value={selectedTool}
                  onChange={(e) => setSelectedTool(e.target.value)}
                  className="w-full bg-[#131b2e] border border-slate-700 text-white p-2 rounded text-xs focus:outline-none"
                >
                  <option value="ticket_lookup">ticket_lookup (ITSM)</option>
                  <option value="search_knowledge_base">search_knowledge_base (RAG)</option>
                  <option value="customer_profile_lookup">customer_profile_lookup (Dataverse CRM)</option>
                </select>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Input Argument</label>
                  <input
                    type="text"
                    value={toolParamInput}
                    onChange={(e) => setToolParamInput(e.target.value)}
                    className="w-full bg-[#131b2e] border border-slate-700 text-white p-2 rounded text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  onClick={handleExecuteTool}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  Execute Tool Schema &rarr;
                </button>
              </div>

              <div className="md:col-span-2 bg-[#0b0f19] p-4 rounded-xl border border-slate-800 flex flex-col font-mono text-xs">
                <div className="text-slate-400 uppercase text-[10px] font-bold mb-2">Tool Output JSON Payload:</div>
                <div className="flex-1 bg-[#131b2e] p-3 rounded-lg border border-slate-800 text-emerald-400 overflow-x-auto whitespace-pre">
                  {toolSandboxResult 
                    ? JSON.stringify(toolSandboxResult, null, 2) 
                    : '// Click "Execute Tool Schema" to inspect returned JSON object.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REASONING TRACES */}
        {activeTab === 'trace' && (
          <div className="space-y-4">
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white">LangGraph Step-by-Step Execution Graph</h3>
              <p className="text-xs text-slate-400">Observability into how the agent breaks down user intents, queries vectors, and synthesizes grounded answers</p>
            </div>

            <div className="bg-[#0b0f19] p-5 rounded-xl border border-slate-800 space-y-4">
              {[
                { step: '1. Guardrail & Prompt Safety Check', desc: 'Validates that user input contains no prompt injection attacks or unauthorized credential exfiltration requests.', status: 'PASSED (0ms)' },
                { step: '2. Intent Router Classification', desc: 'Determines whether query is an ITSM ticket lookup, policy RAG retrieval, or CRM account search.', status: 'COMPLETED (34ms)' },
                { step: '3. Vector Document Retrieval (RAG)', desc: 'Computes cosine similarity over enterprise document embeddings; retrieves top-2 chunks exceeding 0.75 threshold.', status: 'MATCH FOUND (72ms)' },
                { step: '4. Deterministic Tool Execution', desc: 'Executes parameterized tool calls to live databases or simulated APIs.', status: 'VERIFIED (95ms)' },
                { step: '5. Grounded Synthesis & Citations', desc: 'Combines retrieved context with verified tool payload; attaches citations to prevent hallucinations.', status: 'GENERATED (120ms)' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#131b2e] border border-slate-800 flex items-start justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{item.step}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">{item.desc}</p>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Simulated Conversations</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">{messages.length}</div>
              </div>
              <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Autonomous Resolution</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">94.2%</div>
              </div>
              <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Avg Response Latency</div>
                <div className="text-2xl font-bold text-indigo-400 font-mono mt-1">280ms</div>
              </div>
              <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Hallucination Rate</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">0.0% (Grounded)</div>
              </div>
            </div>

            <div className="bg-[#0b0f19] p-5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <h4 className="font-bold text-white text-sm">Enterprise AI Engineering Standards</h4>
              <p className="leading-relaxed">
                DevTechSoft constructs AI systems with zero hallucination guarantees for mission-critical operations. By enforcing strict tool calling protocols (MCP) and ground truth retrieval (RAG), agents never guess answers to business policies or inventory states.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
