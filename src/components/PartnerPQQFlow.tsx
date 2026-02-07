import { useState } from 'react';
import { Building2, Upload, CheckCircle, AlertTriangle, XCircle, FileText, Calendar, Shield } from 'lucide-react';

type Tier = 'client' | 'contractor' | 'subcontractor';
type DocStatus = 'valid' | 'expiring' | 'expired';

interface Partner {
  id: string;
  name: string;
  tier: Tier;
  invitedBy?: string;
  documents: {
    name: string;
    status: DocStatus;
    expiryDate: string;
    riskScore: 'green' | 'amber' | 'red';
  }[];
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

export function PartnerPQQFlow() {
  const [view, setView] = useState<'overview' | 'onboard'>('overview');
  const [selectedTier, setSelectedTier] = useState<Tier>('contractor');
  const [companyName, setCompanyName] = useState('');
  
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: 'p1',
      name: 'BuildCo Ltd',
      tier: 'contractor',
      invitedBy: 'MegaCorp Industries',
      documents: [
        { name: 'Public Liability Insurance', status: 'valid', expiryDate: '2025-08-15', riskScore: 'green' },
        { name: 'ISO 9001 Certificate', status: 'valid', expiryDate: '2025-12-01', riskScore: 'green' },
        { name: 'Health & Safety Policy', status: 'expiring', expiryDate: '2024-03-20', riskScore: 'amber' }
      ],
      approvalStatus: 'approved'
    },
    {
      id: 'p2',
      name: 'QuickBuild Services',
      tier: 'subcontractor',
      invitedBy: 'BuildCo Ltd',
      documents: [
        { name: 'Public Liability Insurance', status: 'valid', expiryDate: '2025-06-10', riskScore: 'green' },
        { name: 'Employer Liability Insurance', status: 'expired', expiryDate: '2024-01-05', riskScore: 'red' },
        { name: 'Trade Certification', status: 'valid', expiryDate: '2026-01-01', riskScore: 'green' }
      ],
      approvalStatus: 'pending'
    },
    {
      id: 'p3',
      name: 'Elite Contractors',
      tier: 'contractor',
      invitedBy: 'MegaCorp Industries',
      documents: [
        { name: 'Public Liability Insurance', status: 'expiring', expiryDate: '2024-02-28', riskScore: 'amber' },
        { name: 'ISO 14001 Certificate', status: 'valid', expiryDate: '2025-09-15', riskScore: 'green' }
      ],
      approvalStatus: 'pending'
    }
  ]);

  const handleSubmitPQQ = () => {
    const newPartner: Partner = {
      id: `p${partners.length + 1}`,
      name: companyName || 'New Company Ltd',
      tier: selectedTier,
      invitedBy: selectedTier === 'contractor' ? 'MegaCorp Industries' : 'BuildCo Ltd',
      documents: [
        { name: 'Public Liability Insurance', status: 'valid', expiryDate: '2025-11-20', riskScore: 'green' },
        { name: 'Employer Liability Insurance', status: 'valid', expiryDate: '2025-11-20', riskScore: 'green' },
        { name: 'Health & Safety Certificate', status: 'valid', expiryDate: '2025-08-01', riskScore: 'green' }
      ],
      approvalStatus: 'pending'
    };
    setPartners([...partners, newPartner]);
    setView('overview');
    setCompanyName('');
  };

  const getStatusColor = (status: DocStatus) => {
    if (status === 'valid') return 'text-green-600 bg-green-100';
    if (status === 'expiring') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskBadge = (risk: 'green' | 'amber' | 'red') => {
    const colors = {
      green: 'bg-green-500',
      amber: 'bg-yellow-500',
      red: 'bg-red-500'
    };
    return (
      <div className={`size-3 rounded-full ${colors[risk]}`} title={`Risk: ${risk}`} />
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {view === 'overview' && (
        <>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl mb-2">Partner Pre-Qualification (PQQ)</h2>
              <p className="text-slate-600">Supply chain onboarding and compliance tracking</p>
            </div>
            <button
              onClick={() => setView('onboard')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Invite Partner
            </button>
          </div>

          {/* Supply Chain Hierarchy */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="font-medium mb-4">Supply Chain Structure</h3>
            <div className="space-y-4">
              {/* Client Level */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Building2 className="size-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">MegaCorp Industries</h4>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Client</span>
                  </div>
                  <p className="text-sm text-slate-600">Prime contractor and project owner</p>
                  
                  {/* Contractors under Client */}
                  <div className="ml-8 mt-4 space-y-3 border-l-2 border-slate-200 pl-4">
                    {partners.filter(p => p.tier === 'contractor').map(contractor => (
                      <div key={contractor.id} className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-sm">{contractor.name}</h5>
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Contractor</span>
                            {getRiskBadge(contractor.documents.some(d => d.riskScore === 'red') ? 'red' : 
                                         contractor.documents.some(d => d.riskScore === 'amber') ? 'amber' : 'green')}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            contractor.approvalStatus === 'approved' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {contractor.approvalStatus}
                          </span>
                        </div>
                        
                        {/* Subcontractors */}
                        {partners.filter(p => p.tier === 'subcontractor' && p.invitedBy === contractor.name).length > 0 && (
                          <div className="ml-4 mt-2 border-l-2 border-slate-300 pl-3">
                            {partners.filter(p => p.tier === 'subcontractor' && p.invitedBy === contractor.name).map(sub => (
                              <div key={sub.id} className="bg-white rounded p-2 mb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">{sub.name}</span>
                                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Subcontractor</span>
                                    {getRiskBadge(sub.documents.some(d => d.riskScore === 'red') ? 'red' : 
                                                 sub.documents.some(d => d.riskScore === 'amber') ? 'amber' : 'green')}
                                  </div>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    sub.approvalStatus === 'approved' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {sub.approvalStatus}
                                  </span>
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
          </div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {partners.map(partner => (
              <div key={partner.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium mb-1">{partner.name}</h3>
                    <p className="text-sm text-slate-600">Invited by: {partner.invitedBy}</p>
                  </div>
                  <div className="flex gap-2">
                    {getRiskBadge(partner.documents.some(d => d.riskScore === 'red') ? 'red' : 
                                 partner.documents.some(d => d.riskScore === 'amber') ? 'amber' : 'green')}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      partner.approvalStatus === 'approved' 
                        ? 'bg-green-100 text-green-700' 
                        : partner.approvalStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {partner.approvalStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {partner.documents.map((doc, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="size-4 text-slate-400" />
                          <span className="text-sm font-medium">{doc.name}</span>
                        </div>
                        {getRiskBadge(doc.riskScore)}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Calendar className="size-3" />
                          <span>Expires: {doc.expiryDate}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {partner.approvalStatus === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        const updated = partners.map(p => 
                          p.id === partner.id ? { ...p, approvalStatus: 'approved' as const } : p
                        );
                        setPartners(updated);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <CheckCircle className="size-4 inline mr-1" />
                      Approve
                    </button>
                    <button className="flex-1 border-2 border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm">
                      <XCircle className="size-4 inline mr-1" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'onboard' && (
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setView('overview')}
            className="mb-6 text-blue-600 hover:text-blue-700"
          >
            ← Back to Overview
          </button>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl mb-6">Partner PQQ Onboarding</h2>

            <div className="space-y-6">
              {/* Tier Selection */}
              <div>
                <label className="block text-sm mb-3 text-slate-700">Partner Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedTier('contractor')}
                    className={`border-2 rounded-lg p-4 text-left transition-all ${
                      selectedTier === 'contractor'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <Building2 className="size-6 mb-2 text-blue-600" />
                    <p className="font-medium">Contractor</p>
                    <p className="text-sm text-slate-600">Directly engaged by client</p>
                  </button>
                  <button
                    onClick={() => setSelectedTier('subcontractor')}
                    className={`border-2 rounded-lg p-4 text-left transition-all ${
                      selectedTier === 'subcontractor'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <Building2 className="size-6 mb-2 text-green-600" />
                    <p className="font-medium">Subcontractor</p>
                    <p className="text-sm text-slate-600">Engaged by contractor</p>
                  </button>
                </div>
              </div>

              {/* Company Details */}
              <div>
                <label className="block text-sm mb-2 text-slate-700">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Construction Ltd"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-slate-700">Company Registration No.</label>
                  <input
                    type="text"
                    placeholder="12345678"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-slate-700">VAT Number</label>
                  <input
                    type="text"
                    placeholder="GB123456789"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Document Uploads */}
              <div>
                <label className="block text-sm mb-3 text-slate-700">Required Documents</label>
                <div className="space-y-3">
                  {[
                    'Public Liability Insurance (min £5M)',
                    'Employer Liability Insurance (min £10M)',
                    'Health & Safety Policy',
                    'ISO 9001 / ISO 14001 Certificates (if applicable)'
                  ].map((doc, idx) => (
                    <div key={idx} className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Upload className="size-5 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">{doc}</p>
                            <p className="text-xs text-slate-500">PDF, max 5MB</p>
                          </div>
                        </div>
                        {idx < 2 && (
                          <div className="bg-green-100 text-green-700 text-xs py-1 px-3 rounded-full">
                            <CheckCircle className="size-3 inline mr-1" />
                            mock_doc_{idx + 1}.pdf
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto-checks Display */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="size-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium mb-2">Automated Compliance Checks</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Document expiry validation</span>
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="size-4" /> Passed
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Insurance coverage threshold</span>
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="size-4" /> Passed
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Risk score calculation</span>
                        <span className="text-green-600 flex items-center gap-1">
                          <div className="size-3 rounded-full bg-green-500" /> Green (Low Risk)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Inheritance Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Trust Delegation:</strong> {selectedTier === 'contractor' 
                    ? 'As a contractor, you can invite and manage subcontractors. Your approval inherits to your sub-tier partners.' 
                    : 'As a subcontractor, your credentials are verified by your contractor (BuildCo Ltd) and inherit trust from the client level.'}
                </p>
              </div>

              <button
                onClick={handleSubmitPQQ}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit PQQ & Request Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
