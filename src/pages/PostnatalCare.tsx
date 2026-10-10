import React, { useState } from 'react';
import {
  Heart,
  Baby,
  Home,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  MapPin,
  Send,
  Phone,
  Mail,
  MessageCircle,
  AlertTriangle,
  Clock,
  Activity
} from 'lucide-react';
import { submitEnquiry } from '../services/dbService';

interface PostnatalCareProps {
  onOpenBooking: () => void;
  onSelectPdcPackage?: (pkgId: string) => void;
}

export const PostnatalCare: React.FC<PostnatalCareProps> = ({
  onOpenBooking,
  onSelectPdcPackage,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Home-based enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: 'Ernakulam',
    locality: '',
    deliveryDate: '',
    supportType: 'Full Postnatal Care (Mother & Baby)',
    contactMethod: 'Phone Call',
    additionalNotes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const keralaDistricts = [
    'Alappuzha',
    'Ernakulam',
    'Idukki',
    'Kannur',
    'Kasaragod',
    'Kollam',
    'Kottayam',
    'Kozhikode',
    'Malappuram',
    'Palakkad',
    'Pathanamthitta',
    'Thiruvananthapuram',
    'Thrissur',
    'Wayanad',
  ];

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.locality.trim()) {
      setErrorMsg('Please complete all required fields (Name, Phone number, and Locality/PIN code).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: `${formData.district.toLowerCase()}@enquiry.local`,
        subject: `Postnatal Home Care Enquiry - ${formData.district}`,
        message: `District: ${formData.district} | Locality: ${formData.locality} | Delivery Date: ${formData.deliveryDate || 'Not specified'} | Support: ${formData.supportType} | Preferred Contact: ${formData.contactMethod}. Notes: ${formData.additionalNotes || 'None'}`,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg('Unable to submit enquiry at this moment. Please call our clinic directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'When should postpartum care (Sutika Paricharya) begin?',
      a: 'Following a normal vaginal delivery, gentle external care and warm kashayam baths traditionally begin between day 7 and day 10, once initial healing has taken place. Following a caesarean birth, external abdominal massage is deferred until the surgical incision is fully cleared by your obstetrician (usually 3 to 4 weeks). Gentle dietary guidance begins immediately after hospital discharge.',
    },
    {
      q: 'Is home-based postpartum care available in all districts of Kerala?',
      a: 'We offer home-based visits through trained and vetted Ayurvedic care providers in select urban and suburban clusters across Kerala. Because availability depends on location and timing, submitting the enquiry form allows us to check caregiver allocation in your specific area.',
    },
    {
      q: 'How does baby massage differ from adult massage?',
      a: 'Infant massage uses gentle, rhythmic effleurage without deep pressure, utilizing hypoallergenic pure herbal oils (such as Lakshadi or virgin coconut oil) warmed to skin temperature. It supports skin barrier hydration, relaxation, and peaceful sleep rhythms.',
    },
    {
      q: 'What should we do if the baby shows signs of illness?',
      a: 'Ayurvedic postnatal guidance is strictly for wellness and routine care. If your newborn exhibits high fever (>38°C / 100.4°F), rapid or distressed breathing, feeding refusal, persistent vomiting, or signs of jaundice, you must contact your paediatrician or visit a hospital emergency department immediately.',
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
                <Baby className="w-3.5 h-3.5 text-[#F17C70]" />
                <span>Postpartum Recovery & Infant Wellbeing</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#245B45] tracking-tight leading-tight">
                Compassionate Care for Mother and Baby
              </h1>

              <p className="text-lg sm:text-xl text-[#69766E] font-light leading-relaxed">
                Support for postpartum recovery, newborn wellbeing and the transition into parenthood. Combining classical Ayurvedic Sutika Paricharya with safe modern hygiene and compassionate home assistance.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#home-care-form"
                  className="bg-[#F17C70] hover:bg-[#e0695d] text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Enquire Home-Based Care</span>
                </a>

                <button
                  onClick={onOpenBooking}
                  className="bg-white hover:bg-[#E8F0E8]/40 text-[#245B45] border border-[#E4EAE4] px-6 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#34765A]" />
                  <span>Book Doctor Consultation</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4EAE4] text-xs text-[#69766E] flex items-start gap-3 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Traditional Sutika Care:</strong> Formulated to replenish vitality (Vata balancing), encourage healthy lactation, and support gentle pelvic restoration under qualified clinical supervision.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E4EAE4] shadow-md bg-white">
                <img
                  src="/src/assets/images/mother_baby_calm_wellness_1791616771219.jpg"
                  alt="Mother holding infant lovingly in natural room"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="p-5 bg-white/95 backdrop-blur-xs border-t border-[#E4EAE4] space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#245B45]">
                    Dedicated Care for Mother & Infant
                  </h3>
                  <p className="text-xs text-[#69766E]">
                    Thoughtful traditional practices that respect the sacred recovery window following childbirth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: SUTIKA PARICHARYA */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
              Section 1 · Traditional Practice
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
              Sutika Paricharya — Postpartum Mother Care
            </h2>
            <p className="text-[#69766E] text-sm leading-relaxed">
              Explore traditional postpartum care practices and personalised guidance for recovery. In classical Ayurveda, the 40 to 45 days after delivery represent a delicate transformation when maternal tissues require deep nourishment, Vata pacification, and restorative rest.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E4EAE4] space-y-1">
                <h4 className="text-xs font-bold text-[#245B45] uppercase tracking-wider">
                  Medicated Herbal Abhyanga & Snana
                </h4>
                <p className="text-xs text-[#69766E]">
                  Full-body warm oil massage with Dhanwantharam Thailam followed by soothing herbal leaf water baths (Vethu Vellam) to ease soreness and fatigue.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E4EAE4] space-y-1">
                <h4 className="text-xs font-bold text-[#245B45] uppercase tracking-wider">
                  Udaraveshtana (Abdominal Wrapping)
                </h4>
                <p className="text-xs text-[#69766E]">
                  Gentle cloth binding techniques to support back posture, provide pelvic comfort, and assist abdominal muscles safely.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E4EAE4] space-y-1">
                <h4 className="text-xs font-bold text-[#245B45] uppercase tracking-wider">
                  Nutritious Postpartum Formulations
                </h4>
                <p className="text-xs text-[#69766E]">
                  Physician guidance on restorative Lehyams (Sowbhagya Shunti) and digestive Kashayams that support gentle digestion and healthy lactation.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#245B45] hover:bg-[#1b4634] text-white px-6 py-3 rounded-xl text-xs font-medium transition-colors"
            >
              <span>Consult on Sutika Recovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-6 bg-[#E8F0E8]/40 p-6 sm:p-8 rounded-3xl border border-[#E4EAE4] space-y-5">
            <h3 className="font-serif text-2xl font-bold text-[#245B45]">
              Core Pillars of Postpartum Healing
            </h3>
            <ul className="space-y-3 text-xs text-[#69766E]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#25352E]">Vata Pacification:</strong> Warmth, unctuous oils, and quiet rest to stabilize the nervous system after labor.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#25352E]">Agni Kindle:</strong> Gentle cumin, dry ginger, and garlic broths to rekindle digestive fire smoothly.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#25352E]">Stanya Vardhana:</strong> Shatavari and fenugreek infusions supporting lactation and breast comfort.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#25352E]">Emotional Support:</strong> Empathetic reassurance and mindfulness during early mothering.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOME-BASED POSTNATAL CARE ACROSS KERALA & ENQUIRY FORM */}
      <section id="home-care-form" className="py-16 sm:py-24 bg-[#FFF0ED]/40 border-b border-[#E4EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
                Section 2 · Service Availability
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
                Home-Based Postnatal Care Across Kerala
              </h2>
              <p className="text-[#69766E] text-sm leading-relaxed">
                Enquire about available home-based support for mothers during the postpartum period. We connect families with trained, background-checked Ayurvedic therapists who visit your residence for daily abhyanga, herbal baths, and mother care.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#E4EAE4] space-y-2 text-xs text-[#69766E]">
                <div className="flex items-center gap-2 font-semibold text-[#245B45]">
                  <MapPin className="w-4 h-4 text-[#F17C70]" />
                  <span>Coverage Verification</span>
                </div>
                <p>
                  Home visits are offered strictly where qualified therapists and supervisors are currently active. Submitting this form allows us to verify dates and assign appropriate team members.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#F17C70]/30 text-xs text-[#69766E] space-y-1">
                <strong className="text-[#245B45] block">Important Disclosure:</strong>
                Submitting this form is an enquiry to verify caregiver availability in your locality and does not constitute a guaranteed booking until confirmed by our team.
              </div>
            </div>

            {/* Live Enquiry Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EAE4] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#245B45] mb-2">
                Check Availability in Your District
              </h3>
              <p className="text-xs text-[#69766E] mb-6">
                Fill in your details below and our Kerala coordinator will get back to you with available schedules.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#E8F0E8] border border-[#245B45]/20 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#34765A] mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#245B45]">
                    Enquiry Received
                  </h4>
                  <p className="text-xs text-[#69766E] max-w-md mx-auto">
                    Thank you, {formData.name}. Our postpartum care coordinator will review therapist schedules in {formData.district} ({formData.locality}) and reach out via {formData.contactMethod}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        district: 'Ernakulam',
                        locality: '',
                        deliveryDate: '',
                        supportType: 'Full Postnatal Care (Mother & Baby)',
                        contactMethod: 'Phone Call',
                        additionalNotes: '',
                      });
                    }}
                    className="text-xs text-[#245B45] font-semibold underline pt-2"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#25352E] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anjali Nair"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAE4] text-xs focus:outline-none focus:border-[#245B45]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#25352E] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAE4] text-xs focus:outline-none focus:border-[#245B45]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#25352E] mb-1">
                        Kerala District *
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAE4] text-xs focus:outline-none focus:border-[#245B45] bg-white"
                      >
                        {keralaDistricts.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#25352E] mb-1">
                        Locality / Town / PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.locality}
                        onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                        placeholder="e.g. Kakkanad / 682030"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAE4] text-xs focus:outline-none focus:border-[#245B45]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#25352E] mb-1">
                        Expected / Actual Delivery Date
                      </label>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAE4] text-xs focus:outline-none focus:border-[#245B45]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#25352E] mb-1">
                        Type of Support Required
                      </label>
                      <select
                        value={formData.supportType}
                        onChange={(e) => setFormData({ ...formData, supportType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAE4] text-xs focus:outline-none focus:border-[#245B45] bg-white"
                      >
                        <option value="Full Postnatal Care (Mother & Baby)">
                          Full Postnatal Care (Mother & Baby)
                        </option>
                        <option value="Mother Only Care (Abhyanga & Herbal Bath)">
                          Mother Only Care (Abhyanga & Herbal Bath)
                        </option>
                        <option value="Baby Massage & Bath Support">
                          Baby Massage & Bath Support
                        </option>
                        <option value="7-Day Sowbhagya Initial Program">
                          7-Day Sowbhagya Initial Program
                        </option>
                        <option value="14-Day Kalyani Restorative Program">
                          14-Day Kalyani Restorative Program
                        </option>
                        <option value="21-Day Prasava Raksha Deep Recovery">
                          21-Day Prasava Raksha Deep Recovery
                        </option>
                        <option value="Physician Consultation Only">
                          Physician Consultation Only
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#25352E] mb-1">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Phone Call', 'WhatsApp', 'Email'].map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() => setFormData({ ...formData, contactMethod: method })}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                            formData.contactMethod === method
                              ? 'bg-[#245B45] text-white border-[#245B45]'
                              : 'bg-white text-[#69766E] border-[#E4EAE4] hover:bg-[#E8F0E8]/40'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#25352E] mb-1">
                      Additional Notes or Questions
                    </label>
                    <textarea
                      rows={2}
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                      placeholder="e.g. Normal or C-Section delivery, specific preferences..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E4EAE4] text-xs focus:outline-none focus:border-[#245B45]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#245B45] hover:bg-[#1b4634] text-white py-3 rounded-xl font-medium text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Checking Availability...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Enquire Home-Based Postnatal Care</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: NEWBORN & CHILD CARE (WITH URGENT CARE DISCLAIMER) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="space-y-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Section 3 · Infant Guidance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
            Newborn & Child Care
          </h2>
          <p className="text-[#69766E] text-sm max-w-3xl leading-relaxed">
            Access appropriate consultation and guidance for newborn and child wellbeing. We help new parents understand infant digestion, gentle sleep hygiene, and traditional herbal skincare safely.
          </p>
        </div>

        {/* URGENT CARE DIRECTIVE */}
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3 mb-10">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>When Urgent Hospital or Paediatric Care is Required</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Ayurvedic guidance is intended solely for routine supportive care and maternal education. You must immediately seek urgent hospital paediatric care if your infant experiences any of the following:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-amber-950 pt-1">
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              • High fever (&gt;38°C / 100.4°F) in infants under 3 months
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              • Rapid breathing, grunting, or chest retractions
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              • Extreme lethargy, limpness, or difficulty waking
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              • Deepening yellow skin/eyes (severe jaundice) or poor feeding
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-2">
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Digestive Balance & Colic
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Safe maternal diet adjustments and gentle tummy warming techniques to relieve infant wind and colic naturally.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-2">
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Skincare & Cradle Cap
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Classical virgin coconut oil and mild herbal washes to protect the delicate neonatal acid mantle without harsh soaps.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E4EAE4] space-y-2">
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Sleep & Soothing Routines
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Calming sensory environments, natural lighting rhythms, and swaddling guidance to ease the transition outside the womb.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: BABY MASSAGE & WELLNESS */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
              Section 4 · Gentle Touch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
              Baby Massage & Wellness
            </h2>
            <p className="text-[#69766E] text-sm leading-relaxed">
              Learn about suitable baby-care and massage practices, with attention to the baby's age and individual needs. Daily infant abhyanga strengthens the bond between parent and baby, promotes neuromuscular relaxation, and supports soft skin health.
            </p>

            <ul className="space-y-2 text-xs text-[#69766E] pt-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <span>Instruction on gentle, non-pressured strokes tailored for soft infant bones and joints.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <span>Guidance on pure, cold-pressed oils suitable for Kerala climates and different skin sensitivities.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34765A] flex-shrink-0 mt-0.5" />
                <span>Warm herbal water bath (Snana) protocols maintaining steady, comfortable water temperature.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4EAE4] space-y-4 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#245B45]">
              Baby Massage Safety Guidelines
            </h3>
            <div className="space-y-3 text-xs text-[#69766E]">
              <div className="p-3 rounded-xl bg-[#E8F0E8]/40 border border-[#E4EAE4]">
                <strong className="text-[#245B45] block">Timing:</strong> Never massage an infant immediately after feeding. Wait at least 45 minutes to prevent regurgitation.
              </div>
              <div className="p-3 rounded-xl bg-[#E8F0E8]/40 border border-[#E4EAE4]">
                <strong className="text-[#245B45] block">Umbilical Cord Healing:</strong> Avoid full baths and abdomen oil until the umbilical stump has naturally separated and healed completely.
              </div>
              <div className="p-3 rounded-xl bg-[#E8F0E8]/40 border border-[#E4EAE4]">
                <strong className="text-[#245B45] block">Skin Patch Test:</strong> Always test a tiny drop of oil on your baby's arm before full-body application to verify tolerance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: POSTNATAL YOGA & RECOVERY */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E4EAE4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
              Section 5 · Mindful Movement
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
              Postnatal Yoga & Recovery
            </h2>
            <p className="text-[#69766E] text-sm leading-relaxed">
              Explore appropriately adapted movement and relaxation practices to support the return to physical activity after childbirth. We focus on rebuilding core integrity, gentle pelvic floor rehabilitation, and relieving upper back tension from nursing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E4EAE4]">
                <h4 className="text-xs font-bold text-[#245B45] uppercase">
                  Weeks 6 to 12
                </h4>
                <p className="text-[11px] text-[#69766E] mt-1">
                  Gentle pelvic breathwork, mild shoulder openers, and foundational postural alignment.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E4EAE4]">
                <h4 className="text-xs font-bold text-[#245B45] uppercase">
                  Months 3 to 6
                </h4>
                <p className="text-[11px] text-[#69766E] mt-1">
                  Progressive core stabilization, hip mobility, and restorative energizing sequences.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#E8F0E8]/40 p-6 sm:p-8 rounded-3xl border border-[#E4EAE4] space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#245B45]">
              Book an Individualized Session
            </h3>
            <p className="text-xs text-[#69766E] leading-relaxed">
              Our yoga instructor works alongside our Ayurvedic physician to verify your delivery history and recovery stage before designing your gentle postpartum sequence.
            </p>
            <button
              onClick={onOpenBooking}
              className="bg-[#245B45] hover:bg-[#1b4634] text-white px-6 py-3 rounded-xl font-medium text-xs transition-colors flex items-center gap-2"
            >
              <span>Schedule Postnatal Recovery Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F17C70]">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#245B45]">
            Common Questions on Postpartum Care
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
