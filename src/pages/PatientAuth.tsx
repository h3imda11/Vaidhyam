import React, { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface PatientAuthProps {
  initialMode?: 'login' | 'signup';
  onSuccess: () => void;
  onNavigateAdmin: () => void;
}

export const PatientAuth: React.FC<PatientAuthProps> = ({
  initialMode = 'login',
  onSuccess,
  onNavigateAdmin,
}) => {
  const { signIn, signUp, loginAsDemoPatient } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Status
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        if (!name.trim()) throw new Error('Please provide your full name');
        if (!phone.trim()) throw new Error('Please provide your contact phone');
        await signUp(email, password, name, phone, 'patient');
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoPatient = async () => {
    setSubmitting(true);
    try {
      await loginAsDemoPatient();
      onSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 text-left">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#143D27]/10 shadow-lg space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Logo size="lg" layout="stacked" className="mx-auto" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C281B] pt-2">
            {mode === 'login' ? 'Patient Portal Sign In' : 'Create Patient Account'}
          </h2>
          <p className="text-xs text-[#143D27]/70">
            {mode === 'login'
              ? 'Access your consultation schedules and clinical care tracking'
              : 'Register for advanced clinical healthcare and bookings'}
          </p>
        </div>

        {/* Demo Quick Sign-in Button */}
        <div className="p-3 bg-[#E8F5E9] rounded-2xl border border-[#2C6E49]/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#0C281B]">
            <span className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2C6E49]" />
              Quick Testing Preset:
            </span>
            <span className="text-[10px] text-[#2C6E49]">1-Click Access</span>
          </div>
          <button
            type="button"
            onClick={handleDemoPatient}
            disabled={submitting}
            className="w-full py-2 bg-white hover:bg-[#FAF8F5] text-[#0C281B] rounded-xl text-xs font-semibold border border-[#2C6E49]/30 transition-all shadow-sm"
          >
            Continue as Demo Patient (Meera Nambiar)
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#143D27]/40 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Meera Nambiar"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#143D27]/40 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98470 00000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-[#143D27] block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#143D27]/40 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#143D27] block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#143D27]/40 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                minLength={6}
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
            className="w-full py-3.5 bg-[#E06D53] hover:bg-[#C4573E] text-white font-semibold rounded-xl text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{mode === 'login' ? 'Sign In to Portal' : 'Create My Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle mode */}
        <div className="pt-2 text-center text-xs text-[#143D27]/70 space-y-3">
          {mode === 'login' ? (
            <p>
              New patient?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-[#2C6E49] hover:underline"
              >
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#2C6E49] hover:underline"
              >
                Sign in here
              </button>
            </p>
          )}

          <div className="pt-3 border-t border-[#143D27]/10">
            <button
              type="button"
              onClick={onNavigateAdmin}
              className="text-[11px] text-[#143D27]/60 hover:text-[#0C281B]"
            >
              Clinic Staff or Physician? Go to Admin Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
