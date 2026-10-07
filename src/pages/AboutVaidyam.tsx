import React from 'react';
import { ShieldCheck, HeartPulse, Award, Leaf, Users, Calendar } from 'lucide-react';

interface AboutVaidyamProps {
  onOpenBooking: () => void;
  onExplorePdc: () => void;
}

export const AboutVaidyam: React.FC<AboutVaidyamProps> = ({
  onOpenBooking,
  onExplorePdc,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 pb-24 text-left">
      {/* Intro Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] text-xs font-bold uppercase tracking-wider">
          <Leaf className="w-4 h-4" />
          <span>VAIDHYAM — Ancient Wisdom. Personal Healing.</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0C281B]">
          Authentic Classical Ayurveda for Modern Life
        </h1>
        <p className="text-base sm:text-lg text-[#143D27]/80 leading-relaxed font-light">
          Rooted in the ancient healing traditions of Kerala and guided by classical texts like
          Astanga Hridaya, VAIDHYAM was established to provide genuine, doctor-led healthcare without
          hyperbolic commercial claims.
        </p>
      </div>

      {/* Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">No Exaggerated Claims</h3>
          <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
            We do not promise instant miracles or universal cures. We practice authentic, methodical
            Ayurveda that respects your body’s natural regenerative pace and biological milestones.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E06D53]/10 text-[#C4573E] flex items-center justify-center">
            <HeartPulse className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">Maternal Focus</h3>
          <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
            Sutika Paricharya (post-delivery care) is our cornerstone discipline. We believe maternal
            rejuvenation in the 42 days following birth shapes a woman’s vitality for decades.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#0C281B]">Physician-Guided Care</h3>
          <p className="text-xs text-[#143D27]/80 leading-relaxed font-light">
            Every session, external herbal tailam, and internal rasayana is guided by qualified
            Ayurvedic physicians, ensuring utmost safety for both mother and nursing infant.
          </p>
        </div>
      </div>

      {/* Brand Identity & Sacred Emblem Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#F8F6EF] border border-[#164A3A]/15 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="bg-[#F8F6EF] p-4 rounded-3xl shadow-sm border border-[#164A3A]/10 max-w-xs w-full text-center">
              <img
                src="/src/assets/images/vaidhyam_brand_logo_1791379543112.jpg"
                alt="VAIDHYAM — Ancient Wisdom. Personal Healing."
                className="w-full h-auto rounded-2xl mx-auto"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C7A45A]">
              Brand Identity & Symbology
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#164A3A]">
              The Sacred Geometry of VAIDHYAM
            </h2>
            <p className="text-xs sm:text-sm text-[#202522]/80 leading-relaxed font-light">
              Our emblem is centered on an elegant symmetrical <strong>“V”</strong> sculpted from deep forest-green medicinal leaf contours, encasing a human-healing silhouette of upward-reaching arms that evoke young Ayurvedic healing flora.
            </p>
            <div className="space-y-2.5 text-xs text-[#202522]/80">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#C7A45A] mt-1.5 flex-shrink-0" />
                <span><strong>The Gold Orb:</strong> Represents Prana (life-force consciousness), healing vital energy, and celestial balance.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#164A3A] mt-1.5 flex-shrink-0" />
                <span><strong>The Mortar Vessel:</strong> The classical herbal bowl anchored with a thin muted-gold rim, embodying centuries of apothecary wisdom.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#6F963F] mt-1.5 flex-shrink-0" />
                <span><strong>The Rising Stem:</strong> A slender gold-and-green axis uniting clinical medicine with personal regenerative healing.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF8F5] border border-[#143D27]/10 space-y-6">
        <h2 className="font-serif text-3xl font-bold text-[#0C281B]">
          Bridging Vedic Wisdom with Modern Motherhood
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-[#143D27]/80 leading-relaxed font-light">
          <p>
            In traditional Kerala homes, the period following childbirth was treated as sacred. Mothers were
            tended to with warmed medicated baths, continuous herbal massages, specialized diets of
            nourishing grains and restorative lehyams, and shielded from environmental stresses.
          </p>
          <p>
            Today, nuclear households and fast-paced professional lives frequently deprive new mothers of
            this crucial period of recuperation. Vaidyam was founded to bridge this gap: offering
            flexible, structured postpartum programs either in our tranquil sanctuary retreat or directly
            at home through certified female therapists.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={onExplorePdc}
            className="px-6 py-3.5 bg-[#E06D53] hover:bg-[#C4573E] text-white rounded-xl text-xs font-semibold shadow transition-all"
          >
            Explore Post-Delivery Care Packages
          </button>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 bg-white border border-[#143D27]/20 text-[#0C281B] rounded-xl text-xs font-semibold hover:bg-[#FAF8F5] transition-all"
          >
            Book Clinical Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
