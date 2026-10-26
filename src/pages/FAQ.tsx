import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Calendar, MessageCircle } from 'lucide-react';

interface FAQProps {
  onOpenBooking: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      cat: 'Post-Delivery Care (PDC)',
      q: 'What is the ideal duration for Post-Delivery Care in Kerala Ayurveda?',
      a: 'Classical texts recommend the full Sutika Paricharya duration of 42 days (6 weeks) for comprehensive tissue healing and pelvic bone realignment. However, for working mothers or specific family timelines, we offer structured 7, 14, 21, and 28-day packages tailored to your schedule.',
    },
    {
      cat: 'Post-Delivery Care (PDC)',
      q: 'How soon after a C-Section can I begin Ayurvedic therapies?',
      a: 'For Caesarean deliveries, external abhyanga on the extremities and neck may begin once mobility is established, but abdominal and deep hip therapies strictly begin only after complete wound scar healing (usually Day 14 to Day 21), following examination by Dr. Ananya Warrier.',
    },
    {
      cat: 'Consultations',
      q: 'What is the format of an online Ayurvedic consultation?',
      a: 'Online consultations take place over secure HD video. Dr. Ananya conducts a detailed clinical evaluation covering your physical constitution, maternal symptoms, tongue analysis, and current concerns, followed by a digital prescription containing tailored medicines and diet advice.',
    },
    {
      cat: 'Safety & Medicines',
      q: 'Are Ayurvedic herbal medicines safe during lactation and breastfeeding?',
      a: 'Yes, when prescribed by a qualified Ayurvedic doctor. Formulations like Sowbhagya Shunti Lehyam, Dasamoolarishtam, and Jeerakarishtam have been classically formulated specifically to enhance lactation, promote healthy digestion, and provide vital minerals without adverse effects on the baby.',
    },
    {
      cat: 'Therapists & Home Care',
      q: 'Who are the therapists administering home-care sessions?',
      a: 'All home-care therapists are certified female Ayurvedic nurses with specialized hospital training in neonatal and postnatal care. They are respectful, hygienic, and supervised continuously by our clinical coordinators.',
    },
    {
      cat: 'Appointments & Payments',
      q: 'What is your appointment cancellation policy?',
      a: 'Consultations can be rescheduled or cancelled up to 24 hours prior to the slot at no charge. For PDC care packages, start dates can be adjusted flexibly based on your actual baby delivery date.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 pb-24 text-left">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Knowledge & Clarifications</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0C281B]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-[#143D27]/80 leading-relaxed font-light">
          Everything you need to know about our Ayurvedic clinical consultations, post-delivery care
          protocols, safety standards, and sanctuary appointments.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#143D27]/10 bg-white overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-start justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C6E49] block mb-1">
                    {faq.cat}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0C281B]">
                    {faq.q}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#2C6E49] transition-transform flex-shrink-0 mt-1 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#143D27]/80 leading-relaxed border-t border-[#143D27]/5 font-light">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact help */}
      <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#143D27]/10 text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
          Have a question not listed here?
        </h3>
        <p className="text-xs sm:text-sm text-[#143D27]/70 max-w-md mx-auto">
          Our clinic coordinators are happy to answer specific queries regarding your medical history or
          care options.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation with Doctor</span>
          </button>
          <a
            href="https://wa.me/919447012890"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#25D366] text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
