import React, { useState } from 'react';
import { Contract } from '../types/contract';
import { getDaysRemaining } from '../services/storage';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Bell,
  RefreshCw,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface ExpiryTrackerViewProps {
  contracts: Contract[];
  onSelectContract: (contract: Contract) => void;
  onUpdateContract: (updated: Contract) => void;
  onOpenConsultation: () => void;
}

export const ExpiryTrackerView: React.FC<ExpiryTrackerViewProps> = ({
  contracts,
  onSelectContract,
  onUpdateContract,
  onOpenConsultation,
}) => {
  const [notificationPreferences, setNotificationPreferences] = useState({
    notify30Days: true,
    notify15Days: true,
    notify7Days: true,
    whatsappAlerts: true,
    emailAlerts: true,
  });
  const [savedSettingsToast, setSavedSettingsToast] = useState(false);

  // Group contracts
  const critical = contracts.filter((c) => {
    if (c.status === 'completed' || c.status === 'terminated') return false;
    const days = getDaysRemaining(c.expiryDate);
    return days <= 7 && days >= 0;
  });

  const approaching = contracts.filter((c) => {
    if (c.status === 'completed' || c.status === 'terminated') return false;
    const days = getDaysRemaining(c.expiryDate);
    return days > 7 && days <= 30;
  });

  const mediumTerm = contracts.filter((c) => {
    if (c.status === 'completed' || c.status === 'terminated') return false;
    const days = getDaysRemaining(c.expiryDate);
    return days > 30;
  });

  const expired = contracts.filter((c) => {
    if (c.status === 'completed' || c.status === 'terminated') return false;
    const days = getDaysRemaining(c.expiryDate);
    return days < 0;
  });

  const handleQuickRenew = (contract: Contract, daysToAdd: number) => {
    const current = new Date(contract.expiryDate);
    current.setDate(current.getDate() + daysToAdd);
    const newExpiry = current.toISOString().split('T')[0];

    onUpdateContract({
      ...contract,
      expiryDate: newExpiry,
      status: 'active',
      updatedAt: new Date().toISOString().split('T')[0],
    });
  };

  const handleSavePreferences = () => {
    setSavedSettingsToast(true);
    setTimeout(() => setSavedSettingsToast(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#006b5f]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#006b5f]">
            Lifecycle & Renewal Engine
          </span>
        </div>
        <h1 className="text-2xl font-bold font-['Manrope'] text-slate-900 mt-1">
          Contract Expiry & Renewal Reminders
        </h1>
        <p className="text-xs text-slate-500">
          Prevent unrenewed operations, track notice deadlines, and execute seamless contractual extensions.
        </p>
      </div>

      {/* Critical Countdown Bar (<7 Days) */}
      {critical.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-red-950 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-sm font-['Manrope'] text-red-900">
              URGENT: {critical.length} Contract{critical.length > 1 ? 's' : ''} Expiring in 7 Days or Less
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {critical.map((c) => {
              const days = getDaysRemaining(c.expiryDate);
              return (
                <div
                  key={c.id}
                  className="bg-white p-3.5 rounded-xl border border-red-200 shadow-xs flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-slate-400 font-semibold">{c.code}</span>
                      <span className="font-mono font-bold text-red-600 text-xs bg-red-50 px-2 py-0.5 rounded">
                        {days === 0 ? 'Expires Today' : `${days} days left`}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{c.title}</h4>
                    <p className="text-xs text-slate-500">
                      Counterparty: <strong>{c.counterparty.organization || c.counterparty.name}</strong>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectContract(c)}
                      className="text-xs font-semibold text-slate-700 hover:underline cursor-pointer"
                    >
                      Inspect Agreement
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleQuickRenew(c, 90)}
                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-700 text-white rounded hover:bg-emerald-800 transition cursor-pointer"
                      >
                        +90d Renew
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickRenew(c, 365)}
                        className="px-2.5 py-1 text-xs font-semibold bg-[#006b5f] text-white rounded hover:bg-[#005249] transition cursor-pointer"
                      >
                        +1yr Renew
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Approaching Expiry (<30 Days) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm">
              Expiring This Month ({approaching.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">Notice period recommended: 15–30 days</span>
        </div>

        {approaching.length === 0 ? (
          <div className="p-4 bg-white rounded-xl border border-slate-200 text-center text-xs text-slate-500">
            No agreements expiring in the 8–30 day window.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {approaching.map((c) => {
              const days = getDaysRemaining(c.expiryDate);
              return (
                <div
                  key={c.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all shadow-xs space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400">{c.code}</span>
                      <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                        {days} days remaining
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{c.title}</h4>
                    <p className="text-xs text-slate-500">
                      {c.counterparty.organization || c.counterparty.name} · {c.category}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-1">{c.summary}</p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => onSelectContract(c)}
                      className="font-medium text-[#006b5f] hover:underline cursor-pointer"
                    >
                      Review Terms
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleQuickRenew(c, 180)}
                        className="px-2.5 py-1 font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded transition cursor-pointer"
                      >
                        +6 Months
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickRenew(c, 365)}
                        className="px-2.5 py-1 font-semibold bg-[#006b5f] hover:bg-[#00554c] text-white rounded transition cursor-pointer"
                      >
                        +1 Year
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Long-Term Active Agreements */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Stable / Long-Term Agreements ({mediumTerm.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">&gt; 30 days remaining</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-4">Contract</th>
                <th className="py-2.5 px-4">Counterparty</th>
                <th className="py-2.5 px-4">Expiry Date</th>
                <th className="py-2.5 px-4">Days Left</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mediumTerm.map((c) => {
                const days = getDaysRemaining(c.expiryDate);
                return (
                  <tr
                    key={c.id}
                    onClick={() => onSelectContract(c)}
                    className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{c.title}</div>
                      <span className="font-mono text-[11px] text-slate-400">{c.code}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {c.counterparty.organization || c.counterparty.name}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-700">
                      {c.expiryDate}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-emerald-700 font-semibold">
                      {days} days
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectContract(c);
                        }}
                        className="text-xs font-semibold text-[#006b5f] hover:underline"
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
      </section>

      {/* Reminder Notification Settings Card */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#006b5f]" />
            <h3 className="font-bold text-slate-900 text-sm">
              Automated Expiry Alert Preferences
            </h3>
          </div>
          {savedSettingsToast && (
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Preferences Saved!
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500">
          Configure when Lexovant triggers alerts prior to contractual expiry. (Integrated with background scheduler / webhook simulator).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <label className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between cursor-pointer hover:bg-slate-100/50 transition">
            <span className="text-slate-800 font-medium">30 Days Prior Alert</span>
            <input
              type="checkbox"
              checked={notificationPreferences.notify30Days}
              onChange={(e) =>
                setNotificationPreferences({
                  ...notificationPreferences,
                  notify30Days: e.target.checked,
                })
              }
              className="rounded text-[#006b5f] focus:ring-[#006b5f]"
            />
          </label>

          <label className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between cursor-pointer hover:bg-slate-100/50 transition">
            <span className="text-slate-800 font-medium">15 Days Prior Alert</span>
            <input
              type="checkbox"
              checked={notificationPreferences.notify15Days}
              onChange={(e) =>
                setNotificationPreferences({
                  ...notificationPreferences,
                  notify15Days: e.target.checked,
                })
              }
              className="rounded text-[#006b5f] focus:ring-[#006b5f]"
            />
          </label>

          <label className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between cursor-pointer hover:bg-slate-100/50 transition">
            <span className="text-slate-800 font-medium">7 Days Final Notice</span>
            <input
              type="checkbox"
              checked={notificationPreferences.notify7Days}
              onChange={(e) =>
                setNotificationPreferences({
                  ...notificationPreferences,
                  notify7Days: e.target.checked,
                })
              }
              className="rounded text-[#006b5f] focus:ring-[#006b5f]"
            />
          </label>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="button"
            onClick={handleSavePreferences}
            className="px-4 py-1.5 rounded-lg bg-[#006b5f] hover:bg-[#00554c] text-white text-xs font-semibold cursor-pointer shadow-xs transition"
          >
            Save Alert Schedule
          </button>
        </div>
      </section>
    </div>
  );
};
