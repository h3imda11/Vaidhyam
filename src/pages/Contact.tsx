import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { submitEnquiry } from '../services/dbService';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('PDC Package Enquiry');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      setError('Please fill in your name, phone, and message.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitEnquiry({
        name,
        phone,
        email,
        subject,
        message,
      });
      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setError('Failed to send enquiry. Please try WhatsApp or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 pb-24 text-left">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E06D53]">
          Connect with Vaidyam
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0C281B]">
          Contact & Online Enquiries
        </h1>
        <p className="text-sm sm:text-base text-[#143D27]/80 leading-relaxed font-light">
          Have questions regarding Post-Delivery Care packages, treatment consultations, or care timelines?
          Submit an enquiry below and our care coordinator will get in touch with you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Online Care Status Card */}
          <div className="p-8 rounded-3xl bg-[#0C281B] text-white space-y-4 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C29B38] text-xs font-bold uppercase tracking-wider">
              <span>Patient Assistance</span>
            </div>
            <h3 className="font-serif text-2xl font-bold">Online Clinical Support</h3>
            <p className="text-xs text-white/80 leading-relaxed font-light">
              We provide online video and audio consultations with our qualified Ayurvedic physician panel, as well as customized post-delivery care planning.
            </p>
            <div className="pt-2 border-t border-white/10 text-xs text-white/70 space-y-1">
              <strong className="block text-white">Consultation Hours:</strong>
              <span>Monday – Saturday: 9:00 AM – 5:00 PM (IST)</span>
            </div>
          </div>

          {/* Details Notice */}
          <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-4 text-xs text-[#0C281B]">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#2C6E49] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-sm">Response Time</strong>
                <p className="text-[#143D27]/80 mt-0.5">
                  All online enquiries submitted through this form are reviewed by our clinical team and responded to within 4 to 6 working hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#143D27]/10">
              <CheckCircle2 className="w-5 h-5 text-[#2C6E49] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-sm">Direct Phone & Sanctuary Location</strong>
                <p className="text-[#143D27]/80 mt-0.5">
                  Our official phone helpline and physical sanctuary location details are currently being updated and will be published shortly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Contact Form (Saves to Firestore enquiries) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
              Send an Enquiry Message
            </h3>
            <p className="text-xs text-[#143D27]/70 font-light">
              Your inquiry will be logged directly into our clinical database and answered within 4 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-[#E8F5E9] rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#2C6E49] mx-auto" />
              <h4 className="font-serif text-xl font-bold text-[#0C281B]">
                Enquiry Received with Care
              </h4>
              <p className="text-xs text-[#143D27]/80 max-w-sm mx-auto font-light">
                Thank you. Our sanctuary coordinator has received your message and will contact you at{' '}
                <strong>{phone}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-[#2C6E49] underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#143D27] block mb-1">
                    Your Name <span className="text-[#E06D53]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#2C6E49]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#143D27] block mb-1">
                    Phone / WhatsApp <span className="text-[#E06D53]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98470 00000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#2C6E49]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#143D27] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#2C6E49]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#143D27] block mb-1">
                    Enquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#2C6E49]"
                  >
                    <option value="PDC Package Enquiry">Post-Delivery Care (PDC) Packages</option>
                    <option value="In-Home Care Therapist">In-Home Therapist Request</option>
                    <option value="Doctor Consultation">Doctor Consultation Query</option>
                    <option value="Sanctuary Retreat Booking">Sanctuary Retreat Stay</option>
                    <option value="Other Medical Inquiry">Other Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">
                  Your Message or Clinical Query <span className="text-[#E06D53]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about expected delivery date, location, or health concerns..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#2C6E49]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[#E06D53] hover:bg-[#C4573E] text-white font-semibold rounded-xl text-xs shadow transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Message...' : 'Submit Message to Clinic'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
