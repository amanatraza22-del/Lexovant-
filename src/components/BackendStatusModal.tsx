import React, { useState } from 'react';
import { Contract, ConsultationBooking } from '../types/contract';
import { getStoredContracts, getStoredBookings, resetStoredData } from '../services/storage';
import {
  X,
  Server,
  Database,
  Cloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  RotateCcw,
  ShieldCheck,
  Zap,
  Key,
} from 'lucide-react';

interface BackendStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReset: () => void;
}

export const BackendStatusModal: React.FC<BackendStatusModalProps> = ({
  isOpen,
  onClose,
  onDataReset,
}) => {
  if (!isOpen) return null;

  const [resetConfirm, setResetConfirm] = useState(false);

  const handleExportJSON = () => {
    const contracts = getStoredContracts();
    const bookings = getStoredBookings();
    const payload = {
      exportTimestamp: new Date().toISOString(),
      appName: 'Lexovant Contract OS',
      contracts,
      bookings,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lexovant_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    resetStoredData();
    onDataReset();
    setResetConfirm(true);
    setTimeout(() => {
      setResetConfirm(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto text-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0B1F33] to-[#0A263B] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#71f8e4] font-semibold uppercase tracking-wider">
              <Server className="w-3.5 h-3.5" />
              <span>System Architecture & Integration Blueprint</span>
            </div>
            <h2 className="text-lg font-bold font-['Manrope'] text-white mt-0.5">
              Frontend & Backend Boundary Overview
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Active Frontend Status */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <h4 className="font-bold text-emerald-950 text-xs sm:text-sm">
                1. Fully Functional Client-Side Architecture (Active)
              </h4>
            </div>
            <p className="text-emerald-900 leading-relaxed text-[11px] sm:text-xs">
              All UI controls, contract filtering, milestone tracking, expiry math, template generators, and consultation scheduling operate seamlessly with browser <code className="font-mono bg-white px-1 py-0.2 rounded border border-emerald-300">localStorage</code> persistence. Your data remains intact across refreshes.
            </p>
          </div>

          {/* Backend & Cloud Requirements */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
              <Cloud className="w-4 h-4 text-[#006b5f]" />
              <span>2. Production Backend Services Required for Scale</span>
            </h4>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    Persistent Database (Cloud Firestore / PostgreSQL)
                  </span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase">
                    Production DB
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Required for multi-user organizational accounts, concurrent contract editing, real-time counterparty status sync, and role-based access control (RBAC).
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    Background Cron Engine & Automated Reminders
                  </span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase">
                    Scheduled Jobs
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Required to execute daily server-side scans that dispatch automated WhatsApp/Email alerts 30, 15, and 7 days prior to expiry, even when no user has the web app open.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    Payment Gateway Webhooks (Razorpay / Stripe)
                  </span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase">
                    Financial Webhooks
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Required for generating live payment links and listening to server-side webhook events to automatically toggle milestones from "Pending" to "Paid".
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    Digital e-Signature Integration (Aadhaar eSign / DocuSign)
                  </span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase">
                    Statutory e-Sign
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Required for legally binding biometric or OTP-based Aadhaar electronic signatures recognized under Section 10A of the Information Technology Act, 2000.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    Encrypted Cloud Storage (GCS / AWS S3)
                  </span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase">
                    Blob Storage
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Required for archiving scanned non-judicial stamp papers, high-resolution land deeds, and multi-megabyte master agreement PDFs.
                </p>
              </div>
            </div>
          </div>

          {/* Data Portability Tools */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs">Data Portability & State Tools</h4>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleExportJSON}
                className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#006b5f]" />
                <span>Export State JSON Backup</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-red-600" />
                <span>Reset to Initial Demo Contracts</span>
              </button>
            </div>
            {resetConfirm && (
              <p className="text-[11px] text-emerald-700 font-bold">
                ✓ Demo data restored successfully!
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
