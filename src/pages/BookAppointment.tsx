import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Phone,
  Building,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  User,
  HeartPulse,
  ArrowLeft,
  ArrowRight,
  Edit3,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getDoctor,
  getAvailableTimeSlots,
  createAppointment
} from '../services/dbService';
import { Doctor, Appointment, AppointmentType, PaymentStatus } from '../types';
import { PaymentModal } from '../components/common/PaymentModal';
import { BookingStepper } from '../components/booking/BookingStepper';

interface BookAppointmentProps {
  onSuccess: (appointment: Appointment) => void;
  onBack?: () => void;
  initialCategory?: string;
}

export const BookAppointment: React.FC<BookAppointmentProps> = ({
  onSuccess,
  onBack,
  initialCategory = 'General Health & Wellness',
}) => {
  const { userProfile } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);

  // Stepper state: 1: Select Time, 2: Patient Details, 3: Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1);

  // Form State
  const [consultationCategory, setConsultationCategory] = useState<string>(initialCategory);
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('video');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    // Default tomorrow or next day
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [slots, setSlots] = useState<{ time: string; available: boolean; reason?: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // Patient info
  const [patientName, setPatientName] = useState(userProfile?.name || '');
  const [patientPhone, setPatientPhone] = useState(userProfile?.phone || '');
  const [patientEmail, setPatientEmail] = useState(userProfile?.email || '');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');

  // Error & Status
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    async function loadDoctorData() {
      try {
        const doc = await getDoctor();
        setDoctor(doc);
      } finally {
        setLoadingDoctor(false);
      }
    }
    loadDoctorData();
  }, []);

  // Fetch slots whenever date changes
  useEffect(() => {
    async function fetchSlots() {
      if (!selectedDate || !doctor) return;
      setLoadingSlots(true);
      setSelectedSlot('');
      try {
        const available = await getAvailableTimeSlots(doctor.id, selectedDate);
        setSlots(available);
      } catch (err) {
        console.warn('Error fetching slots:', err);
      } finally {
        setLoadingSlots(false);
      }
    }
    fetchSlots();
  }, [selectedDate, doctor]);

  // Validation per step
  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!selectedDate) errs.date = 'Please select a preferred consultation date';
    if (!selectedSlot) errs.slot = 'Please select an available 30-minute time slot';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!patientName.trim()) errs.name = 'Patient full name is required';
    if (!patientPhone.trim()) errs.phone = 'Contact phone number is required';
    if (!patientEmail.trim()) errs.email = 'Valid email address is required';
    if (!symptoms.trim()) errs.symptoms = 'Please describe your primary health concerns or goals';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToStep2 = () => {
    if (validateStep1()) {
      setErrors({});
      setCurrentStep(2);
      setMaxReachedStep((prev) => Math.max(prev, 2));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleNextToStep3 = () => {
    if (validateStep2()) {
      setErrors({});
      setCurrentStep(3);
      setMaxReachedStep(3);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep === 1) {
      setCurrentStep(1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else if (targetStep === 2 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else if (targetStep === 3 && validateStep1() && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = async (payOption: 'online' | 'clinic') => {
    if (!validateStep1() || !validateStep2() || !doctor) return;
    setSubmitting(true);
    setErrors({});

    try {
      const patientId = userProfile?.id || `pat_anon_${Date.now()}`;
      const appt = await createAppointment({
        patientId,
        patientName,
        patientPhone,
        patientEmail,
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: selectedDate,
        timeSlot: selectedSlot,
        appointmentType,
        symptoms,
        notes,
        paymentStatus: 'pending',
        fee: doctor.consultationFee,
      });

      setCreatedAppointment(appt);

      if (payOption === 'online') {
        setShowPaymentModal(true);
      } else {
        onSuccess(appt);
      }
    } catch (err: any) {
      setErrors({ form: err.message || 'Slot already booked or unavailable. Please choose another slot.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSuccess = (paymentStatus: PaymentStatus, paymentId: string) => {
    if (createdAppointment) {
      const updated: Appointment = {
        ...createdAppointment,
        paymentStatus,
        paymentId,
      };
      setShowPaymentModal(false);
      onSuccess(updated);
    }
  };

  const modeDetails = {
    video: {
      label: 'Online Video',
      tagline: 'HD Tele-health Consultation',
      icon: Video,
      color: 'text-[#2C6E49]',
      bg: 'bg-[#E8F5E9]',
      description: 'Private, secure encrypted link shared via WhatsApp & email before session.',
    },
    audio: {
      label: 'Audio Call',
      tagline: 'Direct Doctor Callback',
      icon: Phone,
      color: 'text-[#2C6E49]',
      bg: 'bg-[#E8F5E9]',
      description: 'Senior physician calls your registered phone number at the scheduled time.',
    },
    in_clinic: {
      label: 'In-Clinic',
      tagline: 'Sanctuary Clinic Consultation',
      icon: Building,
      color: 'text-[#E06D53]',
      bg: 'bg-[#E06D53]/10',
      description: 'Personal pulse evaluation (Nadi Pariksha) at our Ayurvedic clinical sanctuary.',
    },
  }[appointmentType];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 text-left">
      {/* Top Back Action */}
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#143D27] hover:text-[#0C281B] bg-white px-3.5 py-2 rounded-xl border border-[#143D27]/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E06D53]">
          Ayurvedic Clinical Consultation
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C281B]">
          Book Your Consultation
        </h1>
        <p className="text-sm text-[#143D27]/70 font-light max-w-2xl">
          Connect directly with our qualified Ayurvedic physician for pulse diagnosis, Prakriti analysis,
          and personalized health recovery.
        </p>
      </div>

      {/* Visual Progress Stepper Component */}
      <BookingStepper
        currentStep={currentStep}
        maxReachedStep={maxReachedStep}
        onStepClick={handleStepClick}
      />

      {loadingDoctor ? (
        <div className="py-16 text-center text-sm text-[#143D27]/60">
          Loading doctor schedule & consultation engine...
        </div>
      ) : doctor ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Stepper Form Content Area */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6">
            {errors.form && (
              <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-xs flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            {/* STEP 1: SELECT TIME & MODE */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-[#E4EAE4] pb-4">
                  <span className="text-[11px] font-bold text-[#245B45] uppercase tracking-wider block">
                    Step 1 of 3
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#25352E]">
                    Select Category, Practitioner & Schedule
                  </h2>
                  <p className="text-xs text-[#69766E] mt-1">
                    Choose your healthcare category, attending practitioner, consultation format, and date.
                  </p>
                </div>

                {/* 1. Select Consultation Category */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#25352E] uppercase tracking-wider block">
                    1. Consultation Category
                  </label>
                  <select
                    value={consultationCategory}
                    onChange={(e) => setConsultationCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAE4] text-xs font-medium text-[#25352E] bg-[#FFFCF7] focus:outline-none focus:border-[#245B45]"
                  >
                    <option value="General Health & Wellness">General Health & Wellness</option>
                    <option value="Women's Health">Women's Health</option>
                    <option value="Men's Health">Men's Health</option>
                    <option value="Fertility & Preconception">Fertility & Preconception</option>
                    <option value="Pregnancy-Related Guidance">Pregnancy-Related Guidance</option>
                    <option value="Postnatal & Mother–Baby Care">Postnatal & Mother–Baby Care</option>
                    <option value="Lifestyle & Preventive Wellness">Lifestyle & Preventive Wellness</option>
                  </select>
                </div>

                {/* 2. Attending Practitioner */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold text-[#25352E] uppercase tracking-wider block">
                    2. Attending Practitioner
                  </label>
                  <div className="p-3.5 rounded-2xl bg-[#EDF2ED]/50 border border-[#245B45]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#245B45] text-white flex items-center justify-center font-serif font-bold text-sm">
                        V
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#245B45]">
                          {doctor?.name || 'Ayurvedic Physician'}
                        </h4>
                        <p className="text-[11px] text-[#69766E]">
                          {doctor?.qualification || 'BAMS, MD (Ayu)'} · Verified Healthcare Provider
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#E85342]">
                      ₹{doctor?.consultationFee || 850}
                    </span>
                  </div>
                </div>

                {/* 3. Select Consultation Format */}
                <div className="space-y-3 pt-1">
                  <label className="text-xs font-bold text-[#25352E] uppercase tracking-wider block">
                    3. Consultation Format
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setAppointmentType('video')}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        appointmentType === 'video'
                          ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B] shadow-sm ring-1 ring-[#2C6E49]'
                          : 'border-[#143D27]/10 bg-white text-[#143D27]/70 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <Video className="w-5 h-5 text-[#2C6E49]" />
                      <span className="text-xs font-semibold">Online Video</span>
                      <span className="text-[10px] text-[#143D27]/60">HD Tele-health</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAppointmentType('audio')}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        appointmentType === 'audio'
                          ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B] shadow-sm ring-1 ring-[#2C6E49]'
                          : 'border-[#143D27]/10 bg-white text-[#143D27]/70 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <Phone className="w-5 h-5 text-[#2C6E49]" />
                      <span className="text-xs font-semibold">Audio Call</span>
                      <span className="text-[10px] text-[#143D27]/60">Direct Doctor Line</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAppointmentType('in_clinic')}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        appointmentType === 'in_clinic'
                          ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B] shadow-sm ring-1 ring-[#2C6E49]'
                          : 'border-[#143D27]/10 bg-white text-[#143D27]/70 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <Building className="w-5 h-5 text-[#E06D53]" />
                      <span className="text-xs font-semibold">In-Clinic</span>
                      <span className="text-[10px] text-[#143D27]/60">Sanctuary Clinic</span>
                    </button>
                  </div>
                </div>

                {/* 2. Date Selection */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#143D27] uppercase tracking-wider block">
                      2. Consultation Date
                    </label>
                    <span className="text-[11px] text-[#143D27]/60">
                      Available Monday to Saturday
                    </span>
                  </div>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                  />
                  {errors.date && <p className="text-[11px] text-red-600 font-medium">{errors.date}</p>}
                </div>

                {/* 3. Available Time Slots */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#143D27] uppercase tracking-wider block">
                      3. Select Time Slot
                    </label>
                    <span className="text-[11px] text-[#2C6E49] font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      30 Minutes Comprehensive Slot
                    </span>
                  </div>

                  {loadingSlots ? (
                    <div className="py-8 text-center text-xs text-[#143D27]/60 bg-[#FAF8F5] rounded-2xl border border-dashed border-[#143D27]/20">
                      <Clock className="w-5 h-5 mx-auto mb-2 animate-spin text-[#2C6E49]" />
                      Checking real-time doctor availability...
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="p-5 bg-[#FAF8F5] rounded-2xl text-center text-xs text-[#143D27]/70 border border-[#143D27]/10">
                      No consultation slots available on this date. Doctor may be on hospital rounds. Please pick another day (Mon–Sat).
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {slots.map((slot, idx) => {
                        const isSelected = selectedSlot === slot.time;
                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`p-3 rounded-xl text-xs text-center transition-all ${
                              !slot.available
                                ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed line-through'
                                : isSelected
                                ? 'bg-[#2C6E49] text-white font-bold shadow-md ring-2 ring-[#2C6E49]/30'
                                : 'bg-white border border-[#143D27]/15 text-[#0C281B] hover:border-[#2C6E49]'
                            }`}
                            title={slot.reason}
                          >
                            <span className="font-semibold">{slot.time}</span>
                            {!slot.available && (
                              <span className="block text-[9px] text-gray-400 no-underline">Booked</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {errors.slot && <p className="text-[11px] text-red-600 font-medium">{errors.slot}</p>}
                </div>

                {/* Step 1 Actions */}
                <div className="pt-4 border-t border-[#143D27]/10 flex items-center justify-between">
                  <div className="text-xs text-[#143D27]/70">
                    {selectedSlot ? (
                      <span className="text-[#2C6E49] font-medium flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        Selected: <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>
                      </span>
                    ) : (
                      <span>Pick a date & time slot to proceed</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleNextToStep2}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white text-xs font-semibold rounded-xl shadow transition-all active:scale-[0.98]"
                  >
                    <span>Continue to Patient Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PATIENT DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-[#143D27]/10 pb-4">
                  <span className="text-[11px] font-bold text-[#2C6E49] uppercase tracking-wider block">
                    Step 2 of 3
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0C281B]">
                    Patient Details & Health Goals
                  </h2>
                  <p className="text-xs text-[#143D27]/70 mt-1">
                    Provide medical background so our Ayurvedic physician can prepare prior to the consultation.
                  </p>
                </div>

                {/* Quick Step 1 Recap Chip */}
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#143D27]/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#143D27]">
                    <Clock className="w-4 h-4 text-[#2C6E49]" />
                    <span>
                      Scheduled for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong> ({modeDetails.label})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[#2C6E49] font-semibold hover:underline inline-flex items-center gap-1 text-[11px]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Change Time
                  </button>
                </div>

                {/* Patient Full Name */}
                <div>
                  <label className="text-xs font-semibold text-[#143D27]/90 block mb-1">
                    Patient Full Name <span className="text-[#E06D53]">*</span>
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Full name as per medical records"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                  />
                  {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Contact Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#143D27]/90 block mb-1">
                      Phone / WhatsApp <span className="text-[#E06D53]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+91 98470 00000"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                    />
                    <span className="text-[10px] text-[#143D27]/60 block mt-1">
                      Consultation links & prescriptions will be shared here.
                    </span>
                    {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#143D27]/90 block mb-1">
                      Email Address <span className="text-[#E06D53]">*</span>
                    </label>
                    <input
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                    />
                    <span className="text-[10px] text-[#143D27]/60 block mt-1">
                      Appointment confirmation sent to this email.
                    </span>
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Primary Symptoms / Health Goal */}
                <div>
                  <label className="text-xs font-semibold text-[#143D27]/90 block mb-1">
                    Primary Health Concerns / Symptoms <span className="text-[#E06D53]">*</span>
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={3}
                    placeholder="e.g. Postpartum lower back soreness, looking for 21-day Sutika Paricharya plan, fatigue, digestive Agni imbalance..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                  />
                  {errors.symptoms && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.symptoms}</p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="text-xs font-semibold text-[#143D27]/90 block mb-1">
                    Previous Medical History / Medications <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="e.g. Current allopathic medicines, recent blood reports, delivery type (Normal / C-Section)..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                  />
                </div>

                {/* Step 2 Actions */}
                <div className="pt-4 border-t border-[#143D27]/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#0C281B] text-xs font-semibold rounded-xl transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Time Selection</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextToStep3}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white text-xs font-semibold rounded-xl shadow transition-all active:scale-[0.98]"
                  >
                    <span>Continue to Confirmation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRMATION & REVIEW */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-[#143D27]/10 pb-4">
                  <span className="text-[11px] font-bold text-[#2C6E49] uppercase tracking-wider block">
                    Step 3 of 3
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0C281B]">
                    Review & Confirm Consultation
                  </h2>
                  <p className="text-xs text-[#143D27]/70 mt-1">
                    Please verify your appointment schedule and patient details before final confirmation.
                  </p>
                </div>

                {/* Review Cards Grid */}
                <div className="space-y-4">
                  {/* Card 1: Schedule & Mode */}
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#143D27]/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C6E49] flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4" />
                        Consultation Schedule
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs text-[#2C6E49] hover:underline font-semibold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[#143D27]/60 block text-[11px]">Mode</span>
                        <strong className="text-[#0C281B] font-semibold flex items-center gap-1 mt-0.5">
                          <modeDetails.icon className="w-4 h-4 text-[#2C6E49]" />
                          {modeDetails.label}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#143D27]/60 block text-[11px]">Date</span>
                        <strong className="text-[#0C281B] font-semibold mt-0.5 block">{selectedDate}</strong>
                      </div>
                      <div>
                        <span className="text-[#143D27]/60 block text-[11px]">Time Slot</span>
                        <strong className="text-[#0C281B] font-semibold mt-0.5 block">{selectedSlot} (30 mins)</strong>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Patient Information */}
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#143D27]/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C6E49] flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        Patient Details
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs text-[#2C6E49] hover:underline font-semibold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[#143D27]/60 block text-[11px]">Patient Name</span>
                        <strong className="text-[#0C281B] font-semibold mt-0.5 block">{patientName}</strong>
                      </div>
                      <div>
                        <span className="text-[#143D27]/60 block text-[11px]">Contact</span>
                        <strong className="text-[#0C281B] font-semibold mt-0.5 block">{patientPhone}</strong>
                        <span className="text-[#143D27]/70 text-[11px]">{patientEmail}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#143D27]/10 text-xs">
                      <span className="text-[#143D27]/60 block text-[11px]">Primary Concerns</span>
                      <p className="text-[#0C281B] font-medium mt-0.5">{symptoms}</p>
                    </div>
                    {notes && (
                      <div className="text-xs">
                        <span className="text-[#143D27]/60 block text-[11px]">Additional Notes</span>
                        <p className="text-[#0C281B] font-light mt-0.5">{notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Card 3: Consultation Inclusions */}
                  <div className="p-4 bg-[#E8F5E9]/50 rounded-2xl border border-[#2C6E49]/20 space-y-2 text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C6E49] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      What is Included
                    </span>
                    <ul className="space-y-1.5 text-[#143D27]/80">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6E49]" />
                        <span>30-minute private one-on-one session with our qualified Ayurvedic physician</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6E49]" />
                        <span>Comprehensive Prakriti / Vikriti assessment & pulse review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6E49]" />
                        <span>Digital Ayurvedic prescription & personalized diet/herb regimen</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Final Step Actions */}
                <div className="pt-4 border-t border-[#143D27]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#0C281B] text-xs font-semibold rounded-xl transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Patient Details</span>
                  </button>

                  <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => handleBookingSubmit('clinic')}
                      className="px-5 py-3 bg-[#143D27]/10 hover:bg-[#143D27]/15 text-[#0C281B] font-semibold rounded-xl transition-all text-xs text-center disabled:opacity-50"
                    >
                      <span>Pay Post-Consultation / At Clinic</span>
                    </button>

                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => handleBookingSubmit('online')}
                      className="px-6 py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white font-semibold rounded-xl shadow transition-all text-xs text-center flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <span>Confirm & Pay Online (₹{doctor.consultationFee})</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary & Assurance Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#143D27]/10">
                <div className="w-12 h-12 rounded-2xl bg-[#2C6E49]/15 text-[#2C6E49] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0C281B]">Ayurvedic Physician</h3>
                  <span className="text-xs text-[#2C6E49] font-medium block">
                    Qualified BAMS / MD Clinical Practice
                  </span>
                </div>
              </div>

              {/* Real-time details */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#143D27]/70">Mode:</span>
                  <span className="text-[#0C281B] font-semibold flex items-center gap-1">
                    <modeDetails.icon className="w-3.5 h-3.5 text-[#2C6E49]" />
                    {modeDetails.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#143D27]/70">Date:</span>
                  <strong className="text-[#0C281B] font-semibold">{selectedDate || 'Not selected'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#143D27]/70">Time Slot:</span>
                  <strong className="text-[#0C281B] font-semibold">
                    {selectedSlot || 'Select in Step 1'}
                  </strong>
                </div>
                {patientName && (
                  <div className="flex justify-between pt-1 border-t border-[#143D27]/5">
                    <span className="text-[#143D27]/70">Patient:</span>
                    <strong className="text-[#0C281B] font-semibold truncate max-w-[140px] text-right">
                      {patientName}
                    </strong>
                  </div>
                )}
              </div>

              {/* Consultation Fee */}
              <div className="pt-4 border-t border-[#143D27]/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#143D27]/70 block">Consultation Fee</span>
                  <span className="text-[10px] text-[#2C6E49]">Includes follow-up diet plan</span>
                </div>
                <span className="font-serif text-3xl font-bold text-[#0C281B]">
                  ₹{doctor.consultationFee}
                </span>
              </div>

              {/* Stepper helper button based on currentStep */}
              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={handleNextToStep2}
                  className="w-full py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white font-medium rounded-xl shadow transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-xs"
                >
                  <span>Proceed to Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={handleNextToStep3}
                  className="w-full py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white font-medium rounded-xl shadow transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-xs"
                >
                  <span>Review & Confirm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {currentStep === 3 && (
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleBookingSubmit('online')}
                    className="w-full py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white font-medium rounded-xl shadow transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-xs disabled:opacity-50"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span>Pay Online (₹{doctor.consultationFee})</span>
                  </button>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleBookingSubmit('clinic')}
                    className="w-full py-2.5 bg-[#143D27]/10 hover:bg-[#143D27]/15 text-[#0C281B] font-medium rounded-xl transition-all text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>Pay at Clinic / Post-Session</span>
                  </button>
                </div>
              )}

              <div className="text-[11px] text-[#143D27]/60 leading-tight flex items-start gap-2 pt-2 border-t border-[#143D27]/10">
                <ShieldCheck className="w-4 h-4 text-[#2C6E49] flex-shrink-0" />
                <span>
                  Real-time slot locking: prevents double booking and secures your physician time.
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Payment Gateway Modal */}
      {createdAppointment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            onSuccess(createdAppointment);
          }}
          title="Consultation Fee"
          itemDescription={`Consultation with ${createdAppointment.doctorName}`}
          amount={createdAppointment.fee}
          bookingRef={createdAppointment.id}
          onSuccess={handlePaymentSuccess}
          allowPayAtClinic={true}
        />
      )}
    </div>
  );
};
