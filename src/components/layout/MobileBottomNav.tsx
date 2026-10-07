import React from 'react';
import { Home, Sparkles, Calendar, HeartPulse, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MobileBottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
}) => {
  const { userProfile, isAdmin } = useAuth();

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dashboardTarget = isAdmin
    ? 'admin-dashboard'
    : userProfile
    ? 'patient-dashboard'
    : 'patient-login';

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-lg border-t border-[#143D27]/10 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentTab === 'home' ? 'text-[#0C281B]' : 'text-[#143D27]/60'
          }`}
        >
          <Home className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-0.5 ${currentTab === 'home' ? 'font-bold' : 'font-medium'}`}>
            Home
          </span>
        </button>

        {/* PDC Flagship */}
        <button
          onClick={() => handleNav('pdc')}
          className={`flex flex-col items-center justify-center py-1 relative transition-all ${
            currentTab === 'pdc' ? 'text-[#C4573E]' : 'text-[#143D27]/60'
          }`}
        >
          <div className="relative">
            <HeartPulse className={`w-5 h-5 ${currentTab === 'pdc' ? 'stroke-[2.5] text-[#E06D53]' : ''}`} />
            <span className="absolute -top-1 -right-2 w-2 h-2 bg-[#E06D53] rounded-full animate-pulse" />
          </div>
          <span className={`text-[10px] mt-0.5 ${currentTab === 'pdc' ? 'font-bold text-[#C4573E]' : 'font-medium'}`}>
            PDC Care
          </span>
        </button>

        {/* Treatments */}
        <button
          onClick={() => handleNav('treatments')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentTab === 'treatments' ? 'text-[#0C281B]' : 'text-[#143D27]/60'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${currentTab === 'treatments' ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-0.5 ${currentTab === 'treatments' ? 'font-bold' : 'font-medium'}`}>
            Treatments
          </span>
        </button>

        {/* Book */}
        <button
          onClick={() => handleNav('book-appointment')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentTab === 'book-appointment' ? 'text-[#0C281B]' : 'text-[#143D27]/60'
          }`}
        >
          <Calendar className={`w-5 h-5 ${currentTab === 'book-appointment' ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-0.5 ${currentTab === 'book-appointment' ? 'font-bold' : 'font-medium'}`}>
            Book
          </span>
        </button>

        {/* Account / Dashboard */}
        <button
          onClick={() => handleNav(dashboardTarget)}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            ['patient-dashboard', 'admin-dashboard', 'patient-login', 'admin-login'].includes(currentTab)
              ? 'text-[#0C281B]'
              : 'text-[#143D27]/60'
          }`}
        >
          <User className={`w-5 h-5 ${['patient-dashboard', 'admin-dashboard'].includes(currentTab) ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-0.5 ${['patient-dashboard', 'admin-dashboard'].includes(currentTab) ? 'font-bold' : 'font-medium'}`}>
            {userProfile ? 'Account' : 'Sign In'}
          </span>
        </button>
      </div>
    </nav>
  );
};
