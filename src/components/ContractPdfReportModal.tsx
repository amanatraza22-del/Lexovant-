import React from 'react';
import { Contract } from '../types/contract';
import { getDaysRemaining } from '../services/storage';
import { exportContractsToCSV } from '../utils/exportUtils';
import { X, Printer, Download, ShieldCheck, Building2, Calendar, FileText } from 'lucide-react';

interface ContractPdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contracts: Contract[];
}

export const ContractPdfReportModal: React.FC<ContractPdfReportModalProps> = ({
  isOpen,
  onClose,
  contracts,
}) => {
  if (!isOpen) return null;

  const totalValueINR = contracts
    .filter((c) => c.currency === 'INR')
    .reduce((sum, c) => sum + c.value, 0);

  const activeCount = contracts.filter((c) => c.status === 'active' || c.status === 'expiring').length;

  const allMilestones = contracts.flatMap((c) => c.paymentMilestones);
  const pendingAmount = allMilestones
    .filter((m) => m.status === 'pending' && m.currency === 'INR')
    .reduce((sum, m) => sum + m.amount, 0);
  const overdueAmount = allMilestones
    .filter((m) => m.status === 'overdue' && m.currency === 'INR')
    .reduce((sum, m) => sum + m.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    exportContractsToCSV(contracts);
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Action Bar (Hidden during Print) */}
        <div className="print:hidden p-4 bg-[#0B1F33] text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-['Manrope'] font-bold text-base">
              Executive Contract Dossier & Audit Report
            </span>
            <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-[#71f8e4]">
              {contracts.length} Agreements
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Download spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-[#006b5f] hover:bg-[#00554c] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div
          id="printable-report"
          className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm print:p-0 print:m-0 print:max-h-none print:overflow-visible"
        >
          {/* Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-[#00050e] lowercase">
                  lexovant
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Legal Tech & Contract Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Official Contract Portfolio Dossier & Compliance Audit Report
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-500 space-y-0.5">
              <p>
                <strong>Audit Date:</strong> {currentDate}
              </p>
              <p>
                <strong>Chamber Reference:</strong> LXV-AUDIT-2026
              </p>
              <p>
                <strong>Counsel In Charge:</strong> Adv. Amanat Raza (D/3892/2018)
              </p>
            </div>
          </div>

          {/* Portfolio Metric Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                Total Contracts
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">
                {contracts.length}
              </span>
              <span className="text-[10px] text-slate-500">{activeCount} currently active</span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                Committed Value
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">
                ₹{(totalValueINR / 100000).toFixed(2)}L
              </span>
              <span className="text-[10px] text-slate-500">₹{totalValueINR.toLocaleString('en-IN')} total</span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                Pending Receivables
              </span>
              <span className="text-xl font-bold font-mono text-amber-600 mt-1 block">
                ₹{(pendingAmount / 100000).toFixed(2)}L
              </span>
              <span className="text-[10px] text-slate-500">Scheduled milestones</span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                Overdue Invoices
              </span>
              <span className="text-xl font-bold font-mono text-red-600 mt-1 block">
                ₹{(overdueAmount / 100000).toFixed(2)}L
              </span>
              <span className="text-[10px] text-slate-500">Requiring immediate follow-up</span>
            </div>
          </div>

          {/* Contract Master Ledger Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Active Agreement Registry
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3">Contract Title</th>
                    <th className="py-2.5 px-3">Counterparty</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Value</th>
                    <th className="py-2.5 px-3">Expiry Date</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {contracts.map((c) => {
                    const days = getDaysRemaining(c.expiryDate);
                    return (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono font-semibold text-slate-800">
                          {c.code}
                        </td>
                        <td className="py-2 px-3 font-medium text-slate-900 max-w-xs">
                          {c.title}
                        </td>
                        <td className="py-2 px-3 text-slate-700">
                          {c.counterparty.organization || c.counterparty.name}
                        </td>
                        <td className="py-2 px-3 text-slate-600">{c.category}</td>
                        <td className="py-2 px-3 font-mono font-bold text-slate-900">
                          {c.value > 0 ? `₹${c.value.toLocaleString('en-IN')}` : 'Non-Monetary'}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-700">
                          {c.expiryDate}
                          <span className="text-[10px] text-slate-400 block">
                            {days < 0 ? 'Expired' : `${days}d left`}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span className="capitalize font-medium text-[11px]">
                            {c.status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Milestones & Receivables Schedule */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Accounts Receivable & Milestone Disbursements Schedule
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2 px-3">Invoice #</th>
                    <th className="py-2 px-3">Milestone Description</th>
                    <th className="py-2 px-3">Counterparty</th>
                    <th className="py-2 px-3">Due Date</th>
                    <th className="py-2 px-3">Amount</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allMilestones.map((m) => (
                    <tr key={m.id}>
                      <td className="py-2 px-3 font-mono text-slate-800">{m.invoiceNumber}</td>
                      <td className="py-2 px-3 font-medium text-slate-900">{m.title}</td>
                      <td className="py-2 px-3 text-slate-700">{m.counterparty}</td>
                      <td className="py-2 px-3 font-mono">{m.dueDate}</td>
                      <td className="py-2 px-3 font-mono font-bold">
                        ₹{m.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`font-bold uppercase text-[10px] ${
                            m.status === 'paid'
                              ? 'text-emerald-700'
                              : m.status === 'overdue'
                              ? 'text-red-700'
                              : 'text-amber-700'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal Certification and Privilege Notice */}
          <div className="pt-4 border-t border-slate-200 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-[#006b5f] shrink-0 mt-0.5" />
            <p>
              This document is prepared as an executive audit summary for corporate record-keeping under the supervisory protocols of Advocate Amanat Raza Chambers. All commercial covenants, intellectual property vesting terms, and billing summaries herein are privileged corporate records.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="print:hidden p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Tip: In the print dialog, select "Save as PDF" to save a clean PDF file.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
