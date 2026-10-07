import React, { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

interface AdminAuthProps {
  onSuccess: () => void;
  onNavigatePatient: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({
  onSuccess,
  onNavigatePatient,
}) => {
  const { signIn, loginAsDemoAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signIn(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid administrator credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoAdmin = async () => {
    setSubmitting(true);
    try {
      await loginAsDemoAdmin();
      onSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 text-left">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#143D27]/10 shadow-xl space-y-6">
        <div className="text-center space-y-3">
          <Logo size="lg" layout="stacked" className="mx-auto" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C281B] pt-1">
            Clinical Administration Console
          </h2>
          <p className="text-xs text-[#143D27]/70">
            Appointments, doctor schedules, dynamic PDC package pricing & live database oversight
          </p>
        </div>

        {/* Demo Quick Admin Button */}
        <div className="p-3 bg-[#0C281B]/5 rounded-2xl border border-[#0C281B]/15 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#0C281B]">
            <span className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C29B38]" />
              Admin Demo Access:
            </span>
            <span className="text-[10px] text-[#2C6E49]">Full Permissions</span>
          </div>
          <button
            type="button"
            onClick={handleDemoAdmin}
            disabled={submitting}
            className="w-full py-2 bg-[#0C281B] hover:bg-[#143D27] text-white rounded-xl text-xs font-semibold transition-all shadow"
          >
            Sign In as Vaidyam Administrator
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#143D27] block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#143D27]/40 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vaidyamayurveda.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#143D27] block mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#143D27]/40 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[#0C281B] hover:bg-[#143D27] text-white font-semibold rounded-xl text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>Authenticate Administrative Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center border-t border-[#143D27]/10">
          <button
            type="button"
            onClick={onNavigatePatient}
            className="text-xs text-[#2C6E49] hover:underline font-semibold"
          >
            ← Return to Patient Portal
          </button>
        </div>
      </div>
    </div>
  );
};
