import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Sparkles,
  Clock,
  Heart,
  Share2,
  Calendar,
  CheckCircle2,
  Filter,
  Leaf,
  ArrowRight,
  X,
  User,
  Bookmark,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { getKnowledgeArticles, voteHelpfulArticle } from '../services/dbService';
import { KnowledgeArticle, KnowledgeCategory } from '../types';

interface KnowledgeBaseProps {
  onOpenBooking: () => void;
  onExplorePdc: () => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  onOpenBooking,
  onExplorePdc,
}) => {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDosha, setSelectedDosha] = useState<string>('All');
  const [onlyQuickTips, setOnlyQuickTips] = useState(false);
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function load() {
      try {
        const list = await getKnowledgeArticles();
        setArticles(list);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories: string[] = [
    'All',
    'Postnatal Care',
    "Women's Health",
    'Gut & Agni',
    'Daily Routine (Dinacharya)',
    'Botanical Science',
    'Mind & Sleep',
  ];

  const doshas = ['All', 'Vata', 'Pitta', 'Kapha', 'Tridoshic'];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (art.recommendedHerbOrOil &&
          art.recommendedHerbOrOil.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || art.category === selectedCategory;

      const matchesDosha =
        selectedDosha === 'All' ||
        art.dosha === selectedDosha ||
        art.dosha.includes(selectedDosha);

      const matchesQuick = !onlyQuickTips || art.readingTimeMinutes <= 3;

      return matchesSearch && matchesCategory && matchesDosha && matchesQuick;
    });
  }, [articles, searchQuery, selectedCategory, selectedDosha, onlyQuickTips]);

  const handleVote = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (votedIds.has(id)) return;
    const newCount = await voteHelpfulArticle(id);
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, helpfulCount: newCount } : a))
    );
    if (activeArticle && activeArticle.id === id) {
      setActiveArticle({ ...activeArticle, helpfulCount: newCount });
    }
    setVotedIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 pb-24 text-left">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalWebPage',
            name: 'VAIDHYAM Knowledge Base - Classical Ayurvedic Clinical Articles & Health Tips',
            description:
              'Searchable Ayurvedic knowledge base covering Sutika Paricharya postnatal recovery, Agni digestive fire, Shatavari lactation science, and dosha balance.',
            author: {
              '@type': 'Organization',
              name: 'VAIDHYAM Clinical Panel',
              jobTitle: 'Senior Ayurvedic Physicians',
            },
            publisher: {
              '@type': 'Organization',
              name: 'VAIDHYAM Ayurvedic Healthcare',
            },
          }),
        }}
      />

      {/* Header & Search Hero */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#123C31]/10 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7F35]/10 text-[#4F7F35] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Ayurvedic Clinical Knowledge Base</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B3D2E]">
            Evidence-Guided Ayurvedic Health & Wellness
          </h1>
          <p className="text-sm sm:text-base text-[#123C31]/80 leading-relaxed font-light">
            Searchable clinical articles, postpartum recovery tips, classical botanical guides, and
            daily Ayurvedic rituals authored by our senior Ayurvedic clinical physicians.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-2xl">
          <Search className="w-5 h-5 text-[#123C31]/40 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, herbs, postnatal recovery, or dosha tips (e.g. Abhyanga, Shatavari, Agni)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#123C31]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7F35] bg-[#FAF8F0]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-[#123C31]/50 hover:text-black"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-[#123C31]/40 flex-shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B3D2E] text-white shadow-sm'
                  : 'bg-[#FAF8F0] text-[#123C31]/80 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary filters (Dosha & Quick tips toggle) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#123C31]/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#123C31]/60 font-semibold">Dosha Focus:</span>
            {doshas.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDosha(d)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  selectedDosha === d
                    ? 'bg-[#4F7F35] text-white font-bold'
                    : 'text-[#123C31]/70 hover:bg-gray-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyQuickTips}
              onChange={(e) => setOnlyQuickTips(e.target.checked)}
              className="rounded text-[#4F7F35] focus:ring-[#4F7F35]"
            />
            <span className="font-semibold text-[#123C31]">Quick Reads Only (≤ 3 Mins)</span>
          </label>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#123C31]/70">
          Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
        </span>
        {searchQuery && (
          <span className="text-xs text-[#4F7F35] font-medium">
            Search results for "{searchQuery}"
          </span>
        )}
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="py-24 text-center text-xs text-[#123C31]/60">
          Loading Ayurvedic clinical articles...
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#123C31]/10 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-[#123C31]/30 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[#0B3D2E]">No articles found</h3>
          <p className="text-xs text-[#123C31]/70 max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDosha('All');
              setOnlyQuickTips(false);
            }}
            className="px-4 py-2 bg-[#0B3D2E] text-white rounded-xl text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="p-6 rounded-3xl bg-white border border-[#123C31]/10 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#4F7F35]/15 text-[#4F7F35]">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#123C31]/60">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readingTimeMinutes} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-[#0B3D2E] group-hover:text-[#4F7F35] transition-colors leading-snug">
                  {art.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-[#123C31]/80 leading-relaxed font-light line-clamp-3">
                  {art.summary}
                </p>

                {/* Quick Tip Box */}
                {art.keyTips && art.keyTips.length > 0 && (
                  <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#123C31]/5 text-xs text-[#0B3D2E] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C69A32] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Quick Clinical Tip:
                    </span>
                    <p className="text-[11px] text-[#123C31]/80 leading-normal line-clamp-2">
                      {art.keyTips[0]}
                    </p>
                  </div>
                )}

                {/* Herb / Formulation */}
                {art.recommendedHerbOrOil && (
                  <div className="text-[11px] text-[#123C31]/70 flex items-center gap-1.5 pt-1">
                    <Leaf className="w-3.5 h-3.5 text-[#4F7F35] flex-shrink-0" />
                    <span className="truncate">
                      <strong>Herbs: </strong>
                      {art.recommendedHerbOrOil}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-[#123C31]/10 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={(e) => handleVote(art.id, e)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                    votedIds.has(art.id)
                      ? 'bg-rose-50 text-rose-600 font-bold'
                      : 'text-[#123C31]/60 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                  title="Mark as helpful"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      votedIds.has(art.id) ? 'fill-rose-600' : ''
                    }`}
                  />
                  <span>{art.helpfulCount} helpful</span>
                </button>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4F7F35] group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* FULL ARTICLE DETAILED READING MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F0] rounded-3xl shadow-2xl border border-[#123C31]/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#0B3D2E] text-white p-6 flex items-start justify-between">
              <div className="space-y-1.5 pr-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C69A32] text-white uppercase">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-white/70">
                    • {activeArticle.readingTimeMinutes} min read
                  </span>
                  <span className="text-xs text-[#C69A32] font-semibold">
                    • {activeArticle.dosha} Balance
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  {activeArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-[#123C31]">
              {/* Author & Reference Crest */}
              <div className="p-4 bg-white rounded-2xl border border-[#123C31]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4F7F35]/15 text-[#4F7F35] flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-sm text-[#0B3D2E]">{activeArticle.author}</strong>
                    <span className="text-[#123C31]/70">{activeArticle.authorTitle}</span>
                  </div>
                </div>

                {activeArticle.classicalReference && (
                  <div className="text-right sm:border-l sm:pl-4 border-[#123C31]/10 text-[11px] text-[#123C31]/70">
                    <span className="block font-bold text-[#C69A32]">Classical Text Citation:</span>
                    <span className="italic">{activeArticle.classicalReference}</span>
                  </div>
                )}
              </div>

              {/* Key Takeaways & Clinical Tips */}
              {activeArticle.keyTips && activeArticle.keyTips.length > 0 && (
                <div className="p-5 bg-[#E9F2E7] rounded-2xl border border-[#4F7F35]/20 space-y-2.5">
                  <h4 className="font-serif text-lg font-bold text-[#0B3D2E] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C69A32]" />
                    <span>Clinical Actionable Tips</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#123C31] leading-relaxed">
                    {activeArticle.keyTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7F35] flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Content Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#123C31]/90 font-light">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Recommended Herbs Card */}
              {activeArticle.recommendedHerbOrOil && (
                <div className="p-4 bg-white rounded-2xl border border-[#123C31]/10 space-y-1 text-xs">
                  <strong className="text-[#0B3D2E] block text-[11px] uppercase tracking-wider">
                    Classical Preparations Referenced:
                  </strong>
                  <p className="text-[#123C31]/80">{activeArticle.recommendedHerbOrOil}</p>
                </div>
              )}

              {/* Action Banner to Consult or Book PDC */}
              <div className="p-6 rounded-2xl bg-[#0B3D2E] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-left">
                  <h4 className="font-serif text-lg font-bold">
                    Need Personalized Guidance for Your Health?
                  </h4>
                  <p className="text-xs text-white/70">
                    Consult our Ayurvedic physician for an individualized Prakriti and recovery plan.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      setActiveArticle(null);
                      onOpenBooking();
                    }}
                    className="px-5 py-2.5 bg-[#E06D53] hover:bg-[#C4573E] text-white rounded-xl text-xs font-semibold shadow transition-all"
                  >
                    Book Consultation
                  </button>
                  {activeArticle.category === 'Postnatal Care' && (
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        onExplorePdc();
                      }}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all"
                    >
                      PDC Packages
                    </button>
                  )}
                </div>
              </div>

              {/* Article Footer & Helpful vote */}
              <div className="flex items-center justify-between pt-2 border-t border-[#123C31]/10 text-xs">
                <span className="text-[#123C31]/60">Published on {activeArticle.publishedAt}</span>

                <button
                  onClick={(e) => handleVote(activeArticle.id, e)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                    votedIds.has(activeArticle.id)
                      ? 'bg-rose-100 text-rose-700 font-bold'
                      : 'bg-white border border-[#123C31]/20 text-[#123C31] hover:bg-rose-50'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      votedIds.has(activeArticle.id) ? 'fill-rose-600' : ''
                    }`}
                  />
                  <span>
                    {activeArticle.helpfulCount} people found this helpful
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
