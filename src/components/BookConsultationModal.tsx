import React, { useState } from 'react';
import { ConsultationBooking } from '../types/contract';
import { saveStoredBookings, getStoredBookings } from '../services/storage';
import {
  X,
  ShieldCheck,
  Lock,
  Headphones,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Gavel,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookConsultationModal: React.FC<BookConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [tier, setTier] = useState<'strategy_30' | 'deepdive_60' | 'emergency_24h'>('deepdive_60');
  const [selectedDate, setSelectedDate] = useState('Today, 24 Oct');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [domain, setDomain] = useState('Contracts, SaaS & Startup Advisory');
  const [caseSummary, setCaseSummary] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const tierPrices = {
    strategy_30: { fee: 1500, name: '30-Min Strategy Call', duration: '30 Mins' },
    deepdive_60: { fee: 3000, name: '60-Min Comprehensive Case Assessment', duration: '60 Mins' },
    emergency_24h: { fee: 4500, name: 'Emergency 24h Turnaround', duration: 'Priority Slot' },
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail) return;

    const newBooking: ConsultationBooking = {
      id: `bk-${Date.now()}`,
      tier,
      tierName: tierPrices[tier].name,
      fee: tierPrices[tier].fee,
      clientName,
      clientPhone,
      clientEmail,
      legalDomain: domain,
      caseSummary,
      date: selectedDate,
      timeSlot: selectedSlot,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    const existing = getStoredBookings();
    saveStoredBookings([newBooking, ...existing]);
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0B1F33] to-[#0A263B] text-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#F4B860] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Supreme Court & High Court Practice</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-['Manrope'] text-white mt-1">
              Direct Chamber Consultation with Advocate Amanat Raza
            </h2>
            <p className="text-xs text-slate-300">
              Enrolment: D/3892/2018 · Strict Statutory Privilege under Section 126 Evidence Act
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookingConfirmed ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-['Manrope']">
              Consultation Slot Held & Confirmed
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{clientName}</strong>. Your session for <strong>{tierPrices[tier].name}</strong> ({selectedDate} at {selectedSlot}) has been registered with Advocate Amanat Raza’s chambers.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-md mx-auto space-y-1 text-left">
              <p><strong>Direct Desk:</strong> +91 91991 14077</p>
              <p><strong>Email:</strong> amanatraza22@gmail.com</p>
              <p><strong>Link:</strong> Encrypted Google Meet link & WhatsApp reminder will be sent to {clientPhone}.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-[#006b5f] text-white text-xs font-semibold hover:bg-[#00554c] transition"
            >
              Done & Return to Lexovant
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleConfirmBooking} className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1">
            {/* Trust Strip */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div>
                <span className="font-bold text-slate-800 block text-[11px]">BCI Verified</span>
                <span className="text-[10px] text-slate-500">Statutory Bar</span>
              </div>
              <div className="border-x border-slate-200">
                <span className="font-bold text-slate-800 block text-[11px]">100% Privileged</span>
                <span className="text-[10px] text-slate-500">Confidential S.126</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-[11px]">Direct Access</span>
                <span className="text-[10px] text-slate-500">No Middlemen</span>
              </div>
            </div>

            {/* Step 1: Select Consultation Scope */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  1. Select Consultation Scope
                </h4>
                <span className="text-[11px] text-[#006b5f] font-semibold">Transparent Flat Fee</span>
              </div>

              <div className="space-y-2">
                {/* 30 Mins */}
                <label
                  onClick={() => setTier('strategy_30')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    tier === 'strategy_30'
                      ? 'border-[#006b5f] bg-[#006b5f]/5 ring-1 ring-[#006b5f]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">30-Min Strategy Call</span>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.2 rounded">
                        Google Meet
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Fast legal orientation, single agreement query, or legal notice drafting advisory.
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="font-mono font-extrabold text-sm sm:text-base text-slate-900">
                      ₹1,500
                    </span>
                  </div>
                </label>

                {/* 60 Mins (Most recommended) */}
                <label
                  onClick={() => setTier('deepdive_60')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition relative ${
                    tier === 'deepdive_60'
                      ? 'border-[#006b5f] bg-[#006b5f]/5 ring-1 ring-[#006b5f]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="absolute -top-2 right-4 bg-[#0B1F33] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    ★ Most Recommended
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">
                        60-Min Comprehensive Case Assessment
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Line-by-line contract review, property dispute deep-dive, or appellate litigation blueprint.
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="font-mono font-extrabold text-sm sm:text-base text-slate-900">
                      ₹3,000
                    </span>
                  </div>
                </label>

                {/* Emergency 24h */}
                <label
                  onClick={() => setTier('emergency_24h')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    tier === 'emergency_24h'
                      ? 'border-[#006b5f] bg-[#006b5f]/5 ring-1 ring-[#006b5f]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">
                        Emergency 24h Turnaround
                      </span>
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.2 rounded font-bold">
                        Priority
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Urgent police summons/FIR, impending injunction, or time-sensitive contract closing.
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="font-mono font-extrabold text-sm sm:text-base text-slate-900">
                      ₹4,500
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 2: Choose Slot */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                2. Choose Consultation Slot (IST)
              </h4>

              {/* Dates */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {['Today, 24 Oct', 'Tomorrow, 25 Oct', 'Sat, 26 Oct', 'Sun, 27 Oct', 'Mon, 28 Oct'].map(
                  (d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        selectedDate === d
                          ? 'bg-[#0B1F33] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  )
                )}
              </div>

              {/* Times */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM', '06:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer text-center ${
                      selectedSlot === slot
                        ? 'bg-[#006b5f] text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Client Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                3. Client & Matter Overview
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Arvind Sharma"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-[#006b5f] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-[#006b5f] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Corporate / Personal Email *</label>
                  <input
                    type="email"
                    placeholder="arvind@entity.in"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-[#006b5f] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Primary Legal Domain *</label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-[#006b5f] focus:bg-white outline-none"
                  >
                    <option value="Contracts, SaaS & Startup Advisory">Contracts, SaaS & Startup Advisory</option>
                    <option value="Property, Title Deed & Land Revenue">Property, Title Deed & Land Revenue</option>
                    <option value="Criminal Defense, BNSS & Police Inquiries">Criminal Defense, BNSS & Police Inquiries</option>
                    <option value="Consumer Court & Commercial Disputes">Consumer Court & Commercial Disputes</option>
                    <option value="Intellectual Property, Trademark & Copyright">Intellectual Property, Trademark & Copyright</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Brief Description of Clauses or Dispute</label>
                <textarea
                  placeholder="Specify counterparty type, clauses of concern, relief sought, or pending police notices..."
                  value={caseSummary}
                  onChange={(e) => setCaseSummary(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-[#006b5f] focus:bg-white outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Consultation Fee</span>
                <span className="font-mono text-base font-extrabold text-slate-900">
                  ₹{tierPrices[tier].fee.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#006b5f] hover:bg-[#00554c] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
              >
                <span>Confirm & Reserve Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
