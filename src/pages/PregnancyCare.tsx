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
  Activity,
  Smile
} from 'lucide-react';
import { Doctor } from '../types';

interface PregnancyCareProps {
  doctor: Doctor | null;
  onOpenBooking: () => void;
  onNavigateYoga?: () => void;
}

export const PregnancyCare: React.FC<PregnancyCareProps> = ({
  doctor,
  onOpenBooking,
  onNavigateYoga,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const services = [
    {
      id: 'month-by-month',
      title: 'Month-by-Month Prenatal Care',
      subtitle: 'Trimester-Specific Masanumashika Rasayana',
      description:
        'Supportive consultations and appropriate guidance throughout pregnancy, adapted to every gestational stage.',
      details: [
        'Classical Masanumashika Kashaya and herbal ghee protocols aligned with fetal development',
        'Relief for common discomforts: morning nausea, digestive sluggishness, acidity, and fatigue',
        'Ongoing monitoring of maternal Agni, hydration, and restful sleep quality',
        'Supportive physician reviews scheduled at key gestational milestones',
      ],
      suitable: 'Expectant mothers at all stages from early first trimester to delivery preparation.',
    },
    {
      id: 'garbha-samskara',
      title: 'Garbha Samskara',
      subtitle: 'Conscious Parenting & Fetal Nurturing',
      description:
        'Explore traditional practices associated with pregnancy, wellbeing and preparation for parenthood.',
      details: [
        'Positive sound vibration (Mantra & classical Raagas) for fetal auditory development',
        'Mindfulness and emotional balance techniques for the expectant mother',
        'Partner bonding practices and mindful conversational routines with the unborn baby',
        'Herbal bath preparations and gentle foot therapies for nervous system calming',
      ],
      suitable: 'Mothers seeking deep emotional tranquility and conscious mindful bonding with their baby.',
    },
    {
      id: 'pregnancy-yoga',
      title: 'Pregnancy Yoga & Breathing',
      subtitle: 'Gentle Trimester-Adapted Asanas & Pranayama',
      description:
        'Appropriately adapted movement, relaxation and breathing sessions for eligible participants.',
      details: [
        'Gentle pelvic opening and back-strengthening postures under trained guidance',
        'Cooling Pranayama (Anulom Vilom, Bhramari) to calm blood pressure and anxiety',
        'Guided Yoga Nidra for profound rest and relief from pregnancy fatigue',
        'Pelvic floor awareness and breath coordination for peaceful labor preparation',
      ],
      suitable: 'Participants cleared for light exercise with physician confirmation.',
    },
    {
      id: 'diet-and-lifestyle',
      title: 'Diet & Lifestyle in Pregnancy',
      subtitle: 'Ahara & Vihara Gestational Harmony',
      description:
        'Individualised guidance on nutrition, routines and general wellbeing.',
      details: [
        'Warm, unctuous, easily digestible satvik meals supporting placental health',
        'Trimester-wise emphasis: sweet & cooling foods in early months, ghee in later months',
        'Hydration protocols featuring medicated cumin, fennel, and coriander herbal waters',
        'Posture, ergonomic support, and natural sleep routines to ease lumbar tension',
      ],
      suitable: 'Expectant mothers looking for clean, nourishing Ayurvedic meal planning.',
    },
  ];

  const faqs = [
    {
      q: 'Is Ayurvedic prenatal care safe during pregnancy?',
      a: 'Yes, when guided by a licensed Ayurvedic physician. In authentic Ayurveda, prenatal care is strictly gentle, nourishing, and protective. We only use food-based herbs, medicated ghees, and safe herbal waters. Intensive treatments, strong detoxes, and Panchakarma are strictly avoided during pregnancy.',
    },
    {
      q: 'Can Ayurvedic care replace my obstetrician / hospital checkups?',
      a: 'No. Ayurvedic care is a supportive and complementary healthcare practice. You must continue all routine ultrasounds, blood work, and prenatal visits with your registered obstetrician. We coordinate harmoniously with your medical care team.',
    },
    {
      q: 'At what month should I start prenatal consultations?',
      a: 'You can begin as soon as pregnancy is confirmed. Early consultations focus on stabilizing nausea, supporting digestion, and establishing calming routines. We also support mothers who begin in their second or third trimester.',
    },
    {
      q: 'Can I attend Pregnancy Yoga if I have never practiced yoga before?',
      a: 'Yes. Our prenatal sessions are gentle, beginner-friendly, and modified for your specific gestational week. A basic clearance from your obstetrician is recommended before starting physical exercises.',
    },
  ];

  return (
    <div className="bg-[#FFFCF7] text-[#25352E] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FEF3F2]/80 via-[#FFFCF7] to-[#FFFCF7] pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E4EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3F2] text-[#E85342] text-xs font-semibold tracking-wider uppercase border border-[#E85342]/20">
                <Heart className="w-3.5 h-3.5 text-[#E85342]" />
                <span>Maternal & Fetal Wellbeing</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#245B45] tracking-tight leading-tight">
                Nurturing Mother and Baby Through Every Month of Pregnancy
              </h1>

              <p className="text-lg sm:text-xl text-[#69766E] font-light leading-relaxed">
                Discover supportive guidance for pregnancy, maternal wellbeing and preparing for the arrival of your baby. Grounded in classical Ayurveda, delivered with tenderness, medical caution, and care.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#245B45] hover:bg-[#1b4634] text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow flex items-center gap-2 group"
                >
                  <span>Book Pregnancy Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#services"
                  className="bg-white hover:bg-[#EDF2ED]/40 text-[#245B45] border border-[#E4EAE4] px-6 py-3.5 rounded-xl font-medium text-sm transition-all"
                >
                  View Prenatal Services
                </a>
              </div>

              {/* Safety Notice */}
              <div className="p-4 rounded-2xl bg-white border border-[#E4EAE4] text-xs text-[#69766E] flex items-start gap-3 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Clinical Safety First:</strong> All prenatal recommendations are tailored to individual trimester needs. Intensive Panchakarma procedures are contraindicated and strictly never practiced during pregnancy.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E4EAE4] shadow-md bg-white">
                <img
                  src="/src/assets/images/ayurvedic_prenatal_yoga_1791616795025.jpg"
                  alt="Mother practicing mindful prenatal yoga and breathing"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="p-5 text-left bg-white/95 backdrop-blur-xs border-t border-[#E4EAE4] space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#245B45]">
                    Mindful Maternal Serenity
                  </h3>
                  <p className="text-xs text-[#69766E]">
                    Empathetic care supporting the physical changes and emotional transition into motherhood.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
            Dedicated Support
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Prenatal Care Services
          </h2>
          <p className="text-[#69766E] text-sm sm:text-base max-w-2xl font-light">
            Designed to comfort, nourish, and prepare your body and mind throughout the three trimesters.
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
                  <Sparkles className="w-4 h-4 text-[#E85342]" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#245B45]">
                  {service.title}
                </h3>

                <p className="text-[#69766E] text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-3 border-t border-[#E4EAE4]/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#25352E]">
                    What We Cover:
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

                <div className="p-3 rounded-xl bg-[#FEF3F2]/40 border border-[#E85342]/20 text-xs text-[#25352E]">
                  <span className="font-semibold text-[#245B45]">Best Suited For: </span>
                  {service.suitable}
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

      {/* Practitioner Consultation Formats */}
      <section className="bg-[#EDF2ED]/30 py-16 border-y border-[#E4EAE4] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#34765A]">
                Care Formats
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#245B45]">
                Consult From Home or At Our Sanctuary
              </h2>
              <p className="text-[#69766E] text-sm leading-relaxed">
                We understand that travel can be uncomfortable during later months of pregnancy. That is why our consultations are available over private video calls, direct phone callbacks, or in-person clinic visits.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-[#E4EAE4]">
                  <Video className="w-5 h-5 text-[#34765A] mb-2" />
                  <h4 className="font-semibold text-xs text-[#25352E]">Online Video</h4>
                  <p className="text-[11px] text-[#69766E] mt-1">Comfort of your living room.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E4EAE4]">
                  <Phone className="w-5 h-5 text-[#34765A] mb-2" />
                  <h4 className="font-semibold text-xs text-[#25352E]">Audio Consultation</h4>
                  <p className="text-[11px] text-[#69766E] mt-1">Convenient doctor phone call.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E4EAE4]">
                  <Building className="w-5 h-5 text-[#34765A] mb-2" />
                  <h4 className="font-semibold text-xs text-[#25352E]">In-Clinic Visit</h4>
                  <p className="text-[11px] text-[#69766E] mt-1">Nadi Pariksha pulse evaluation.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4EAE4] shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#245B45]">
                Consult With Our Physician
              </h3>
              <p className="text-xs text-[#69766E] leading-relaxed">
                Connect with our licensed doctor for personalized answers to your diet questions, morning sickness relief, and labor preparation.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full bg-[#E85342] hover:bg-[#CF3E30] text-white py-3 rounded-xl font-medium text-xs transition-colors shadow-xs"
              >
                Book Your Prenatal Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
            Helpful Information
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#245B45]">
            Frequently Asked Questions on Pregnancy Care
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
