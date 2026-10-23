import React, { useState } from 'react';
import { PaymentMilestone } from '../types/contract';
import { X, Send, Copy, Check, MessageSquare, Mail, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PaymentReminderModalProps {
  milestone: PaymentMilestone | null;
  onClose: () => void;
}

export const PaymentReminderModal: React.FC<PaymentReminderModalProps> = ({
  milestone,
  onClose,
}) => {
  if (!milestone) return null;

  const [tone, setTone] = useState<'polite' | 'firm' | 'statutory'>('firm');
  const [copiedType, setCopiedType] = useState<'wa' | 'mail' | null>(null);

  const formattedAmount = `₹${milestone.amount.toLocaleString('en-IN')}`;

  const getWhatsAppMessage = () => {
    if (tone === 'polite') {
      return `Hi ${milestone.counterparty}, this is a gentle check-in from Lexovant regarding Invoice ${milestone.invoiceNumber} for "${milestone.title}" (${formattedAmount}) due on ${milestone.dueDate}. Please let us know once the disbursement is cleared. Thank you!`;
    }
    if (tone === 'firm') {
      return `Dear ${milestone.counterparty}, this is an urgent reminder that payment for Invoice ${milestone.invoiceNumber} (${milestone.title} - ${formattedAmount}) is currently past due. Please confirm when the payment receipt will be shared today to avoid service delivery disruptions.`;
    }
    return `FORMAL NOTICE OF OVERDUE DISBURSEMENT: Invoice ${milestone.invoiceNumber} (${formattedAmount}) for ${milestone.contractTitle} was due on ${milestone.dueDate}. Under the terms of the agreement, overdue balances are subject to statutory interest at 1.5% per month. Please clear disbursement immediately.`;
  };

  const getEmailSubject = () => {
    if (tone === 'polite') {
      return `Follow-up: Invoice ${milestone.invoiceNumber} - ${milestone.title} [${formattedAmount}]`;
    }
    if (tone === 'firm') {
      return `URGENT: Outstanding Payment for Invoice ${milestone.invoiceNumber} [${formattedAmount}]`;
    }
    return `FORMAL NOTICE OF ARREARS: Overdue Settlement for Invoice ${milestone.invoiceNumber}`;
  };

  const getEmailBody = () => {
    return `Dear Accounts Department / ${milestone.counterparty},

We are writing to follow up on Invoice ${milestone.invoiceNumber} issued in relation to "${milestone.contractTitle}".

INVOICE SUMMARY:
- Deliverable / Milestone: ${milestone.title}
- Amount Payable: ${formattedAmount}
- Stated Due Date: ${milestone.dueDate}
- Status: OVERDUE

${
  tone === 'statutory'
    ? 'Pursuant to Clause 2 of our executed service agreement, undisputed payments exceeding agreed credit terms accrue simple interest at 1.5% per month until settled in full. Please remit the outstanding sum to our designated corporate banking channel.'
    : 'Kindly process this milestone disbursement at your earliest convenience or share the bank transfer transaction reference (UTR) once initiated.'
}

If you have already processed this disbursement, please disregard this notice and reply with the payment confirmation receipt.

Warm regards,
Finance & Legal Operations
Lexovant Contract Management`;
  };

  const handleCopy = (type: 'wa' | 'mail', content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150 text-xs">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#0B1F33] to-[#0A263B] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[#F4B860] text-[10px] font-bold uppercase tracking-wider">
              <Send className="w-3.5 h-3.5" />
              <span>Automated Accounts Reminder</span>
            </div>
            <h3 className="text-base font-bold font-['Manrope'] text-white mt-0.5">
              Draft Payment Notice for {milestone.invoiceNumber}
            </h3>
            <p className="text-[11px] text-slate-300">
              {milestone.counterparty} · {formattedAmount}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Tone Selector */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Reminder Escalation Tone:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTone('polite')}
                className={`py-1.5 px-2 rounded-lg border font-medium transition cursor-pointer text-center ${
                  tone === 'polite'
                    ? 'border-[#006b5f] bg-[#006b5f]/10 text-[#006b5f] font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                1. Gentle Follow-Up
              </button>
              <button
                type="button"
                onClick={() => setTone('firm')}
                className={`py-1.5 px-2 rounded-lg border font-medium transition cursor-pointer text-center ${
                  tone === 'firm'
                    ? 'border-[#006b5f] bg-[#006b5f]/10 text-[#006b5f] font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                2. Urgent Overdue
              </button>
              <button
                type="button"
                onClick={() => setTone('statutory')}
                className={`py-1.5 px-2 rounded-lg border font-medium transition cursor-pointer text-center ${
                  tone === 'statutory'
                    ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                3. Statutory Arrears
              </button>
            </div>
          </div>

          {/* WhatsApp Notice Box */}
          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                WhatsApp Message Draft
              </span>
              <button
                type="button"
                onClick={() => handleCopy('wa', getWhatsAppMessage())}
                className="text-[11px] font-semibold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedType === 'wa' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'wa' ? 'Copied!' : 'Copy WhatsApp'}</span>
              </button>
            </div>
            <p className="text-slate-700 bg-white p-3 rounded-lg border border-emerald-100 font-mono text-[11px] leading-relaxed select-all">
              {getWhatsAppMessage()}
            </p>
          </div>

          {/* Email Notice Box */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-600" />
                Formal Email Draft
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopy('mail', `Subject: ${getEmailSubject()}\n\n${getEmailBody()}`)
                }
                className="text-[11px] font-semibold text-[#006b5f] hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedType === 'mail' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'mail' ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
              <p className="font-bold text-slate-800 text-[11px]">Subject: {getEmailSubject()}</p>
              <pre className="font-['Inter'] text-[11px] text-slate-600 whitespace-pre-wrap select-all">
                {getEmailBody()}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
