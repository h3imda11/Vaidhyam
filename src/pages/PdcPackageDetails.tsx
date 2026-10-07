import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Calendar,
  HeartPulse,
  Baby,
  Home,
  Utensils,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { getPdcPackageById } from '../services/dbService';
import { PdcPackage } from '../types';

interface PdcPackageDetailsProps {
  packageId: string;
  onBack: () => void;
  onBookPackage: (pkg: PdcPackage) => void;
}

export const PdcPackageDetails: React.FC<PdcPackageDetailsProps> = ({
  packageId,
  onBack,
  onBookPackage,
}) => {
  const [pkg, setPkg] = useState<PdcPackage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const found = await getPdcPackageById(packageId);
        setPkg(found);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [packageId]);

  if (loading) {
    return (
      <div className="py-24 text-center text-sm text-[#143D27]/60">
        Loading package details...
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center space-y-4">
        <p className="text-base text-[#143D27]">Package not found.</p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 bg-[#143D27] text-white rounded-xl text-xs font-semibold"
        >
          Return to Packages
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 text-left">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#143D27] hover:text-[#0C281B] bg-white px-3.5 py-2 rounded-xl border border-[#143D27]/10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Packages</span>
      </button>

      {/* Main card */}
      <div className="bg-white rounded-3xl border border-[#143D27]/10 shadow-sm overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#0C281B] text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E06D53]/20 text-[#E06D53] text-xs font-bold uppercase tracking-wider">
              <HeartPulse className="w-4 h-4" />
              <span>{pkg.durationDays} Days Structured Care Regimen</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold">{pkg.name}</h1>
                <p className="text-sm sm:text-base text-white/80 max-w-2xl mt-2 font-light">
                  {pkg.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-right flex-shrink-0">
                <span className="text-[11px] text-white/70 block uppercase tracking-wider">
                  Total Package Fee
                </span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overview grid */}
        <div className="p-8 sm:p-10 space-y-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#143D27]/10 space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#143D27]/70">
                <Clock className="w-4 h-4 text-[#2C6E49]" />
                <span>Duration</span>
              </div>
              <strong className="text-lg font-serif text-[#0C281B] block">
                {pkg.durationDays} Days
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#143D27]/10 space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#143D27]/70">
                <Sparkles className="w-4 h-4 text-[#2C6E49]" />
                <span>Therapy Sessions</span>
              </div>
              <strong className="text-lg font-serif text-[#0C281B] block">
                {pkg.sessionsCount} Sessions
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#143D27]/10 space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#143D27]/70">
                <ShieldCheck className="w-4 h-4 text-[#2C6E49]" />
                <span>Doctor Reviews</span>
              </div>
              <strong className="text-lg font-serif text-[#0C281B] block">
                {pkg.consultationsIncluded} Included
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#143D27]/10 space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#143D27]/70">
                <Baby className="w-4 h-4 text-[#E06D53]" />
                <span>Mother & Baby</span>
              </div>
              <strong className="text-lg font-serif text-[#0C281B] block">
                {pkg.motherAndBabyOption ? 'Included' : 'Mother Only'}
              </strong>
            </div>
          </div>

          {/* Details breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inclusions */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0C281B] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2C6E49]" />
                <span>Included Services & Therapies</span>
              </h3>
              <ul className="space-y-3">
                {pkg.inclusions.map((inc, i) => (
                  <li
                    key={i}
                    className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#143D27]/10 text-xs sm:text-sm text-[#0C281B] flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2C6E49] mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions & Living specifics */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#0C281B] flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-[#C4573E]" />
                  <span>Program Exclusions</span>
                </h3>
                <ul className="space-y-2.5">
                  {pkg.exclusions.map((exc, i) => (
                    <li
                      key={i}
                      className="p-3 rounded-xl bg-white border border-[#C4573E]/20 text-xs text-[#143D27]/80 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4573E] mt-1.5 flex-shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Setting & Food */}
              <div className="p-5 rounded-2xl bg-[#E8F5E9]/50 border border-[#2C6E49]/20 space-y-3">
                <h4 className="font-serif text-base font-bold text-[#0C281B]">
                  Sanctuary Environment & Nutrition
                </h4>
                <div className="flex items-start gap-3 text-xs text-[#0C281B]">
                  <Home className="w-4 h-4 text-[#2C6E49] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Accommodation: </strong>
                    <span>{pkg.accommodation}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-[#0C281B]">
                  <Utensils className="w-4 h-4 text-[#2C6E49] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Nutrition: </strong>
                    <span>{pkg.food}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-8 border-t border-[#143D27]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#143D27]/70">
              * Payment is verified securely. You may opt to pay online or confirm reservation at sanctuary.
            </div>

            <button
              onClick={() => onBookPackage(pkg)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E06D53] hover:bg-[#C4573E] text-white font-semibold px-8 py-4 rounded-xl shadow-md transition-all active:scale-[0.99] text-base"
            >
              <HeartPulse className="w-5 h-5" />
              <span>Enroll in {pkg.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
