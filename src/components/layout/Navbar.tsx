import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Menu,
  X,
  User as UserIcon,
  ShieldCheck,
  Bell,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Heart,
  Baby,
  Activity,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserNotifications } from '../../services/dbService';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenNotifications,
}) => {
  const { userProfile, isAdmin, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function checkNotifications() {
      try {
        const notifs = await getUserNotifications(userProfile?.id, userProfile?.role);
        setUnreadCount(notifs.filter((n) => !n.read).length);
      } catch {
        // silent
      }
    }
    checkNotifications();
    const interval = setInterval(checkNotifications, 20000);
    return () => clearInterval(interval);
  }, [userProfile]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
    },
    {
      id: 'fertility-care',
      label: 'Fertility Care',
      hasDropdown: true,
      children: [
        { label: 'Overview', sub: 'Fertility & Preconception Care' },
        { label: 'Male Fertility', sub: 'Vitality & Shukra Dhatu Assessment' },
        { label: 'Female Fertility', sub: 'Artava & Hormonal Harmony' },
        { label: 'Preconception Care', sub: 'Garbhadhana Samskara Protocol' },
        { label: 'Ayurvedic Detox & Panchakarma', sub: 'Clinical Cleansing Suitability' },
      ],
    },
    {
      id: 'pregnancy-care',
      label: 'Pregnancy Care',
      hasDropdown: true,
      children: [
        { label: 'Overview', sub: 'Maternal & Fetal Guidance' },
        { label: 'Month-by-Month Prenatal Care', sub: 'Masanumashika Rasayana' },
        { label: 'Garbha Samskara', sub: 'Conscious Parenting & Bonding' },
        { label: 'Pregnancy Yoga & Breathing', sub: 'Safe Trimester-Adapted Asanas' },
        { label: 'Diet & Lifestyle in Pregnancy', sub: 'Nourishing Gestational Ahara' },
      ],
    },
    {
      id: 'postnatal-care',
      label: 'Postnatal & Baby Care',
      hasDropdown: true,
      children: [
        { label: 'Overview', sub: 'Postpartum Mother & Infant Care' },
        { label: 'Sutika Paricharya', sub: 'Traditional Mother Recovery' },
        { label: 'Home-Based Care Across Kerala', sub: 'Therapist Location Enquiry' },
        { label: 'Newborn & Child Care', sub: 'Infant Wellness & Safety' },
        { label: 'Baby Massage & Wellness', sub: 'Gentle Oil Application' },
        { label: 'Postnatal Yoga & Recovery', sub: 'Core & Pelvic Floor Re-education' },
      ],
    },
    {
      id: 'yoga-wellness',
      label: 'Yoga & Wellness',
      hasDropdown: true,
      children: [
        { label: 'Overview', sub: 'Mindful Movement & Breathing' },
        { label: 'Fertility Yoga', sub: 'Pelvic Circulation & Calming' },
        { label: 'Prenatal Yoga', sub: 'Maternal Gentle Postures' },
        { label: 'Postnatal Yoga', sub: 'Restorative Core Recovery' },
        { label: 'Therapeutic & Wellness Yoga', sub: 'Prakriti-Balanced Practice' },
        { label: 'Online Yoga Sessions', sub: 'Live Screen-to-Screen Sessions' },
      ],
    },
    {
      id: 'consultations',
      label: 'Consultation',
    },
    {
      id: 'about',
      label: 'About Us',
    },
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFCF7]/95 backdrop-blur-md border-b border-[#E4EAE4] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Name Header: Vaidhyam */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-label="Vaidhyam Home"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E4A38] to-[#164A3A] text-white flex items-center justify-center font-bold text-lg shadow-sm transition-all duration-300 group-hover:shadow group-hover:scale-105 border border-[#2C654D]/30">
                V
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#E85342] rounded-full border-2 border-[#FFFCF7] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold text-[#1E4A38] tracking-[0.2em] uppercase font-sans">
                VAIDHYAM
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#E85342] font-bold -mt-0.5">
                The Care You Deserve
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const isDropdownOpen = openDropdown === item.id;

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => {
                        setOpenDropdown(isDropdownOpen ? null : item.id);
                      }}
                      onMouseEnter={() => setOpenDropdown(item.id)}
                      className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-150 flex items-center gap-1 ${
                        isActive || isDropdownOpen
                          ? 'text-[#245B45] font-semibold bg-[#EDF2ED]/70'
                          : 'text-[#25352E]/80 hover:text-[#245B45] hover:bg-[#EDF2ED]/40'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-[#245B45]' : 'text-[#69766E]'
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-[#E4EAE4] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-left"
                      >
                        <div className="px-3 py-2 border-b border-[#E4EAE4]/60 mb-1">
                          <button
                            onClick={() => handleNav(item.id)}
                            className="text-xs font-bold text-[#245B45] hover:underline flex items-center justify-between w-full"
                          >
                            <span>Explore {item.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#245B45]" />
                          </button>
                        </div>
                        <div className="space-y-0.5">
                          {item.children?.map((sub, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleNav(item.id)}
                              className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#EDF2ED]/60 transition-colors group flex flex-col"
                            >
                              <span className="font-medium text-[#25352E] group-hover:text-[#245B45]">
                                {sub.label}
                              </span>
                              <span className="text-[10px] text-[#69766E] font-light">
                                {sub.sub}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-150 relative ${
                    isActive
                      ? 'text-[#245B45] font-semibold bg-[#EDF2ED]/70'
                      : 'text-[#25352E]/80 hover:text-[#245B45] hover:bg-[#EDF2ED]/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTAs: Appointment Button & Account */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-[#25352E] hover:bg-[#EDF2ED] transition-colors"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 text-[#1E4A38]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#E85342] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Prominent Book an Appointment Button */}
            <button
              onClick={() => handleNav('book-appointment')}
              className="bg-[#E85342] hover:bg-[#CF3E30] text-white px-5 py-2.5 rounded-xl font-bold text-xs xl:text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>

            {/* User Account / Dashboard Link */}
            {userProfile ? (
              <button
                onClick={() => handleNav(isAdmin ? 'admin-dashboard' : 'patient-dashboard')}
                className="flex items-center gap-1.5 bg-[#EDF2ED] text-[#1E4A38] px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#DFE7DF] transition-colors"
              >
                {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                <span>{isAdmin ? 'Admin' : 'Dashboard'}</span>
              </button>
            ) : (
              <button
                onClick={() => handleNav('patient-login')}
                className="text-xs font-medium text-[#245B45] hover:text-[#1b4634] px-2 py-1"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Right Controls: Book Button + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNav('book-appointment')}
              className="bg-[#E85342] text-white px-3 py-2 rounded-xl font-medium text-xs shadow-xs flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-[#245B45]"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#E85342] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#245B45] hover:bg-[#EDF2ED]/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFCF7] border-b border-[#E4EAE4] px-4 pt-2 pb-6 space-y-2 animate-in fade-in duration-200 shadow-xl max-h-[85vh] overflow-y-auto text-left">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isExpanded = mobileExpandedSection === item.id;
              const isActive = currentTab === item.id;

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="rounded-xl overflow-hidden border border-[#E4EAE4]/60 bg-white mb-1.5">
                    <button
                      onClick={() => setMobileExpandedSection(isExpanded ? null : item.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#25352E] hover:bg-[#EDF2ED]/40"
                    >
                      <span className={isActive ? 'text-[#245B45] font-semibold' : ''}>
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#69766E] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#245B45]' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-3 space-y-1 bg-[#FFFCF7] border-t border-[#E4EAE4]/60 pt-2">
                        <button
                          onClick={() => handleNav(item.id)}
                          className="w-full text-left py-1.5 text-xs font-bold text-[#245B45] underline"
                        >
                          View Full {item.label} Page →
                        </button>
                        {item.children?.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNav(item.id)}
                            className="w-full text-left py-1 text-xs text-[#69766E] hover:text-[#245B45] flex items-center gap-1.5"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#34765A]" />
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EDF2ED] text-[#245B45] font-semibold'
                      : 'text-[#25352E] hover:bg-[#EDF2ED]/40'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#69766E]" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E4EAE4] space-y-2">
            <button
              onClick={() => handleNav('book-appointment')}
              className="w-full flex items-center justify-center gap-2 bg-[#E85342] hover:bg-[#CF3E30] text-white py-3 rounded-xl font-bold text-xs shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>

            {userProfile ? (
              <div className="space-y-1 pt-1">
                <button
                  onClick={() => handleNav(isAdmin ? 'admin-dashboard' : 'patient-dashboard')}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#EDF2ED] text-[#245B45] text-center"
                >
                  My {isAdmin ? 'Admin' : 'Patient'} Dashboard ({userProfile.name})
                </button>
                <button
                  onClick={logOut}
                  className="w-full text-center text-xs text-red-600 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNav('patient-login')}
                className="w-full py-2.5 rounded-xl text-xs font-medium border border-[#E4EAE4] text-[#245B45] bg-white text-center"
              >
                Sign In to Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
