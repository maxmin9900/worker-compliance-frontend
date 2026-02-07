import { useState } from 'react';
import { Users, Building2, Award, Shield, CheckCircle, Clock, AlertTriangle, TrendingUp, FileText } from 'lucide-react';

interface Worker {
  id: string;
  name: string;
  did: string;
  project: string;
  status: 'approved' | 'pending' | 'rejected';
  badge?: string;
  joinedDate: string;
}

interface ComplianceItem {
  entity: string;
  tier: 'client' | 'contractor' | 'subcontractor';
  status: 'compliant' | 'warning' | 'critical';
  issues: number;
  lastCheck: string;
}

export function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'workers' | 'compliance' | 'audit'>('overview');
  
  const [workers, setWorkers] = useState<Worker[]>([
    { id: 'w1', name: 'John Smith', did: 'did:work:0x7f9a...c3e8', project: 'London Bridge Construction', status: 'approved', badge: 'Certified Site Worker', joinedDate: '2024-01-15' },
    { id: 'w2', name: 'Sarah Johnson', did: 'did:work:0x2b4c...f1a9', project: 'London Bridge Construction', status: 'approved', badge: 'Safety Officer', joinedDate: '2024-01-18' },
    { id: 'w3', name: 'Michael Chen', did: 'did:work:0x9e3d...8b2c', project: 'Manchester Hospital Extension', status: 'pending', joinedDate: '2024-02-05' },
    { id: 'w4', name: 'Emma Williams', did: 'did:work:0x4f8a...d6e3', project: 'London Bridge Construction', status: 'approved', badge: 'Heavy Equipment Operator', joinedDate: '2024-01-22' }
  ]);

  const compliance: ComplianceItem[] = [
    { entity: 'MegaCorp Industries', tier: 'client', status: 'compliant', issues: 0, lastCheck: '2024-02-07 09:00' },
    { entity: 'BuildCo Ltd', tier: 'contractor', status: 'warning', issues: 1, lastCheck: '2024-02-07 08:45' },
    { entity: 'Elite Contractors', tier: 'contractor', status: 'warning', issues: 2, lastCheck: '2024-02-07 08:30' },
    { entity: 'QuickBuild Services', tier: 'subcontractor', status: 'critical', issues: 3, lastCheck: '2024-02-06 16:20' }
  ];

  const auditLogs = [
    { timestamp: '2024-02-07 09:15:23', action: 'Worker Badge Issued', entity: 'John Smith', hash: 'bc7f...3a9e' },
    { timestamp: '2024-02-07 09:00:11', action: 'Partner Approved', entity: 'BuildCo Ltd', hash: 'a3c2...7f1d' },
    { timestamp: '2024-02-07 08:45:50', action: 'Document Verified', entity: 'Elite Contractors - Insurance', hash: '5e9d...4b8c' },
    { timestamp: '2024-02-07 08:30:42', action: 'Worker VC Created', entity: 'Sarah Johnson', hash: '2f4a...c6d1' },
    { timestamp: '2024-02-06 17:22:15', action: 'Compliance Check Failed', entity: 'QuickBuild Services', hash: '8d3f...9e2a' }
  ];

  const stats = {
    totalWorkers: workers.length,
    approvedWorkers: workers.filter(w => w.status === 'approved').length,
    pendingWorkers: workers.filter(w => w.status === 'pending').length,
    badgesIssued: workers.filter(w => w.badge).length,
    partners: 4,
    compliant: compliance.filter(c => c.status === 'compliant').length,
    warnings: compliance.filter(c => c.status === 'warning').length,
    critical: compliance.filter(c => c.status === 'critical').length
  };

  const getStatusColor = (status: string) => {
    if (status === 'approved' || status === 'compliant') return 'text-green-600 bg-green-100';
    if (status === 'pending' || status === 'warning') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'approved' || status === 'compliant') return <CheckCircle className="size-4" />;
    if (status === 'pending' || status === 'warning') return <Clock className="size-4" />;
    return <AlertTriangle className="size-4" />;
  };

  return (
    <div>
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-2 flex gap-2">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'workers', label: 'Workers', icon: Users },
          { id: 'compliance', label: 'Supply Chain Compliance', icon: Shield },
          { id: 'audit', label: 'Audit Logs', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="size-4" />
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="size-8 text-blue-600" />
                <span className="text-3xl font-bold text-slate-900">{stats.totalWorkers}</span>
              </div>
              <p className="text-sm text-slate-600">Total Workers</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="size-8 text-green-600" />
                <span className="text-3xl font-bold text-slate-900">{stats.approvedWorkers}</span>
              </div>
              <p className="text-sm text-slate-600">Approved</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="size-8 text-yellow-600" />
                <span className="text-3xl font-bold text-slate-900">{stats.badgesIssued}</span>
              </div>
              <p className="text-sm text-slate-600">Badges Issued</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Building2 className="size-8 text-purple-600" />
                <span className="text-3xl font-bold text-slate-900">{stats.partners}</span>
              </div>
              <p className="text-sm text-slate-600">Partners</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-medium mb-4">Pending Approvals</h3>
              <div className="space-y-3">
                {workers.filter(w => w.status === 'pending').map(worker => (
                  <div key={worker.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{worker.name}</p>
                      <p className="text-xs text-slate-600">{worker.project}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const updated = workers.map(w => 
                            w.id === worker.id ? { ...w, status: 'approved' as const, badge: 'Certified Site Worker' } : w
                          );
                          setWorkers(updated);
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button className="border border-red-300 text-red-600 px-3 py-1 rounded text-xs hover:bg-red-50 transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
                {workers.filter(w => w.status === 'pending').length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">No pending approvals</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-medium mb-4">Compliance Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-green-500" />
                    <span className="text-sm">Compliant</span>
                  </div>
                  <span className="font-bold text-green-600">{stats.compliant}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Warnings</span>
                  </div>
                  <span className="font-bold text-yellow-600">{stats.warnings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500" />
                    <span className="text-sm">Critical Issues</span>
                  </div>
                  <span className="font-bold text-red-600">{stats.critical}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {auditLogs.slice(0, 5).map((log, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                  <div className="size-2 rounded-full bg-blue-500 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-slate-600">{log.entity}</p>
                  </div>
                  <span className="text-xs text-slate-500">{log.timestamp.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Workers Tab */}
      {activeTab === 'workers' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium">Worker Management</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              + Add Worker
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">DID</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Project</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Badge</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workers.map(worker => (
                  <tr key={worker.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-sm">{worker.name}</p>
                      <p className="text-xs text-slate-500">Joined {worker.joinedDate}</p>
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded">{worker.did}</code>
                    </td>
                    <td className="py-3 px-4 text-sm">{worker.project}</td>
                    <td className="py-3 px-4">
                      {worker.badge ? (
                        <div className="flex items-center gap-1 text-xs">
                          <Award className="size-3 text-yellow-600" />
                          <span>{worker.badge}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            const updated = workers.map(w => 
                              w.id === worker.id ? { ...w, badge: 'Certified Site Worker' } : w
                            );
                            setWorkers(updated);
                          }}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Issue Badge
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 ${getStatusColor(worker.status)}`}>
                        {getStatusIcon(worker.status)}
                        {worker.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {worker.status === 'pending' && (
                        <button
                          onClick={() => {
                            const updated = workers.map(w => 
                              w.id === worker.id ? { ...w, status: 'approved' as const, badge: 'Certified Site Worker' } : w
                            );
                            setWorkers(updated);
                          }}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="font-medium mb-4">Supply Chain Compliance Overview</h3>
            <p className="text-sm text-slate-600 mb-6">
              Compliance status bubbles up from subcontractor → contractor → client. Issues at any level affect parent tiers.
            </p>

            {/* Visual Hierarchy */}
            <div className="space-y-4">
              {/* Client Level */}
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="size-6 text-blue-600" />
                    <div>
                      <h4 className="font-medium">MegaCorp Industries</h4>
                      <span className="text-xs text-blue-700">Client / Prime Contractor</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded-full bg-yellow-500" title="Inherited warning from sub-tier" />
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                      2 warnings bubbled up
                    </span>
                  </div>
                </div>

                {/* Contractors */}
                <div className="ml-8 space-y-3">
                  {compliance.filter(c => c.tier === 'contractor').map((contractor, idx) => (
                    <div key={idx} className="border-2 border-purple-200 rounded-lg p-3 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h5 className="font-medium text-sm">{contractor.entity}</h5>
                          <span className="text-xs text-purple-700">Contractor</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`size-3 rounded-full ${
                            contractor.status === 'compliant' ? 'bg-green-500' : 
                            contractor.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(contractor.status)}`}>
                            {contractor.issues} issues
                          </span>
                        </div>
                      </div>

                      {/* Subcontractors */}
                      {compliance.filter(c => c.tier === 'subcontractor').length > 0 && idx === 0 && (
                        <div className="ml-4 mt-3 border-l-2 border-slate-300 pl-3">
                          {compliance.filter(c => c.tier === 'subcontractor').map((sub, subIdx) => (
                            <div key={subIdx} className="border border-slate-200 rounded p-2 bg-slate-50 mb-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-sm font-medium">{sub.entity}</span>
                                  <p className="text-xs text-slate-600">Subcontractor</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className={`size-3 rounded-full ${
                                    sub.status === 'compliant' ? 'bg-green-500' : 
                                    sub.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                                  }`} />
                                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(sub.status)}`}>
                                    {sub.issues} issues
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Compliance List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-medium mb-4">All Partners - Compliance Details</h3>
            <div className="space-y-3">
              {compliance.map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`size-4 rounded-full ${
                        item.status === 'compliant' ? 'bg-green-500' : 
                        item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <h4 className="font-medium text-sm">{item.entity}</h4>
                        <p className="text-xs text-slate-600 capitalize">{item.tier}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{item.issues} compliance {item.issues === 1 ? 'issue' : 'issues'} found</span>
                    <span>Last checked: {item.lastCheck}</span>
                  </div>
                  {item.status !== 'compliant' && (
                    <button className="mt-3 text-xs text-blue-600 hover:underline">
                      View details & resolve issues →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium">Blockchain Audit Trail</h3>
              <p className="text-sm text-slate-600">SHA-256 hashed logs (simulating blockchain immutability)</p>
            </div>
            <button className="text-sm text-blue-600 hover:underline">Export Logs</button>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="size-4 text-blue-600" />
                      <h4 className="font-medium text-sm">{log.action}</h4>
                    </div>
                    <p className="text-sm text-slate-600">{log.entity}</p>
                  </div>
                  <span className="text-xs text-slate-500">{log.timestamp}</span>
                </div>
                <div className="bg-slate-100 rounded p-2 font-mono text-xs text-slate-700">
                  SHA-256: {log.hash}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>🔗 Simulated Blockchain:</strong> All actions are logged with SHA-256 hashes to ensure immutability and traceability. In production, this would connect to a real blockchain network.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
