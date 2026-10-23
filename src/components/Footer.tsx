import React from 'react';
import { Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenConsultation: () => void;
  onOpenBackendStatus: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenConsultation,
  onOpenBackendStatus,
}) => {
  return (
    <footer className="w-full bg-white border-t border-[#E2E8F0] pt-10 pb-24 md:pb-12 text-slate-700 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <span className="font-['Manrope'] text-2xl font-bold tracking-tight text-[#00050e] lowercase block">
              lexovant
            </span>
            <p className="text-slate-500 leading-relaxed text-xs">
              Clearer law. Stronger contracts. Smarter decisions. Built for founders, freelancers, and businesses approaching agreements with confidence.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[#006b5f] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Advocate Amanat Raza Chambers</span>
            </div>
          </div>

          {/* Practice & Tools */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Contract OS
            </h4>
            <div className="flex flex-col space-y-1.5 text-slate-500">
              <button
                type="button"
                onClick={() => onNavigateTab('dashboard')}
                className="text-left hover:text-[#006b5f] transition-colors cursor-pointer"
              >
                Contract Management Dashboard
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('contracts')}
                className="text-left hover:text-[#006b5f] transition-colors cursor-pointer"
              >
                Agreements Directory
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('payments')}
                className="text-left hover:text-[#006b5f] transition-colors cursor-pointer"
              >
                Payment & Milestone Tracker
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('expiries')}
                className="text-left hover:text-[#006b5f] transition-colors cursor-pointer"
              >
                Expiry Reminders & Renewals
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('templates')}
                className="text-left hover:text-[#006b5f] transition-colors cursor-pointer"
              >
                Standard Legal Templates
              </button>
            </div>
          </div>

          {/* Legal Research & Services */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Counsel & Advisory
            </h4>
            <div className="flex flex-col space-y-1.5 text-slate-500">
              <button
                type="button"
                onClick={() => onNavigateTab('guides')}
                className="text-left hover:text-[#006b5f] transition-colors cursor-pointer"
              >
                Legal Guides & Knowledge Base
              </button>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="text-left text-[#006b5f] font-semibold hover:underline cursor-pointer"
              >
                Book Advocate Consultation (₹1,500+)
              </button>
              <button
                type="button"
                onClick={onOpenBackendStatus}
                className="text-left hover:text-[#006b5f] transition-colors cursor-pointer"
              >
                Backend & Integration Status
              </button>
              <span className="text-slate-400">Supreme Court & Delhi High Court</span>
              <span className="text-slate-400">Enrolment: D/3892/2018</span>
            </div>
          </div>

          {/* Connect & Chamber Line */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Chamber Direct
            </h4>
            <div className="flex flex-col space-y-2 text-slate-600">
              <a
                href="mailto:amanatraza22@gmail.com"
                className="hover:text-[#006b5f] flex items-center gap-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#006b5f]" />
                <span>amanatraza22@gmail.com</span>
              </a>
              <a
                href="tel:+919199114077"
                className="hover:text-[#006b5f] flex items-center gap-2 transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#006b5f]" />
                <span>+91 91991 14077</span>
              </a>
              <p className="text-[11px] text-slate-400 pt-1">
                Strict Statutory Legal Privilege under Section 126 of the Indian Evidence Act / Section 132 BSA.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-400 text-[11px]">
          <p>© 2026 Lexovant. For general contract management & legal intelligence. Not formal substitute for individual courtroom appearance.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Use</span>
            <span className="hover:text-slate-600 cursor-pointer">Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
