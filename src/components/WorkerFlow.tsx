import { useState } from 'react';
import { Upload, Camera, CheckCircle, Award, QrCode, Wallet } from 'lucide-react';

type Step = 'register' | 'upload' | 'processing' | 'wallet' | 'project' | 'badge';

export function WorkerFlow() {
  const [step, setStep] = useState<Step>('register');
  const [workerName, setWorkerName] = useState('');
  const [workerEmail, setWorkerEmail] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState(false);

  const mockWorkerDID = 'did:work:0x7f9a...c3e8';
  const mockVC = {
    id: 'vc:identity:2024:5f8a',
    issued: '2024-02-07',
    type: 'IdentityCredential',
    hash: '8a3f...d7c2'
  };

  const handleRegister = () => {
    if (workerName && workerEmail) {
      setStep('upload');
    }
  };

  const handleUpload = () => {
    setUploadedDocs(true);
    setStep('processing');
    setTimeout(() => setStep('wallet'), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { id: 'register', label: 'Register' },
            { id: 'upload', label: 'ID Upload' },
            { id: 'processing', label: 'Verify' },
            { id: 'wallet', label: 'Digital ID' },
            { id: 'project', label: 'Join Project' },
            { id: 'badge', label: 'Badge' }
          ].map((s, idx, arr) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`size-10 rounded-full flex items-center justify-center ${
                    arr.findIndex(x => x.id === step) >= idx
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-xs mt-1 text-slate-600 hidden sm:block">{s.label}</span>
              </div>
              {idx < arr.length - 1 && (
                <div
                  className={`h-1 flex-1 ${
                    arr.findIndex(x => x.id === step) > idx ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {step === 'register' && (
          <div>
            <h2 className="text-2xl mb-6">Worker Registration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-slate-700">Email</label>
                <input
                  type="email"
                  value={workerEmail}
                  onChange={(e) => setWorkerEmail(e.target.value)}
                  placeholder="john.smith@example.com"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+44 7700 900000"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleRegister}
                disabled={!workerName || !workerEmail}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed mt-6"
              >
                Continue to ID Upload
              </button>
            </div>
          </div>
        )}

        {step === 'upload' && (
          <div>
            <h2 className="text-2xl mb-6">Identity Verification</h2>
            <p className="text-slate-600 mb-6">Upload your passport and take a selfie for biometric verification</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="size-12 mx-auto mb-4 text-slate-400" />
                <p className="font-medium mb-2">Passport/ID Document</p>
                <p className="text-sm text-slate-500 mb-4">Click to upload or drag & drop</p>
                <div className="bg-green-100 text-green-700 text-sm py-1 px-3 rounded-full inline-block">
                  <CheckCircle className="size-4 inline mr-1" />
                  Mock: passport_scan.jpg
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Camera className="size-12 mx-auto mb-4 text-slate-400" />
                <p className="font-medium mb-2">Selfie Photo</p>
                <p className="text-sm text-slate-500 mb-4">Take a selfie for biometric match</p>
                <div className="bg-green-100 text-green-700 text-sm py-1 px-3 rounded-full inline-block">
                  <CheckCircle className="size-4 inline mr-1" />
                  Mock: selfie_verified.jpg
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                🔒 <strong>Simulated OCR & Biometrics:</strong> Passport data extracted, facial recognition match: 98.7%
              </p>
            </div>

            <button
              onClick={handleUpload}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
            >
              Verify Identity
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center py-12">
            <div className="size-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl mb-2">Verifying Identity...</h2>
            <p className="text-slate-600">Running biometric checks and document validation</p>
          </div>
        )}

        {step === 'wallet' && (
          <div>
            <div className="text-center mb-8">
              <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="size-12 text-green-600" />
              </div>
              <h2 className="text-2xl mb-2">Identity Verified!</h2>
              <p className="text-slate-600">Your digital identity and verifiable credential have been created</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-blue-200 text-sm mb-1">Digital Identity (DID)</p>
                  <p className="font-mono text-lg">{mockWorkerDID}</p>
                </div>
                <Wallet className="size-8 text-blue-300" />
              </div>
              
              <div className="border-t border-blue-500 pt-4 mt-4">
                <p className="text-blue-200 text-sm mb-2">Verifiable Credential</p>
                <div className="space-y-1 text-sm font-mono">
                  <p>ID: {mockVC.id}</p>
                  <p>Type: {mockVC.type}</p>
                  <p>Issued: {mockVC.issued}</p>
                  <p className="text-blue-300">SHA-256: {mockVC.hash}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setStep('project')}
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join a Project
              </button>
              <button className="border-2 border-slate-300 py-3 rounded-lg hover:bg-slate-50 transition-colors">
                View Credential QR
              </button>
            </div>
          </div>
        )}

        {step === 'project' && (
          <div>
            <h2 className="text-2xl mb-6">Available Projects</h2>
            
            <div className="space-y-4">
              {[
                { name: 'London Bridge Construction', contractor: 'BuildCo Ltd', status: 'Verified', workers: 245 },
                { name: 'Manchester Hospital Extension', contractor: 'HealthBuild PLC', status: 'Verified', workers: 189 },
                { name: 'Birmingham Office Complex', contractor: 'Urban Developers', status: 'Pending', workers: 67 }
              ].map((project, idx) => (
                <div
                  key={idx}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    idx === 0 ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                  }`}
                  onClick={() => idx === 0 && setStep('badge')}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium mb-1">{project.name}</h3>
                      <p className="text-sm text-slate-600 mb-2">{project.contractor}</p>
                      <div className="flex gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          project.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {project.status}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full">
                          {project.workers} workers
                        </span>
                      </div>
                    </div>
                    {idx === 0 && (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                        Join Project
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'badge' && (
          <div>
            <div className="text-center mb-8">
              <div className="size-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="size-12 text-yellow-600" />
              </div>
              <h2 className="text-2xl mb-2">Badge Earned!</h2>
              <p className="text-slate-600">You've been verified and approved for the project</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white mb-6">
              <div className="text-center">
                <Award className="size-16 mx-auto mb-4" />
                <h3 className="text-2xl mb-2">Certified Site Worker</h3>
                <p className="text-yellow-100 mb-4">London Bridge Construction</p>
                
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <QrCode className="size-24 mx-auto text-white" />
                  <p className="text-sm mt-2">Scan to verify credential</p>
                </div>
                
                <div className="mt-4 text-sm space-y-1">
                  <p>Worker: {workerName || 'John Smith'}</p>
                  <p className="font-mono text-yellow-100">{mockWorkerDID}</p>
                  <p className="text-xs text-yellow-200 mt-2">Valid from: 07 Feb 2024</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('register')}
              className="w-full border-2 border-slate-300 py-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Start New Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
