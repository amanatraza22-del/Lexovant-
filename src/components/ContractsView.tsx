import React, { useState } from 'react';
import { Contract } from '../types/contract';
import { getDaysRemaining } from '../services/storage';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Clock,
  ArrowUpDown,
  LayoutGrid,
  List,
  CheckCircle,
  AlertTriangle,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ContractsViewProps {
  contracts: Contract[];
  onSelectContract: (contract: Contract) => void;
  onOpenNewContract: () => void;
}

export const ContractsView: React.FC<ContractsViewProps> = ({
  contracts,
  onSelectContract,
  onOpenNewContract,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'expiry' | 'value' | 'newest'>('expiry');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter logic
  const filtered = contracts.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.counterparty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.counterparty.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;
    return true;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'expiry') {
      return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
    }
    if (sortBy === 'value') {
      return b.value - a.value;
    }
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const categories = [
    'all',
    'Technology & SaaS',
    'Freelancers',
    'Operations',
    'Enterprise',
    'Legal & IP',
  ];

  const formatCurrency = (val: number) => {
    if (val === 0) return 'Non-Monetary';
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006b5f]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#006b5f]">
              Contract Lifecycle Management
            </span>
          </div>
          <h1 className="text-2xl font-bold font-['Manrope'] text-slate-900 mt-1">
            Contracts Directory
          </h1>
          <p className="text-xs text-slate-500">
            Organize agreements, oversee milestones, audit legal clauses, and monitor renewal deadlines.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNewContract}
          className="px-4 py-2.5 rounded-lg bg-[#006b5f] hover:bg-[#00554c] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Contract</span>
        </button>
      </div>

      {/* Control Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, organization, tag, or code (e.g., LXV-2026)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#006b5f] focus:bg-white"
            />
          </div>

          {/* Sort & View Mode */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#006b5f]"
              >
                <option value="expiry">Sort: Expiry Date (Earliest)</option>
                <option value="value">Sort: Total Value (Highest)</option>
                <option value="newest">Sort: Newly Created</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Strip: Statuses & Categories */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: 'All' },
              { id: 'active', label: 'Active' },
              { id: 'expiring', label: 'Expiring Soon' },
              { id: 'under_review', label: 'Under Review' },
              { id: 'completed', label: 'Completed' },
              { id: 'draft', label: 'Draft' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-[#0b1f33] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-slate-400 text-[11px]">Folder:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#006b5f]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contract Listing */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No contracts found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, clearing your filters, or create a brand new contract.
          </p>
          <button
            type="button"
            onClick={onOpenNewContract}
            className="px-4 py-2 rounded-lg bg-[#006b5f] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Contract</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((contract) => {
            const daysLeft = getDaysRemaining(contract.expiryDate);
            const isExpiring = daysLeft <= 30 && daysLeft >= 0;
            const isCritical = daysLeft <= 7 && daysLeft >= 0;
            const isExpired = daysLeft < 0;

            const paidMilestones = contract.paymentMilestones.filter((m) => m.status === 'paid');
            const totalMilestones = contract.paymentMilestones.length;

            return (
              <div
                key={contract.id}
                onClick={() => onSelectContract(contract)}
                className="bg-white rounded-xl border border-slate-200 hover:border-[#006b5f] hover:shadow-md transition-all cursor-pointer p-5 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Status Indicator Bar */}
                <div
                  className={`w-1 absolute left-0 top-0 bottom-0 ${
                    isCritical
                      ? 'bg-amber-500'
                      : contract.status === 'active'
                      ? 'bg-[#006b5f]'
                      : contract.status === 'completed'
                      ? 'bg-slate-300'
                      : 'bg-blue-500'
                  }`}
                />

                <div className="space-y-3 pl-1">
                  {/* Top line metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[11px] text-slate-400 font-medium">
                      {contract.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        contract.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : contract.status === 'expiring'
                          ? 'bg-amber-50 text-amber-700'
                          : contract.status === 'under_review'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {contract.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006b5f] transition-colors leading-snug">
                    {contract.title}
                  </h3>

                  {/* Counterparty & Category */}
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 font-medium text-slate-800">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {contract.counterparty.organization || contract.counterparty.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 pl-5">
                      Rep: {contract.counterparty.name} ({contract.counterparty.role})
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {contract.summary}
                  </p>

                  {/* Milestones status */}
                  {totalMilestones > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>Milestones Settled</span>
                        <span className="font-mono tabular-nums">
                          {paidMilestones.length} of {totalMilestones}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#006b5f] h-1.5 rounded-full transition-all"
                          style={{
                            width: `${(paidMilestones.length / totalMilestones) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Strip */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs pl-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Value</span>
                    <span className="font-mono tabular-nums font-bold text-slate-900">
                      {formatCurrency(contract.value)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Expiry</span>
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isCritical
                          ? 'text-red-600'
                          : isExpiring
                          ? 'text-amber-600'
                          : isExpired
                          ? 'text-slate-400 line-through'
                          : 'text-slate-700'
                      }`}
                    >
                      {daysLeft < 0 ? 'Expired' : `${daysLeft}d left`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Code / Title</th>
                <th className="py-3 px-4">Counterparty</th>
                <th className="py-3 px-4">Folder</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((contract) => {
                const daysLeft = getDaysRemaining(contract.expiryDate);
                return (
                  <tr
                    key={contract.id}
                    onClick={() => onSelectContract(contract)}
                    className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{contract.title}</div>
                      <span className="font-mono text-[11px] text-slate-400">{contract.code}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <div>{contract.counterparty.organization || contract.counterparty.name}</div>
                      <span className="text-[11px] text-slate-400">
                        {contract.counterparty.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{contract.category}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 tabular-nums">
                      {formatCurrency(contract.value)}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums">
                      <div>{contract.expiryDate}</div>
                      <span className="text-[10px] text-slate-400">
                        {daysLeft < 0 ? 'Expired' : `${daysLeft} days remaining`}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium capitalize ${
                          contract.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : contract.status === 'expiring'
                            ? 'bg-amber-50 text-amber-700'
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
                        className="text-xs font-semibold text-[#006b5f] hover:underline cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
