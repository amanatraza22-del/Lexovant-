import React from 'react';
import {
  FileText,
  Plus,
  Server,
  Calendar,
  AlertTriangle,
  CreditCard,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenNewContract: () => void;
  onOpenBackendStatus: () => void;
  onOpenConsultation: () => void;
  overdueCount: number;
  expiringCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenNewContract,
  onOpenBackendStatus,
  onOpenConsultation,
  overdueCount,
  expiringCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'contracts', label: 'Contracts' },
    {
      id: 'payments',
      label: 'Payments',
      badge: overdueCount > 0 ? overdueCount : undefined,
      badgeColor: 'bg-red-500',
    },
    {
      id: 'expiries',
      label: 'Expiries',
      badge: expiringCount > 0 ? expiringCount : undefined,
      badgeColor: 'bg-amber-500',
    },
    { id: 'templates', label: 'Templates' },
    { id: 'guides', label: 'Legal Guides' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#00050e] hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className="text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-[#00050e] lowercase">
                lexovant
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#006b5f]/10 text-[#006b5f]">
                Contract OS
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, no wrap) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onSelectTab(link.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#0b1f33] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full text-white font-bold ${link.badgeColor}`}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBackendStatus}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Backend & Integration Status"
          >
            <Server className="w-3.5 h-3.5 text-[#006b5f]" />
            <span className="hidden lg:inline">Backend Status</span>
          </button>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#006b5f] bg-[#006b5f]/10 hover:bg-[#006b5f]/15 rounded-lg transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Counsel</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewContract}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#006b5f] hover:bg-[#005249] rounded-lg shadow-xs transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>New Contract</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-in fade-in duration-150">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                onSelectTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentTab === link.id
                  ? 'bg-[#0b1f33] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{link.label}</span>
              {link.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full text-white font-bold ${link.badgeColor}`}
                >
                  {link.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-[#006b5f] bg-[#006b5f]/10 rounded-lg flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Advocate Consultation</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenBackendStatus();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg flex items-center gap-2"
            >
              <Server className="w-4 h-4 text-[#006b5f]" />
              <span>Backend & Integration Blueprint</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
