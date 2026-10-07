import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  HeartPulse,
  MapPin,
  Baby,
  User,
  Phone,
  Mail,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createPdcBooking } from '../services/dbService';
import { PdcPackage, PdcBooking, PaymentStatus } from '../types';
import { PaymentModal } from '../components/common/PaymentModal';

interface PdcBookingFlowProps {
  initialPackage: PdcPackage;
  onBack: () => void;
  onSuccess: (booking: PdcBooking) => void;
  onNavigateLogin: () => void;
}

export const PdcBookingFlow: React.FC<PdcBookingFlowProps> = ({
  initialPackage,
  onBack,
  onSuccess,
  onNavigateLogin,
}) => {
  const { userProfile } = useAuth();

  // Form State
  const [selectedPackage] = useState<PdcPackage>(initialPackage);
  const [startDate, setStartDate] = useState('');
  const [consultationDate, setConsultationDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [careRequirement, setCareRequirement] = useState<'mother_only' | 'mother_and_baby'>(
    initialPackage.motherAndBabyOption ? 'mother_and_baby' : 'mother_only'
  );
  const [preferredLocation, setPreferredLocation] = useState<'clinic_retreat' | 'home_care'>(
    'clinic_retreat'
  );
  const [notes, setNotes] = useState('');

  // Contact details
  const [name, setName] = useState(userProfile?.name || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [email, setEmail] = useState(userProfile?.email || '');

  // Validation & Submission
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<PdcBooking | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!startDate) errs.startDate = 'Please select a preferred care start date';
    if (!name.trim()) errs.name = 'Patient name is required';
    if (!phone.trim()) errs.phone = 'Valid phone number is required';
    if (!email.trim()) errs.email = 'Email address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (paymentChoice: 'pay_now' | 'pay_later') => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      const patientId = userProfile?.id || `anon_pat_${Date.now()}`;
      const bookingData = {
        patientId,
        patientName: name,
        patientPhone: phone,
        patientEmail: email,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        durationDays: selectedPackage.durationDays,
        startDate,
        preferredConsultationDate: consultationDate || startDate,
        careRequirement,
        preferredLocation,
        deliveryDateOrExpected: deliveryDate,
        additionalNotes: notes,
        price: selectedPackage.price,
        paymentStatus: 'pending' as PaymentStatus,
      };

      const booking = await createPdcBooking(bookingData);
      setCreatedBooking(booking);

      if (paymentChoice === 'pay_now') {
        setShowPaymentModal(true);
      } else {
        onSuccess(booking);
      }
    } catch (err: any) {
      setErrors({ submit: err.message || 'Failed to submit booking. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSuccess = (status: PaymentStatus, paymentId: string) => {
    if (createdBooking) {
      const updated: PdcBooking = {
        ...createdBooking,
        paymentStatus: status,
        paymentId,
      };
      setShowPaymentModal(false);
      onSuccess(updated);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 text-left">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#143D27] hover:text-[#0C281B] bg-white px-3.5 py-2 rounded-xl border border-[#143D27]/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Packages</span>
        </button>

        {!userProfile && (
          <button
            onClick={onNavigateLogin}
            className="text-xs text-[#2C6E49] hover:underline font-semibold"
          >
            Have an account? Sign in for saved details
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E06D53]">
              Enrollment Form
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C281B]">
              Book {selectedPackage.name}
            </h2>
            <p className="text-xs text-[#143D27]/70">
              Provide preferred dates and clinical care preferences.
            </p>
          </div>

          {errors.submit && (
            <div className="p-3.5 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.submit}</span>
            </div>
          )}

          {/* Form fields */}
          <div className="space-y-4">
            {/* Preferred Start Date */}
            <div>
              <label className="text-xs font-semibold text-[#143D27] block mb-1">
                Preferred Care Start Date <span className="text-[#E06D53]">*</span>
              </label>
              <input
                type="date"
                value={startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
              />
              {errors.startDate && (
                <p className="text-[11px] text-red-600 mt-1">{errors.startDate}</p>
              )}
            </div>

            {/* Delivery Date / Expected Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">
                  Delivery / Expected Date
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">
                  Preferred Pre-Consultation Date
                </label>
                <input
                  type="date"
                  value={consultationDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setConsultationDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                />
              </div>
            </div>

            {/* Care Scope */}
            <div>
              <label className="text-xs font-semibold text-[#143D27] block mb-1.5">
                Care Scope Requirement
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCareRequirement('mother_and_baby')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs ${
                    careRequirement === 'mother_and_baby'
                      ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B]'
                      : 'border-[#143D27]/10 bg-white text-[#143D27]/80'
                  }`}
                >
                  <Baby className="w-4 h-4 text-[#E06D53]" />
                  <span>Mother & Baby Care</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCareRequirement('mother_only')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs ${
                    careRequirement === 'mother_only'
                      ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B]'
                      : 'border-[#143D27]/10 bg-white text-[#143D27]/80'
                  }`}
                >
                  <User className="w-4 h-4 text-[#2C6E49]" />
                  <span>Mother Restorative Only</span>
                </button>
              </div>
            </div>

            {/* Location Preference */}
            <div>
              <label className="text-xs font-semibold text-[#143D27] block mb-1.5">
                Care Location
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPreferredLocation('clinic_retreat')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs ${
                    preferredLocation === 'clinic_retreat'
                      ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B]'
                      : 'border-[#143D27]/10 bg-white text-[#143D27]/80'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-[#2C6E49]" />
                  <span>Vaidyam Sanctuary (Kerala)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferredLocation('home_care')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs ${
                    preferredLocation === 'home_care'
                      ? 'border-[#2C6E49] bg-[#E8F5E9] font-bold text-[#0C281B]'
                      : 'border-[#143D27]/10 bg-white text-[#143D27]/80'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-[#E06D53]" />
                  <span>In-Home Care Delivery</span>
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-2 border-t border-[#143D27]/10 space-y-3">
              <span className="text-xs font-bold text-[#143D27] block">
                Primary Contact Information
              </span>

              <div>
                <label className="text-xs text-[#143D27]/80 block mb-1">
                  Full Name <span className="text-[#E06D53]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mother / Family Member Name"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs text-[#143D27]/80 block mb-1">
                  Special Notes / Delivery Details (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Mention delivery type (normal/cesarean), allergies, or special requirements..."
                  className="w-full px-4 py-2 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary & Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-5">
            <h3 className="font-serif text-xl font-bold text-[#0C281B] pb-3 border-b border-[#143D27]/10">
              Booking Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#143D27]/70">Selected Package:</span>
                <strong className="text-[#0C281B] font-semibold">{selectedPackage.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#143D27]/70">Program Duration:</span>
                <strong className="text-[#0C281B] font-semibold">
                  {selectedPackage.durationDays} Days
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#143D27]/70">Therapy Sessions:</span>
                <strong className="text-[#0C281B] font-semibold">
                  {selectedPackage.sessionsCount} Sessions
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#143D27]/70">Doctor Consultations:</span>
                <strong className="text-[#0C281B] font-semibold">
                  {selectedPackage.consultationsIncluded} Included
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#143D27]/70">Care Location:</span>
                <strong className="text-[#0C281B] font-semibold capitalize">
                  {preferredLocation === 'clinic_retreat' ? 'Vaidyam Sanctuary' : 'Home-Care'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#143D27]/70">Start Date:</span>
                <strong className="text-[#0C281B] font-semibold">
                  {startDate || 'Pending Selection'}
                </strong>
              </div>
            </div>

            {/* Price Total */}
            <div className="pt-4 border-t border-[#143D27]/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#143D27]/70 block">Total Investment</span>
                <span className="text-[10px] text-[#2C6E49] font-medium">All medicines & oils included</span>
              </div>
              <span className="font-serif text-3xl font-bold text-[#0C281B]">
                ₹{selectedPackage.price.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Cancellation policy note */}
            <div className="p-3 bg-[#FAF8F5] rounded-xl text-[11px] text-[#143D27]/80 leading-relaxed border border-[#143D27]/10">
              <strong className="block text-[#0C281B] font-semibold mb-0.5">
                Cancellation & Date Rescheduling
              </strong>
              Start dates can be rescheduled at no additional charge depending on the actual delivery date.
              Full cancellation refundable up to 48 hours prior to first session.
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleSubmit('pay_now')}
                className="w-full py-4 bg-[#E06D53] hover:bg-[#C4573E] text-white font-semibold rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <HeartPulse className="w-4 h-4" />
                <span>Pay Now & Confirm (₹{selectedPackage.price.toLocaleString('en-IN')})</span>
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={() => handleSubmit('pay_later')}
                className="w-full py-3 bg-[#143D27]/10 hover:bg-[#143D27]/15 text-[#0C281B] font-semibold rounded-xl transition-all text-xs flex items-center justify-center gap-2"
              >
                <span>Request Confirmation & Pay at Sanctuary</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Dialog */}
      {createdBooking && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            onSuccess(createdBooking);
          }}
          title={`Enrollment - ${createdBooking.packageName}`}
          itemDescription={`${createdBooking.durationDays} Days Sutika Paricharya Program`}
          amount={createdBooking.price}
          bookingRef={createdBooking.id}
          onSuccess={handlePaymentSuccess}
          allowPayAtClinic={true}
        />
      )}
    </div>
  );
};
