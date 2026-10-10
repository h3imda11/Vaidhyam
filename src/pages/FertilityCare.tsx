import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Info,
  Clock,
  Video,
  Phone,
  Building,
  UserCheck
} from 'lucide-react';
import { Doctor } from '../types';

interface FertilityCareProps {
  doctor: Doctor | null;
  onOpenBooking: () => void;
  onNavigateCategory?: (category: string) => void;
}

export const FertilityCare: React.FC<FertilityCareProps> = ({
  doctor,
  onOpenBooking,
  onNavigateCategory,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'male-fertility',
      title: 'Male Fertility',
      subtitle: 'Shukra Dhatu & Vitality Support',
      description:
        'Individual assessment and appropriate guidance for male reproductive health and preconception wellbeing.',
      details: [
        'Detailed evaluation of Shukra Dhatu vitality and lifestyle factors',
        'Customized herbal Rasayana formulations and micronutrient-rich dietary protocols',
        'Stress reduction and restorative sleep alignment tailored to working professionals',
        'Holistic guidance complementing conventional semen analysis and medical findings',
      ],
      idealFor: 'Men seeking natural stamina, vitality, and preconception preparation.',
    },
    {
      id: 'female-fertility',
      title: 'Female Fertility',
      subtitle: 'Artava & Ovarian Harmony',
      description:
        'Personalised consultations focused on women\'s reproductive health and preconception wellbeing.',
      details: [
        'In-depth evaluation of menstrual rhythm, hormonal balance, and Agni (digestive fire)',
        'Herbal support for uterine strength, follicular health, and endometrium receptivity',
        'Nutritional strategies for PCOS, irregular cycles, and metabolic balance',
        'Empathetic guidance for couples preparing for natural conception or assisted cycles',
      ],
      idealFor: 'Women preparing for conception or navigating cycle irregularities.',
    },
    {
      id: 'preconception-care',
      title: 'Preconception Care',
      subtitle: 'Garbhadhana Samskara Preparation',
      description:
        'Explore appropriate guidance on nutrition, lifestyle and preparation for conception.',
      details: [
        'Classical couple alignment protocol 3 to 6 months prior to planned conception',
        'Ritucharya (seasonal routine) and Dinacharya (daily lifestyle) harmonization',
        'Mindfulness, breathing practices, and calm emotional readiness for both partners',
        'Personalized Ahara (therapeutic nutrition) plan for optimum cellular vitality',
      ],
      idealFor: 'Couples planning pregnancy wishing to optimize health before conceiving.',
    },
    {
      id: 'ayurvedic-detox',
      title: 'Ayurvedic Detox & Panchakarma',
      subtitle: 'Clinical Purification & Cellular Reset',
      description:
        'Learn about traditional Ayurvedic therapies and whether they may be appropriate following an individual clinical assessment.',
      details: [
        'Selective clinical Sodhana (cleansing) therapies such as Virechana and Basti',
        'Preparatory internal oleation (Snehapana) and gentle herbal steam (Swedana)',
        'Assessment of toxins (Ama) and restoration of balanced digestive fire (Agni)',
        'Prescribed only when clinically indicated after physical and pulse examination',
      ],
      idealFor: 'Candidates clinically evaluated by our physician as suitable for Panchakarma.',
    },
  ];

  const faqs = [
    {
      q: 'Does Ayurvedic fertility care guarantee pregnancy?',
      a: 'No. Authentic Ayurveda does not promise or guarantee conception. Our focus is to optimize reproductive vitality, correct metabolic imbalances, strengthen reproductive tissues (Shukra & Artava Dhatu), and support overall emotional and physical health. We work supportively alongside modern medical investigations.',
    },
    {
      q: 'Should both partners attend the fertility consultation?',
      a: 'Yes, we strongly encourage both partners to participate. Classical Ayurvedic preconception care emphasizes the mutual health, vitality, and emotional readiness of both parents for optimal reproductive outcomes.',
    },
    {
      q: 'Can Panchakarma be done by everyone trying to conceive?',
      a: 'No. Panchakarma procedures are intensive clinical therapies that are never prescribed indiscriminately. Our physician conducts an in-depth clinical assessment to determine whether detox therapies or gentle restorative Rasayanas are suitable for your specific constitution.',
    },
    {
      q: 'Can I take Ayurvedic guidance while undergoing IVF or IUI?',
      a: 'Yes, as supportive wellness care. We provide gentle dietary recommendations, lifestyle alignment, and stress-reduction practices that do not interfere with your medical treatments. Always disclose any ongoing fertility treatments to our practitioner.',
    },
  ];

  return (
    <div className="bg-[#FFFCF7] text-[#25352E] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EDF2ED]/60 via-[#FFFCF7] to-[#FFFCF7] pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E4EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF2ED] text-[#245B45] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E85342]" />
              <span>Conception & Preconception Wellness</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#245B45] tracking-tight leading-tight">
              Personalised Care for Your Fertility Journey
            </h1>

            <p className="text-lg sm:text-xl text-[#69766E] font-light leading-relaxed">
              Explore individualised Ayurvedic consultations and supportive preconception care for individuals and couples. Rooted in classical principles of Shukra & Artava vitality, designed with empathy and clinical rigor.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-[#E85342] hover:bg-[#CF3E30] text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow flex items-center gap-2 group"
              >
                <span>Book a Fertility Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#services"
                className="bg-white hover:bg-[#EDF2ED]/50 text-[#245B45] border border-[#E4EAE4] px-6 py-3.5 rounded-xl font-medium text-sm transition-all"
              >
                Explore Care Programs
              </a>
            </div>

            {/* Reassurance Banner */}
            <div className="p-4 rounded-2xl bg-white border border-[#E4EAE4] text-xs text-[#69766E] flex items-start gap-3 shadow-xs">
              <Info className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
              <p>
                <strong>Clinical Transparency:</strong> Ayurvedic preconception guidance is a supportive wellness modality. We respect modern fertility diagnostics and collaborate transparently without making misleading claims or guarantees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
            Care Pathways
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Individualised Preconception Support
          </h2>
          <p className="text-[#69766E] text-sm sm:text-base max-w-2xl font-light">
            Every couple’s path to parenthood is unique. Our physician assesses your physical constitution, lifestyle factors, and metabolic vitality to formulate appropriate recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-7 border border-[#E4EAE4] hover:border-[#34765A]/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#34765A] bg-[#EDF2ED] px-2.5 py-1 rounded-md">
                    {service.subtitle}
                  </span>
                  <Heart className="w-4 h-4 text-[#E85342]" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#245B45]">
                  {service.title}
                </h3>

                <p className="text-[#69766E] text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-3 border-t border-[#E4EAE4]/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#25352E]">
                    Clinical Inclusions:
                  </h4>
                  <ul className="space-y-2 text-xs text-[#69766E]">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34765A] flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-[#FFFCF7] border border-[#E4EAE4] text-xs text-[#25352E]">
                  <span className="font-semibold text-[#245B45]">Recommended for: </span>
                  {service.idealFor}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E4EAE4] flex items-center justify-between">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#245B45] hover:bg-[#1b4634] text-white px-5 py-2.5 rounded-xl font-medium text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-[#69766E]">
                  Video · Voice · Clinic
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practitioner Involvement & Consultation Formats */}
      <section className="bg-[#EDF2ED]/40 py-16 border-y border-[#E4EAE4] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#34765A]">
                Practitioner Care
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#245B45]">
                How Your Consultation Works
              </h2>
              <p className="text-[#69766E] text-sm leading-relaxed">
                Fertility consultations at Vaidhyam are conducted with complete privacy, empathy, and professional confidentiality. We take time to understand your medical history, dietary habits, and emotional wellbeing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-[#E4EAE4]">
                  <Video className="w-5 h-5 text-[#34765A] mb-2" />
                  <h4 className="font-semibold text-xs text-[#25352E]">Online Video</h4>
                  <p className="text-[11px] text-[#69766E] mt-1">
                    Private 45-minute tele-consultation from home.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E4EAE4]">
                  <Phone className="w-5 h-5 text-[#34765A] mb-2" />
                  <h4 className="font-semibold text-xs text-[#25352E]">Audio Callback</h4>
                  <p className="text-[11px] text-[#69766E] mt-1">
                    Dedicated phone consultation with physician.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E4EAE4]">
                  <Building className="w-5 h-5 text-[#34765A] mb-2" />
                  <h4 className="font-semibold text-xs text-[#25352E]">In-Clinic Sanctuary</h4>
                  <p className="text-[11px] text-[#69766E] mt-1">
                    In-person pulse & physical examination.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4EAE4] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#EDF2ED] flex items-center justify-center text-[#245B45] font-serif font-bold text-lg">
                  V
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#245B45]">
                    Licensed Ayurvedic Physician
                  </h3>
                  <p className="text-xs text-[#69766E]">
                    BAMS, MD (Ayu) · Specialized in Women & Couples Health
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#69766E] leading-relaxed">
                "Our preconception protocols emphasize patience, cellular nourishment, and restoring body equilibrium before conception. We guide couples through gentle lifestyle adjustments."
              </p>

              <button
                onClick={onOpenBooking}
                className="w-full bg-[#E85342] hover:bg-[#CF3E30] text-white py-3 rounded-xl font-medium text-xs transition-colors shadow-xs"
              >
                Schedule Confidential Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
            Questions & Answers
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#245B45]">
            Frequently Asked Questions on Fertility Care
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#E4EAE4] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-medium text-sm text-[#25352E] hover:text-[#245B45]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#69766E] transition-transform duration-200 flex-shrink-0 ${
                    openFaq === idx ? 'rotate-180 text-[#245B45]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#69766E] leading-relaxed border-t border-[#E4EAE4]/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-[#245B45] hover:bg-[#1b4634] text-white px-7 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Appointment</span>
          </button>
        </div>
      </section>
    </div>
  );
};
