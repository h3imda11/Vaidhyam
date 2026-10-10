import React from 'react';
import { ArrowLeft, Clock, ShieldCheck, RefreshCw } from 'lucide-react';

interface CancellationRefundPolicyProps {
  onBack?: () => void;
}

export const CancellationRefundPolicy: React.FC<CancellationRefundPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#245B45] hover:text-[#1b4634] bg-white px-3.5 py-2 rounded-xl border border-[#E4EAE4] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E85342]">
          Patient Information
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
          Cancellation and Refund Policy
        </h1>
        <p className="text-xs text-[#69766E]">
          Last Updated: October 2026 · Vaidhyam Healthcare
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E4EAE4] shadow-xs space-y-6 text-sm text-[#25352E] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#245B45]">
            1. Consultation Rescheduling & Cancellation
          </h2>
          <p>
            Patients may reschedule or cancel any scheduled online or in-clinic consultation up to <strong>24 hours</strong> before the appointment time without any fee. You can initiate rescheduling directly through your patient account dashboard or by contacting our care desk.
          </p>
          <p>
            If a cancellation is requested with at least 24 hours notice, a full refund will be processed back to the original method of payment within 5 to 7 business days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#245B45]">
            2. Late Cancellations and Missed Appointments (No-Shows)
          </h2>
          <p>
            Cancellations made within 24 hours of the scheduled consultation time, or instances where a patient does not join the video/audio session within 15 minutes of the start time, may be subject to a nominal administrative fee or forfeiture of the consultation deposit, as the practitioner’s clinical slot was held exclusively for you.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#245B45]">
            3. Postnatal Care (Sutika Paricharya) Enquiries & Bookings
          </h2>
          <p>
            Home-based and sanctuary postnatal care packages require extensive scheduling and reservation of dedicated therapists. If delivery dates shift or medical adjustments occur, start dates may be rescheduled without penalty upon timely notice from the family.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#245B45]">
            4. Practitioner Unavailability
          </h2>
          <p>
            In the rare event that an attending practitioner is called away due to clinical emergencies or illness, patients will be offered an immediate alternative appointment time or a prompt 100% full refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#245B45]">
            5. Contacting Our Support Team
          </h2>
          <p>
            For any queries regarding cancellations, appointment adjustments, or billing receipts, please reach out to our care team during clinic hours (Monday – Saturday, 9:00 AM – 5:00 PM IST).
          </p>
        </section>
      </div>
    </div>
  );
};
