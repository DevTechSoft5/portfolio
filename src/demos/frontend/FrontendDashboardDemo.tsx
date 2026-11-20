import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  Sun, 
  Moon, 
  Sliders, 
  Download, 
  CheckCircle2, 
  FileText,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { DemoBanner } from '../../components/common/DemoBanner';

const REVENUE_DATA = [
  { name: 'Jan', actual: 45000, target: 40000 },
  { name: 'Feb', actual: 52000, target: 45000 },
  { name: 'Mar', actual: 61000, target: 50000 },
  { name: 'Apr', actual: 58000, target: 55000 },
  { name: 'May', actual: 72000, target: 60000 },
  { name: 'Jun', actual: 84000, target: 70000 },
  { name: 'Jul', actual: 95000, target: 80000 }
];

const FUNNEL_DATA = [
  { channel: 'Organic Search', visitors: 14200, conversions: 1240 },
  { channel: 'Direct / Word of Mouth', visitors: 8900, conversions: 1100 },
  { channel: 'Technical Whitepapers', visitors: 6500, conversions: 820 },
  { channel: 'Partner Referrals', visitors: 4300, conversions: 650 },
  { channel: 'Developer Relations', visitors: 5800, conversions: 790 },
];

const DEVICE_DATA = [
  { name: 'macOS Workstations', value: 54, color: '#2563eb' },
  { name: 'Windows Enterprise', value: 32, color: '#06b6d4' },
  { name: 'Linux Engineering', value: 14, color: '#8b5cf6' }
];

const CUSTOMERS_TABLE = [
  { id: 'USR-891', name: 'Alexander Wright', company: 'Palantir Solutions', mrr: '$4,200', status: 'Enterprise', retention: '100%', joined: '2025-11-12' },
  { id: 'USR-892', name: 'Elena Rostova', company: 'Strata Cloud Systems', mrr: '$2,850', status: 'Scale', retention: '98%', joined: '2026-01-04' },
  { id: 'USR-893', name: 'Marcus Sterling', company: 'Apex Health Systems', mrr: '$7,500', status: 'Enterprise', retention: '100%', joined: '2025-08-20' },
  { id: 'USR-894', name: 'Sophia Chen', company: 'BioGenix Diagnostics', mrr: '$1,950', status: 'Growth', retention: '94%', joined: '2026-02-18' },
  { id: 'USR-895', name: 'David Kim', company: 'Nova Retail Operations', mrr: '$3,400', status: 'Scale', retention: '97%', joined: '2026-02-28' },
];

