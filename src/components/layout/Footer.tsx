import React from 'react';
import { Logo } from '../common/Logo';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenStore?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, onOpenStore }) => {
  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1b4634] text-[#FFFCF7] pt-16 pb-24 lg:pb-16 border-t border-[#245B45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10 text-left">
          {/* Brand & Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="text-left focus:outline-none"
            >
              <Logo variant="light" size="lg" />
            </button>
            <p className="text-sm text-[#FFFCF7]/80 max-w-sm leading-relaxed font-light">
              Advanced clinical wellness and dedicated consultations for fertility, pregnancy, postpartum recovery, mindful movement, and everyday vitality. The care you deserve at every stage of life.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-[#FFFCF7]/70">
              <ShieldCheck className="w-4 h-4 text-[#E85342]" />
              <span>Licensed Ayurvedic Healthcare Practice</span>
            </div>
          </div>

          {/* Care Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide mb-4">
              Care Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FFFCF7]/80">
              <li>
                <button
                  onClick={() => handleNav('fertility-care')}
                  className="hover:text-[#E85342] transition-colors text-left"
                >
                  Fertility Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pregnancy-care')}
                  className="hover:text-[#E85342] transition-colors text-left"
                >
                  Pregnancy Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('postnatal-care')}
                  className="hover:text-[#E85342] transition-colors text-left"
                >
                  Postnatal & Baby Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('yoga-wellness')}
                  className="hover:text-[#E85342] transition-colors text-left"
                >
                  Yoga & Wellness
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('consultations')}
                  className="hover:text-[#E85342] transition-colors text-left font-medium text-white"
                >
                  Ayurvedic Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* About & Resources */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide mb-4">
              Explore Vaidhyam
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FFFCF7]/80">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('doctor')}
                  className="hover:text-white transition-colors text-left"
                >
                  Meet Our Practitioner
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-white transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                {onOpenStore ? (
                  <button
                    onClick={onOpenStore}
                    className="hover:text-[#E85342] transition-colors text-left flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E85342]" />
                    <span>Wellness Store</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleNav('store')}
                    className="hover:text-[#E85342] transition-colors text-left flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E85342]" />
                    <span>Wellness Store</span>
                  </button>
                )}
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin-login')}
                  className="text-xs text-[#FFFCF7]/50 hover:text-white transition-colors text-left pt-1"
                >
                  Practitioner Login
                </button>
              </li>
            </ul>
          </div>

          {/* Bookings & Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide mb-4">
              Appointments
            </h4>
            <ul className="space-y-3 text-xs text-[#FFFCF7]/80">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E85342] flex-shrink-0 mt-0.5" />
                <span>Mon – Sat: 9:00 AM – 5:00 PM (IST)</span>
              </li>
              <li className="text-[11px] text-[#FFFCF7]/70 leading-relaxed">
                Connect for online video, direct audio callbacks, or clinic appointments.
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('book-appointment')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85342] hover:bg-[#CF3E30] text-white font-medium text-xs transition-colors shadow-xs"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical Medical Disclaimer & Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FFFCF7]/60 text-left">
          <p className="max-w-2xl leading-relaxed text-[11px]">
            <strong>Medical Disclaimer:</strong> Vaidhyam provides advanced clinical consultations and supportive wellness guidance based on individual medical assessments. Holistic clinical recommendations are not intended to replace emergency obstetric or acute hospital care.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs flex-shrink-0">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('cancellation-policy')}
              className="hover:text-white transition-colors"
            >
              Cancellation & Refund Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('disclaimer')}
              className="hover:text-white transition-colors"
            >
              Medical Disclaimer
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-[#FFFCF7]/40">
          © {new Date().getFullYear()} Vaidhyam — The Care You Deserve. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
