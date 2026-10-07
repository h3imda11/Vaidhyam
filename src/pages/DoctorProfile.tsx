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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Photograph */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAF8F5]">
              <img
                src={doctor.photoUrl || '/src/assets/images/vaidyam_doctor_consult_1791354460579.jpg'}
                alt={doctor.name}
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#0C281B]/90 backdrop-blur-md px-3 py-1 rounded-xl text-white text-xs font-semibold">
                Kerala Certified
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Senior Ayurvedic Physician & Clinical Director</span>
            </div>

            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0C281B]">
                {doctor.name}
              </h1>
              <p className="text-sm font-semibold text-[#2C6E49] mt-1.5">
                {doctor.qualification}
              </p>
              <p className="text-xs text-[#143D27]/60 mt-0.5">
                Registration: {doctor.registrationNumber} • Council of State Boards of Ayurvedic Medicine
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#143D27]/80 leading-relaxed font-light">
              {doctor.bio}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#143D27]/10 space-y-0.5">
                <span className="text-[#143D27]/60 text-[10px] uppercase font-bold">Clinical Experience</span>
                <strong className="text-[#0C281B] text-base block font-serif">
                  {doctor.experienceYears}+ Years
                </strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#143D27]/10 space-y-0.5">
                <span className="text-[#143D27]/60 text-[10px] uppercase font-bold">Languages</span>
                <strong className="text-[#0C281B] text-sm block font-medium">
                  {doctor.languages.join(', ')}
                </strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#143D27]/10 space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-[#143D27]/60 text-[10px] uppercase font-bold">Consultation Fee</span>
                <strong className="text-[#0C281B] text-base block font-serif">
                  ₹{doctor.consultationFee}
                </strong>
              </div>
            </div>

            {/* Consultation CTA */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation with Dr. Ananya</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Consultation Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
          <Award className="w-8 h-8 text-[#2C6E49]" />
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">Authentic Lineage</h3>
          <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
            Formally trained in Kerala's classical Ashtanga Hridaya tradition, Dr. Ananya integrates
            timeless Ayurvedic diagnostics without modern hyperbole or unsubstantiated claims.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
          <HeartPulse className="w-8 h-8 text-[#E06D53]" />
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">Prasava Raksha Specialist</h3>
          <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
            Having supervised post-delivery care for over 1,200 new mothers across Kerala and India,
            she understands both normal delivery and Caesarean section recovery nuances.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
          <Clock className="w-8 h-8 text-[#2C6E49]" />
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">Dedicated Attention</h3>
          <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
            Every patient consultation is allotted a dedicated 30 to 45 minutes to listen attentively,
            examine maternal markers, and co-create an achievable recovery plan.
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
            Consultations available via Video Telehealth or in-person at Vaidyam Sanctuary,
            Sasthamangalam, Thiruvananthapuram.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow transition-all flex-shrink-0"
        >
          <Calendar className="w-4 h-4" />
          <span>Book with Dr. Ananya</span>
        </button>
      </div>
    </div>
  );
};
