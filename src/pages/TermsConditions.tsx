import React from 'react';
import { AlertCircle, FileCheck } from 'lucide-react';

export const TermsConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24 text-left">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E06D53]/15 text-[#C4573E] text-xs font-bold uppercase tracking-wider">
          <FileCheck className="w-4 h-4" />
          <span>Patient Agreement</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C281B]">
          Terms and Conditions
        </h1>
        <p className="text-xs text-[#143D27]/60">Last updated: October 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6 text-xs sm:text-sm text-[#143D27]/80 leading-relaxed font-light">
        <section className="space-y-2 p-4 bg-amber-50 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#0C281B]">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>Important Medical & Emergency Disclaimer</span>
          </div>
          <p className="text-xs text-[#143D27]/90 leading-relaxed">
            Vaidyam provides authentic, traditional Ayurvedic healthcare, maternal post-delivery therapies,
            and individualized herbal dietary consultations. Ayurveda is a restorative medical science that
            supports natural biological balance. Vaidyam is not an acute emergency obstetrics facility. In
            the event of acute labor complications, postpartum hemorrhage, severe infections, or neonatal
            emergencies, patients must immediately contact emergency allopathic hospital services.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">1. Doctor Consultations</h3>
          <p>
            Consultation bookings reserve a specific dedicated slot with our registered Ayurvedic physician.
            Patients are requested to join the video session or report to the sanctuary at least 5 minutes
            prior to the scheduled time.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">2. Post-Delivery Care Packages</h3>
          <p>
            Therapies are scheduled based on the physician’s assessment. While package durations (7, 14, 21,
            28, 42 days) provide structured schedules, therapies can be modified if clinical indicators warrant
            adjustment. Start dates are flexible around actual delivery dates.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">3. Cancellations & Rescheduling</h3>
          <p>
            Consultations may be rescheduled up to 24 hours in advance. For PDC packages, reservations may be
            cancelled or adjusted with full refund up to 48 hours prior to the first therapy session.
          </p>
        </section>
      </div>
    </div>
  );
};
