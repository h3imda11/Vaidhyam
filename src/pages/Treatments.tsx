import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Filter,
  AlertCircle
} from 'lucide-react';
import { getTreatments } from '../services/dbService';
import { Treatment } from '../types';

interface TreatmentsProps {
  onOpenBooking: () => void;
}

export const Treatments: React.FC<TreatmentsProps> = ({ onOpenBooking }) => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const list = await getTreatments();
        setTreatments(list.filter((t) => t.active));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = [
    'All',
    'Post-Delivery Care',
    "Women's Wellness",
    'Digestive Wellness',
    'Stress & Lifestyle',
    'Joint & Musculoskeletal',
    'Skin & Hair',
    'Ayurvedic Detox',
  ];

  const filteredTreatments =
    selectedCategory === 'All'
      ? treatments
      : treatments.filter((t) => t.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 pb-24 text-left">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Ayurvedic Clinical Therapies</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0C281B]">
          Authentic Ayurvedic Treatment Directory
        </h1>

        <p className="text-sm sm:text-base text-[#143D27]/80 leading-relaxed font-light">
          Each therapy at Vaidyam is administered according to strict classical protocols utilizing
          traditional medicated oils and herbal decoctions. Because suitability depends on your
          individual constitution and dosha imbalance, all major therapies require a preliminary
          physician assessment.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-[#143D27]/40 flex-shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#0C281B] text-white shadow-sm'
                : 'bg-white text-[#143D27]/80 border border-[#143D27]/10 hover:bg-[#FAF8F5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Treatments Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-sm text-[#143D27]/60">
          Loading therapies from database...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="p-7 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2C6E49]/10 text-[#2C6E49]">
                      {treatment.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#0C281B] mt-2">
                      {treatment.name}
                    </h3>
                  </div>

                  {treatment.price && (
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] text-[#143D27]/60 block uppercase">Fee</span>
                      <span className="font-serif text-2xl font-bold text-[#0C281B]">
                        ₹{treatment.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#143D27]/80 leading-relaxed font-light">
                  {treatment.shortDescription}
                </p>

                {/* Suitable For */}
                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#143D27]/5 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#143D27]/70 block">
                    Recommended For:
                  </span>
                  <p className="text-xs text-[#0C281B]">{treatment.suitableFor}</p>
                </div>

                {/* Treatment Approach */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#143D27]/70 block">
                    Classical Approach:
                  </span>
                  <p className="text-xs text-[#143D27]/80 leading-relaxed">
                    {treatment.approach}
                  </p>
                </div>

                {/* Metadata badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#143D27]/70">
                  {treatment.durationMinutes && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#2C6E49]" />
                      <span>{treatment.durationMinutes} Minutes Session</span>
                    </span>
                  )}
                  {treatment.requiresAssessment && (
                    <span className="flex items-center gap-1.5 text-[#C4573E]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Doctor Assessment Required</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#143D27]/10 flex items-center justify-between">
                <span className="text-[11px] text-[#143D27]/60">
                  Individual therapy plan formulated during consultation.
                </span>

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 bg-[#E06D53] hover:bg-[#C4573E] text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-sm transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
