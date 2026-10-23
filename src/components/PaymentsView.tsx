import React, { useState } from 'react';
import { Contract, PaymentMilestone } from '../types/contract';
import { getDaysRemaining } from '../services/storage';
import {
  CreditCard,
  AlertCircle,
  Clock,
  CheckCircle2,
  Send,
  Search,
  Filter,
  FileText,
  DollarSign,
  Building2,
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
} from 'lucide-react';

interface PaymentsViewProps {
  contracts: Contract[];
  onSelectContract: (contract: Contract) => void;
  onMarkMilestonePaid: (milestoneId: string) => void;
  onSendReminder: (milestone: PaymentMilestone) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  contracts,
  onSelectContract,
  onMarkMilestonePaid,
  onSendReminder,
}) => {
  const [filter, setFilter] = useState<'all' | 'overdue' | 'pending' | 'paid'>('all');
  const [search, setSearch] = useState('');

  // Flatten milestones
  const allMilestones: (PaymentMilestone & { contract: Contract })[] = [];
  contracts.forEach((c) => {
    c.paymentMilestones.forEach((m) => {
      allMilestones.push({ ...m, contract: c });
    });
  });

  // Calculate totals
  const totalPaidINR = allMilestones
    .filter((m) => m.status === 'paid' && m.currency === 'INR')
    .reduce((sum, m) => sum + m.amount, 0);

  const totalPendingINR = allMilestones
    .filter((m) => m.status === 'pending' && m.currency === 'INR')
    .reduce((sum, m) => sum + m.amount, 0);

  const totalOverdueINR = allMilestones
    .filter((m) => m.status === 'overdue' && m.currency === 'INR')
    .reduce((sum, m) => sum + m.amount, 0);

  const filtered = allMilestones.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.contractTitle.toLowerCase().includes(search.toLowerCase()) ||
      m.counterparty.toLowerCase().includes(search.toLowerCase()) ||
      m.invoiceNumber.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'all') return true;
    return m.status === filter;
  });

  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#006b5f]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#006b5f]">
            Financial Governance & Accounts
          </span>
        </div>
        <h1 className="text-2xl font-bold font-['Manrope'] text-slate-900 mt-1">
          Payment & Milestone Tracker
        </h1>
        <p className="text-xs text-slate-500">
          Monitor incoming disbursements, flag overdue invoices, and generate automated reminder notices for counterparties.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Collected / Settled</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-700">
              {formatCurrency(totalPaidINR)}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              Across all settled milestones
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Pending Receivables</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-600">
              {formatCurrency(totalPendingINR)}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              Scheduled milestone disbursements
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Critical Overdue</span>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-red-600">
              {formatCurrency(totalOverdueINR)}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              Invoices past agreed Net terms
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Payments' },
            { id: 'overdue', label: 'Overdue Alerts' },
            { id: 'pending', label: 'Pending Due' },
            { id: 'paid', label: 'Settled (Paid)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#0b1f33] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoice #, counterparty, contract..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#006b5f] focus:bg-white w-full sm:w-64"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Invoice # / Milestone</th>
                <th className="py-3 px-4">Associated Contract</th>
                <th className="py-3 px-4">Counterparty</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    No payment records found under this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((milestone) => {
                  const daysLeft = getDaysRemaining(milestone.dueDate);
                  const isPaid = milestone.status === 'paid';
                  const isOverdue = milestone.status === 'overdue' || (!isPaid && daysLeft < 0);

                  return (
                    <tr key={milestone.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{milestone.title}</div>
                        <span className="font-mono text-[11px] text-slate-400">
                          {milestone.invoiceNumber}
                        </span>
                        {milestone.notes && (
                          <div className="text-[11px] text-slate-500 italic mt-0.5 max-w-xs">
                            {milestone.notes}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <button
                          type="button"
                          onClick={() => onSelectContract(milestone.contract)}
                          className="font-medium text-slate-900 hover:text-[#006b5f] hover:underline text-left block truncate cursor-pointer"
                        >
                          {milestone.contractTitle}
                        </button>
                        <span className="font-mono text-[10px] text-slate-400">
                          {milestone.contract.code}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        <div className="font-medium">{milestone.counterparty}</div>
                        <span className="text-[11px] text-slate-400">
                          {milestone.contract.counterparty.email}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono tabular-nums">
                        <div className="text-slate-800">{milestone.dueDate}</div>
                        {!isPaid && (
                          <span
                            className={`text-[10px] font-bold block ${
                              isOverdue ? 'text-red-600' : 'text-slate-400'
                            }`}
                          >
                            {daysLeft < 0
                              ? `${Math.abs(daysLeft)} days late`
                              : daysLeft === 0
                              ? 'Due today'
                              : `${daysLeft} days remaining`}
                          </span>
                        )}
                        {isPaid && milestone.paidDate && (
                          <span className="text-[10px] text-emerald-600 block">
                            Paid {milestone.paidDate}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900 tabular-nums">
                        {formatCurrency(milestone.amount)}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                            isPaid
                              ? 'bg-emerald-100 text-emerald-800'
                              : isOverdue
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isOverdue && !isPaid ? 'Overdue' : milestone.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {!isPaid && (
                            <button
                              type="button"
                              onClick={() => onSendReminder(milestone)}
                              className="px-2.5 py-1 text-xs font-semibold text-[#006b5f] bg-[#006b5f]/10 hover:bg-[#006b5f]/20 rounded transition flex items-center gap-1 cursor-pointer"
                              title="Draft WhatsApp / Email Reminder"
                            >
                              <Send className="w-3 h-3" />
                              <span>Remind</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onMarkMilestonePaid(milestone.id)}
                            className={`px-2.5 py-1 text-xs font-semibold rounded transition cursor-pointer ${
                              isPaid
                                ? 'text-slate-600 hover:bg-slate-200 bg-slate-100'
                                : 'text-white bg-[#006b5f] hover:bg-[#00554c]'
                            }`}
                          >
                            {isPaid ? 'Undo' : 'Mark Paid'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
