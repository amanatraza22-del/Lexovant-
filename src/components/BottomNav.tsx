import React from 'react';
import { LayoutDashboard, FileText, CreditCard, Sparkles, Calendar, BookOpen } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  overdueCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  overdueCount,
}) => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: LayoutDashboard,
    },
    {
      id: 'contracts',
      label: 'Contracts',
      icon: FileText,
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      badge: overdueCount > 0 ? overdueCount : undefined,
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: Sparkles,
    },
    {
      id: 'guides',
      label: 'Guides',
      icon: BookOpen,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-white border-t border-[#E2E8F0] shadow-[0_-2px_10px_rgba(11,31,51,0.06)] px-2 py-1.5 pb-safe flex justify-around items-center"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-1 relative transition-transform active:scale-95 ${
              isActive ? 'text-[#006b5f] font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.badge && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] tracking-tight mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
