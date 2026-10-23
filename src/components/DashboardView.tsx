import React, { useState } from 'react';
import { Contract, PaymentMilestone } from '../types/contract';
import { getDaysRemaining } from '../services/storage';
import { exportContractsToCSV } from '../utils/exportUtils';
import { ContractPdfReportModal } from './ContractPdfReportModal';
import {
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Search,
  ExternalLink,
  Plus,
  Send,
  Zap,
  PhoneCall,
  Calendar,
  Sparkles,
  Download,
  FileSpreadsheet,
  Printer,
  ChevronDown,
} from 'lucide-react';

interface DashboardViewProps {
  contracts: Contract[];
  onSelectContract: (contract: Contract) => void;
  onOpenNewContract: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenConsultation: () => void;
  onMarkMilestonePaid: (milestoneId: string) => void;
  onSendReminder: (milestone: PaymentMilestone) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  contracts,
  onSelectContract,
  onOpenNewContract,
  onNavigateTab,
  onOpenConsultation,
  onMarkMilestonePaid,
  onSendReminder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Compute Metrics
  const activeContracts = contracts.filter((c) => c.status === 'active' || c.status === 'expiring');
  const totalValueINR = contracts
    .filter((c) => c.currency === 'INR')
    .reduce((sum, c) => sum + c.value, 0);

  // Flatten milestones
  const allMilestones: (PaymentMilestone & { contract: Contract })[] = [];
  contracts.forEach((c) => {
    c.paymentMilestones.forEach((m) => {
      allMilestones.push({ ...m, contract: c });
    });
  });

  const pendingMilestones = allMilestones.filter((m) => m.status === 'pending');
  const overdueMilestones = allMilestones.filter((m) => m.status === 'overdue');
  const totalOverdueINR = overdueMilestones
    .filter((m) => m.currency === 'INR')
    .reduce((sum, m) => sum + m.amount, 0);
  const totalPendingINR = pendingMilestones
    .filter((m) => m.currency === 'INR')
    .reduce((sum, m) => sum + m.amount, 0);

  // Expiring contracts (<30 days)
  const expiringContracts = contracts.filter((c) => {
    if (c.status === 'completed' || c.status === 'terminated') return false;
    const days = getDaysRemaining(c.expiryDate);
    return days <= 30 && days >= -5;
  });

  const criticalExpiring = expiringContracts.filter((c) => getDaysRemaining(c.expiryDate) <= 7);

