import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Calendar,
  CheckCircle2,
  Video,
  Phone,
  Building,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface AboutVaidyamProps {
  onOpenBooking: () => void;
  onExplorePdc?: () => void;
}

export const AboutVaidyam: React.FC<AboutVaidyamProps> = ({
  onOpenBooking,
}) => {
  return (
    <div className="bg-[#FFFCF7] text-[#25352E] min-h-screen text-left">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EDF2ED]/70 via-[#FFFCF7] to-[#FFFCF7] pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E4EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF2ED] text-[#245B45] text-xs font-semibold tracking-wider uppercase border border-[#245B45]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#E85342]" />
              <span>Vaidhyam Healthcare Practice</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#245B45] tracking-tight leading-tight">
              Rooted in Ayurveda. Focused on You.
            </h1>

            <p className="text-lg sm:text-xl text-[#69766E] font-light leading-relaxed">
              At Vaidhyam, our mission is to deliver professional, compassionate Ayurvedic healthcare tailored to modern living. Guided by classical principles and evidence-informed clinical assessment, we provide the care you deserve across every chapter of life.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-[#245B45] hover:bg-[#1b4634] text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow flex items-center gap-2 group"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Introduction & Philosophy */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
              Healthcare That Begins with Understanding
            </h2>
            <p className="text-[#69766E] text-sm leading-relaxed">
              Ayurveda teaches that every individual possesses a distinct physiological constitution (Prakriti). Health is not a one-size-fits-all formula, but a delicate equilibrium between your internal biology, your environment, diet, and emotional state.
            </p>
            <p className="text-[#69766E] text-sm leading-relaxed">
              We reject exaggerated commercial promises. Instead, we offer thoughtful clinical listening, verified natural therapeutics, and practical lifestyle adjustments that support your long-term vitality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-white border border-[#E4EAE4] space-y-1">
                <h4 className="text-xs font-bold text-[#245B45] uppercase tracking-wider">
                  Individual Clinical Suitability
                </h4>
                <p className="text-xs text-[#69766E]">
                  Every therapeutic recommendation is based on direct evaluation by our licensed physician.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E4EAE4] space-y-1">
                <h4 className="text-xs font-bold text-[#245B45] uppercase tracking-wider">
                  Empathetic Family Care
                </h4>
                <p className="text-xs text-[#69766E]">
                  Specialized care pathways for couples, expectant mothers, and postpartum recovery.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#EDF2ED]/50 p-6 sm:p-8 rounded-3xl border border-[#E4EAE4] space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#245B45]">
              Core Principles
            </h3>
            <ul className="space-y-3 text-xs text-[#69766E]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <span><strong>No False Promises:</strong> We provide authentic, realistic guidance and collaborate respectfully with modern medicine.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <span><strong>Holistic Nutrition (Ahara):</strong> Wholesome, seasonal food recommendations tailored to your metabolic digestion (Agni).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <span><strong>Gentle Therapies:</strong> Pure herbal oils, classical steam, and restorative rasayanas formulated with uncompromised quality.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Practitioner Profile & Credentials */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-[#E4EAE4] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 text-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#EDF2ED] border-2 border-[#34765A]/20 flex items-center justify-center text-[#245B45] font-serif font-bold text-4xl sm:text-5xl mx-auto">
                V
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
                  Ayurvedic Healthcare Practitioner
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#245B45]">
                  Ayurvedic Physician
                </h3>
                <p className="text-xs font-semibold text-[#34765A]">
                  BAMS, MD (Ayu) · Specialization in Post-Delivery Care (Sutika Paricharya) & Classical Panchakarma
                </p>
              </div>

              <p className="text-xs text-[#69766E] leading-relaxed">
                Our qualified Ayurvedic practitioner holds verified university degrees in Ayurvedic Medicine and Surgery (BAMS) and Postgraduate specialization (MD Ayu). Consultations focus on clinical evaluation, pulse assessment, and personalized health guidance.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#245B45] hover:bg-[#1b4634] text-white px-6 py-2.5 rounded-xl text-xs font-medium transition-colors"
                >
                  Book Consultation with Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Formats */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
            Accessible Healthcare
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Available Consultation Formats
          </h2>
          <p className="text-[#69766E] text-xs sm:text-sm">
            Choose the consultation mode that best fits your schedule and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-3">
            <Video className="w-6 h-6 text-[#34765A]" />
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Online Video Consultation
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Secure, high-definition tele-consultation accessible directly from your phone or computer. Perfect for follow-ups and out-of-station patients.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-3">
            <Phone className="w-6 h-6 text-[#34765A]" />
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Audio Consultation
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Direct telephone callback at your reserved time. Ideal when video connectivity is limited or for quick dietary discussions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-3">
            <Building className="w-6 h-6 text-[#34765A]" />
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              In-Clinic Sanctuary Visit
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              In-person consultation featuring traditional pulse evaluation (Nadi Pariksha) and comprehensive physical examination.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-[#E85342] hover:bg-[#CF3E30] text-white px-8 py-3.5 rounded-xl text-sm font-medium transition-colors shadow-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Your Appointment</span>
          </button>
        </div>
      </section>
    </div>
  );
};
