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
  MapPin
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

  // Section 3: 6 Category Cards
  const careCategories = [
    {
      id: 'fertility-care',
      title: 'Fertility Care',
      description: 'Personalised support for individuals and couples preparing for conception.',
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
      description: 'Mindful movement, breathing practices and personalised wellness sessions.',
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
      description: 'Explore selected wellness products and resources.',
      tag: 'Ayurvedic Formulations',
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

  return (
    <div className="bg-[#FFFCF7] text-[#25352E] min-h-screen text-left">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F0E8]/70 via-[#FFFCF7] to-[#FFFCF7] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E4EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0E8] text-[#245B45] text-xs font-semibold tracking-wider uppercase border border-[#245B45]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F17C70]" />
                <span>PERSONALISED AYURVEDIC CARE</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#245B45] tracking-tight leading-[1.12]">
                Care for Every Chapter of Life
              </h1>

              <p className="text-lg sm:text-xl text-[#69766E] font-light leading-relaxed max-w-2xl">
                Discover personalised Ayurvedic care for fertility, pregnancy, postpartum recovery, mother and baby wellness, yoga and everyday health.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#F17C70] hover:bg-[#e0695d] text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow flex items-center gap-2 group"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#explore-care"
                  className="bg-white hover:bg-[#E8F0E8]/50 text-[#245B45] border border-[#E4EAE4] px-6 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2"
                >
                  <span>Explore Our Care</span>
                </a>
              </div>

              {/* Trust Badge / Tagline */}
              <div className="pt-4 flex items-center gap-3 text-xs text-[#69766E]">
                <ShieldCheck className="w-4 h-4 text-[#34765A]" />
                <span>Vaidhyam · The Care You Deserve · Qualified Healthcare Practice</span>
              </div>
            </div>

            {/* Right Column: Warm Authentic Healthcare Photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E4EAE4] shadow-md bg-white">
                <img
                  src="/src/assets/images/mother_baby_calm_wellness_1791616771219.jpg"
                  alt="Mother and newborn baby in calm natural Ayurvedic environment"
                  className="w-full h-80 sm:h-96 lg:h-[420px] object-cover"
                />
                <div className="p-5 bg-white/95 backdrop-blur-xs border-t border-[#E4EAE4] space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#245B45]">
                    Thoughtful Maternal & Family Care
                  </h3>
                  <p className="text-xs text-[#69766E]">
                    Compassionate guidance designed around your personal health needs and biological milestones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRODUCTION */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-[#E4EAE4] shadow-xs text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Welcome to Vaidhyam
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Your Wellbeing, Our Priority
          </h2>
          <p className="text-[#69766E] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            At Vaidhyam, we bring the wisdom of Ayurveda into a personalised, supportive healthcare experience. Our approach focuses on understanding your individual needs and guiding you towards appropriate care at every stage of life.
          </p>
          <div>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 bg-[#245B45] hover:bg-[#1b4634] text-white px-7 py-3 rounded-xl text-xs font-medium transition-colors"
            >
              <span>Discover Vaidhyam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPLORE OUR CARE (6 CARDS) */}
      <section id="explore-care" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Core Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Explore Our Care
          </h2>
          <p className="text-[#69766E] text-sm sm:text-base max-w-2xl font-light">
            Comprehensive Ayurvedic healthcare tailored to each phase of your wellness and family journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careCategories.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E4EAE4] hover:border-[#34765A]/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden bg-[#E8F0E8] relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#245B45] text-[11px] font-semibold uppercase px-2.5 py-1 rounded-md tracking-wider">
                    {card.tag}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-[#245B45]">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#69766E] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                {card.isStore ? (
                  <button
                    onClick={onOpenStore ? onOpenStore : () => onNavigate('store')}
                    className="text-xs font-semibold text-[#F17C70] hover:text-[#e0695d] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate(card.targetTab!)}
                    className="text-xs font-semibold text-[#245B45] hover:text-[#34765A] flex items-center gap-1.5 transition-colors"
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
      <section className="py-16 sm:py-24 bg-[#E8F0E8]/40 border-b border-[#E4EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
              Featured Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
              Personalised Care for Your Journey into Motherhood
            </h2>
            <p className="text-[#69766E] text-sm sm:text-base leading-relaxed font-light">
              From preconception planning to pregnancy and postpartum recovery, discover supportive care designed around your individual needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-7 rounded-2xl border border-[#E4EAE4] shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#34765A]">
                  Phase 1 · Preconception
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#245B45]">
                  Preconception Care
                </h3>
                <p className="text-xs text-[#69766E] leading-relaxed">
                  Supportive nutritional and lifestyle preparation for individuals and couples seeking balanced vitality prior to pregnancy.
                </p>
              </div>
              <button
                onClick={() => onNavigate('fertility-care')}
                className="text-xs font-semibold text-[#245B45] hover:text-[#34765A] flex items-center gap-1.5 pt-2"
              >
                <span>Learn About Preconception</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-7 rounded-2xl border border-[#E4EAE4] shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#34765A]">
                  Phase 2 · Gestation
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#245B45]">
                  Pregnancy Wellness
                </h3>
                <p className="text-xs text-[#69766E] leading-relaxed">
                  Trimester-adapted consultations, soothing routines, and gentle breathing guidance supporting mother and baby wellbeing.
                </p>
              </div>
              <button
                onClick={() => onNavigate('pregnancy-care')}
                className="text-xs font-semibold text-[#245B45] hover:text-[#34765A] flex items-center gap-1.5 pt-2"
              >
                <span>Learn About Pregnancy Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-7 rounded-2xl border border-[#E4EAE4] shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#34765A]">
                  Phase 3 · Postpartum
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#245B45]">
                  Postnatal Recovery
                </h3>
                <p className="text-xs text-[#69766E] leading-relaxed">
                  Sutika Paricharya mother care, pelvic restoration, infant massage guidance, and home support across Kerala.
                </p>
              </div>
              <button
                onClick={() => onNavigate('postnatal-care')}
                className="text-xs font-semibold text-[#245B45] hover:text-[#34765A] flex items-center gap-1.5 pt-2"
              >
                <span>Learn About Postnatal Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E4EAE4] text-xs text-[#69766E] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#34765A] flex-shrink-0" />
            <span>Supportive wellness care is formulated around individual clinical assessment. It does not replace emergency allopathic obstetrics or guarantee specific medical outcomes.</span>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR APPROACH */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Clinical Methodology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Care That Begins with Listening
          </h2>
          <p className="text-[#69766E] text-sm sm:text-base max-w-2xl font-light">
            Treatment recommendations depend on individual assessment and clinical suitability. Here is how your care journey unfolds:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F0E8] text-[#245B45] font-serif font-bold text-lg flex items-center justify-center">
              1
            </div>
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Understand Your Needs
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              We begin by reviewing your medical history, symptoms, daily routines, diet, and emotional state with unhurried attention.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F0E8] text-[#245B45] font-serif font-bold text-lg flex items-center justify-center">
              2
            </div>
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Consult Our Practitioner
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Meet our qualified Ayurvedic physician via private video, telephone callback, or in-person clinic consultation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F0E8] text-[#245B45] font-serif font-bold text-lg flex items-center justify-center">
              3
            </div>
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Receive Personalised Guidance
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Get an individual plan encompassing tailored nutrition (Ahara), lifestyle habits (Vihara), and safe herbal formulations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F0E8] text-[#245B45] font-serif font-bold text-lg flex items-center justify-center">
              4
            </div>
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Continue with Appropriate Follow-up
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Ongoing progress tracking, timely adjustments to herbs, and regular physician reviews to support your wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: MEET OUR PRACTITIONER */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E4EAE4] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#E8F0E8] border-2 border-[#34765A]/20 flex items-center justify-center text-[#245B45] font-serif font-bold text-5xl mx-auto shadow-inner">
                V
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
                  Section 6 · Verified Healthcare Practitioner
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#245B45]">
                  Ayurvedic Physician
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#34765A]">
                  BAMS, MD (Ayu) · Specialized in Post-Delivery Care (Sutika Paricharya) & Classical Panchakarma
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#69766E] leading-relaxed">
                Our licensed Ayurvedic physician provides clinical consultations rooted in classical principles and tailored to your individual health constitution. With formal degrees in Ayurvedic Medicine and Surgery, our doctor emphasizes careful listening, holistic assessment, and safe natural recovery.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('doctor')}
                  className="bg-[#245B45] hover:bg-[#1b4634] text-white px-6 py-2.5 rounded-xl text-xs font-medium transition-colors"
                >
                  View Profile
                </button>

                <button
                  onClick={onOpenBooking}
                  className="bg-[#F17C70] hover:bg-[#e0695d] text-white px-6 py-2.5 rounded-xl text-xs font-medium transition-colors"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: POSTNATAL CARE ACROSS KERALA */}
      <section className="py-16 sm:py-24 bg-[#FFF0ED]/40 border-b border-[#E4EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
              Home-Based Care
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
              Support for Mothers, Beyond the Clinic
            </h2>
            <p className="text-[#69766E] text-base leading-relaxed font-light">
              Explore home-based postnatal care options designed to support mothers and families during the recovery period. Contact our team to check availability in your location.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('postnatal-care')}
                className="bg-[#245B45] hover:bg-[#1b4634] text-white px-7 py-3 rounded-xl text-xs font-medium transition-colors inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#F17C70]" />
                <span>Explore Postnatal Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Helpful Information
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Frequently Asked Questions
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
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
          Begin Your Care
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#245B45]">
          Your Journey to Better Wellbeing Starts Here
        </h2>
        <p className="text-base sm:text-lg text-[#69766E] font-light max-w-xl mx-auto leading-relaxed">
          Take the next step towards personalised Ayurvedic care.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenBooking}
            className="bg-[#F17C70] hover:bg-[#e0695d] text-white px-8 py-3.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Appointment</span>
          </button>

          <a
            href="#explore-care"
            className="bg-white hover:bg-[#E8F0E8]/40 text-[#245B45] border border-[#E4EAE4] px-7 py-3.5 rounded-xl font-medium text-sm transition-all"
          >
            Explore Our Services
          </a>
        </div>
      </section>
    </div>
  );
};
