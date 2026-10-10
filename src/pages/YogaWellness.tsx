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
  Users,
  User,
  Activity,
  Smile,
  ShieldAlert
} from 'lucide-react';

interface YogaWellnessProps {
  onOpenBooking: () => void;
}

export const YogaWellness: React.FC<YogaWellnessProps> = ({ onOpenBooking }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const yogaCards = [
    {
      id: 'fertility-yoga',
      title: 'Fertility Yoga',
      category: 'Preconception Wellbeing',
      tagline: 'Pelvic Circulation & Stress Harmony',
      description:
        'Appropriately adapted yoga for general wellbeing during the preconception period, focusing on gentle pelvic mobility and nervous system calming.',
      format: '1-on-1 Private Live Video or In-Clinic',
      duration: '50 Minutes',
      availability: 'Mon – Sat · Morning & Evening slots',
      pricing: '₹650 per session (Package discounts available)',
      instructor: 'Certified Ayurvedic Yoga Instructor & Clinical Team',
      highlights: [
        'Gentle hip openers (Baddha Konasana, Supta Baddha Konasana)',
        'Parasympathetic nervous system soothing with Bhramari Pranayama',
        'Guided Yoga Nidra to relieve conception-related performance stress',
      ],
    },
    {
      id: 'prenatal-yoga',
      title: 'Prenatal Yoga',
      category: 'Pregnancy Care',
      tagline: 'Trimester-Adapted Maternal Movement',
      description:
        'Pregnancy-appropriate movement and relaxation sessions designed to ease lumbar discomfort, foster maternal strength, and prepare for birth.',
      format: '1-on-1 Video or Small Monitored Cohort',
      duration: '45 Minutes',
      availability: 'Tue, Thu, Sat · 10:00 AM & 4:30 PM',
      pricing: '₹650 per session',
      instructor: 'Specialized Maternal Yoga Practitioner',
      highlights: [
        'Modified gentle postures with wall and bolster prop support',
        'Pelvic floor awareness and calm labor breathing exercises',
        'Safe postures preventing abdominal compression or strain',
      ],
    },
    {
      id: 'postnatal-yoga',
      title: 'Postnatal Yoga',
      category: 'Postpartum Rehabilitation',
      tagline: 'Core & Pelvic Floor Re-education',
      description:
        'Individualised movement guidance for the postpartum period, rebuilding pelvic floor tone, posture, and core stamina with safety.',
      format: 'Personal 1-on-1 Virtual or Sanctuary',
      duration: '45 Minutes',
      availability: 'Mon – Fri · Flexible slots',
      pricing: '₹650 per session (Included in select PDC programs)',
      instructor: 'Postnatal Rehabilitation Specialist',
      highlights: [
        'Gentle transverse abdominis activation (safe for diastasis recti)',
        'Neck, upper back, and shoulder tension relief for nursing mothers',
        'Restorative mindfulness calming postpartum hormonal transitions',
      ],
    },
    {
      id: 'therapeutic-wellness-yoga',
      title: 'Therapeutic & Wellness Yoga',
      category: 'General Health',
      tagline: 'Ayurvedic Dosha-Balanced Asanas',
      description:
        'Appropriate yoga practices supporting general wellbeing, metabolic activation, joint flexibility, and deep relaxation.',
      format: 'Private 1-on-1 or Guided Pair',
      duration: '60 Minutes',
      availability: 'Mon – Sat · 7:00 AM – 6:00 PM',
      pricing: '₹650 per session',
      instructor: 'Senior Yoga Acharya',
      highlights: [
        'Customized according to your Prakriti (Vata, Pitta, Kapha)',
        'Gentle spinal flexibility, Sukshma Vyayama, and joint release',
        'Daily Dinacharya pranayama routine for steady vitality',
      ],
    },
    {
      id: 'online-yoga-sessions',
      title: 'Online Yoga Sessions',
      category: 'Remote Tele-Wellness',
      tagline: 'Interactive Screen-to-Screen Live Guidance',
      description:
        'Remote sessions with clear information about availability, session duration and booking, accessible from anywhere with live posture adjustments.',
      format: 'High-Definition Interactive Video Session',
      duration: '45 or 60 Minutes',
      availability: 'Daily slots with calendar scheduling',
      pricing: '₹650 per session',
      instructor: 'Vaidhyam Certified Instructors',
      highlights: [
        'Direct posture correction with camera angle guidelines',
        'Private link sent securely to your patient dashboard',
        'Session summary notes and personalized home practice tips',
      ],
    },
  ];

  const faqs = [
    {
      q: 'Do I need prior yoga experience to join these sessions?',
      a: 'Not at all. All our yoga sessions are customized to your individual experience, fitness level, and health history. We specialize in gentle, therapeutic, and beginner-friendly practices with props and modifications.',
    },
    {
      q: 'Can yoga cure medical conditions or replace clinical consultations?',
      a: 'No. Yoga at Vaidhyam is a supportive mindful movement and stress-reduction practice. It is not a substitute for medical treatment, clinical investigation, or pharmaceutical therapy. Our instructors work closely with our Ayurvedic physician to ensure physical safety.',
    },
    {
      q: 'When can I start Postnatal Yoga after giving birth?',
      a: 'Gentle diaphragmatic breathing can begin within the first few weeks, but physical postures are introduced after 6 weeks for uncomplicated vaginal deliveries and 8 to 10 weeks for caesarean births, always following medical clearance from your obstetrician.',
    },
    {
      q: 'What props or equipment do I need for online sessions?',
      a: 'A comfortable yoga mat, a firm cushion or bolster, a light blanket, and comfortable clothing are sufficient. Our instructor will guide you on using simple household cushions for support.',
    },
  ];

  return (
    <div className="bg-[#FFFCF7] text-[#25352E] min-h-screen text-left">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F0E8]/70 via-[#FFFCF7] to-[#FFFCF7] pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E4EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0E8] text-[#245B45] text-xs font-semibold tracking-wider uppercase border border-[#245B45]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F17C70]" />
                <span>Mindful Ayurvedic Movement</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#245B45] tracking-tight leading-tight">
                Move Mindfully. Breathe Better. Feel Supported.
              </h1>

              <p className="text-lg sm:text-xl text-[#69766E] font-light leading-relaxed">
                Discover adapted yoga, mindful breathing, and restorative sessions aligned with your reproductive and physical health. Guided by experienced instructors working in harmony with Ayurvedic physicians.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#245B45] hover:bg-[#1b4634] text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow flex items-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 text-[#F17C70]" />
                  <span>Book a Yoga Session</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#sessions"
                  className="bg-white hover:bg-[#E8F0E8]/40 text-[#245B45] border border-[#E4EAE4] px-6 py-3.5 rounded-xl font-medium text-sm transition-all"
                >
                  Explore Sessions
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4EAE4] text-xs text-[#69766E] flex items-start gap-3 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Health Boundary:</strong> Yoga is a restorative practice for physical alignment and emotional calm. It does not replace medical treatment or promise cures for fertility or hormonal conditions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E4EAE4] shadow-md bg-white">
                <img
                  src="/src/assets/images/ayurvedic_prenatal_yoga_1791616795025.jpg"
                  alt="Mindful yoga session in serene Ayurvedic space"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="p-5 bg-white/95 backdrop-blur-xs border-t border-[#E4EAE4] space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#245B45]">
                    Personalized Alignment & Breathing
                  </h3>
                  <p className="text-xs text-[#69766E]">
                    Calm, unhurried instruction respecting your unique pace and stage of life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (5 cards) */}
      <section id="sessions" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Our Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Yoga & Wellness Sessions
          </h2>
          <p className="text-[#69766E] text-sm sm:text-base max-w-2xl font-light">
            Every session is adapted to your medical background, pregnancy stage, or postpartum recovery needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {yogaCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-7 border border-[#E4EAE4] hover:border-[#34765A]/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#34765A] bg-[#E8F0E8] px-2.5 py-1 rounded-md">
                    {card.category}
                  </span>
                  <span className="text-xs font-semibold text-[#F17C70]">
                    {card.duration}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#245B45]">
                  {card.title}
                </h3>

                <p className="text-xs font-medium text-[#34765A]">
                  {card.tagline}
                </p>

                <p className="text-[#69766E] text-xs leading-relaxed">
                  {card.description}
                </p>

                {/* Session Attributes */}
                <div className="p-3.5 rounded-xl bg-[#FFFCF7] border border-[#E4EAE4] space-y-2 text-xs text-[#25352E]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#69766E]">Format:</span>
                    <span className="font-medium text-[#245B45] text-right">{card.format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#69766E]">Schedule:</span>
                    <span className="font-medium text-[#245B45] text-right">{card.availability}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#69766E]">Fee:</span>
                    <span className="font-semibold text-[#F17C70]">{card.pricing}</span>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#25352E]">
                    What You Practice:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#69766E]">
                    {card.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34765A] flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E4EAE4] flex items-center justify-between">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#245B45] hover:bg-[#1b4634] text-white px-5 py-2.5 rounded-xl font-medium text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Book a Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-[#69766E]">
                  Video or Studio
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practitioner / Instructor Profile */}
      <section className="bg-[#E8F0E8]/40 py-16 border-y border-[#E4EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#34765A]">
                Qualified Instruction
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#245B45]">
                Rooted in Classical Yoga, Safeguarded by Healthcare
              </h2>
              <p className="text-[#69766E] text-sm leading-relaxed">
                Unlike generic fitness yoga, all sessions at Vaidhyam are clinically reviewed. Our instructors understand prenatal contraindications, diastasis recti safety, and pelvic floor care to provide restorative sessions.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#25352E]">
                <div className="bg-white px-3.5 py-2 rounded-xl border border-[#E4EAE4] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34765A]" />
                  <span>Licensed Maternal Care Team</span>
                </div>
                <div className="bg-white px-3.5 py-2 rounded-xl border border-[#E4EAE4] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34765A]" />
                  <span>Individual Health Screening</span>
                </div>
                <div className="bg-white px-3.5 py-2 rounded-xl border border-[#E4EAE4] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34765A]" />
                  <span>Zero Aggressive Strains</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EAE4] shadow-xs text-center space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#245B45]">
                Ready to Begin?
              </h3>
              <p className="text-xs text-[#69766E]">
                Book your first 1-on-1 personalized yoga & breathing session online.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full bg-[#F17C70] hover:bg-[#e0695d] text-white py-3 rounded-xl font-medium text-xs transition-colors shadow-xs"
              >
                Book Your Mindful Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Questions & Clarity
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#245B45]">
            Frequently Asked Questions on Yoga
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#E4EAE4] overflow-hidden"
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
