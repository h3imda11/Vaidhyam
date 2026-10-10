import React from 'react';
import {
  Calendar,
  Video,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Sparkles,
  Heart,
  Baby,
  Activity,
  Smile
} from 'lucide-react';
import { Doctor } from '../types';

interface ConsultationsProps {
  doctor: Doctor | null;
  onOpenBooking: (category?: string) => void;
  onNavigateDoctor: () => void;
}

export const Consultations: React.FC<ConsultationsProps> = ({
  doctor,
  onOpenBooking,
  onNavigateDoctor,
}) => {
  const consultationCategories = [
    {
      id: 'general-health',
      name: 'General Health & Wellness',
      desc: 'Digestive fire (Agni) restoration, chronic fatigue, acidity, metabolic rejuvenation, and seasonal detoxification.',
      icon: Activity,
    },
    {
      id: 'womens-health',
      name: 'Women’s Health',
      desc: 'Menstrual rhythm, PCOS, hormonal fluctuations, pelvic discomfort, and perimenopausal support.',
      icon: Heart,
    },
    {
      id: 'mens-health',
      name: 'Men’s Health',
      desc: 'Vitality, stress management, reproductive stamina (Shukra Dhatu), and metabolic lifestyle guidance.',
      icon: UserCheck,
    },
    {
      id: 'fertility-preconception',
      name: 'Fertility & Preconception',
      desc: 'Couples alignment, cellular preparation, reproductive tissue nourishment, and mindful conception planning.',
      icon: Sparkles,
    },
    {
      id: 'pregnancy-guidance',
      name: 'Pregnancy-Related Guidance',
      desc: 'Trimester-specific comfort, morning sickness relief, mindful breathing, and labor preparation.',
      icon: Smile,
    },
    {
      id: 'postnatal-care',
      name: 'Postnatal & Mother–Baby Care',
      desc: 'Sutika Paricharya mother recovery, lactation support, pelvic restoration, and gentle infant wellness.',
      icon: Baby,
    },
    {
      id: 'lifestyle-wellness',
      name: 'Lifestyle & Preventive Wellness',
      desc: 'Dinacharya daily routines, sleep architecture, stress relief, and personalized Ayurvedic dietary planning.',
      icon: Clock,
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
                <UserCheck className="w-3.5 h-3.5 text-[#F17C70]" />
                <span>Doctor-Led Healthcare</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#245B45] tracking-tight leading-tight">
                Personalised Ayurvedic Consultation
              </h1>

              <p className="text-lg sm:text-xl text-[#69766E] font-light leading-relaxed">
                Discuss your health concerns with a qualified Ayurvedic practitioner and receive guidance based on your individual needs.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="bg-[#F17C70] hover:bg-[#e0695d] text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow flex items-center gap-2 group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={onNavigateDoctor}
                  className="bg-white hover:bg-[#E8F0E8]/40 text-[#245B45] border border-[#E4EAE4] px-6 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2"
                >
                  <span>Meet Practitioner</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4EAE4] text-xs text-[#69766E] flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#34765A] flex-shrink-0" />
                <span>Available via Video, Voice callback, and In-person clinical sanctuary appointments.</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E4EAE4] shadow-md bg-white">
                <img
                  src={doctor?.photoUrl || '/src/assets/images/vaidyam_doctor_consult_1791354460579.jpg'}
                  alt="Doctor consultation"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="p-5 bg-white/95 backdrop-blur-xs border-t border-[#E4EAE4] space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#245B45]">
                    Physician-Guided Care
                  </h3>
                  <p className="text-xs text-[#69766E]">
                    BAMS, MD (Ayu) · Direct one-on-one evaluations with tailored lifestyle prescriptions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 CONSULTATION CATEGORIES */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Clinical Disciplines
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Consultation Categories
          </h2>
          <p className="text-[#69766E] text-sm sm:text-base max-w-2xl font-light">
            Select a specialized focus area for your clinical assessment:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultationCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E4EAE4] hover:border-[#34765A]/40 transition-all duration-300 shadow-xs hover:shadow-md space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F0E8] text-[#245B45] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#34765A]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#245B45]">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#69766E] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4EAE4] flex items-center justify-between">
                  <button
                    onClick={() => onOpenBooking(cat.name)}
                    className="text-xs font-semibold text-[#245B45] hover:text-[#34765A] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Select Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-[#69766E]">
                    ₹850
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* THREE MODES */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Accessible Care
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Consultation Formats
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-white border border-[#E4EAE4] space-y-3">
            <Video className="w-6 h-6 text-[#34765A]" />
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Online Video Consultation
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Encrypted, high-definition tele-consultation allowing visual examination of tongue, skin, and posture from home.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-[#E4EAE4] space-y-3">
            <Phone className="w-6 h-6 text-[#34765A]" />
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Direct Audio Callback
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Senior doctor calls your registered telephone number at the reserved time for convenient consultation.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-[#E4EAE4] space-y-3">
            <Building className="w-6 h-6 text-[#34765A]" />
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              In-Clinic Sanctuary Visit
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Personal pulse evaluation (Nadi Pariksha) and physical assessment at our clinical sanctuary.
            </p>
          </div>
        </div>
      </section>

      {/* Practitioner Preview Card */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-3xl border border-[#E4EAE4] shadow-xs text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#E8F0E8] text-[#245B45] font-serif font-bold text-3xl flex items-center justify-center mx-auto">
            V
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#245B45]">
              Consult with Our Ayurvedic Physician
            </h3>
            <p className="text-xs text-[#69766E]">
              BAMS, MD (Ayu) · 12+ Years Clinical Experience · Specialization in Sutika Paricharya
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 bg-[#F17C70] hover:bg-[#e0695d] text-white px-7 py-3 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Launch Booking Flow</span>
          </button>
        </div>
      </section>
    </div>
  );
};
