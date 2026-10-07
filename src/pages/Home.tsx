import React, { useEffect, useState } from 'react';
import {
  Calendar,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  PhoneCall,
  MessageCircle,
  Award,
  Leaf
} from 'lucide-react';
import { getPdcPackages, getDoctor, getTreatments } from '../services/dbService';
import { PdcPackage, Doctor, Treatment } from '../types';

interface HomeProps {
  onNavigate: (tab: string, params?: any) => void;
  onOpenBooking: () => void;
  onSelectPdcPackage: (pkg: PdcPackage) => void;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectPdcPackage,
}) => {
  const [packages, setPackages] = useState<PdcPackage[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    async function loadData() {
      const [pkgs, doc, treats] = await Promise.all([
        getPdcPackages(),
        getDoctor(),
        getTreatments(),
      ]);
      setPackages(pkgs);
      setDoctor(doc);
      setTreatments(treats.slice(0, 4));
    }
    loadData();
  }, []);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143D27]/10 text-[#0C281B] text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#E06D53] animate-pulse" />
                <span className="text-[#C59B3F] font-serif italic text-xs font-semibold">
                  Ancient Wisdom. Personal Healing.
                </span>
                <span className="text-[#143D27]/40">•</span>
                <span>Specialized Postnatal Care (Sutika Paricharya)</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0C281B] font-bold tracking-tight leading-[1.12]">
                Personalized Ayurveda for Every Stage of Life
              </h1>

              {/* Supporting Text */}
              <p className="text-lg sm:text-xl text-[#143D27]/80 leading-relaxed font-light max-w-2xl">
                Expert Ayurvedic consultations, personalized treatments and dedicated
                post-delivery care designed around you.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* Primary CTA (Coral) */}
                <button
                  onClick={() => onNavigate('pdc')}
                  className="inline-flex items-center justify-center gap-3 bg-[#E06D53] hover:bg-[#C4573E] text-white text-base font-semibold px-7 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] group"
                >
                  <HeartPulse className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Explore Post-Delivery Care</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#F4EFE6] text-[#0C281B] text-base font-semibold px-6 py-4 rounded-2xl border border-[#143D27]/20 shadow-sm transition-all duration-200 active:scale-[0.98]"
                >
                  <Calendar className="w-5 h-5 text-[#2C6E49]" />
                  <span>Book a Consultation</span>
                </button>
              </div>

              {/* Assurance points */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#143D27]/10 text-xs text-[#143D27]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6E49] flex-shrink-0" />
                  <span>Doctor-Guided</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6E49] flex-shrink-0" />
                  <span>Authentic Herbs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6E49] flex-shrink-0" />
                  <span>Home & Sanctuary</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/src/assets/images/vaidyam_pdc_hero_1791354444058.jpg"
                  alt="Vaidyam Ayurvedic Post-Delivery Care Sanctuary Kerala"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C281B]/80 via-transparent to-transparent" />

                {/* Overlay Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#FAF8F5]/95 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#E06D53] block">
                      Flagship Care Offering
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#0C281B]">
                      Sutika Paricharya (PDC)
                    </h3>
                    <p className="text-xs text-[#143D27]/70">
                      7 to 42 Days classical postpartum programs
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('pdc')}
                    className="p-2.5 rounded-xl bg-[#E06D53] text-white hover:bg-[#C4573E] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative Accent Leaf Badge */}
              <div className="hidden sm:flex absolute -top-4 -left-4 p-3 bg-white rounded-2xl shadow-lg border border-[#143D27]/10 items-center gap-2 text-xs font-semibold text-[#0C281B]">
                <Leaf className="w-4 h-4 text-[#2C6E49]" />
                <span>Kerala Traditional Lineage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE CORE PILLARS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Post-Delivery Care Pillar */}
          <div
            onClick={() => onNavigate('pdc')}
            className="group relative p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E06D53]/10 rounded-full blur-2xl group-hover:scale-150 transition-all" />
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E06D53]/15 text-[#C4573E] flex items-center justify-center">
                <HeartPulse className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E06D53]/15 text-[#C4573E]">
                Primary Flagship Care
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0C281B] group-hover:text-[#E06D53] transition-colors">
                Post-Delivery Care
              </h3>
              <p className="text-sm text-[#143D27]/80 leading-relaxed font-light">
                Personalized Ayurvedic care for mothers after childbirth. Structured 7 to 42
                day programs focusing on maternal replenishment, gentle infant care, and core recovery.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-sm font-semibold text-[#E06D53] group-hover:translate-x-1 transition-transform">
              <span>Explore Programs & Packages</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Ayurvedic Consultation Pillar */}
          <div
            onClick={() => onNavigate('consultations')}
            className="group relative p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#2C6E49]/15 text-[#2C6E49] flex items-center justify-center">
                <UserCheck className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2C6E49]/15 text-[#2C6E49]">
                Doctor-Led
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0C281B] group-hover:text-[#2C6E49] transition-colors">
                Ayurvedic Consultation
              </h3>
              <p className="text-sm text-[#143D27]/80 leading-relaxed font-light">
                Connect with our Ayurvedic doctor for personalized guidance. Detailed Prakriti
                assessment, pulse examination insights, and custom herbal prescriptions.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-sm font-semibold text-[#2C6E49] group-hover:translate-x-1 transition-transform">
              <span>Book Doctor Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Personalized Treatments Pillar */}
          <div
            onClick={() => onNavigate('treatments')}
            className="group relative p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C29B38]/15 text-[#C29B38] flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C29B38]/15 text-[#8A6715]">
                Targeted Therapies
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0C281B] group-hover:text-[#8A6715] transition-colors">
                Personalized Treatments
              </h3>
              <p className="text-sm text-[#143D27]/80 leading-relaxed font-light">
                Ayurvedic treatment plans designed according to individual needs. From classical
                Kati Basti and Shirodhara to metabolic reset and women's health therapies.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-sm font-semibold text-[#8A6715] group-hover:translate-x-1 transition-transform">
              <span>View Treatment Directory</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY VAIDYAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#2C6E49]">
            Ancient Wisdom. Personal Healing.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0C281B] font-bold">
            Why Choose VAIDHYAM
          </h2>
          <p className="text-sm text-[#143D27]/70 font-light">
            We adhere strictly to genuine Ayurvedic medical tenets with no exaggerated claims,
            prioritizing patient dignity, clinical safety, and restorative wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm hover:border-[#2C6E49]/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-5">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0C281B] mb-2">
              Personalized Care
            </h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed">
              Traditional Ayurvedic principles combined with individualized attention. We assess
              your unique constitution (Prakriti) before recommending any regimen.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm hover:border-[#2C6E49]/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0C281B] mb-2">
              Doctor-Guided
            </h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed">
              Every consultation and treatment plan is guided by a qualified Ayurvedic doctor with
              formal university degrees and extensive clinical post-delivery experience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm hover:border-[#2C6E49]/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0C281B] mb-2">
              Comfort & Convenience
            </h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed">
              Simple online consultation and appointment booking. Available as tranquil retreat stays
              at our sanctuary or in-home care delivery by certified female therapists.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm hover:border-[#2C6E49]/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0C281B] mb-2">
              Holistic Wellness
            </h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed">
              Care that considers the whole individual rather than only the symptom, integrating
              gentle herbal decoctions, restorative nutrition, and mental grounding.
            </p>
          </div>
        </div>
      </section>

      {/* DEDICATED POST-DELIVERY CARE FEATURE SECTION */}
      <section className="bg-gradient-to-b from-[#FAF8F5] via-[#E8F5E9]/30 to-[#FAF8F5] py-16 border-y border-[#143D27]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E06D53]/15 text-[#C4573E] text-xs font-bold uppercase tracking-wider">
                Flagship Maternal Healthcare
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C281B] font-bold">
                Dedicated Post-Delivery Care
              </h2>
              <p className="text-base text-[#143D27]/80 font-light leading-relaxed">
                Vaidyam provides structured Ayurvedic post-delivery support (Sutika Paricharya) for
                mothers, with personalized care based on individual needs. We avoid presenting every
                treatment as universally suitable: therapy selection depends strictly on physician
                assessment.
              </p>
            </div>

            <button
              onClick={() => onNavigate('pdc')}
              className="inline-flex items-center gap-2.5 bg-[#E06D53] hover:bg-[#C4573E] text-white font-semibold px-6 py-3.5 rounded-xl shadow transition-all self-start lg:self-auto text-sm"
            >
              <span>Explore PDC Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Essential PDC Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1 */}
            <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E06D53]/10 text-[#C4573E] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">
                Post-Delivery Body Care
              </h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed">
                Gradual uterine involution support, gentle abdominal binding (Udaraveshtana), and
                medicated herbal bath decoctions (Vethu) to relieve systemic postpartum exhaustion.
              </p>
            </div>

            {/* 2 */}
            <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">
                Abhyanga & External Therapies
              </h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed">
                Daily full-body massage using warm classical medicated oils like Kuzhambu and Dhanwantharam,
                accompanied by localized steam fomentation to soothe pelvic and spinal soreness.
              </p>
            </div>

            {/* 3 */}
            <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C29B38]/10 text-[#8A6715] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">
                Diet & Lifestyle Guidance
              </h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed">
                Specialized Mathruka Ahara meal plans. Light, easily digestible organic soups, digestive
                deepana spices, and lactation-enhancing herbal formulations.
              </p>
            </div>

            {/* 4 */}
            <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">
                Mother Wellness Support
              </h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed">
                Compassionate emotional grounding to address the hormonal fluctuations of the postpartum
                transition, calming Prana Vata and promoting restorative sleep through Shirodhara.
              </p>
            </div>

            {/* 5 */}
            <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E06D53]/10 text-[#C4573E] flex items-center justify-center font-bold">
                05
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">
                Recovery-Focused Ayurvedic Care
              </h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed">
                Progressive healing phases addressing tissue reconstruction (Dhatu Poshana), restoring bone
                calcium density, and strengthening the pelvic floor safely.
              </p>
            </div>

            {/* 6 */}
            <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0C281B]/10 text-[#0C281B] flex items-center justify-center font-bold">
                06
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">
                Personalized Doctor Supervision
              </h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed">
                Continuous clinical oversight by Dr. Ananya Warrier. Regimens are continually adjusted based on
                delivery mode (vaginal vs. caesarean section) and recovery milestones.
              </p>
            </div>
          </div>

          {/* Quick Preview of Packages */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
                PDC Packages Preview
              </h3>
              <button
                onClick={() => onNavigate('pdc')}
                className="text-xs font-semibold text-[#E06D53] hover:underline flex items-center gap-1"
              >
                <span>Compare all 5 durations</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.slice(0, 3).map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#143D27]/10 text-[#0C281B]">
                        {pkg.durationDays} Days Duration
                      </span>
                      <div className="text-right">
                        <span className="text-xs text-[#143D27]/60 block">Price</span>
                        <span className="text-xl font-bold font-serif text-[#0C281B]">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-[#0C281B]">{pkg.name}</h4>
                    <p className="text-xs text-[#143D27]/70 line-clamp-2">{pkg.description}</p>
                    <div className="pt-2 border-t border-[#143D27]/5 text-xs text-[#143D27]/80 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6E49]" />
                        <span>{pkg.sessionsCount} Daily Therapy Sessions</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6E49]" />
                        <span>{pkg.consultationsIncluded} Doctor Consultations</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onNavigate('pdc-details', { packageId: pkg.id })}
                      className="py-2.5 rounded-xl border border-[#143D27]/20 text-xs font-semibold text-[#0C281B] hover:bg-[#143D27]/5 text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onSelectPdcPackage(pkg)}
                      className="py-2.5 rounded-xl bg-[#E06D53] text-white text-xs font-semibold hover:bg-[#C4573E] text-center"
                    >
                      Book Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTOR CONSULTATION SPOTLIGHT */}
      {doctor && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <img
                    src={doctor.photoUrl || '/src/assets/images/vaidyam_doctor_consult_1791354460579.jpg'}
                    alt={doctor.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#0C281B]/90 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                    {doctor.experienceYears}+ Years Clinical Practice
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] text-xs font-bold uppercase tracking-wider">
                  Senior Ayurvedic Physician
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C281B]">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-medium text-[#2C6E49]">
                    {doctor.qualification}
                  </p>
                  <p className="text-xs text-[#143D27]/60">
                    Registration No: {doctor.registrationNumber} • Kerala Ayurvedic Council
                  </p>
                </div>

                <p className="text-sm text-[#143D27]/80 leading-relaxed font-light">
                  {doctor.bio}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#143D27]/10">
                    <span className="text-[#143D27]/60 block text-[10px]">Specialization</span>
                    <strong className="text-[#0C281B] font-semibold">{doctor.specialization}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#143D27]/10">
                    <span className="text-[#143D27]/60 block text-[10px]">Languages</span>
                    <strong className="text-[#0C281B] font-semibold">{doctor.languages.join(', ')}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#143D27]/10 col-span-2 sm:col-span-1">
                    <span className="text-[#143D27]/60 block text-[10px]">Consultation Fee</span>
                    <strong className="text-[#0C281B] font-semibold">₹{doctor.consultationFee}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation with Dr. Ananya</span>
                  </button>
                  <button
                    onClick={() => onNavigate('doctor')}
                    className="px-5 py-3 rounded-xl border border-[#143D27]/20 text-[#0C281B] text-sm font-medium hover:bg-[#143D27]/5 transition-all"
                  >
                    View Complete Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHATSAPP & SANCTUARY DIRECT HELP BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0C281B] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs uppercase tracking-widest text-[#C29B38] font-bold">
              Immediate Clinical Support
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Questions regarding Post-Delivery Care or Symptoms?
            </h3>
            <p className="text-sm text-white/80 max-w-xl font-light">
              Speak directly with our sanctuary care coordinator for package recommendations,
              home therapist availability in your locality, or appointment scheduling.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://wa.me/919447012890?text=Hello%20Vaidyam,%20I%20would%20like%20to%20enquire%20about%20Post-Delivery%20Care%20packages%20and%20consultations."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3.5 rounded-xl font-semibold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="tel:+919447012890"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3.5 rounded-xl font-semibold text-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#C29B38]" />
              <span>Call Sanctuary</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
