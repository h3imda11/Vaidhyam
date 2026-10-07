import React from 'react';
import { Logo } from '../common/Logo';
import { Phone, Mail, MapPin, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C281B] text-[#FAF8F5] pt-16 pb-24 lg:pb-16 border-t border-[#143D27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-sm text-[#FAF8F5]/80 max-w-sm leading-relaxed font-light">
              Authentic Kerala Ayurvedic healthcare and specialized post-delivery care
              (Sutika Paricharya). Rooted in Ashtanga Hridaya, personalized for modern
              motherhood and holistic well-being.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-[#FAF8F5]/60">
              <ShieldCheck className="w-4 h-4 text-[#C29B38]" />
              <span>Certified Ayurvedic Clinical Practice • Reg No. TRA-AYU-84920</span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide mb-4">
              Care Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F5]/80">
              <li>
                <button
                  onClick={() => handleNav('pdc')}
                  className="hover:text-[#E06D53] transition-colors text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E06D53]" />
                  Post-Delivery Care (PDC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pdc')}
                  className="hover:text-white transition-colors text-left"
                >
                  7 to 42 Days Prasava Raksha
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('consultations')}
                  className="hover:text-white transition-colors text-left"
                >
                  Doctor Consultations (Online & In-Clinic)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('treatments')}
                  className="hover:text-white transition-colors text-left"
                >
                  Panchakarma & Abhyanga Therapies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('treatments')}
                  className="hover:text-white transition-colors text-left"
                >
                  Women\'s Hormonal Wellness
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide mb-4">
              Vaidyam Sanctuary
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F5]/80">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('knowledge')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 text-[#C29B38]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C29B38]" />
                  Knowledge Base & Health Tips
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
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Online Contact & Enquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin-login')}
                  className="text-xs text-[#FAF8F5]/50 hover:text-[#C29B38] transition-colors text-left pt-2 flex items-center gap-1"
                >
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Care & Enquiries */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide mb-4">
              Care & Inquiries
            </h4>
            <ul className="space-y-3 text-xs text-[#FAF8F5]/80">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#4C956C] flex-shrink-0 mt-0.5" />
                <span>Mon – Sat: 9:00 AM – 5:00 PM (IST)</span>
              </li>
              <li className="text-[11px] text-[#FAF8F5]/60 leading-relaxed pt-1">
                Sanctuary telephone lines and location details are being updated. Submit your enquiry online for fast assistance.
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('contact')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E06D53] hover:bg-[#C4573E] text-white font-medium text-xs transition-colors"
                >
                  <span>Submit Enquiry Message</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical Medical Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/60">
          <p className="max-w-2xl leading-relaxed">
            <strong>Medical Notice:</strong> VAIDHYAM provides authentic classical Ayurvedic consultations,
            post-delivery care therapies, and individualized herbal lifestyle regimens. Our therapies are designed
            to support natural maternal rejuvenation and systemic balance; they are not intended to replace emergency
            obstetric or hospital allopathic interventions.
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
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
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-[#FAF8F5]/40">
          © {new Date().getFullYear()} VAIDHYAM — Ancient Wisdom. Personal Healing. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
