import React from 'react';
import { Home, Calendar, Heart, Sparkles, User } from 'lucide-react';
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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFCF7]/95 backdrop-blur-lg border-t border-[#E4EAE4] px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentTab === 'home' ? 'text-[#245B45]' : 'text-[#69766E]'
          }`}
        >
          <Home className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.5] text-[#245B45]' : ''}`} />
          <span className={`text-[10px] mt-0.5 ${currentTab === 'home' ? 'font-bold' : 'font-medium'}`}>
            Home
          </span>
        </button>

        {/* Postnatal */}
        <button
          onClick={() => handleNav('postnatal-care')}
          className={`flex flex-col items-center justify-center py-1 relative transition-all ${
            currentTab === 'postnatal-care' ? 'text-[#F17C70]' : 'text-[#69766E]'
          }`}
        >
          <Heart className={`w-5 h-5 ${currentTab === 'postnatal-care' ? 'stroke-[2.5] text-[#F17C70]' : ''}`} />
          <span className={`text-[10px] mt-0.5 ${currentTab === 'postnatal-care' ? 'font-bold text-[#F17C70]' : 'font-medium'}`}>
            Postnatal
          </span>
        </button>

        {/* Consult */}
        <button
          onClick={() => handleNav('consultations')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentTab === 'consultations' ? 'text-[#245B45]' : 'text-[#69766E]'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${currentTab === 'consultations' ? 'stroke-[2.5] text-[#245B45]' : ''}`} />
          <span className={`text-[10px] mt-0.5 ${currentTab === 'consultations' ? 'font-bold' : 'font-medium'}`}>
            Consult
          </span>
        </button>

        {/* Book */}
        <button
          onClick={() => handleNav('book-appointment')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentTab === 'book-appointment' ? 'text-[#F17C70]' : 'text-[#69766E]'
          }`}
        >
          <Calendar className={`w-5 h-5 ${currentTab === 'book-appointment' ? 'stroke-[2.5] text-[#F17C70]' : ''}`} />
          <span className={`text-[10px] mt-0.5 ${currentTab === 'book-appointment' ? 'font-bold text-[#F17C70]' : 'font-medium'}`}>
            Book
          </span>
        </button>

        {/* Account / Dashboard */}
        <button
          onClick={() => handleNav(dashboardTarget)}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            ['patient-dashboard', 'admin-dashboard', 'patient-login', 'admin-login'].includes(currentTab)
              ? 'text-[#245B45]'
              : 'text-[#69766E]'
          }`}
        >
          <User className={`w-5 h-5 ${['patient-dashboard', 'admin-dashboard'].includes(currentTab) ? 'stroke-[2.5] text-[#245B45]' : ''}`} />
          <span className={`text-[10px] mt-0.5 ${['patient-dashboard', 'admin-dashboard'].includes(currentTab) ? 'font-bold' : 'font-medium'}`}>
            {userProfile ? 'Account' : 'Sign In'}
          </span>
        </button>
      </div>
    </nav>
  );
};