  // Filtered contracts for list
  const filteredContracts = contracts.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.counterparty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.counterparty.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  const formatCurrency = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleExportCSV = () => {
    exportContractsToCSV(filteredContracts.length > 0 ? filteredContracts : contracts);
    setExportNotice('Contracts exported to CSV successfully.');
    setShowExportMenu(false);
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleOpenPdf = () => {
    setIsPdfModalOpen(true);
    setShowExportMenu(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Export Confirmation Toast */}
      {exportNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{exportNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setExportNotice(null)}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1F33] via-[#091A2B] to-[#0D364A] text-white p-6 sm:p-8 shadow-md border border-[#0B1F33]">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#006b5f]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#14B8A6]/15 border border-[#14B8A6]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#71f8e4]" />
            <span className="text-xs font-semibold tracking-wider text-[#71f8e4] uppercase">
              Law · Research · Contract Intelligence
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Clearer law. Stronger contracts. Smarter decisions.
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            Lexovant streamlines contract lifecycle management for founders, freelancers, and growing ventures—tracking milestones, safeguarding cashflow, and providing forensic clause review.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenNewContract}
              className="px-4 py-2.5 rounded-lg bg-[#006b5f] hover:bg-[#00554c] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Contract</span>
            </button>

            {/* Export Portfolio Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#71f8e4]" />
                <span>Export Records</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {showExportMenu && (
                <div className="absolute left-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-slate-800 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-[#006b5f]" />
                    <div>
                      <span className="font-bold text-slate-900 block">Export as CSV</span>
                      <span className="text-[10px] text-slate-400">Spreadsheet table (.csv)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenPdf}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium cursor-pointer border-t border-slate-100"
                  >
                    <Printer className="w-4 h-4 text-[#006b5f]" />
                    <div>
                      <span className="font-bold text-slate-900 block">Print / Save as PDF</span>
                      <span className="text-[10px] text-slate-400">Executive audit report</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('templates')}
              className="px-4 py-2.5 rounded-lg border border-white/30 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F4B860]" />
              <span>Browse Legal Templates</span>
            </button>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#71f8e4]" />
              <span>Consult Advocate Amanat Raza</span>
            </button>
          </div>

          {/* Author Tagline */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F4B860]" />
              <span>
                Supervised by <strong className="text-white">Amanat Raza</strong>, Advocate | Supreme Court & High Court of Delhi Practice
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>✓ Plain-Language Audits</span>
              <span>✓ Statutory Privilege S.126</span>
              <span>✓ India-Focused Jurisdiction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Overdue & Expiry Callouts */}
      {(overdueMilestones.length > 0 || criticalExpiring.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overdueMilestones.length > 0 && (
            <div className="p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-900 flex items-start justify-between gap-3 shadow-xs">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-900">
                    {overdueMilestones.length} Overdue Payment{overdueMilestones.length > 1 ? 's' : ''} Detected ({formatCurrency(totalOverdueINR)})
                  </h4>
                  <p className="text-xs text-red-700 mt-0.5">
                    Late invoices harm cashflow. Send a 1-click professional reminder notice via WhatsApp or Email.
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateTab('payments')}
                      className="px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition cursor-pointer"
                    >
                      View & Remind
                    </button>
                    <button
                      type="button"
                      onClick={() => onMarkMilestonePaid(overdueMilestones[0].id)}
                      className="px-2.5 py-1 rounded-md bg-white border border-red-300 text-red-800 text-xs font-medium hover:bg-red-100 transition cursor-pointer"
                    >
                      Mark Latest Paid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {criticalExpiring.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start justify-between gap-3 shadow-xs">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">
                    {criticalExpiring.length} Contract{criticalExpiring.length > 1 ? 's' : ''} Expiring in &le; 7 Days
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    {criticalExpiring[0].title} is due to expire soon. Review renewal terms or execute contract extensions.
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateTab('expiries')}
                      className="px-3 py-1 rounded-md bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition cursor-pointer"
                    >
                      Review Expiries
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectContract(criticalExpiring[0])}
                      className="px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-800 text-xs font-medium hover:bg-amber-100 transition cursor-pointer"
                    >
                      Inspect Agreement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* KPI Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Contracts</span>
            <FileText className="w-4 h-4 text-[#006b5f]" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900">
              {activeContracts.length}
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">
              {contracts.length} total under management
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Portfolio Value</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900">
              {formatCurrency(totalValueINR)}
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">
              Aggregate committed value
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Pending Invoices</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-600">
              {formatCurrency(totalPendingINR)}
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">
              {pendingMilestones.length} upcoming milestones
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Overdue Amount</span>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-red-600">
              {formatCurrency(totalOverdueINR)}
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">
              {overdueMilestones.length} invoice{overdueMilestones.length > 1 ? 's' : ''} requiring action
            </span>
          </div>
        </div>
      </section>

      {/* Quick Access Legal Practice Bento */}
      <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-['Manrope'] text-base sm:text-lg font-bold text-slate-900">
              Ready-to-Use Legal Templates & Workflows
            </h3>
            <p className="text-xs text-slate-500">
              Pre-drafted, standardized templates with automated variable injection and clause guards.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('templates')}
            className="text-xs font-semibold text-[#006b5f] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>All Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => onNavigateTab('templates')}
            className="p-3.5 rounded-lg border border-slate-200 hover:border-[#006b5f] hover:bg-slate-50/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#006b5f] block mb-1">
                Confidentiality
              </span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006b5f] transition-colors">
                Mutual Non-Disclosure (NDA)
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Bilateral trade secret protection, proprietary IP exclusions, and Indian arbitration clauses.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#006b5f] font-medium">
              <span>Generate Draft</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('templates')}
            className="p-3.5 rounded-lg border border-slate-200 hover:border-[#006b5f] hover:bg-slate-50/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#006b5f] block mb-1">
                Talent & Remote
              </span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006b5f] transition-colors">
                Independent Freelancer Agreement
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Clear milestone milestones, scope creep hourly rate, kill fee, and IP transfer upon payment.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#006b5f] font-medium">
              <span>Generate Draft</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('templates')}
            className="p-3.5 rounded-lg border border-slate-200 hover:border-[#006b5f] hover:bg-slate-50/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#006b5f] block mb-1">
                Enterprise & B2B
              </span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006b5f] transition-colors">
                Master Service Agreement (MSA)
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Modular SOW framework, 1x liability cap, IP warranties, and employee non-solicitation covenants.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#006b5f] font-medium">
              <span>Generate Draft</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Contracts Management Directory / Table */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Controls Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-['Manrope'] text-base sm:text-lg font-bold text-slate-900">
              Contract Ledger & Agreements
            </h3>
            <p className="text-xs text-slate-500">
              Manage signatures, track remaining days, and oversee milestone disbursements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#006b5f] focus:bg-white w-36 sm:w-52"
              />
            </div>

            {/* Export CSV / PDF Buttons */}
            <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-0.5">
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Export contracts table to CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#006b5f]" />
                <span className="hidden sm:inline">CSV</span>
              </button>
              <button
                type="button"
                onClick={handleOpenPdf}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Print or Save official PDF Audit Dossier"
              >
                <Printer className="w-3.5 h-3.5 text-[#006b5f]" />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenNewContract}
              className="px-3 py-1.5 rounded-lg bg-[#006b5f] text-white text-xs font-semibold hover:bg-[#00554c] flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-slate-50/70 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Contracts' },
            { id: 'active', label: 'Active' },
            { id: 'expiring', label: 'Expiring Soon' },
            { id: 'under_review', label: 'Under Review' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-300 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-4">Contract / Code</th>
                <th className="py-2.5 px-4">Counterparty</th>
                <th className="py-2.5 px-4">Value</th>
                <th className="py-2.5 px-4">Expiry Date</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContracts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    No contracts found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredContracts.map((contract) => {
                  const daysRemaining = getDaysRemaining(contract.expiryDate);
                  const isExpiring = daysRemaining <= 30 && daysRemaining >= 0;
                  const isExpired = daysRemaining < 0;

                  return (
                    <tr
                      key={contract.id}
                      onClick={() => onSelectContract(contract)}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 group-hover:text-[#006b5f] transition-colors flex items-center gap-1.5">
                          <span>{contract.title}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">
                          {contract.code} · {contract.category}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900">
                          {contract.counterparty.organization || contract.counterparty.name}
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {contract.counterparty.name}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono tabular-nums font-semibold text-slate-900">
                        {contract.value > 0 ? formatCurrency(contract.value) : 'Non-Monetary'}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-mono tabular-nums text-slate-700">
                          {contract.expiryDate}
                        </div>
                        {isExpiring && (
                          <span className="text-[10px] text-amber-600 font-semibold block">
                            {daysRemaining === 0 ? 'Expires today' : `${daysRemaining} days left`}
                          </span>
                        )}
                        {isExpired && (
                          <span className="text-[10px] text-red-600 font-semibold block">
                            Expired
                          </span>
                        )}
                        {!isExpiring && !isExpired && (
                          <span className="text-[10px] text-slate-400 block">
                            {daysRemaining} days left
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium capitalize ${
                            contract.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : contract.status === 'expiring'
                              ? 'bg-amber-50 text-amber-700'
                              : contract.status === 'under_review'
                              ? 'bg-blue-50 text-blue-700'
                              : contract.status === 'completed'
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {contract.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectContract(contract);
                          }}
                          className="px-2.5 py-1 text-xs font-medium text-[#006b5f] hover:bg-[#006b5f]/10 rounded transition cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Advocate Legal Guides & Consultation Strip */}
      <section className="bg-gradient-to-br from-[#0B1F33] to-[#0A263B] text-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F4B860]">
            <ShieldCheck className="w-4 h-4" />
            <span>Advocate Amanat Raza Chamber Services</span>
          </div>
          <h3 className="text-xl font-bold font-['Manrope'] text-white">
            Need bespoke drafting, clause explainer, or contract negotiation?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Direct legal consultation for founders, contractors, and startups. Specialized in Indian commercial law, SIAC arbitration clauses, IP assignment, and regulatory defense under BNSS 2024.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#006b5f] text-white text-xs font-semibold hover:bg-[#005249] transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation (₹1,500+)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('guides')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Read Legal Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* PDF Executive Report Modal */}
      <ContractPdfReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        contracts={contracts}
      />
    </div>
  );
};
