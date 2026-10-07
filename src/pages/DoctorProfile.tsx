import React from 'react';
import {
  Calendar,
  Award,
  BookOpen,
  Globe,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Video,
  Phone,
  Building,
  HeartPulse
} from 'lucide-react';
import { Doctor } from '../types';

interface DoctorProfileProps {
  doctor: Doctor | null;
  onOpenBooking: () => void;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({
  doctor,
  onOpenBooking,
}) => {
  if (!doctor) {
    return (
      <div className="py-24 text-center text-sm text-[#143D27]/60">
        Loading doctor profile...
      </div>
    );
  }

  const clinicalAreas = [
    {
      title: 'Maternal Postnatal Care (Sutika Paricharya)',
      desc: 'Classical postpartum recovery, uterine involution, pelvic tonification, and lactation enhancement through tailored diet and herbal rasayanas.',
    },
    {
      title: 'Classical Panchakarma & Shodhana',
      desc: 'Customized Poorva Karma, Vamana, Virechana, and Basti regimens under rigorous clinical safety standards.',
    },
    {
      title: 'Women’s Hormonal & Menstrual Health',
      desc: 'Therapeutic management of PCOS, dysmenorrhea, pelvic congestion, and perimenopausal transitions through Ashtanga Hridaya principles.',
    },
    {
      title: 'Musculoskeletal & Spinal Disorders',
      desc: 'Specialized Kati Basti, Patra Potali Sweda, and medicated tailams for lumbar disc herniation, sciatica, and cervical spondylosis.',
    },
    {
      title: 'Agni Rekindling & Gut Disorders',
      desc: 'Restoring digestive fire, addressing IBS, chronic acidity, systemic Ama accumulation, and metabolic sluggishness.',
    },
    {
      title: 'Stress, Insomnia & Prana Vata Balance',
      desc: 'Classical Shirodhara, Takradhara, and meditation lifestyle protocols to calm heightened nervous states and restore sleep architecture.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 pb-24 text-left">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl border border-[#143D27]/10 shadow-sm overflow-hidden p-8 sm:p-12">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Ayurvedic Clinical Care & Medical Direction</span>
          </div>

          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0C281B]">
              Ayurvedic Medical Panel
            </h1>
            <p className="text-sm font-semibold text-[#2C6E49] mt-1.5">
              Qualified BAMS / MD (Ayurveda) Physicians
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#143D27]/80 leading-relaxed font-light">
            Our clinical team comprises university-qualified Ayurvedic doctors with specialized training
            in classical postpartum care (Sutika Paricharya), Panchakarma therapy, and maternal health.
            Detailed individual physician profiles and verified registrations are currently being updated
            and will be published shortly.
          </p>

          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#143D27]/10 text-xs text-[#0C281B] space-y-1">
            <strong>Online & In-Clinic Consultations Available:</strong>
            <p className="text-[#143D27]/70">
              You can schedule an individualized evaluation with our attending Ayurvedic doctor for pulse evaluation insights, health assessment, and customized diet/treatment planning.
            </p>
          </div>

          {/* Consultation CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Doctor Consultation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clinical Consultation Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
          <Award className="w-8 h-8 text-[#2C6E49]" />
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">Authentic Lineage</h3>
          <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
            Formally trained in classical Ashtanga Hridaya tradition, integrating timeless Ayurvedic
            diagnostics without modern hyperbole or unsubstantiated claims.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
          <HeartPulse className="w-8 h-8 text-[#E06D53]" />
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">Prasava Raksha Protocol</h3>
          <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
            Specialized post-delivery care frameworks accommodating both normal delivery and Caesarean
            section recovery trajectories with tailored therapy sequencing.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
          <Clock className="w-8 h-8 text-[#2C6E49]" />
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">Dedicated Attention</h3>
          <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
            Every patient consultation is allotted dedicated time to listen attentively, examine maternal
            markers, and co-create an achievable recovery plan.
          </p>
        </div>
      </div>

      {/* Areas of Clinical Practice */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C6E49]">
            Clinical Scope
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0C281B]">
            Areas of Consultation & Focus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicalAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-2.5"
            >
              <div className="w-2 h-2 rounded-full bg-[#E06D53]" />
              <h3 className="font-serif text-lg font-bold text-[#0C281B]">{area.title}</h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Availability info */}
      <div className="p-8 rounded-3xl bg-[#0C281B] text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C29B38] font-bold">
            Doctor Availability
          </span>
          <h3 className="font-serif text-2xl font-bold">
            Monday through Saturday • 9:00 AM to 5:00 PM IST
          </h3>
          <p className="text-xs text-white/70 max-w-lg font-light">
            Consultations available via Online Video Telehealth, Audio Call, or Clinic appointments.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow transition-all flex-shrink-0"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Consultation</span>
        </button>
      </div>
    </div>
  );
};
