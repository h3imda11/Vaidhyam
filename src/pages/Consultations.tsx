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
  FileText
} from 'lucide-react';
import { Doctor } from '../types';

interface ConsultationsProps {
  doctor: Doctor | null;
  onOpenBooking: () => void;
  onNavigateDoctor: () => void;
}

export const Consultations: React.FC<ConsultationsProps> = ({
  doctor,
  onOpenBooking,
  onNavigateDoctor,
}) => {
  return (
    <div className="space-y-20 sm:space-y-28 pb-24 text-left">
      {/* Hero */}
      <section className="pt-6 sm:pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] text-xs font-bold uppercase tracking-wider">
              <UserCheck className="w-4 h-4" />
              <span>Doctor-Led Clinical Consultations</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0C281B] font-bold leading-tight">
              Personalized Ayurvedic Clinical Consultations
            </h1>

            <p className="text-base sm:text-lg text-[#143D27]/80 leading-relaxed font-light max-w-2xl">
              Connect with our senior Ayurvedic physician for in-depth health evaluations. Whether you
              are seeking postpartum recovery protocols, digestive restoration, or hormonal balance,
              our clinical sessions combine traditional diagnostic insight with modern lifestyle guidance.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-7 py-4 rounded-2xl font-semibold shadow-md transition-all text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Doctor Appointment</span>
              </button>

              <button
                onClick={onNavigateDoctor}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F4EFE6] text-[#0C281B] px-6 py-4 rounded-2xl border border-[#143D27]/20 font-semibold shadow-sm transition-all text-sm"
              >
                <span>View Physician Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={doctor?.photoUrl || '/src/assets/images/vaidyam_doctor_consult_1791354460579.jpg'}
                alt="Ayurvedic Doctor Consultation"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* THREE MODES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C6E49]">
            Flexible Healthcare Access
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C281B]">
            Three Ways to Consult
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0C281B]">Online Video Call</h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
              High-definition tele-consultation allowing visual examination of tongue, skin, and
              maternal posture from the comfort of your home anywhere in India or internationally.
            </p>
            <div className="pt-2 text-xs text-[#2C6E49] font-semibold">
              30 Mins • Digital Prescription Provided
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0C281B]">Audio Consultation</h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
              Direct telephone conversation with Dr. Ananya Warrier for preliminary symptoms review,
              ongoing treatment follow-ups, or quick medication clarification.
            </p>
            <div className="pt-2 text-xs text-[#2C6E49] font-semibold">
              30 Mins • Direct Doctor Callback
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E06D53]/10 text-[#C4573E] flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0C281B]">In-Clinic Sanctuary</h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
              In-person consultation at our peaceful sanctuary in Sasthamangalam, Thiruvananthapuram.
              Includes classical pulse diagnosis (Nadi Pariksha) and spine examination.
            </p>
            <div className="pt-2 text-xs text-[#C4573E] font-semibold">
              45 Mins • Physical Nadi Pariksha
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT DURING CONSULTATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0C281B] text-white space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C29B38] font-bold">
              Clinical Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              What to Expect in Your Session
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="text-xl font-serif font-bold text-[#E06D53]">01</span>
              <h4 className="font-serif text-lg font-bold">Prakriti & Dosha Review</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Evaluating your baseline physical constitution and identifying current Vata, Pitta, or
                Kapha imbalances.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xl font-serif font-bold text-[#E06D53]">02</span>
              <h4 className="font-serif text-lg font-bold">Maternal / Health History</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Reviewing delivery notes, sleep cycles, digestion, lactation indicators, and any existing
                allopathic medications.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xl font-serif font-bold text-[#E06D53]">03</span>
              <h4 className="font-serif text-lg font-bold">Therapy Recommendation</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Determining which external therapies (Abhyanga, Kashaya Dhara, Nadi Sweda) are clinically
                appropriate for you.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xl font-serif font-bold text-[#E06D53]">04</span>
              <h4 className="font-serif text-lg font-bold">Digital Diet & Prescription</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Receiving a structured digital prescription with genuine herbal formulations and daily
                dietary advice.
              </p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-8 py-4 rounded-xl font-semibold text-sm shadow-md transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Consultation Slot Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
