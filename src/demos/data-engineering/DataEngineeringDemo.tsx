import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Play, 
  Square, 
  RotateCcw, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Download, 
  Upload, 
  Search, 
  TrendingUp, 
  Layers, 
  Terminal,
  Activity,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { DemoBanner } from '../../components/common/DemoBanner';

interface Pipeline {
  id: string;
  name: string;
  source: string;
  target: string;
  layer: 'Bronze' | 'Silver' | 'Gold';
  status: 'Idle' | 'Running' | 'Success' | 'Failed';
  lastRun: string;
  duration: string;
  recordsProcessed: number;
}

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

interface DataRecord {
  id: string;
  timestamp: string;
  customerId: string;
  transactionAmount: number;
  currency: string;
  status: 'Completed' | 'Pending' | 'Flagged';
  anomalyScore: number;
}

const INITIAL_PIPELINES: Pipeline[] = [
  { id: 'PIP-01', name: 'ERP_Daily_Ingest_ADF', source: 'SAP S/4HANA (REST API)', target: 'ADLS Gen2 (Bronze Parquet)', layer: 'Bronze', status: 'Success', lastRun: '2 hours ago', duration: '3m 42s', recordsProcessed: 142500 },
  { id: 'PIP-02', name: 'Clickstream_DeltaLake_Bronze', source: 'Kafka Event Hubs', target: 'Delta Lake (Bronze raw)', layer: 'Bronze', status: 'Success', lastRun: '15 mins ago', duration: '1m 18s', recordsProcessed: 489000 },
  { id: 'PIP-03', name: 'Customer_360_PySpark_Silver', source: 'Delta Bronze Tables', target: 'Delta Silver (Deduplicated)', layer: 'Silver', status: 'Idle', lastRun: '1 hour ago', duration: '4m 55s', recordsProcessed: 138200 },
  { id: 'PIP-04', name: 'Finance_Databricks_Gold', source: 'Delta Silver Curated', target: 'Synapse / Power BI Mart', layer: 'Gold', status: 'Success', lastRun: '3 hours ago', duration: '2m 10s', recordsProcessed: 89400 },
  { id: 'PIP-05', name: 'SupplyChain_Sync_Blob', source: 'Vendor SFTP CSVs', target: 'Delta Bronze (Quarantine)', layer: 'Bronze', status: 'Failed', lastRun: '40 mins ago', duration: '0m 45s', recordsProcessed: 1200 },
];

const INITIAL_DATA_RECORDS: DataRecord[] = [
  { id: 'TX-901', timestamp: '2026-03-12 10:14:02', customerId: 'CUST-101', transactionAmount: 1420.50, currency: 'USD', status: 'Completed', anomalyScore: 0.02 },
  { id: 'TX-902', timestamp: '2026-03-12 10:15:33', customerId: 'CUST-104', transactionAmount: 34800.00, currency: 'USD', status: 'Completed', anomalyScore: 0.05 },
  { id: 'TX-903', timestamp: '2026-03-12 10:18:12', customerId: 'CUST-102', transactionAmount: -45.00, currency: 'USD', status: 'Flagged', anomalyScore: 0.88 },
  { id: 'TX-904', timestamp: '2026-03-12 10:20:45', customerId: 'CUST-103', transactionAmount: 890.00, currency: 'EUR', status: 'Completed', anomalyScore: 0.01 },
  { id: 'TX-905', timestamp: '2026-03-12 10:22:19', customerId: 'CUST-105', transactionAmount: 12500.00, currency: 'USD', status: 'Completed', anomalyScore: 0.08 },
  { id: 'TX-906', timestamp: '2026-03-12 10:25:01', customerId: 'CUST-101', transactionAmount: 450.00, currency: 'USD', status: 'Completed', anomalyScore: 0.03 }
];

const VOLUME_TREND_DATA = [
  { day: 'Mon', volumeGB: 42.5, pipelineRuns: 24 },
  { day: 'Tue', volumeGB: 58.2, pipelineRuns: 28 },
  { day: 'Wed', volumeGB: 64.8, pipelineRuns: 31 },
  { day: 'Thu', volumeGB: 51.0, pipelineRuns: 26 },
  { day: 'Fri', volumeGB: 78.4, pipelineRuns: 35 },
  { day: 'Sat', volumeGB: 34.0, pipelineRuns: 18 },
  { day: 'Sun', volumeGB: 29.5, pipelineRuns: 16 }
];

