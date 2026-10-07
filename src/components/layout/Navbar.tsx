import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { getUserNotifications } from '../../services/dbService';
import { NotificationItem } from '../../types';
import {
  Calendar,
  User as UserIcon,
  Bell,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  PhoneCall
} from 'lucide-react';

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
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function checkNotifications() {
      try {
        const notifs = await getUserNotifications(userProfile?.id, userProfile?.role);
        setUnreadCount(notifs.filter(n => !n.read).length);
      } catch {
        // silent
      }
    }
    checkNotifications();
    const interval = setInterval(checkNotifications, 20000);
    return () => clearInterval(interval);
  }, [userProfile]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'pdc', label: 'Post-Delivery Care', highlight: true },
    { id: 'consultations', label: 'Consultations' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'knowledge', label: 'Knowledge Base' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#143D27]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center text-left focus:outline-none"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#0C281B] font-semibold bg-[#2C6E49]/10'
                      : 'text-[#143D27]/80 hover:text-[#0C281B] hover:bg-[#143D27]/5'
                  } ${link.highlight ? 'text-[#0C281B]' : ''}`}
                >
                  {link.label}
                  {link.highlight && (
                    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E06D53]/15 text-[#C4573E]">
                      Flagship
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2C6E49] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-[#143D27] hover:bg-[#143D27]/5 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#E06D53] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* User Account / Admin CTA */}
            {userProfile ? (
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <button
                    onClick={() => handleNav('admin-dashboard')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      currentTab === 'admin-dashboard'
                        ? 'bg-[#143D27] text-white'
                        : 'bg-[#143D27]/10 text-[#0C281B] hover:bg-[#143D27]/20'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C29B38]" />
                    Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleNav('patient-dashboard')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      currentTab === 'patient-dashboard'
                        ? 'bg-[#143D27] text-white'
                        : 'bg-[#143D27]/10 text-[#0C281B] hover:bg-[#143D27]/20'
                    }`}
                  >
                    <UserIcon className="w-4 h-4 text-[#2C6E49]" />
                    {userProfile.name.split(' ')[0]}
                  </button>
                )}
                <button
                  onClick={logOut}
                  className="text-xs text-[#143D27]/60 hover:text-[#C4573E] px-2 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('patient-login')}
                  className="text-xs font-semibold text-[#143D27] hover:text-[#0C281B] px-2.5 py-1.5 rounded-lg hover:bg-[#143D27]/5"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Primary Coral CTA Button */}
            <button
              onClick={() => handleNav('book-appointment')}
              className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white font-medium px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98] text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-[#143D27]"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#E06D53] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0C281B] hover:bg-[#143D27]/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#143D27]/10 px-4 pt-2 pb-6 space-y-3 animate-in fade-in duration-200 shadow-xl">
          <div className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  currentTab === link.id
                    ? 'bg-[#2C6E49]/15 text-[#0C281B] font-semibold'
                    : 'text-[#143D27] hover:bg-[#143D27]/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.highlight && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E06D53]/15 text-[#C4573E]">
                      Flagship
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-[#143D27]/40" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#143D27]/10 space-y-2">
            <button
              onClick={() => handleNav('book-appointment')}
              className="w-full flex items-center justify-center gap-2 bg-[#E06D53] text-white py-3 rounded-xl font-medium shadow-sm"
            >
              <Calendar className="w-5 h-5" />
              Book Consultation Now
            </button>

            {userProfile ? (
              <div className="space-y-2 pt-1">
                {isAdmin ? (
                  <button
                    onClick={() => handleNav('admin-dashboard')}
                    className="w-full flex items-center justify-center gap-2 bg-[#0C281B] text-white py-2.5 rounded-xl font-medium text-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C29B38]" />
                    Admin Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => handleNav('patient-dashboard')}
                    className="w-full flex items-center justify-center gap-2 bg-[#143D27]/10 text-[#0C281B] py-2.5 rounded-xl font-medium text-sm"
                  >
                    <UserIcon className="w-4 h-4 text-[#2C6E49]" />
                    My Patient Dashboard ({userProfile.name})
                  </button>
                )}
                <button
                  onClick={logOut}
                  className="w-full text-center text-xs text-[#C4573E] py-1 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleNav('patient-login')}
                  className="py-2.5 rounded-xl text-center border border-[#143D27]/20 text-[#0C281B] font-medium text-sm"
                >
                  Patient Login
                </button>
                <button
                  onClick={() => handleNav('patient-signup')}
                  className="py-2.5 rounded-xl text-center bg-[#143D27] text-white font-medium text-sm"
                >
                  New Patient
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
