import React from 'react';
import { ArrowLeft, ShieldAlert, ShieldCheck } from 'lucide-react';

interface MedicalDisclaimerProps {
  onBack?: () => void;
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({ onBack }) => {
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
          Clinical Notice
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#245B45]">
          Medical & Healthcare Disclaimer
        </h1>
        <p className="text-xs text-[#69766E]">
          Last Updated: October 2026 · Vaidhyam Healthcare
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E4EAE4] shadow-xs space-y-6 text-sm text-[#25352E] leading-relaxed">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
          <strong className="block font-semibold">Important Emergency Notice:</strong>
          Vaidhyam provides scheduled Ayurvedic consultations and supportive wellness care. We are not an emergency hospital or acute trauma unit. If you or your infant experience severe symptoms (e.g., chest pain, difficulty breathing, active haemorrhage, high fever in neonates), please dial emergency services or proceed immediately to the nearest hospital emergency department.
        </div>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#245B45]">
            1. Nature of Ayurvedic Practice
          </h2>
          <p>
            The consultations, educational content, dietary regimes, and herbal recommendations provided by Vaidhyam are rooted in traditional Ayurvedic medical principles (Astanga Hridaya, Charaka Samhita). They are tailored to individual clinical assessment and physical constitution (Prakriti and Vikriti).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#245B45]">
            2. Complementary & Supportive Role
          </h2>
          <p>
            Ayurvedic guidance is intended to support maternal wellbeing, vitality, and systemic recovery. It does not replace ongoing obstetric checkups, fetal ultrasound scans, routine blood testing, paediatric vaccinations, or surgical care managed by your allopathic medical team.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#245B45]">
            3. No Guarantees of Conception or Medical Outcomes
          </h2>
          <p>
            In strict compliance with medical ethics and healthcare advertising regulations, Vaidhyam does not claim that Ayurvedic therapies, detoxification, or Panchakarma cure infertility, guarantee conception, or ensure specific obstetric outcomes. Individual recovery rates and outcomes depend upon complex personal, genetic, and physiological factors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#245B45]">
            4. Supervision by Qualified Physicians
          </h2>
          <p>
            All consultations, internal Rasayana formulations, and intensive therapies are evaluated by university-qualified Ayurvedic physicians (BAMS / MD Ayu). Do not self-administer internal herbal formulations or undertake rigorous fasting without practitioner supervision.
          </p>
        </section>
      </div>
    </div>
  );
};
