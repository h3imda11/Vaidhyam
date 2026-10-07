import React, { useEffect, useState } from 'react';
import {
  HeartPulse,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Info,
  HelpCircle,
  Users,
  Baby
} from 'lucide-react';
import { getPdcPackages } from '../services/dbService';
import { PdcPackage } from '../types';

interface PostDeliveryCareProps {
  onNavigate: (tab: string, params?: any) => void;
  onSelectPdcPackage: (pkg: PdcPackage) => void;
  onOpenBooking: () => void;
}

export const PostDeliveryCare: React.FC<PostDeliveryCareProps> = ({
  onNavigate,
  onSelectPdcPackage,
  onOpenBooking,
}) => {
  const [packages, setPackages] = useState<PdcPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    async function load() {
      try {
        const pkgs = await getPdcPackages();
        setPackages(pkgs);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const pdcFaqs = [
    {
      q: 'When should I start the Ayurvedic Post-Delivery Care (Prasava Raksha) regimen?',
      a: 'For a normal vaginal delivery, external therapies like gentle Abhyanga typically commence after Day 7 once acute postpartum bleeding stabilizes. Following a Caesarean delivery (C-Section), therapies generally start between Day 14 and Day 21 once the surgical scar has healed, subject to our doctor\'s clinical assessment.',
    },
    {
      q: 'Is the care available as home visits or at the Vaidyam sanctuary retreat?',
      a: 'We offer both options. In Kerala (Thiruvananthapuram, Kochi, and select regions), our certified female Ayurvedic therapists can visit your home daily. Alternatively, mothers and families may stay in our tranquil residential postpartum retreat sanctuary suites.',
    },
    {
      q: 'Are the herbal oils and bath preparations safe for breastfeeding mothers?',
      a: 'Yes. Classical Kerala formulations such as Dhanwantharam Kuzhambu, Bala Ashwagandhadhi, and herbal Kashayams have been utilized safely for centuries. All internal rasayanas and external tailams are prescribed strictly according to your pulse and maternal state by Dr. Ananya.',
    },
    {
      q: 'Does the package include gentle massage for the newborn baby?',
      a: 'Yes. Packages from 14 days onwards include traditional gentle newborn infant oil massage (using pure Laksha or virgin coconut oil) and warm medicated water baby baths administered with delicate care.',
    },
    {
      q: 'Can the duration or treatment plan be modified during the course?',
      a: 'Absolutely. Every mother recovers differently. Your progress is assessed through scheduled consultations with Dr. Ananya Warrier, and therapies are adjusted dynamically to match your recovery trajectory.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E06D53]/15 text-[#C4573E] text-xs font-bold uppercase tracking-wider">
                <HeartPulse className="w-4 h-4" />
                <span>Sutika Paricharya • Authentic Kerala Postnatal Healing</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0C281B] font-bold tracking-tight leading-[1.14]">
                Dedicated Ayurvedic Post-Delivery Care
              </h1>

              <p className="text-lg text-[#143D27]/80 leading-relaxed font-light max-w-2xl">
                In classical Ayurveda, childbirth is considered a complete rebirth for the mother.
                Our structured Sutika Paricharya regimens nourish vital tissues, restore maternal
                stamina, balance Vata dosha, and support gentle bonding with your newborn.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-7 py-4 rounded-2xl font-semibold shadow-md transition-all text-sm"
                >
                  <span>View All 5 Care Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#F4EFE6] text-[#0C281B] px-6 py-4 rounded-2xl border border-[#143D27]/20 font-semibold shadow-sm transition-all text-sm"
                >
                  <Calendar className="w-4 h-4 text-[#2C6E49]" />
                  <span>Book PDC Doctor Consultation</span>
                </button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-[#143D27]/70">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2C6E49]" />
                  Tailored to Delivery Mode
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#2C6E49]" />
                  Experienced Female Therapists
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/src/assets/images/vaidyam_pdc_hero_1791354444058.jpg"
                  alt="Ayurvedic Post-Delivery Care at Vaidyam"
                  className="w-full h-[440px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#143D27]/10 flex items-center gap-3">
                <Baby className="w-8 h-8 text-[#E06D53]" />
                <div>
                  <div className="text-xs font-bold text-[#0C281B]">Mother & Newborn Harmony</div>
                  <div className="text-[11px] text-[#143D27]/60">Gentle classical oils & medicated baths</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY POST-DELIVERY CARE MATTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2C6E49]">
              Classical Ayurvedic Foundations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C281B]">
              Why Sutika Paricharya is Essential
            </h2>
            <p className="text-sm text-[#143D27]/80 leading-relaxed font-light">
              Following delivery, the physical body undergoes immense physiological exertion: the
              emptying of the uterus causes an immediate aggravation of Vata dosha, digestive fire (Agni)
              becomes delicate, and maternal tissues (Dhatus) require deep nourishment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#143D27]/10">
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">1. Rekindles Maternal Agni</h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed">
                Specialized herbal waters (Jeeraka & Dry Ginger decoctions) stimulate digestion without
                overheating, enabling full assimilation of nutrients into healthy breast milk.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">2. Uterine Involution & Pelvic Strength</h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed">
                Traditional Kashaya Dhara and external abdominal compression wraps prevent muscular laxity
                and accelerate natural physiological contraction of the uterus.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">3. Relieves Spinal & Joint Soreness</h3>
              <p className="text-xs text-[#143D27]/80 leading-relaxed">
                Warm classical tailams penetrate deep muscle fibers to alleviate lumbar tension from labor
                and repeated nursing postures, preventing long-term back ailments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO MAY BENEFIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E06D53]">
              Targeted Suitability
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C281B]">
              Who May Benefit from PDC
            </h2>
            <p className="text-sm text-[#143D27]/80 leading-relaxed font-light">
              Our care protocols are never one-size-fits-all. Every mother receives an individualized
              examination by our Ayurvedic physician before any therapy begins.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'First-Time Mothers',
                desc: 'Mothers seeking dedicated postpartum guidance, hands-on infant handling care, and structured dietary protocols.',
              },
              {
                title: 'Mothers after Normal Delivery',
                desc: 'Commencing from Day 7 for gentle muscular toning, pelvic rehabilitation, and deep fatigue relief.',
              },
              {
                title: 'Mothers after C-Section (LSCS)',
                desc: 'Carefully staged gentle therapies starting from Day 14-21 after incisional scar healing to support spine and abdominal recovery.',
              },
              {
                title: 'Mothers Experiencing Exhaustion',
                desc: 'Support for sleep deprivation, lactation challenges, hormonal mood fluctuations, and lower back soreness.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#143D27]/10 shadow-sm space-y-1.5"
              >
                <div className="w-2 h-2 rounded-full bg-[#2C6E49] mb-2" />
                <h4 className="font-serif text-lg font-bold text-[#0C281B]">{item.title}</h4>
                <p className="text-xs text-[#143D27]/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT THE PROGRAM INCLUDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C6E49]">
            Clinical Core Components
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C281B]">
            What the PDC Program Includes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0C281B]">Classical Abhyanga</h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed">
              Tailored herbal tailams (Dhanwantharam, Kuzhambu, Bala) applied in rhythmic strokes to soothe
              overstretched nerves and promote lymphatic drainage.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0C281B]">Medicated Herbal Baths (Snana)</h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed">
              Water infused with fresh Nalpamara barks, Tamarind leaves, and wild medicinal herbs to tone
              the skin and disinfect delicate pelvic tissues.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0C281B]">Abdominal Wrapping (Vethu)</h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed">
              Cotton binder therapy following specialized oil application to encourage uterine contraction,
              prevent gas accumulation, and support posture.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0C281B]">Dietary & Herbal Protocol</h3>
            <p className="text-xs text-[#143D27]/80 leading-relaxed">
              Classical Sowbhagya Shunti, Dasamoolarishtam, and Mathruka dietary recipes crafted specifically
              to promote rich breast milk and maternal vitality.
            </p>
          </div>
        </div>
      </section>

      {/* AVAILABLE PACKAGES (DATABASE DRIVEN - EDITABLE BY ADMIN) */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E06D53]/15 text-[#C4573E] text-xs font-bold uppercase tracking-wider">
            Configurable Care Durations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C281B]">
            Available Post-Delivery Care Packages
          </h2>
          <p className="text-xs sm:text-sm text-[#143D27]/70 font-light">
            Prices and program contents are live from our clinic database. Select the duration that
            suits your postpartum needs, or consult our doctor for a recommendation.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-[#143D27]/60 text-sm">
            Loading live package pricing from database...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={pkg.id}
                className={`p-7 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-xl ${
                  pkg.durationDays === 21
                    ? 'border-[#E06D53] ring-2 ring-[#E06D53]/20'
                    : 'border-[#143D27]/10'
                }`}
              >
                {pkg.durationDays === 21 && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E06D53] text-white text-[11px] font-bold uppercase tracking-wider shadow">
                    Most Recommended Duration
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#143D27]/10 text-[#0C281B]">
                        {pkg.durationDays} Days Duration
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#0C281B] mt-2">
                        {pkg.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#143D27]/60 block font-medium">Program Fee</span>
                      <span className="font-serif text-2xl font-bold text-[#0C281B]">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
                    {pkg.description}
                  </p>

                  <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#143D27]/5 space-y-1.5 text-xs text-[#0C281B]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#143D27]/70">Therapy Sessions:</span>
                      <strong>{pkg.sessionsCount} Sessions</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#143D27]/70">Doctor Consultations:</span>
                      <strong>{pkg.consultationsIncluded} Included</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#143D27]/70">Mother & Baby:</span>
                      <strong>{pkg.motherAndBabyOption ? 'Mother + Baby' : 'Mother Care'}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#143D27]/70">Setting:</span>
                      <strong>{pkg.accommodation}</strong>
                    </div>
                  </div>

                  {/* Inclusions preview */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-[#143D27] uppercase tracking-wider block">
                      Program Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#143D27]/80">
                      {pkg.inclusions.slice(0, 4).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6E49] flex-shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 grid grid-cols-2 gap-2 mt-4 border-t border-[#143D27]/10">
                  <button
                    onClick={() => onNavigate('pdc-details', { packageId: pkg.id })}
                    className="py-3 rounded-xl border border-[#143D27]/20 text-xs font-semibold text-[#0C281B] hover:bg-[#143D27]/5 text-center transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onSelectPdcPackage(pkg)}
                    className="py-3 rounded-xl bg-[#E06D53] hover:bg-[#C4573E] text-white text-xs font-semibold text-center transition-colors shadow-sm"
                  >
                    Book This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0C281B] text-white space-y-10">
          <div className="max-w-2xl space-y-2 text-left">
            <span className="text-xs uppercase tracking-widest text-[#C29B38] font-bold">
              Structured Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              How the Vaidyam PDC Program Works
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light">
              From your initial prenatal assessment to your final day of rejuvenation, every step is
              carefully supervised by Dr. Ananya Warrier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xl font-serif font-bold text-[#E06D53]">01</span>
              <h3 className="font-serif text-lg font-bold">Pre-Assessment</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Connect before or shortly after delivery. Dr. Ananya reviews your health history, delivery mode,
                and constitution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xl font-serif font-bold text-[#E06D53]">02</span>
              <h3 className="font-serif text-lg font-bold">Personalized Protocol</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Customized formulation selection of classical medicated tailams, herbal decoctions, and
                mother’s dietary meal timing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xl font-serif font-bold text-[#E06D53]">03</span>
              <h3 className="font-serif text-lg font-bold">Therapy & Daily Care</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Daily sessions of classical Abhyanga, herbal steam, medicated baths, and baby massage by trained
                female therapists.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xl font-serif font-bold text-[#E06D53]">04</span>
              <h3 className="font-serif text-lg font-bold">Postnatal Follow-Up</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Long-term pelvic floor guidance, lactation maintenance, and rasayana herbal tonics to sustain
                vitality for motherhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C6E49]">
            Questions & Answers
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0C281B]">
            PDC Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 pt-4">
          {pdcFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#143D27]/10 bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-[#0C281B]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2C6E49] transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#143D27]/80 leading-relaxed border-t border-[#143D27]/5 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM BOOK CONSULTATION CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="p-8 rounded-3xl bg-[#FAF8F5] border-2 border-dashed border-[#143D27]/20 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
            Ready to Plan Your Postnatal Journey?
          </h3>
          <p className="text-xs sm:text-sm text-[#143D27]/80 max-w-lg mx-auto font-light">
            You can book an initial consultation with Dr. Ananya Warrier to review your pregnancy
            milestones and determine the ideal package duration for your family.
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book PDC Consultation with Dr. Ananya</span>
          </button>
        </div>
      </section>
    </div>
  );
};
