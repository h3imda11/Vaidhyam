import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Heart,
  Baby,
  Activity,
  UserCheck,
  ShoppingBag,
  ShieldCheck,
  ChevronDown,
  Clock,
  Video,
  Phone,
  Building,
  CheckCircle2,
  Info,
  MapPin,
  Zap,
  Layers,
  ThermometerSnowflake,
  Stethoscope,
  Lock,
  Compass,
} from 'lucide-react';
import { Doctor } from '../types';

interface HomeProps {
  onNavigate: (tab: string, params?: any) => void;
  onOpenBooking: () => void;
  onOpenStore?: () => void;
  doctor?: Doctor | null;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenStore,
  doctor,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeProtocolTab, setActiveProtocolTab] = useState<'fertility' | 'pregnancy' | 'postnatal' | 'longevity'>('postnatal');

  // Interactive Clinical Protocol Matrix
  const clinicalProtocols = {
    fertility: {
      title: 'Garbhadhana & Vitality Protocol',
      subtitle: 'Preconception Cellular Nourishment',
      cycle: '90-Day Optimization Window',
      target: 'Shukra & Artava Dhatu Tissue Vitality',
      telemetry: [
        { label: 'Cellular Readiness', val: '98.4%' },
        { label: 'Target Bio-System', val: 'Ovarian & Sperm Morphology' },
        { label: 'Key Botanicals', val: 'Ashwagandha, Shatavari, Gokshura' },
        { label: 'Care Modality', val: 'Virtual Diagnostic + Nutrition Plan' },
      ],
      description:
        'A precision clinical approach for individuals and couples preparing for conception. Evaluates systemic metabolic fire (Agni), cellular vitality, and hormonal equilibrium.',
      actionTab: 'fertility-care',
    },
    pregnancy: {
      title: 'Masanumashika Gestational Protocol',
      subtitle: 'Trimester-Staged Fetal & Maternal Care',
      cycle: 'Month 1 through Month 9 Progression',
      target: 'Garbha Vriddhi & Maternal Hemodynamics',
      telemetry: [
        { label: 'Clinical Safety Index', val: '100% Non-Invasive' },
        { label: 'Trimester Customization', val: 'Weeks 1–13, 14–27, 28–40' },
        { label: 'Target Bio-System', val: 'Placental Perfusion & Core Support' },
        { label: 'Care Modality', val: 'Physician Video Check-in & Ahara Guide' },
      ],
      description:
        'Continuous clinical oversight throughout each gestational month. Integrates safe botanical decoctions, breathing modulation, and targeted nutritional architectures.',
      actionTab: 'pregnancy-care',
    },
    postnatal: {
      title: 'Sutika Paricharya Restoration Matrix',
      subtitle: 'The 42-Day Golden Postpartum Recovery',
      cycle: '42 Consecutive Recovery Days',
      target: 'Vata Pacification, Pelvic Recalibration & Lactation',
      telemetry: [
        { label: 'Recovery Trajectory', val: 'Staged 4-Phase Protocol' },
        { label: 'Pelvic Restoration Rate', val: '99.1% Clinical Cleared' },
        { label: 'Target Bio-System', val: 'Uterine Involution & Spine Care' },
        { label: 'Care Modality', val: 'Home Kerala Care & Daily Telehealth' },
      ],
      description:
        'Gold-standard post-delivery clinical care. Features warm herbal decoction baths, medicated Abhyanga, abdominal binding (Udaraveshtana), and restorative infant care.',
      actionTab: 'postnatal-care',
    },
    longevity: {
      title: 'Dinacharya & Bio-Rhythm Optimization',
      subtitle: 'Circadian Modulation & Mindful Movement',
      cycle: 'Ongoing Adaptive Care',
      target: 'Hormonal Balance, Sleep Architecture & Agni',
      telemetry: [
        { label: 'Metabolic Balance', val: 'Dosha Assessment Grounded' },
        { label: 'Stress Modulation', val: 'Cortisol & Vagal Tone Support' },
        { label: 'Target Bio-System', val: 'Neuroendocrine & Joint Health' },
        { label: 'Care Modality', val: '1-on-1 Guided Yoga & Clinical Consultation' },
      ],
      description:
        'Engineered daily wellness and restorative breathwork mapped to your individual biological constitution for sustainable mental clarity and physical vitality.',
      actionTab: 'yoga-wellness',
    },
  };

  // Section 3: 6 Category Cards
  const careCategories = [
    {
      id: 'fertility-care',
      title: 'Fertility Care',
      description: 'Support for individuals and couples preparing for conception with precision biological assessments.',
      tag: 'Preconception',
      image: '/src/assets/images/ayurvedic_prenatal_yoga_1791616795025.jpg',
      targetTab: 'fertility-care',
    },
    {
      id: 'pregnancy-care',
      title: 'Pregnancy Care',
      description: 'Supportive guidance for pregnancy, maternal wellbeing and preparation for childbirth.',
      tag: 'Prenatal Care',
      image: '/src/assets/images/vaidyam_doctor_consult_1791354460579.jpg',
      targetTab: 'pregnancy-care',
    },
    {
      id: 'postnatal-care',
      title: 'Postnatal & Baby Care',
      description: 'Thoughtful support for postpartum recovery, newborn care and the early stages of parenthood.',
      tag: 'Sutika Paricharya',
      image: '/src/assets/images/mother_baby_calm_wellness_1791616771219.jpg',
      targetTab: 'postnatal-care',
    },
    {
      id: 'yoga-wellness',
      title: 'Yoga & Wellness',
      description: 'Mindful movement, breathing practices and restorative clinical wellness sessions.',
      tag: 'Restorative Movement',
      image: '/src/assets/images/ayurvedic_prenatal_yoga_1791616795025.jpg',
      targetTab: 'yoga-wellness',
    },
    {
      id: 'consultations',
      title: 'Ayurvedic Consultation',
      description: 'Connect with a qualified Ayurvedic practitioner for an individual assessment and appropriate care guidance.',
      tag: 'Doctor Consultation',
      image: '/src/assets/images/vaidyam_doctor_consult_1791354460579.jpg',
      targetTab: 'consultations',
    },
    {
      id: 'store',
      title: 'Wellness Store',
      description: 'Explore selected wellness products and clinically formulated resources.',
      tag: 'Botanical Formulations',
      image: '/src/assets/images/vaidyam_pdc_hero_1791354444058.jpg',
      isStore: true,
    },
  ];

  // Section 8: Frequently Asked Questions
  const faqs = [
    {
      q: 'How do I book an appointment?',
      a: 'You can book an appointment online anytime through our website. Select your consultation category, choose your preferred format (video, voice, or in-person), pick a convenient date and time, and enter your details. You will receive an immediate confirmation and calendar invitation.',
    },
    {
      q: 'What online consultation options are available?',
      a: 'We offer private high-definition video consultations that you can join securely from your smartphone or computer, as well as direct doctor telephone callbacks. Both options include post-consultation diet notes and prescription guidance.',
    },
    {
      q: 'How can I reschedule or cancel my appointment?',
      a: 'You can easily reschedule or request a cancellation directly through your patient dashboard or by contacting our care coordinator at least 24 hours prior to the scheduled session. Rescheduled consultations incur no extra charges.',
    },
    {
      q: 'How do patients receive their consultation details?',
      a: 'Once booked, consultation details including your date, time slot, and private video link or call instructions appear immediately on your screen and in your patient dashboard. We also send an SMS and email notification.',
    },
    {
      q: 'Are home-based services available in my location in Kerala?',
      a: 'We provide home-based postnatal care across major districts in Kerala through vetted therapists. Because schedules depend on geographic clustering and practitioner allocation, please submit an enquiry on our Postnatal Care page to check availability in your locality.',
    },
    {
      q: 'How can I contact the practitioner with follow-up questions?',
      a: 'Patients with active consultation bookings can submit non-emergency follow-up queries through the patient dashboard or contact our care desk via WhatsApp/phone during clinic hours (Monday to Saturday, 9:00 AM to 5:00 PM).',
    },
  ];

  const currentProtocol = clinicalProtocols[activeProtocolTab];

  return (
    <div className="bg-[#FFFCF7] text-[#1B2923] min-h-screen text-left">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden tech-grid pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E0E7E1]">
        {/* Futuristic Ambient Glow Circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#245B45]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#E85342]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Telemetry Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#245B45] text-xs font-bold tracking-wider uppercase border border-[#245B45]/20 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#34765A] animate-ping inline-block" />
                <span className="text-[#34765A] font-extrabold font-mono text-[11px]">SYS-LIVE:</span>
                <span>ADVANCED CLINICAL PROTOCOLS</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#245B45] tracking-tight leading-[1.12]">
                Care for Every Chapter of Life
              </h1>

              <p className="text-lg sm:text-xl text-[#56665E] font-normal leading-relaxed max-w-2xl">
                Discover advanced clinical wellness for fertility, pregnancy, postpartum recovery, mother and baby health, mindful movement and long-term vitality.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#E85342] hover:bg-[#CF3E30] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#explore-care"
                  className="bg-white/90 hover:bg-[#EDF2ED] text-[#245B45] border border-[#E0E7E1] px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#34765A]" />
                  <span>Explore Our Care</span>
                </a>
              </div>

              {/* Trust Badge */}
              <div className="pt-2 flex items-center gap-3 text-xs text-[#56665E]">
                <div className="w-2 h-2 rounded-full bg-[#34765A]" />
                <span className="font-medium">
                  Vaidhyam · The Care You Deserve · Qualified Healthcare Practice
                </span>
              </div>

              {/* Futuristic Live Telemetry Strip */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-xl border border-[#E0E7E1] shadow-2xs space-y-1">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#56665E]">
                    Clinical Precision
                  </div>
                  <div className="text-lg font-extrabold text-[#245B45] font-display">
                    99.2%
                  </div>
                  <div className="text-[10px] text-[#34765A] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#34765A]" /> Certified Protocols
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-xl border border-[#E0E7E1] shadow-2xs space-y-1">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#56665E]">
                    Virtual Clinic
                  </div>
                  <div className="text-lg font-extrabold text-[#245B45] font-display">
                    15 Min
                  </div>
                  <div className="text-[10px] text-[#34765A] font-medium flex items-center gap-1">
                    <Video className="w-3 h-3 text-[#34765A]" /> Encrypted HD
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-xl border border-[#E0E7E1] shadow-2xs space-y-1">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#56665E]">
                    Practitioners
                  </div>
                  <div className="text-lg font-extrabold text-[#245B45] font-display">
                    100%
                  </div>
                  <div className="text-[10px] text-[#34765A] font-medium flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-[#34765A]" /> Licensed BAMS / MD
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-xl border border-[#E0E7E1] shadow-2xs space-y-1">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#56665E]">
                    Booking Status
                  </div>
                  <div className="text-lg font-extrabold text-[#E85342] font-display">
                    Live
                  </div>
                  <div className="text-[10px] text-[#56665E] font-medium flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#34765A]" /> Instant Slot Lock
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Warm Authentic Healthcare Photo with Futuristic HUD Overlays */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E0E7E1] shadow-xl bg-white group">
                <img
                  src="/src/assets/images/mother_baby_calm_wellness_1791616771219.jpg"
                  alt="Mother and newborn baby in calm natural Ayurvedic environment"
                  className="w-full h-80 sm:h-96 lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-102"
                />

                {/* Floating Telemetry Glass Badge (Top Right) */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34765A] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-[#245B45] tracking-wide">
                    Telehealth Sanctuary Online
                  </span>
                </div>

                {/* Floating Clinical Highlight (Bottom Card) */}
                <div className="p-5 bg-white/95 backdrop-blur-md border-t border-[#E0E7E1] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-[#245B45]">
                      Maternal & Family Clinical Care
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EDF2ED] text-[#245B45] font-bold">
                      PHASE MATRIX
                    </span>
                  </div>
                  <p className="text-xs text-[#56665E] leading-relaxed">
                    Compassionate guidance designed around individual biological milestones and evidence-grounded Ayurvedic regimens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRODUCTION */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E0E7E1]">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-[#E0E7E1] shadow-xs text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#EDF2ED]/50 rounded-full blur-2xl pointer-events-none" />
          
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#E85342] bg-[#FEF3F2] px-3 py-1 rounded-full border border-[#E85342]/20">
            Welcome to Vaidhyam
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#245B45] tracking-tight">
            Your Wellbeing, Our Priority
          </h2>
          <p className="text-[#56665E] text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            At Vaidhyam, we unite classical biological science with modern clinical precision. Our approach focuses on understanding your individual needs and guiding you towards appropriate care at every stage of life.
          </p>
          <div>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 bg-[#245B45] hover:bg-[#1b4634] text-white px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <span>Discover Vaidhyam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* UNIQUE INTERACTIVE FEATURE: CLINICAL PROTOCOL EXPLORER */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#EDF2ED]/40 via-white to-[#FFFCF7] border-b border-[#E0E7E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85342] font-mono">
              PRECISION CLINICAL MATRIX
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#245B45]">
              Interactive Care Navigator
            </h2>
            <p className="text-[#56665E] text-sm sm:text-base font-normal">
              Select your biological health phase to inspect our specialized clinical protocols, target biomarkers, and care delivery pathways.
            </p>
          </div>

          {/* Interactive Protocol Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#EDF2ED]/70 rounded-2xl max-w-2xl mx-auto border border-[#E0E7E1]">
            {[
              { id: 'postnatal', label: 'Postnatal 42-Day Sutika' },
              { id: 'pregnancy', label: 'Pregnancy Trimester Care' },
              { id: 'fertility', label: 'Preconception Vitality' },
              { id: 'longevity', label: 'Yoga & Bio-Rhythm' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveProtocolTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeProtocolTab === tab.id
                    ? 'bg-[#245B45] text-white shadow-sm'
                    : 'text-[#245B45] hover:bg-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Selected Protocol Display Panel */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0E7E1] shadow-md max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-[#E85342] uppercase tracking-wider">
                    {currentProtocol.subtitle}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#245B45]">
                    {currentProtocol.title}
                  </h3>
                  <div className="text-xs text-[#34765A] font-semibold flex items-center gap-2 pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duration: {currentProtocol.cycle}</span>
                  </div>
                </div>

                <p className="text-sm text-[#56665E] leading-relaxed">
                  {currentProtocol.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onOpenBooking}
                    className="bg-[#E85342] hover:bg-[#CF3E30] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book This Protocol</span>
                  </button>
                  <button
                    onClick={() => onNavigate(currentProtocol.actionTab)}
                    className="bg-white hover:bg-[#EDF2ED]/60 text-[#245B45] border border-[#E0E7E1] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="lg:col-span-5 bg-[#FFFCF7] p-5 sm:p-6 rounded-2xl border border-[#E0E7E1] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E0E7E1]">
                  <span className="text-xs font-bold font-mono text-[#245B45] uppercase">
                    Protocol Specifications
                  </span>
                  <Activity className="w-4 h-4 text-[#34765A]" />
                </div>
                <div className="space-y-3">
                  {currentProtocol.telemetry.map((item, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-[10px] font-mono uppercase text-[#56665E] font-medium">
                        {item.label}
                      </div>
                      <div className="text-xs font-semibold text-[#1B2923]">
                        {item.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPLORE OUR CARE (6 CARDS) */}
      <section id="explore-care" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E0E7E1]">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
            Core Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#245B45]">
            Explore Our Care
          </h2>
          <p className="text-[#56665E] text-sm sm:text-base max-w-2xl font-normal">
            Comprehensive Ayurvedic healthcare tailored to each phase of your wellness and family journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careCategories.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E0E7E1] hover:border-[#34765A]/40 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between group glow-card"
            >
              <div>
                <div className="h-48 overflow-hidden bg-[#EDF2ED] relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#245B45] text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tracking-wider border border-[#E0E7E1]/50 shadow-2xs">
                    {card.tag}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-display text-xl font-bold text-[#245B45]">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#56665E] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                {card.isStore ? (
                  <button
                    onClick={onOpenStore ? onOpenStore : () => onNavigate('store')}
                    className="text-xs font-bold uppercase tracking-wider text-[#E85342] hover:text-[#CF3E30] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate(card.targetTab!)}
                    className="text-xs font-bold uppercase tracking-wider text-[#245B45] hover:text-[#34765A] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: FEATURED CARE */}
      <section className="py-16 sm:py-24 bg-[#EDF2ED]/40 border-b border-[#E0E7E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
              Featured Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#245B45]">
              Comprehensive Care for Your Journey into Motherhood
            </h2>
            <p className="text-[#56665E] text-sm sm:text-base leading-relaxed font-normal">
              From preconception planning to pregnancy and postpartum recovery, discover supportive care designed around your individual needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-7 rounded-2xl border border-[#E0E7E1] shadow-xs space-y-4 flex flex-col justify-between glow-card">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#34765A] bg-[#EDF2ED] px-2.5 py-1 rounded-md">
                  Phase 1 · Preconception
                </span>
                <h3 className="font-display text-xl font-bold text-[#245B45]">
                  Preconception Care
                </h3>
                <p className="text-xs text-[#56665E] leading-relaxed">
                  Supportive nutritional and lifestyle preparation for individuals and couples seeking balanced vitality prior to pregnancy.
                </p>
              </div>
              <button
                onClick={() => onNavigate('fertility-care')}
                className="text-xs font-bold uppercase tracking-wider text-[#245B45] hover:text-[#34765A] flex items-center gap-1.5 pt-2 cursor-pointer"
              >
                <span>Learn About Preconception</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-7 rounded-2xl border border-[#E0E7E1] shadow-xs space-y-4 flex flex-col justify-between glow-card">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#34765A] bg-[#EDF2ED] px-2.5 py-1 rounded-md">
                  Phase 2 · Gestation
                </span>
                <h3 className="font-display text-xl font-bold text-[#245B45]">
                  Pregnancy Wellness
                </h3>
                <p className="text-xs text-[#56665E] leading-relaxed">
                  Trimester-adapted consultations, soothing routines, and gentle breathing guidance supporting mother and baby wellbeing.
                </p>
              </div>
              <button
                onClick={() => onNavigate('pregnancy-care')}
                className="text-xs font-bold uppercase tracking-wider text-[#245B45] hover:text-[#34765A] flex items-center gap-1.5 pt-2 cursor-pointer"
              >
                <span>Learn About Pregnancy Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-7 rounded-2xl border border-[#E0E7E1] shadow-xs space-y-4 flex flex-col justify-between glow-card">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#34765A] bg-[#EDF2ED] px-2.5 py-1 rounded-md">
                  Phase 3 · Postpartum
                </span>
                <h3 className="font-display text-xl font-bold text-[#245B45]">
                  Postnatal Recovery
                </h3>
                <p className="text-xs text-[#56665E] leading-relaxed">
                  Sutika Paricharya mother care, pelvic restoration, infant massage guidance, and home support across Kerala.
                </p>
              </div>
              <button
                onClick={() => onNavigate('postnatal-care')}
                className="text-xs font-bold uppercase tracking-wider text-[#245B45] hover:text-[#34765A] flex items-center gap-1.5 pt-2 cursor-pointer"
              >
                <span>Learn About Postnatal Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E0E7E1] text-xs text-[#56665E] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#34765A] flex-shrink-0" />
            <span>Supportive wellness care is formulated around individual clinical assessment. It does not replace emergency allopathic obstetrics or guarantee specific medical outcomes.</span>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR APPROACH */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E0E7E1]">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
            Clinical Methodology
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#245B45]">
            Care That Begins with Listening
          </h2>
          <p className="text-[#56665E] text-sm sm:text-base max-w-2xl font-normal">
            Treatment recommendations depend on individual assessment and clinical suitability. Here is how your care journey unfolds:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E0E7E1] space-y-3 glow-card">
            <div className="w-10 h-10 rounded-xl bg-[#EDF2ED] text-[#245B45] font-mono font-bold text-base flex items-center justify-center border border-[#245B45]/10">
              01
            </div>
            <h3 className="font-display text-lg font-bold text-[#245B45]">
              Understand Your Needs
            </h3>
            <p className="text-xs text-[#56665E] leading-relaxed">
              We begin by reviewing your medical history, symptoms, daily routines, diet, and emotional state with unhurried attention.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E0E7E1] space-y-3 glow-card">
            <div className="w-10 h-10 rounded-xl bg-[#EDF2ED] text-[#245B45] font-mono font-bold text-base flex items-center justify-center border border-[#245B45]/10">
              02
            </div>
            <h3 className="font-display text-lg font-bold text-[#245B45]">
              Consult Our Practitioner
            </h3>
            <p className="text-xs text-[#56665E] leading-relaxed">
              Meet our qualified Ayurvedic physician via private video, telephone callback, or in-person clinic consultation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E0E7E1] space-y-3 glow-card">
            <div className="w-10 h-10 rounded-xl bg-[#EDF2ED] text-[#245B45] font-mono font-bold text-base flex items-center justify-center border border-[#245B45]/10">
              03
            </div>
            <h3 className="font-display text-lg font-bold text-[#245B45]">
              Receive Targeted Guidance
            </h3>
            <p className="text-xs text-[#56665E] leading-relaxed">
              Get an individual plan encompassing tailored nutrition (Ahara), lifestyle habits (Vihara), and safe herbal formulations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E0E7E1] space-y-3 glow-card">
            <div className="w-10 h-10 rounded-xl bg-[#EDF2ED] text-[#245B45] font-mono font-bold text-base flex items-center justify-center border border-[#245B45]/10">
              04
            </div>
            <h3 className="font-display text-lg font-bold text-[#245B45]">
              Continue with Follow-up
            </h3>
            <p className="text-xs text-[#56665E] leading-relaxed">
              Ongoing progress tracking, timely adjustments to herbs, and regular physician reviews to support your wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: MEET OUR PRACTITIONER */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E0E7E1]">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E0E7E1] shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EDF2ED]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-[#245B45] to-[#164A3A] text-white flex items-center justify-center font-extrabold text-5xl mx-auto shadow-lg border-2 border-white">
                  V
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white px-2.5 py-1 rounded-full border border-[#E0E7E1] shadow-xs flex items-center gap-1 text-[10px] font-bold text-[#245B45]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34765A]" />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E85342] font-mono">
                  CLINICAL FACULTY · LICENSED PRACTITIONER
                </span>
                <h3 className="font-display text-3xl font-extrabold text-[#245B45]">
                  Ayurvedic Physician
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#34765A]">
                  BAMS, MD (Ayu) · Specialized in Post-Delivery Care (Sutika Paricharya) & Classical Panchakarma
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#56665E] leading-relaxed">
                Our licensed Ayurvedic physician provides clinical consultations rooted in classical principles and tailored to your individual health constitution. With formal degrees in Ayurvedic Medicine and Surgery, our doctor emphasizes careful listening, holistic assessment, and safe natural recovery.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('doctor')}
                  className="bg-[#245B45] hover:bg-[#1b4634] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  View Profile
                </button>

                <button
                  onClick={onOpenBooking}
                  className="bg-[#E85342] hover:bg-[#CF3E30] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: POSTNATAL CARE ACROSS KERALA */}
      <section className="py-16 sm:py-24 bg-[#FEF3F2]/40 border-b border-[#E0E7E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85342] font-mono">
              Home-Based Care Across Kerala
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#245B45]">
              Support for Mothers, Beyond the Clinic
            </h2>
            <p className="text-[#56665E] text-base leading-relaxed font-normal">
              Explore home-based postnatal care options designed to support mothers and families during the recovery period. Contact our team to check availability in your location.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('postnatal-care')}
                className="bg-[#245B45] hover:bg-[#1b4634] text-white px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#E85342]" />
                <span>Explore Postnatal Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E0E7E1]">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E85342] font-mono">
            Helpful Information
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#245B45]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#E0E7E1] overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm text-[#1B2923] hover:text-[#245B45] cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#56665E] transition-transform duration-200 flex-shrink-0 ${
                    openFaq === idx ? 'rotate-180 text-[#245B45]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#56665E] leading-relaxed border-t border-[#E0E7E1]/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E85342] font-mono">
          Begin Your Care
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#245B45]">
          Your Journey to Better Wellbeing Starts Here
        </h2>
        <p className="text-base sm:text-lg text-[#56665E] font-normal max-w-xl mx-auto leading-relaxed">
          Take the next step toward advanced clinical wellness.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenBooking}
            className="bg-[#E85342] hover:bg-[#CF3E30] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Appointment</span>
          </button>

          <a
            href="#explore-care"
            className="bg-white hover:bg-[#EDF2ED] text-[#245B45] border border-[#E0E7E1] px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-2xs cursor-pointer"
          >
            Explore Our Services
          </a>
        </div>
      </section>
    </div>
  );
};
