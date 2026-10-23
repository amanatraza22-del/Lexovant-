import React, { useState } from 'react';
import { Contract, ContractType, PaymentMilestone } from '../types/contract';
import { X, Plus, Sparkles, Building2, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface ContractWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveContract: (newContract: Contract) => void;
}

export const ContractWizardModal: React.FC<ContractWizardModalProps> = ({
  isOpen,
  onClose,
  onSaveContract,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [type, setType] = useState<ContractType>('service_agreement');
  const [category, setCategory] = useState<Contract['category']>('Technology & SaaS');
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'client' | 'vendor' | 'freelancer' | 'partner'>('client');
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState(
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [renewalNoticeDays, setRenewalNoticeDays] = useState(30);
  const [governingLaw, setGoverningLaw] = useState('Courts of New Delhi, India');
  const [summary, setSummary] = useState('');

  // Initial milestone
  const [milestone1Title, setMilestone1Title] = useState('Kickoff & Deliverable 1');
  const [milestone1Amount, setMilestone1Amount] = useState('');
  const [milestone1Date, setMilestone1Date] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const handleTemplatePreselect = (selectedType: ContractType) => {
    setType(selectedType);
    if (selectedType === 'nda') {
      setTitle('Mutual Non-Disclosure & IP Protection Agreement');
      setCategory('Legal & IP');
      setValue('0');
      setSummary('Bilateral protection of proprietary source code, algorithms, business plans, and trade secrets.');
    } else if (selectedType === 'freelance_agreement') {
      setTitle('Independent Contractor & Technical Services Agreement');
      setCategory('Freelancers');
      setValue('250000');
      setMilestone1Amount('125000');
      setSummary('Freelance engineering engagement covering milestone acceptance, revision limits, and IP assignment upon full payment.');
    } else if (selectedType === 'service_agreement') {
      setTitle('Master Services Agreement (MSA)');
      setCategory('Technology & SaaS');
      setValue('600000');
      setMilestone1Amount('300000');
      setSummary('Enterprise professional service delivery with uptime SLAs, liability cap, and quarterly support terms.');
    } else if (selectedType === 'mou') {
      setTitle('Strategic Partnership & Research MoU');
      setCategory('Technology & SaaS');
      setValue('0');
      setSummary('Non-binding collaboration framework exploring joint product integration and intellectual property filing boundaries.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericValue = parseFloat(value) || 0;
    const contractId = `cnt-${Date.now().toString().slice(-4)}`;
    const randomCode = `LXV-2026-${Math.floor(100 + Math.random() * 900)}`;

    const initialMilestones: PaymentMilestone[] = [];
    if (parseFloat(milestone1Amount) > 0) {
      initialMilestones.push({
        id: `pm-${Date.now()}-1`,
        contractId,
        contractTitle: title,
        counterparty: orgName || contactName,
        title: milestone1Title || 'Phase 1 Settlement',
        amount: parseFloat(milestone1Amount),
        currency,
        dueDate: milestone1Date,
        status: 'pending',
        invoiceNumber: `INV-2026-${Math.floor(10 + Math.random() * 90)}`,
      });
    }

    const newContract: Contract = {
      id: contractId,
      code: randomCode,
      title,
      type,
      category,
      counterparty: {
        name: contactName,
        organization: orgName,
        email,
        phone,
        role,
      },
      value: numericValue,
      currency,
      status: 'active',
      startDate,
      expiryDate,
      autoRenewal,
      renewalNoticeDays,
      governingLaw,
      summary: summary || 'Standard business engagement under Indian commercial law.',
      clauses: [
        {
          title: 'Intellectual Property Vesting',
          description: 'IP transfers to client upon settlement of agreed milestone consideration.',
          riskLevel: 'low',
        },
        {
          title: 'Limitation of Liability',
          description: 'Liability capped at total consideration paid in previous 6 months.',
          riskLevel: 'low',
        },
        {
          title: 'Confidentiality & Non-Disclosure',
          description: 'Confidentiality covenants survive termination for 24 calendar months.',
          riskLevel: 'low',
        },
      ],
      paymentMilestones: initialMilestones,
      signedByCounterparty: false,
      signedByClient: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: [category, type.replace('_', ' ')],
    };

    onSaveContract(newContract);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0B1F33] to-[#0A263B] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#71f8e4] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contract Creation Wizard</span>
            </div>
            <h2 className="text-lg font-bold font-['Manrope'] text-white mt-0.5">
              Draft & Organize New Contract
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Template Fill Buttons */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-400 text-[11px] font-medium shrink-0">Pre-fill Template:</span>
          <button
            type="button"
            onClick={() => handleTemplatePreselect('nda')}
            className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:border-[#006b5f] text-slate-800 font-medium whitespace-nowrap transition cursor-pointer"
          >
            Mutual NDA
          </button>
          <button
            type="button"
            onClick={() => handleTemplatePreselect('freelance_agreement')}
            className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:border-[#006b5f] text-slate-800 font-medium whitespace-nowrap transition cursor-pointer"
          >
            Freelancer Agreement
          </button>
          <button
            type="button"
            onClick={() => handleTemplatePreselect('service_agreement')}
            className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:border-[#006b5f] text-slate-800 font-medium whitespace-nowrap transition cursor-pointer"
          >
            Service Agreement (MSA)
          </button>
          <button
            type="button"
            onClick={() => handleTemplatePreselect('mou')}
            className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:border-[#006b5f] text-slate-800 font-medium whitespace-nowrap transition cursor-pointer"
          >
            Strategic MoU
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* Contract Title & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">
                Contract Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Master Services Agreement for Software Architecture"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#006b5f] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Agreement Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ContractType)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#006b5f] focus:bg-white"
              >
                <option value="service_agreement">Service Agreement (MSA)</option>
                <option value="freelance_agreement">Freelancer Agreement</option>
                <option value="nda">Non-Disclosure Agreement (NDA)</option>
                <option value="mou">Memorandum of Understanding (MoU)</option>
                <option value="ip_assignment">IP Assignment Deed</option>
                <option value="commercial_lease">Commercial Term Sheet</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Folder / Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#006b5f] focus:bg-white"
              >
                <option value="Technology & SaaS">Technology & SaaS</option>
                <option value="Freelancers">Freelancers</option>
                <option value="Operations">Operations</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Legal & IP">Legal & IP</option>
              </select>
            </div>
          </div>

          {/* Counterparty Information */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-800 text-xs">Counterparty Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Entity / Company Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kuber Tech LLP"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:border-[#006b5f] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Primary Contact Person *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rohan Sharma"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:border-[#006b5f] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Contact Email *
                </label>
                <input
                  type="email"
                  placeholder="contact@entity.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:border-[#006b5f] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Counterparty Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:border-[#006b5f] outline-none"
                >
                  <option value="client">Client (We deliver, they pay)</option>
                  <option value="vendor">Vendor / Supplier (They deliver)</option>
                  <option value="freelancer">Freelancer / Contractor</option>
                  <option value="partner">Strategic Partner</option>
                </select>
              </div>
            </div>
          </div>

          {/* Financials & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Contract Value *
              </label>
              <div className="flex">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="px-2 py-2 text-xs bg-slate-200 border border-slate-300 rounded-l-lg font-mono font-bold"
                >
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                </select>
                <input
                  type="number"
                  placeholder="500000"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-l-0 border-slate-300 rounded-r-lg font-mono font-bold focus:outline-none focus:border-[#006b5f] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Effective Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-[#006b5f] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Expiry Date *
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-[#006b5f] focus:bg-white"
              />
            </div>
          </div>

          {/* Initial Payment Milestone Setup */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800 text-xs">Initial Payment Milestone (Optional)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-600 block mb-0.5">Milestone Label</label>
                <input
                  type="text"
                  placeholder="Phase 1 Advance"
                  value={milestone1Title}
                  onChange={(e) => setMilestone1Title(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-600 block mb-0.5">Amount ({currency})</label>
                <input
                  type="number"
                  placeholder="250000"
                  value={milestone1Amount}
                  onChange={(e) => setMilestone1Amount(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-600 block mb-0.5">Disbursement Due Date</label>
                <input
                  type="date"
                  value={milestone1Date}
                  onChange={(e) => setMilestone1Date(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-mono"
                />
              </div>
            </div>
          </div>

          {/* Summary / Scope */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Scope of Work & Commercial Summary *
            </label>
            <textarea
              placeholder="Describe deliverables, milestone triggers, special SLA covenants, or confidential scope..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              required
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#006b5f] focus:bg-white resize-none"
            />
          </div>

          {/* Legal Jurisdiction */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Governing Law & Seat of Arbitration *
            </label>
            <input
              type="text"
              placeholder="e.g. Courts of New Delhi, India"
              value={governingLaw}
              onChange={(e) => setGoverningLaw(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#006b5f] focus:bg-white"
            />
          </div>

          {/* Footer CTA */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#006b5f] hover:bg-[#00554c] rounded-lg shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              Save & Open Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
