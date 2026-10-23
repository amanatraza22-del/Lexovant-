import React, { useState } from 'react';
import { Contract, PaymentMilestone, ContractStatus } from '../types/contract';
import { getDaysRemaining } from '../services/storage';
import {
  X,
  FileText,
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  ShieldAlert,
  ArrowRight,
  Download,
  Copy,
  ExternalLink,
  CreditCard,
  Send,
  Sparkles,
} from 'lucide-react';

interface ContractModalProps {
  contract: Contract | null;
  onClose: () => void;
  onUpdateContract: (updated: Contract) => void;
  onOpenConsultation: () => void;
  onSendReminder: (milestone: PaymentMilestone) => void;
}

export const ContractModal: React.FC<ContractModalProps> = ({
  contract,
  onClose,
  onUpdateContract,
  onOpenConsultation,
  onSendReminder,
}) => {
  if (!contract) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'clauses' | 'actions'>('overview');
  const [copied, setCopied] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneAmount, setNewMilestoneAmount] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [showAddMilestone, setShowAddMilestone] = useState(false);

  const daysRemaining = getDaysRemaining(contract.expiryDate);
  const isExpiring = daysRemaining <= 30 && daysRemaining >= 0;
  const isCritical = daysRemaining <= 7 && daysRemaining >= 0;
  const isExpired = daysRemaining < 0;

  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleStatusChange = (newStatus: ContractStatus) => {
    onUpdateContract({
      ...contract,
      status: newStatus,
      updatedAt: new Date().toISOString().split('T')[0],
    });
  };

  const handleExtendExpiry = (daysToAdd: number) => {
    const current = new Date(contract.expiryDate);
    current.setDate(current.getDate() + daysToAdd);
    const newDateStr = current.toISOString().split('T')[0];

    onUpdateContract({
      ...contract,
      expiryDate: newDateStr,
      status: 'active',
      updatedAt: new Date().toISOString().split('T')[0],
    });
  };

  const handleToggleMilestonePaid = (milestoneId: string) => {
    const updatedMilestones = contract.paymentMilestones.map((m) => {
      if (m.id === milestoneId) {
        const isPaid = m.status === 'paid';
        return {
          ...m,
          status: isPaid ? ('pending' as const) : ('paid' as const),
          paidDate: isPaid ? undefined : new Date().toISOString().split('T')[0],
        };
      }
      return m;
    });

    onUpdateContract({
      ...contract,
      paymentMilestones: updatedMilestones,
      updatedAt: new Date().toISOString().split('T')[0],
    });
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle || !newMilestoneAmount || !newMilestoneDate) return;

    const newMilestone: PaymentMilestone = {
      id: `pm-${Date.now()}`,
      contractId: contract.id,
      contractTitle: contract.title,
      counterparty: contract.counterparty.organization || contract.counterparty.name,
      title: newMilestoneTitle,
      amount: parseFloat(newMilestoneAmount),
      currency: contract.currency,
      dueDate: newMilestoneDate,
      status: 'pending',
      invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
    };

    onUpdateContract({
      ...contract,
      paymentMilestones: [...contract.paymentMilestones, newMilestone],
      value: contract.value + parseFloat(newMilestoneAmount),
      updatedAt: new Date().toISOString().split('T')[0],
    });

    setNewMilestoneTitle('');
    setNewMilestoneAmount('');
    setNewMilestoneDate('');
    setShowAddMilestone(false);
  };

  const handleCopyText = () => {
    const text = `CONTRACT DOSSIER: ${contract.title} (${contract.code})
Counterparty: ${contract.counterparty.organization} / ${contract.counterparty.name} (${contract.counterparty.email})
Value: ${formatCurrency(contract.value)}
Status: ${contract.status}
Timeline: ${contract.startDate} to ${contract.expiryDate} (${daysRemaining} days remaining)
Governing Law: ${contract.governingLaw}

SUMMARY:
${contract.summary}

CLAUSES:
${contract.clauses.map((c) => `- ${c.title}: ${c.description}`).join('\n')}

PAYMENTS:
${contract.paymentMilestones.map((m) => `- ${m.title}: ${formatCurrency(m.amount)} (${m.status.toUpperCase()}) due ${m.dueDate}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="p-5 bg-gradient-to-r from-[#0B1F33] to-[#0A263B] text-white flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-white/90">
                {contract.code}
              </span>
              <span className="text-xs text-[#71f8e4] font-medium">
                {contract.category}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-['Manrope'] text-white">
              {contract.title}
            </h2>
            <p className="text-xs text-slate-300">
              Counterparty: <strong className="text-white">{contract.counterparty.organization || contract.counterparty.name}</strong> ({contract.counterparty.name})
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'overview', label: 'Overview & Terms' },
            {
              id: 'payments',
              label: `Payment Schedule (${contract.paymentMilestones.length})`,
            },
            {
              id: 'clauses',
              label: `Clauses & Risk (${contract.clauses.length})`,
            },
            { id: 'actions', label: 'Actions & Renewal' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-3 font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#006b5f] text-[#006b5f]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Status and Highlights Banner */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Contract Status</span>
                  <div className="mt-1 flex items-center gap-2">
                    <select
                      value={contract.status}
                      onChange={(e) => handleStatusChange(e.target.value as ContractStatus)}
                      className="bg-white border border-slate-300 rounded-md px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#006b5f]"
                    >
                      <option value="draft">Draft</option>
                      <option value="under_review">Under Review</option>
                      <option value="active">Active</option>
                      <option value="expiring">Expiring Soon</option>
                      <option value="completed">Completed</option>
                      <option value="terminated">Terminated</option>
                    </select>
                    {isCritical && (
                      <span className="text-xs text-red-600 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Expires in {daysRemaining} days!
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Committed Value</span>
                  <span className="font-mono text-base font-extrabold text-slate-900">
                    {contract.value > 0 ? formatCurrency(contract.value) : 'Non-Monetary'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Signatures</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Client Signed
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-medium ${
                        contract.signedByCounterparty
                          ? 'text-emerald-700 bg-emerald-50'
                          : 'text-amber-700 bg-amber-50'
                      }`}
                    >
                      {contract.signedByCounterparty ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Counterparty Signed
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-600" /> Pending Counterparty
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Description */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Contract Purpose & Scope
                </h4>
                <p className="text-slate-600 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
                  {contract.summary}
                </p>
              </div>

              {/* Counterparty & Jurisdiction Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <h4 className="font-bold text-slate-800 text-xs">Counterparty Details</h4>
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p><strong>Entity:</strong> {contract.counterparty.organization || 'Individual'}</p>
                    <p><strong>Primary Contact:</strong> {contract.counterparty.name}</p>
                    <p><strong>Email:</strong> {contract.counterparty.email}</p>
                    {contract.counterparty.phone && <p><strong>Phone:</strong> {contract.counterparty.phone}</p>}
                    <p><strong>Role:</strong> {contract.counterparty.role.toUpperCase()}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <h4 className="font-bold text-slate-800 text-xs">Timeline & Governing Law</h4>
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p><strong>Effective Date:</strong> {contract.startDate}</p>
                    <p><strong>Expiry Date:</strong> {contract.expiryDate} ({daysRemaining} days left)</p>
                    <p><strong>Auto-Renewal:</strong> {contract.autoRenewal ? `Yes (${contract.renewalNoticeDays}d notice)` : 'No'}</p>
                    <p><strong>Jurisdiction:</strong> {contract.governingLaw}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-400 text-xs">Tags:</span>
                {contract.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Payment Milestones & Invoices</h4>
                  <p className="text-xs text-slate-500">
                    Track progressive deliverables, mark paid disbursements, and issue reminder notices.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddMilestone(!showAddMilestone)}
                  className="px-3 py-1.5 rounded-lg bg-[#006b5f] text-white text-xs font-semibold flex items-center gap-1 hover:bg-[#00554c] transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
              </div>

              {/* Add Milestone Form */}
              {showAddMilestone && (
                <form
                  onSubmit={handleAddMilestone}
                  className="p-4 rounded-xl border border-[#006b5f]/30 bg-slate-50 space-y-3"
                >
                  <h5 className="font-bold text-slate-800 text-xs">New Payment Milestone</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="text-[11px] text-slate-600 font-medium block mb-1">
                        Milestone Title *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Phase 2 Demo"
                        value={newMilestoneTitle}
                        onChange={(e) => setNewMilestoneTitle(e.target.value)}
                        required
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:border-[#006b5f] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-600 font-medium block mb-1">
                        Amount ({contract.currency}) *
                      </label>
                      <input
                        type="number"
                        placeholder="100000"
                        value={newMilestoneAmount}
                        onChange={(e) => setNewMilestoneAmount(e.target.value)}
                        required
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:border-[#006b5f] outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-600 font-medium block mb-1">
                        Due Date *
                      </label>
                      <input
                        type="date"
                        value={newMilestoneDate}
                        onChange={(e) => setNewMilestoneDate(e.target.value)}
                        required
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:border-[#006b5f] outline-none font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddMilestone(false)}
                      className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-xs font-semibold bg-[#006b5f] text-white rounded hover:bg-[#00554c]"
                    >
                      Save Milestone
                    </button>
                  </div>
                </form>
              )}

              {/* Milestones List */}
              {contract.paymentMilestones.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                  No payment milestones configured for this contract. Click "Add Milestone" to set one up.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {contract.paymentMilestones.map((milestone) => {
                    const isPaid = milestone.status === 'paid';
                    const isOverdue = milestone.status === 'overdue';

                    return (
                      <div
                        key={milestone.id}
                        className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isPaid
                            ? 'bg-slate-50 border-slate-200'
                            : isOverdue
                            ? 'bg-red-50/50 border-red-200'
                            : 'bg-white border-slate-200 shadow-xs'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-slate-400">
                              {milestone.invoiceNumber}
                            </span>
                            <span
                              className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                                isPaid
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isOverdue
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {milestone.status}
                            </span>
                          </div>
                          <h5 className="font-bold text-slate-900 text-sm">{milestone.title}</h5>
                          <p className="text-xs text-slate-500">
                            Due on <span className="font-mono font-medium">{milestone.dueDate}</span>
                            {milestone.paidDate && ` · Settled on ${milestone.paidDate}`}
                          </p>
                          {milestone.notes && (
                            <p className="text-xs text-red-700 font-medium italic mt-0.5">
                              Note: {milestone.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span className="font-mono font-bold text-base text-slate-900 tabular-nums">
                            {formatCurrency(milestone.amount)}
                          </span>

                          {!isPaid && (
                            <button
                              type="button"
                              onClick={() => onSendReminder(milestone)}
                              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                              title="Send Reminder draft"
                            >
                              <Send className="w-3 h-3 text-[#006b5f]" />
                              <span>Remind</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleToggleMilestonePaid(milestone.id)}
                            className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition ${
                              isPaid
                                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                : 'bg-[#006b5f] text-white hover:bg-[#00554c]'
                            }`}
                          >
                            {isPaid ? 'Mark Unpaid' : 'Mark as Paid'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'clauses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Key Clauses & Legal Risk Assessment</h4>
                  <p className="text-xs text-slate-500">
                    Forensic breakdown of covenants, liabilities, and intellectual property transfers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-3 py-1.5 rounded-lg bg-[#006b5f]/10 text-[#006b5f] text-xs font-semibold hover:bg-[#006b5f]/20 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F4B860]" />
                  <span>Request Advocate Audit</span>
                </button>
              </div>

              <div className="space-y-3">
                {contract.clauses.map((clause, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-900 text-sm">{clause.title}</h5>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          clause.riskLevel === 'high'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : clause.riskLevel === 'medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {clause.riskLevel || 'low'} risk
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {clause.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Legal Disclaimer Box */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-[#006b5f] shrink-0 mt-0.5" />
                <p>
                  Clauses are structured under standard Indian contract principles (Indian Contract Act, 1872). For bespoke cross-border terms, SIAC arbitration, or complex indemnification caps, consult Advocate Amanat Raza directly.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Contract Lifecycle & Renewal</h4>
                <p className="text-xs text-slate-500">
                  Execute renewals, terminate covenants, or export contract records.
                </p>
              </div>

              {/* Renewal Action Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Extend / Renew Expiry
                </h5>
                <p className="text-xs text-slate-600">
                  Current Expiry: <strong className="font-mono">{contract.expiryDate}</strong> ({daysRemaining} days left).
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleExtendExpiry(30)}
                    className="px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                  >
                    +30 Days Extension
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExtendExpiry(90)}
                    className="px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                  >
                    +3 Months Extension
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExtendExpiry(365)}
                    className="px-3 py-1.5 rounded-md bg-[#006b5f] text-white text-xs font-semibold hover:bg-[#00554c] transition cursor-pointer"
                  >
                    +1 Year Annual Renewal
                  </button>
                </div>
              </div>

              {/* Export & Copy */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Data Portability & Export
                </h5>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-[#006b5f]" />
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary & Clauses'}</span>
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-2">
                <h5 className="font-bold text-red-900 text-xs uppercase tracking-wider">
                  Termination
                </h5>
                <p className="text-xs text-red-700">
                  Mark this contract as terminated or void. Non-disclosure clauses will survive based on statutory covenants.
                </p>
                <button
                  type="button"
                  onClick={() => handleStatusChange('terminated')}
                  className="px-3 py-1.5 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition cursor-pointer"
                >
                  Terminate Contract
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Last updated: {contract.updatedAt}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
