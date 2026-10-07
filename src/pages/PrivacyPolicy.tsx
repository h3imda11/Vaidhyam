import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24 text-left">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Patient Data Protection</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C281B]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#143D27]/60">Last updated: October 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6 text-xs sm:text-sm text-[#143D27]/80 leading-relaxed font-light">
        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">1. Commitment to Clinical Confidentiality</h3>
          <p>
            Vaidyam Ayurvedic Healthcare is committed to protecting your personal, contact, and
            medical consultation records. Any health information provided during online appointments,
            PDC bookings, or in-clinic visits is treated strictly within the confidentiality standards
            governing medical practice in India.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">2. Information We Collect</h3>
          <p>We collect only information necessary for delivery of clinical care, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details (Full Name, Phone/WhatsApp, Email, Residential address for home-care)</li>
            <li>Postnatal and health records (Delivery mode, dates, symptoms, existing conditions)</li>
            <li>Appointment schedules and transaction confirmation references</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">3. Payment Gateway Security</h3>
          <p>
            Online financial transactions are processed through encrypted payment gateway architectures
            (such as Razorpay). Vaidyam does not store credit/debit card numbers or bank credentials on our
            servers. All transactions comply with RBI guidelines and PCI-DSS Level 1 standards.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">4. No Third-Party Data Selling</h3>
          <p>
            We do not sell, rent, or trade patient health details, phone numbers, or demographic information
            to third-party marketing brokers or pharmaceutical advertisers.
          </p>
        </section>
      </div>
    </div>
  );
};
