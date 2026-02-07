import { useState } from 'react';
import { WorkerFlow } from './components/WorkerFlow';
import { PartnerPQQFlow } from './components/PartnerPQQFlow';
import { EmployerDashboard } from './components/EmployerDashboard';
import { Briefcase, Users, Shield } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'worker' | 'pqq' | 'dashboard'>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="size-8 text-blue-600" />
              <div>
                <h1 className="font-bold text-slate-900">WorkChain</h1>
                <p className="text-xs text-slate-500">Digital Identity & Compliance Platform</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView('worker')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeView === 'worker'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Users className="size-4" />
                <span className="hidden sm:inline">Worker App</span>
              </button>
              <button
                onClick={() => setActiveView('pqq')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeView === 'pqq'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Briefcase className="size-4" />
                <span className="hidden sm:inline">Partner PQQ</span>
              </button>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Shield className="size-4" />
                <span className="hidden sm:inline">Employer Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'worker' && <WorkerFlow />}
        {activeView === 'pqq' && <PartnerPQQFlow />}
        {activeView === 'dashboard' && <EmployerDashboard />}
      </main>

      {/* Demo Badge */}
      <div className="fixed bottom-4 right-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg px-4 py-2 shadow-lg">
        <p className="text-sm font-medium text-yellow-900">🎬 Investor Demo - All Data is Mocked</p>
      </div>
    </div>
  );
}