export const FrontendDashboardDemo: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('overview');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [tableSearch, setTableSearch] = useState('');
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Enterprise Lead Captured', time: '5m ago', read: false },
    { id: 2, title: 'Power BI Analytics Synced with Dataverse', time: '1h ago', read: false },
    { id: 3, title: 'SLA Warning Threshold Met on INC0010412', time: '3h ago', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const isDark = themeMode === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Banner */}
      <DemoBanner 
        projectName="VistaDash"
        projectSlug="frontend-dashboard"
        category="Frontend Engineering"
      />

      <div className="flex-1 flex overflow-hidden">
        
        {/* COLLAPSIBLE SIDEBAR */}
        <aside className={`${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } transition-all duration-300 border-r ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        } flex flex-col shrink-0`}>
          
          {/* Logo & Toggle */}
          <div className="p-4 flex items-center justify-between border-b border-inherit">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  VD
                </div>
                <span className="font-bold text-sm tracking-tight">VistaDash</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 mx-auto"
              title="Toggle Sidebar Collapse"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-2 space-y-1 flex-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* User profile bottom */}
          <div className="p-3 border-t border-inherit">
            <div className={`flex items-center gap-2.5 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                VD
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0 flex-1 text-left">
                  <div className="font-bold text-xs truncate">Operations Lead</div>
                  <div className="text-[10px] text-slate-400 truncate">demo@devtechsoft.dev</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* MAIN BODY */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* Top Bar */}
          <header className={`p-4 border-b flex items-center justify-between gap-4 sticky top-0 z-30 ${
            isDark ? 'bg-slate-900/90 border-slate-800 backdrop-blur-md' : 'bg-white/90 border-slate-200 backdrop-blur-md'
          }`}>
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Global search metrics, accounts, reports (Cmd + K)..."
                  className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Date Filter */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className={`text-xs rounded-xl px-2.5 py-1.5 border focus:outline-none ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Quarter to Date (QTD)">QTD</option>
                <option value="Year to Date (YTD)">YTD</option>
              </select>

              {/* Theme Toggle */}
              <button
                onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
                className={`p-2 rounded-xl border transition-colors ${
                  isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
                title="Toggle Dark/Light Mode"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className={`p-2 rounded-xl border relative transition-colors ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border p-4 z-50 text-xs space-y-3 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}>
                    <div className="flex items-center justify-between pb-2 border-b border-inherit">
                      <span className="font-bold">System Alerts</span>
                      <button onClick={markAllRead} className="text-blue-500 hover:underline text-[11px]">
                        Mark all read
                      </button>
                    </div>

                    <div className="space-y-2">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-2.5 rounded-xl border ${
                          n.read ? 'opacity-60 bg-transparent border-transparent' : 'bg-blue-50/20 border-blue-500/20'
                        }`}>
                          <div className="font-semibold">{n.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{n.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Dashboard Canvas */}
          <main className="p-4 sm:p-6 space-y-6 max-w-7xl w-full mx-auto">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Monthly Recurring Revenue', value: '$124,500', trend: '+18.4%', up: true, desc: 'vs last month' },
                { title: 'Active Studio Accounts', value: '42 Clients', trend: '+4 this month', up: true, desc: 'Enterprise tier' },
                { title: 'Gross Retention Rate', value: '98.8%', trend: '+0.4%', up: true, desc: 'Top quartile' },
                { title: 'Avg Mean Resolution (MTTR)', value: '24m', trend: '-8.2%', up: true, desc: 'SLA target: 60m' },
              ].map((kpi, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border shadow-2xs ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="text-xs text-slate-400 font-medium">{kpi.title}</div>
                  <div className="text-2xl font-extrabold mt-1 tracking-tight font-mono">{kpi.value}</div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500 mt-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{kpi.trend}</span>
                    <span className="text-slate-400 font-normal ml-1">&bull; {kpi.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Area Chart */}
              <div className={`lg:col-span-2 p-5 rounded-2xl border shadow-2xs ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-sm">Revenue Trajectory vs Model Target</h3>
                    <p className="text-xs text-slate-400">Actual ARR growth mapped against baseline forecast</p>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                    Target Exceeded
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#f1f5f9'} />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `$${val/1000}k`} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="actual" name="Actual" stroke="#2563eb" strokeWidth={2} fill="url(#colorAct)" />
                      <Area type="monotone" dataKey="target" name="Target" stroke="#94a3b8" strokeDasharray="3 3" fill="transparent" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Donut Chart: Device Split */}
              <div className={`p-5 rounded-2xl border shadow-2xs flex flex-col ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="font-bold text-sm mb-1">Platform Architecture Distribution</h3>
                <p className="text-xs text-slate-400 mb-4">Active enterprise endpoints</p>

                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={DEVICE_DATA} innerRadius={48} outerRadius={68} paddingAngle={4} dataKey="value">
                        {DEVICE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1.5 mt-auto pt-4 border-t border-inherit text-xs">
                  {DEVICE_DATA.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-400">{item.name}</span>
                      </div>
                      <span className="font-bold font-mono">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* High-Density Data Table */}
            <div className={`rounded-2xl border shadow-2xs overflow-hidden ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="p-4 border-b border-inherit flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold">Enterprise Client Accounts</h3>
                  <p className="text-xs text-slate-400">High-density data grid with status filters</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search accounts..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    className={`w-full pl-8 pr-3 py-1 rounded-lg text-xs border focus:outline-none ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className={`text-slate-400 uppercase text-[10px] font-sans border-b border-inherit ${
                    isDark ? 'bg-slate-950/60' : 'bg-slate-50'
                  }`}>
                    <tr>
                      <th className="py-2.5 px-4">Account ID</th>
                      <th className="py-2.5 px-4">Executive Contact</th>
                      <th className="py-2.5 px-4">Organization</th>
                      <th className="py-2.5 px-4">Contract MRR</th>
                      <th className="py-2.5 px-4">Tier Status</th>
                      <th className="py-2.5 px-4">Retention</th>
                      <th className="py-2.5 px-4">Onboard Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit text-[11px]">
                    {CUSTOMERS_TABLE.filter(c => c.name.toLowerCase().includes(tableSearch.toLowerCase()) || c.company.toLowerCase().includes(tableSearch.toLowerCase())).map(row => (
                      <tr key={row.id} className="hover:bg-slate-500/5">
                        <td className="py-2.5 px-4 font-bold text-blue-500">{row.id}</td>
                        <td className="py-2.5 px-4 font-sans font-semibold text-slate-900 dark:text-white">{row.name}</td>
                        <td className="py-2.5 px-4 font-sans text-slate-500">{row.company}</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">{row.mrr}</td>
                        <td className="py-2.5 px-4 font-sans">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            row.status === 'Enterprise' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-emerald-500 font-bold">{row.retention}</td>
                        <td className="py-2.5 px-4 text-slate-400">{row.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </main>
        </div>

      </div>
    </div>
  );
};
