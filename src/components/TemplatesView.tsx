import React, { useState } from 'react';
import { LegalTemplate, Contract } from '../types/contract';
import { LEGAL_TEMPLATES } from '../data/sampleData';
import {
  Sparkles,
  FileText,
  Copy,
  Download,
  Check,
  Plus,
  ShieldCheck,
  ArrowRight,
  Sliders,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface TemplatesViewProps {
  onConvertTemplateToContract: (contract: Contract) => void;
  onOpenConsultation: () => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onConvertTemplateToContract,
  onOpenConsultation,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<LegalTemplate>(LEGAL_TEMPLATES[0]);
  const [variables, setVariables] = useState<Record<string, string>>(
    LEGAL_TEMPLATES[0].defaultVariables
  );
  const [copied, setCopied] = useState(false);
  const [convertedToast, setConvertedToast] = useState(false);

  const handleSelectTemplate = (template: LegalTemplate) => {
    setSelectedTemplate(template);
    setVariables(template.defaultVariables);
  };

  const handleVariableChange = (key: string, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  const generatedText = selectedTemplate.rawTemplateText(variables);

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate.type}_lexovant_agreement.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCreateContract = () => {
    const contractId = `cnt-${Date.now().toString().slice(-4)}`;
    const randomCode = `LXV-2026-${Math.floor(100 + Math.random() * 900)}`;

    let numericVal = 0;
    if (variables.totalCompensation) {
      const match = variables.totalCompensation.replace(/[^0-9]/g, '');
      if (match) numericVal = parseInt(match, 10);
    } else if (variables.statutorySum) {
      const match = variables.statutorySum.replace(/[^0-9]/g, '');
      if (match) numericVal = parseInt(match, 10);
    }

    const newContract: Contract = {
      id: contractId,
      code: randomCode,
      title: `${selectedTemplate.title} - ${variables.partyTwoName || variables.contractorName || variables.clientName || 'Counterparty'}`,
      type: selectedTemplate.type,
      category: (selectedTemplate.type === 'nda' || selectedTemplate.type === 'ip_assignment')
        ? 'Legal & IP'
        : selectedTemplate.type === 'freelance_agreement'
        ? 'Freelancers'
        : 'Enterprise',
      counterparty: {
        name: variables.partyTwoSignatory || variables.contractorName || 'Authorized Signatory',
        organization: variables.partyTwoName || variables.clientName || 'Partner Entity',
        email: 'partner@enterprise.io',
        role: selectedTemplate.type === 'freelance_agreement' ? 'freelancer' : 'client',
      },
      value: numericVal,
      currency: 'INR',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      autoRenewal: false,
      renewalNoticeDays: 30,
      governingLaw: variables.governingJurisdiction || selectedTemplate.defaultJurisdiction,
      summary: selectedTemplate.description,
      clauses: selectedTemplate.keyClausesIncluded.map((c) => ({
        title: c,
        description: 'Enforceable under prevailing Indian commercial law and precedent.',
        riskLevel: 'low',
      })),
      paymentMilestones: numericVal > 0 ? [
        {
          id: `pm-${Date.now()}`,
          contractId,
          contractTitle: selectedTemplate.title,
          counterparty: variables.partyTwoName || variables.clientName || 'Counterparty',
          title: 'Initial Contract Execution Consideration',
          amount: numericVal,
          currency: 'INR',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pending',
          invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
        }
      ] : [],
      signedByCounterparty: false,
      signedByClient: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: ['Template Generated', selectedTemplate.type],
    };

    onConvertTemplateToContract(newContract);
    setConvertedToast(true);
    setTimeout(() => setConvertedToast(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006b5f]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#006b5f]">
              Battle-Tested Legal Frameworks
            </span>
          </div>
          <h1 className="text-2xl font-bold font-['Manrope'] text-slate-900 mt-1">
            Standard Contract Templates & Generator
          </h1>
          <p className="text-xs text-slate-500">
            Select, customize, and immediately deploy standardized Indian legal contracts.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenConsultation}
          className="px-3.5 py-2 rounded-lg bg-[#006b5f]/10 text-[#006b5f] hover:bg-[#006b5f]/20 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-[#006b5f]" />
          <span>Need Custom Drafting? (₹1,500+)</span>
        </button>
      </div>

      {convertedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Contract generated and successfully added to your active Contract Ledger!</span>
        </div>
      )}

      {/* Template Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {LEGAL_TEMPLATES.map((template) => {
          const isSelected = selectedTemplate.id === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => handleSelectTemplate(template)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'border-[#006b5f] bg-[#006b5f]/5 shadow-xs ring-1 ring-[#006b5f]'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                    isSelected ? 'text-[#006b5f]' : 'text-slate-400'
                  }`}
                >
                  {template.category.split('&')[0]}
                </span>
                <h4
                  className={`text-xs font-bold leading-tight ${
                    isSelected ? 'text-[#006b5f]' : 'text-slate-800'
                  }`}
                >
                  {template.title}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-400 block pt-1">
                {template.turnaroundEstimate}
              </span>
            </button>
          );
        })}
      </div>

      {/* Editor & Live Preview 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Parameters (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Sliders className="w-3.5 h-3.5 text-[#006b5f]" />
              <span>Customize Variables</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Manrope']">
              {selectedTemplate.title}
            </h3>
            <p className="text-xs text-slate-500">{selectedTemplate.description}</p>
          </div>

          {/* Form Fields for Variables */}
          <div className="space-y-3 text-xs">
            {Object.keys(variables).map((varKey) => {
              const label = varKey
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase());
              return (
                <div key={varKey}>
                  <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={variables[varKey]}
                    onChange={(e) => handleVariableChange(varKey, e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-[#006b5f] focus:bg-white outline-none"
                  />
                </div>
              );
            })}
          </div>

          {/* Key Clauses Checklist */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-800 block">
              Protective Clauses Embedded:
            </span>
            <div className="space-y-1.5 text-xs text-slate-600">
              {selectedTemplate.keyClausesIncluded.map((clause, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006b5f] shrink-0" />
                  <span>{clause}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Triggers */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={handleCreateContract}
              className="w-full py-2.5 px-4 rounded-lg bg-[#006b5f] hover:bg-[#00554c] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Convert to Managed Contract</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyText}
                className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .txt</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Formatted Document Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-medium text-slate-700">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Live Generated Legal Document</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              Indian Jurisdiction Standard
            </span>
          </div>

          <div className="p-6 overflow-y-auto max-h-[680px] bg-slate-50/40">
            <pre className="font-['Inter'] text-xs text-slate-800 whitespace-pre-wrap leading-relaxed select-text font-normal">
              {generatedText}
            </pre>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-slate-500 text-[11px] text-center">
            Lexovant templates provide general legal structure. For bespoke high-value transactions (&gt; ₹25L) or venture rounds, request direct counsel review.
          </div>
        </div>
      </div>
    </div>
  );
};
