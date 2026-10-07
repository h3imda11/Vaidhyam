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
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getDoctor,
  getAvailableTimeSlots,
  createAppointment
} from '../services/dbService';
import { Doctor, Appointment, AppointmentType, PaymentStatus } from '../types';
import { PaymentModal } from '../components/common/PaymentModal';

interface BookAppointmentProps {
  onSuccess: (appointment: Appointment) => void;
  onBack?: () => void;
}

export const BookAppointment: React.FC<BookAppointmentProps> = ({
  onSuccess,
  onBack,
}) => {
  const { userProfile } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);

  // Form State
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

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!selectedDate) errs.date = 'Please select a date';
    if (!selectedSlot) errs.slot = 'Please select an available time slot';
    if (!patientName.trim()) errs.name = 'Patient name is required';
    if (!patientPhone.trim()) errs.phone = 'Contact phone number is required';
    if (!patientEmail.trim()) errs.email = 'Email address is required';
    if (!symptoms.trim()) errs.symptoms = 'Please briefly describe your primary health concerns or goals';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBookingSubmit = async (payOption: 'online' | 'clinic') => {
    if (!validate() || !doctor) return;
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 text-left">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#143D27] hover:text-[#0C281B] bg-white px-3.5 py-2 rounded-xl border border-[#143D27]/10"
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
        <p className="text-sm text-[#143D27]/70 font-light">
          Connect directly with our senior Ayurvedic physician for pulse diagnosis, Prakriti analysis,
          and personalized recovery care.
        </p>
      </div>

      {loadingDoctor ? (
        <div className="py-16 text-center text-sm text-[#143D27]/60">
          Loading doctor schedule & consultation engine...
        </div>
      ) : doctor ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Booking Engine */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6">
            {errors.form && (
              <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-xs flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            {/* Step 1: Select Consultation Mode */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#143D27] uppercase tracking-wider block">
                1. Select Consultation Mode
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAppointmentType('video')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    appointmentType === 'video'
                      ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B] shadow-sm'
                      : 'border-[#143D27]/10 bg-white text-[#143D27]/70 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Video className="w-5 h-5 text-[#2C6E49]" />
                  <span className="text-xs">Online Video</span>
                  <span className="text-[10px] text-[#143D27]/60">HD Tele-health</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType('audio')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    appointmentType === 'audio'
                      ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B] shadow-sm'
                      : 'border-[#143D27]/10 bg-white text-[#143D27]/70 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Phone className="w-5 h-5 text-[#2C6E49]" />
                  <span className="text-xs">Audio Call</span>
                  <span className="text-[10px] text-[#143D27]/60">Direct Doctor Line</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType('in_clinic')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    appointmentType === 'in_clinic'
                      ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B] shadow-sm'
                      : 'border-[#143D27]/10 bg-white text-[#143D27]/70 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#E06D53]" />
                  <span className="text-xs">In-Clinic</span>
                  <span className="text-[10px] text-[#143D27]/60">Clinic Consultation</span>
                </button>
              </div>
            </div>

            {/* Step 2: Date Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-[#143D27] uppercase tracking-wider block">
                2. Select Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
              />
              {errors.date && <p className="text-[11px] text-red-600">{errors.date}</p>}
            </div>

            {/* Step 3: Available Time Slots (Double booking prevented!) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#143D27] uppercase tracking-wider block">
                  3. Select Available Slot
                </label>
                <span className="text-[11px] text-[#2C6E49] font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  30 Minutes Comprehensive Slot
                </span>
              </div>

              {loadingSlots ? (
                <div className="py-6 text-center text-xs text-[#143D27]/60">
                  Checking real-time doctor availability...
                </div>
              ) : slots.length === 0 ? (
                <div className="p-4 bg-[#FAF8F5] rounded-xl text-center text-xs text-[#143D27]/70">
                  No consultation slots available on this date. Doctor may be off duty or on scheduled hospital rounds. Please select another day (Mon–Sat).
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
                        {slot.time}
                        {!slot.available && (
                          <span className="block text-[9px] text-gray-400 no-underline">Booked</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
              {errors.slot && <p className="text-[11px] text-red-600">{errors.slot}</p>}
            </div>

            {/* Step 4: Patient Information & Symptoms */}
            <div className="space-y-4 pt-4 border-t border-[#143D27]/10">
              <label className="text-xs font-bold text-[#143D27] uppercase tracking-wider block">
                4. Patient Details & Health Concerns
              </label>

              <div>
                <label className="text-xs text-[#143D27]/80 block mb-1">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#143D27]/80 block mb-1">
                    Phone / WhatsApp <span className="text-[#E06D53]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+91 98470 00000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs text-[#143D27]/80 block mb-1">
                    Email Address <span className="text-[#E06D53]">*</span>
                  </label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs text-[#143D27]/80 block mb-1">
                  Primary Symptoms / Health Goal <span className="text-[#E06D53]">*</span>
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={3}
                  placeholder="e.g. Postpartum lower back soreness, looking for 21-day Sutika Paricharya plan, fatigue, digestive bloating..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                />
                {errors.symptoms && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.symptoms}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Doctor Summary & Confirmation */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#143D27]/10">
                <div className="w-12 h-12 rounded-2xl bg-[#2C6E49]/15 text-[#2C6E49] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0C281B]">Ayurvedic Physician</h3>
                  <span className="text-xs text-[#2C6E49] font-medium block">
                    Qualified BAMS / MD Clinical Consultation
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#143D27]/70">Date:</span>
                  <strong className="text-[#0C281B] font-semibold">{selectedDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#143D27]/70">Time Slot:</span>
                  <strong className="text-[#0C281B] font-semibold">
                    {selectedSlot || 'Not chosen yet'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#143D27]/70">Mode:</span>
                  <strong className="text-[#0C281B] font-semibold capitalize">
                    {appointmentType.replace('_', ' ')}
                  </strong>
                </div>
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

              {/* Booking Actions */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleBookingSubmit('online')}
                  className="w-full py-3.5 bg-[#E06D53] hover:bg-[#C4573E] text-white font-medium rounded-xl shadow transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Pay & Confirm Slot (₹{doctor.consultationFee})</span>
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleBookingSubmit('clinic')}
                  className="w-full py-2.5 bg-[#143D27]/10 hover:bg-[#143D27]/15 text-[#0C281B] font-medium rounded-xl transition-all text-xs flex items-center justify-center gap-2"
                >
                  <span>Pay Post-Consultation / At Clinic</span>
                </button>
              </div>

              <div className="text-[11px] text-[#143D27]/60 leading-tight flex items-start gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#2C6E49] flex-shrink-0" />
                <span>
                  Double-booking prevention is enforced live. Once reserved, your slot cannot be claimed by others.
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
