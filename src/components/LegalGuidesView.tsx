import React, { useState } from 'react';
import { LegalArticle } from '../types/contract';
import { LEGAL_ARTICLES } from '../data/sampleData';
import {
  BookOpen,
  Search,
  Filter,
  ArrowRight,
  Bookmark,
  Clock,
  ShieldCheck,
  X,
  ChevronRight,
  Gavel,
  CheckCircle,
  HelpCircle,
  Share2,
} from 'lucide-react';

interface LegalGuidesViewProps {
  onOpenConsultation: () => void;
}

export const LegalGuidesView: React.FC<LegalGuidesViewProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<LegalArticle | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['art-02']);

  const categories = [
    'All',
    'Property Law',
    'Supreme Court',
    'Land Records',
    'Intellectual Property',
    'BNSS 2024 / Procedure',
  ];

  const filteredArticles = LEGAL_ARTICLES.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'All') return true;
    return art.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#006b5f]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#006b5f]">
            Legal Research & Case Simplifications
          </span>
        </div>
        <h1 className="text-2xl font-bold font-['Manrope'] text-slate-900 mt-1">
          Legal Knowledge & Explainers
        </h1>
        <p className="text-xs text-slate-500">
          Plain-language Indian law explainers, case simplifications, and practical drafting guides curated by Advocate Amanat Raza.
        </p>
      </div>

      {/* Search and Prompt Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search clauses, rights, Supreme Court cases, Jamabandi, Zero FIR..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#006b5f] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-400 text-[11px] shrink-0 font-medium">Suggested:</span>
          {['Section 17A', 'Jamabandi', 'Zero FIR', 'NDA Checklist', 'Property Rights'].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setSearchQuery(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition cursor-pointer text-[11px]"
            >
              {prompt}
            </button>
          ))}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#006b5f] underline ml-auto shrink-0 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#006b5f] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Card (Property Law) */}
      {selectedCategory === 'All' && !searchQuery && (
        <section
          onClick={() => setActiveArticle(LEGAL_ARTICLES[0])}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1F33] via-[#0B2B3D] to-[#006b5f] text-white p-6 sm:p-7 shadow-md border border-[#0B2B3D] cursor-pointer group transition-transform active:scale-[0.99]"
        >
          <div className="absolute -right-12 -top-12 w-44 h-44 bg-[#71f8e4]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F4B860]/20 text-[#F4B860] text-[10px] font-bold uppercase tracking-wider">
                ★ Featured Property Guide
              </span>
              <button
                type="button"
                onClick={(e) => toggleBookmark(LEGAL_ARTICLES[0].id, e)}
                className="text-white/70 hover:text-white transition"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    bookmarkedIds.includes(LEGAL_ARTICLES[0].id) ? 'fill-current text-[#71f8e4]' : ''
                  }`}
                />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-['Manrope'] text-white group-hover:text-[#71f8e4] transition-colors leading-tight">
              {LEGAL_ARTICLES[0].title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-2xl leading-relaxed">
              {LEGAL_ARTICLES[0].summary}
            </p>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {LEGAL_ARTICLES[0].readTime}
                </span>
                <span>·</span>
                <span>{LEGAL_ARTICLES[0].date}</span>
              </div>
              <span className="text-[#71f8e4] font-semibold flex items-center gap-1 text-xs">
                Read Full Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => setActiveArticle(art)}
            className="bg-white rounded-xl border border-slate-200 hover:border-[#006b5f] hover:shadow-md transition-all cursor-pointer p-5 flex flex-col justify-between group space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006b5f] bg-[#006b5f]/10 px-2 py-0.5 rounded">
                  {art.category}
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(art.id, e)}
                  className="text-slate-400 hover:text-[#006b5f] transition"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      bookmarkedIds.includes(art.id) ? 'fill-current text-[#006b5f]' : ''
                    }`}
                  />
                </button>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006b5f] transition-colors leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>{art.readTime}</span>
              <span className="text-[#006b5f] font-semibold flex items-center gap-0.5">
                Read <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal / Drawer when an article is selected */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-[#006b5f]/10 text-[#006b5f] font-bold uppercase">
                  {activeArticle.category}
                </span>
                <span className="text-slate-400 font-mono">· {activeArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
              <h1 className="text-xl sm:text-2xl font-bold font-['Manrope'] text-slate-900 leading-tight">
                {activeArticle.title}
              </h1>

              {/* Author Byline */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0B1F33] text-white flex items-center justify-center font-bold text-xs">
                    AR
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                      <span>{activeArticle.author.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#006b5f]" />
                    </div>
                    <span className="text-[11px] text-slate-500">{activeArticle.author.title}</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{activeArticle.date}</span>
              </div>

              {/* Case Scaffolding if applicable */}
              {activeArticle.caseMatter && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Case Matter</span>
                    <span className="text-xs font-semibold text-slate-900">{activeArticle.caseMatter}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Statute Interplay</span>
                    <span className="text-xs font-semibold text-slate-900">{activeArticle.statuteInterplay}</span>
                  </div>
                </div>
              )}

              {/* Takeaways Checklist */}
              {activeArticle.takeaways && (
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#006b5f]" />
                    <span>Key Statutory Takeaways</span>
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700">
                    {activeArticle.takeaways.map((takeaway, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#006b5f] font-bold">✓</span>
                        <p className="leading-relaxed">{takeaway}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Article Prose */}
              {activeArticle.fullBody ? (
                <div className="space-y-3 leading-relaxed text-slate-700">
                  {activeArticle.fullBody.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              ) : (
                <p className="leading-relaxed text-slate-700">{activeArticle.summary}</p>
              )}

              {/* Consultation CTA Banner */}
              <div className="p-4 rounded-xl bg-[#0B1F33] text-white space-y-2.5">
                <h4 className="font-bold text-sm font-['Manrope'] text-[#F4B860]">
                  Facing a similar legal question or dispute?
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Advocate Amanat Raza provides direct 30-min and 60-min strategy consultations covering title search, criminal procedure (BNSS), and contract auditing.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveArticle(null);
                    onOpenConsultation();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#006b5f] hover:bg-[#00554c] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Book 30-Min Strategy Call (₹1,500)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