export const DataEngineeringDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pipelines' | 'quality' | 'explorer'>('dashboard');
  
  // State
  const [pipelines, setPipelines] = useState<Pipeline[]>(() => {
    const saved = localStorage.getItem('devtech_data_pipelines');
    return saved ? JSON.parse(saved) : INITIAL_PIPELINES;
  });

  const [dataRecords, setDataRecords] = useState<DataRecord[]>(() => {
    const saved = localStorage.getItem('devtech_data_records');
    return saved ? JSON.parse(saved) : INITIAL_DATA_RECORDS;
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '10:00:15', level: 'INFO', message: 'Databricks Cluster [c-092-spark] initialized with 4 worker nodes.' },
    { timestamp: '10:00:45', level: 'INFO', message: 'Bronze Delta partition sync complete: 489,000 events committed.' },
    { timestamp: '10:02:10', level: 'WARN', message: 'SupplyChain_Sync_Blob encountered 3 malformed CSV rows (isolated to quarantine).' },
    { timestamp: '10:04:22', level: 'INFO', message: 'Data Quality check rule [NotNull_CustomerId] passed with 100% adherence.' },
  ]);

  const [runningPipelineId, setRunningPipelineId] = useState<string | null>(null);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [explorerSearch, setExplorerSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('devtech_data_pipelines', JSON.stringify(pipelines));
  }, [pipelines]);

  useEffect(() => {
    localStorage.setItem('devtech_data_records', JSON.stringify(dataRecords));
  }, [dataRecords]);

  const handleResetData = () => {
    setPipelines(INITIAL_PIPELINES);
    setDataRecords(INITIAL_DATA_RECORDS);
    localStorage.removeItem('devtech_data_pipelines');
    localStorage.removeItem('devtech_data_records');
  };

  // Simulate Pipeline Run
  const handleRunPipeline = (pipelineId: string) => {
    if (runningPipelineId) return;
    setRunningPipelineId(pipelineId);
    setPipelineProgress(10);

    const pipe = pipelines.find(p => p.id === pipelineId);
    const newLog = (msg: string, lvl: 'INFO' | 'WARN' | 'ERROR' = 'INFO') => {
      setLogs(prev => [
        { timestamp: new Date().toLocaleTimeString(), level: lvl, message: msg },
        ...prev
      ]);
    };

    newLog(`Triggering job for [${pipe?.name}]. Allocating PySpark executors...`);

    setTimeout(() => {
      setPipelineProgress(40);
      newLog(`[${pipe?.name}] Reading Parquet partitions from Azure Data Lake Storage Gen2...`);
    }, 1000);

    setTimeout(() => {
      setPipelineProgress(75);
      newLog(`[${pipe?.name}] Running schema validation & Great Expectations quality suite...`);
    }, 2200);

    setTimeout(() => {
      setPipelineProgress(100);
      newLog(`[${pipe?.name}] Successfully merged into Gold Delta table. ACID commit hash: #e8a9012f`);
      
      setPipelines(prev => prev.map(p => p.id === pipelineId ? {
        ...p,
        status: 'Success',
        lastRun: 'Just now',
        recordsProcessed: p.recordsProcessed + 1540
      } : p));

      setRunningPipelineId(null);
      setPipelineProgress(0);
    }, 3500);
  };

  // Stop Pipeline
  const handleStopPipeline = (pipelineId: string) => {
    setRunningPipelineId(null);
    setPipelineProgress(0);
    setPipelines(prev => prev.map(p => p.id === pipelineId ? { ...p, status: 'Idle' } : p));
    setLogs(prev => [
      { timestamp: new Date().toLocaleTimeString(), level: 'WARN', message: `Job [${pipelineId}] manually halted by operator.` },
      ...prev
    ]);
  };

  // CSV Export
  const handleDownloadCSV = () => {
    const header = 'id,timestamp,customerId,transactionAmount,currency,status,anomalyScore\n';
    const rows = dataRecords.map(r => 
      `${r.id},${r.timestamp},${r.customerId},${r.transactionAmount},${r.currency},${r.status},${r.anomalyScore}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DataPulse_Lakehouse_Export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // CSV Upload (Client-side parser)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split('\n').filter(l => l.trim().length > 0);
      if (lines.length > 1) {
        // parse rows
        const parsed: DataRecord[] = [];
        for (let i = 1; i < Math.min(lines.length, 10); i++) {
          const cols = lines[i].split(',');
          if (cols.length >= 4) {
            parsed.push({
              id: cols[0]?.trim() || `TX-${Date.now() + i}`,
              timestamp: cols[1]?.trim() || new Date().toISOString(),
              customerId: cols[2]?.trim() || 'CUST-IMPORT',
              transactionAmount: parseFloat(cols[3]) || 500.0,
              currency: 'USD',
              status: 'Completed',
              anomalyScore: 0.02
            });
          }
        }
        if (parsed.length > 0) {
          setDataRecords([...parsed, ...dataRecords]);
          alert(`Successfully ingested ${parsed.length} records into Data Explorer table!`);
        }
      }
    };
    reader.readAsText(file);
  };

  const totalProcessed = pipelines.reduce((acc, p) => acc + p.recordsProcessed, 0);
  const activeCount = pipelines.filter(p => p.status === 'Running').length;
  const failedCount = pipelines.filter(p => p.status === 'Failed').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Banner */}
      <DemoBanner 
        projectName="DataPulse"
        projectSlug="data-analytics"
        category="Data Engineering & Analytics"
        onResetData={handleResetData}
        resetLabel="Reset Pipeline Telemetry"
      />

      {/* Control Room Header */}
      <div className="bg-[#0f172a] border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>DataPulse Lakehouse Control Room</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-700/60">
                PySpark &bull; Delta Lake ACID
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Orchestrator: Azure Data Factory (ADF) + Databricks Runtime 14.3 LTS
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="text-right hidden sm:block">
            <div className="font-semibold text-white">Cluster: spark-pool-prod-01</div>
            <div className="text-[10px] text-emerald-400">Status: HEALTHY (4 Nodes Active)</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="bg-[#0b1120] border-b border-slate-800 px-4 sm:px-6 py-1.5 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-1 sm:space-x-2">
          {[
            { id: 'dashboard', label: 'Pipeline Health & Metrics', icon: Activity },
            { id: 'pipelines', label: `Pipeline Management (${pipelines.length})`, icon: Layers },
            { id: 'quality', label: 'Data Quality Engine (98.4%)', icon: ShieldCheck },
            { id: 'explorer', label: 'Lakehouse Data Explorer', icon: Terminal },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={handleDownloadCSV}
            className="text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3 h-3 text-emerald-400" />
            <span>Export Sample CSV</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* TAB 1: PIPELINE HEALTH & METRICS */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">24h Data Volume Ingested</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">358.5 GB</div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+18.4% vs last week</span>
                </div>
              </div>

              <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Records Processed</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">
                  {totalProcessed.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Across Bronze, Silver, Gold</div>
              </div>

              <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Pipeline SLA Success Rate</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">98.6%</div>
                <div className="text-[11px] text-slate-400 mt-1">1 Failure in last 24h</div>
              </div>

              <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Data Quality Score</div>
                <div className="text-2xl font-bold text-blue-400 font-mono mt-1">98.4 / 100</div>
                <div className="text-[11px] text-blue-400 mt-1">Automated Great Expectations</div>
              </div>
            </div>

            {/* Ingestion Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Daily Volume Area Chart */}
              <div className="lg:col-span-2 bg-[#0f172a] p-5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Daily Data Volume Throughput (GB)</h3>
                    <p className="text-xs text-slate-400">7-Day Medallion lakehouse ingestion volume</p>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    ADLS Gen2
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={VOLUME_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val}GB`} />
                      <Tooltip 
                        formatter={(value) => [`${value} GB`, 'Volume']}
                        contentStyle={{ backgroundColor: '#020617', borderRadius: '8px', color: '#fff', fontSize: '12px', border: '1px solid #1e293b' }}
                      />
                      <Area type="monotone" dataKey="volumeGB" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVol)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Real-time Logs Console */}
              <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800 flex flex-col font-mono text-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800 font-sans">
                  <span className="font-bold text-white text-xs">Live Execution Logs</span>
                  <span className="text-[10px] text-emerald-400">Stream: Active</span>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto max-h-60 text-[11px]">
                  {logs.map((log, idx) => (
                    <div key={idx} className="border-b border-slate-800/60 pb-1.5">
                      <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                      <span className={`font-bold ${
                        log.level === 'ERROR' ? 'text-rose-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        [{log.level}]
                      </span>{' '}
                      <span className="text-slate-300">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PIPELINES */}
        {activeTab === 'pipelines' && (
          <div className="space-y-4">
            <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">Medallion Data Pipelines (Bronze &rarr; Silver &rarr; Gold)</h3>
                <p className="text-xs text-slate-400">Trigger manual ETL orchestrations, inspect job stages, and review run metrics</p>
              </div>

              {runningPipelineId && (
                <div className="flex items-center gap-2 bg-emerald-950/80 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-800 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Pipeline executing ({pipelineProgress}%)...</span>
                </div>
              )}
            </div>

            {/* Pipeline Table */}
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0b1120] text-slate-400 uppercase text-[10px] border-b border-slate-800 font-sans">
                  <tr>
                    <th className="py-3 px-4">Pipeline Name</th>
                    <th className="py-3 px-4">Layer</th>
                    <th className="py-3 px-4">Source System</th>
                    <th className="py-3 px-4">Target Destination</th>
                    <th className="py-3 px-4">Last Run</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-[11px]">
                  {pipelines.map(pipe => {
                    const isRunning = runningPipelineId === pipe.id;
                    return (
                      <tr key={pipe.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 text-white font-bold">{pipe.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pipe.layer === 'Gold' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            pipe.layer === 'Silver' ? 'bg-slate-800 text-slate-300 border border-slate-700' :
                            'bg-orange-950 text-orange-300 border border-orange-800'
                          }`}>
                            {pipe.layer}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{pipe.source}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{pipe.target}</td>
                        <td className="py-3 px-4 text-slate-400 font-sans">{pipe.lastRun}</td>
                        <td className="py-3 px-4 font-sans">
                          {isRunning ? (
                            <span className="text-emerald-400 font-semibold animate-pulse">Running ({pipelineProgress}%)</span>
                          ) : (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              pipe.status === 'Success' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                              pipe.status === 'Failed' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                              'bg-slate-800 text-slate-300'
                            }`}>
                              {pipe.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right font-sans">
                          {isRunning ? (
                            <button
                              onClick={() => handleStopPipeline(pipe.id)}
                              className="bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 ml-auto"
                            >
                              <Square className="w-3 h-3 fill-white" />
                              <span>Stop</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRunPipeline(pipe.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 ml-auto transition-colors"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>{pipe.status === 'Failed' ? 'Retry Run' : 'Run Pipeline'}</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DATA QUALITY ENGINE */}
        {activeTab === 'quality' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Null Constraint Adherence</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">100.0%</div>
                <div className="text-[11px] text-slate-400">0 null values in primary key columns</div>
              </div>

              <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Duplicate Record Detection</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">0.02% Flagged</div>
                <div className="text-[11px] text-slate-400">Isolated automatically before Silver merge</div>
              </div>

              <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Schema Drift Check</div>
                <div className="text-2xl font-bold text-blue-400 font-mono">0 Drift Events</div>
                <div className="text-[11px] text-slate-400">Strict Delta Lake schema enforcement</div>
              </div>
            </div>

            {/* Quarantined Records Table */}
            <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Quarantine &amp; Anomaly Records</h4>
                  <p className="text-xs text-slate-400">Records isolated by automated data quality filters before loading to analytics</p>
                </div>
                <span className="text-xs bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800 font-mono">
                  1 Flagged Row
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0b1120] text-slate-400 text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-2 px-3">Record ID</th>
                      <th className="py-2 px-3">Customer</th>
                      <th className="py-2 px-3">Amount</th>
                      <th className="py-2 px-3">Quality Violation Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    <tr>
                      <td className="py-2 px-3 text-rose-400">TX-903</td>
                      <td className="py-2 px-3 text-slate-300">CUST-102</td>
                      <td className="py-2 px-3 text-rose-300">-$45.00</td>
                      <td className="py-2 px-3 text-rose-300 font-sans">
                        Violation rule: [PositiveAmountConstraint]. Transaction amount cannot be negative.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DATA EXPLORER */}
        {activeTab === 'explorer' && (
          <div className="space-y-4">
            <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter records by ID, customer..."
                  value={explorerSearch}
                  onChange={(e) => setExplorerSearch(e.target.value)}
                  className="w-full bg-[#0b1120] border border-slate-700 text-white pl-9 pr-3 py-1.5 rounded text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Upload CSV */}
              <div className="flex items-center gap-2">
                <label className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded cursor-pointer border border-slate-700 flex items-center gap-1.5 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Upload CSV Dataset</span>
                  <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                </label>

                <button
                  onClick={handleDownloadCSV}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0b1120] text-slate-400 text-[10px] border-b border-slate-800 uppercase font-sans">
                  <tr>
                    <th className="py-2.5 px-4">Transaction ID</th>
                    <th className="py-2.5 px-4">Timestamp</th>
                    <th className="py-2.5 px-4">Customer ID</th>
                    <th className="py-2.5 px-4">Amount</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Anomaly Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-[11px]">
                  {dataRecords.filter(r => r.id.toLowerCase().includes(explorerSearch.toLowerCase()) || r.customerId.toLowerCase().includes(explorerSearch.toLowerCase())).map(r => (
                    <tr key={r.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">{r.id}</td>
                      <td className="py-2.5 px-4 text-slate-400">{r.timestamp}</td>
                      <td className="py-2.5 px-4 text-white font-sans">{r.customerId}</td>
                      <td className="py-2.5 px-4 text-white font-bold">${r.transactionAmount.toLocaleString()}</td>
                      <td className="py-2.5 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          r.status === 'Completed' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-300">{r.anomalyScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
