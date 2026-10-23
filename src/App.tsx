import React, { useState, useEffect } from 'react';
import { Contract, PaymentMilestone } from './types/contract';
import {
  getStoredContracts,
  saveStoredContracts,
  getDaysRemaining,
} from './services/storage';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { ContractsView } from './components/ContractsView';
import { ContractModal } from './components/ContractModal';
import { ContractWizardModal } from './components/ContractWizardModal';
import { PaymentsView } from './components/PaymentsView';
import { ExpiryTrackerView } from './components/ExpiryTrackerView';
import { TemplatesView } from './components/TemplatesView';
import { LegalGuidesView } from './components/LegalGuidesView';
import { BookConsultationModal } from './components/BookConsultationModal';
import { PaymentReminderModal } from './components/PaymentReminderModal';
import { BackendStatusModal } from './components/BackendStatusModal';
import { Footer } from './components/Footer';

export default function App() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isBackendStatusOpen, setIsBackendStatusOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [reminderMilestone, setReminderMilestone] = useState<PaymentMilestone | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const loaded = getStoredContracts();
    setContracts(loaded);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync state to storage
  const updateAndPersistContracts = (newContracts: Contract[]) => {
    setContracts(newContracts);
    saveStoredContracts(newContracts);
  };

  const handleUpdateContract = (updated: Contract) => {
    const updatedList = contracts.map((c) => (c.id === updated.id ? updated : c));
    updateAndPersistContracts(updatedList);
    setSelectedContract(updated);
    showToast(`Updated "${updated.title}" successfully.`);
  };

  const handleSaveNewContract = (newContract: Contract) => {
    const updatedList = [newContract, ...contracts];
    updateAndPersistContracts(updatedList);
    setSelectedContract(newContract);
    showToast(`Created contract "${newContract.title}" (${newContract.code}).`);
  };

  const handleMarkMilestonePaid = (milestoneId: string) => {
    let milestoneTitle = '';
    const updatedList = contracts.map((c) => {
      const hasMilestone = c.paymentMilestones.some((m) => m.id === milestoneId);
      if (!hasMilestone) return c;

      const updatedMilestones = c.paymentMilestones.map((m) => {
        if (m.id === milestoneId) {
          milestoneTitle = m.title;
          const isPaid = m.status === 'paid';
          return {
            ...m,
            status: isPaid ? ('pending' as const) : ('paid' as const),
            paidDate: isPaid ? undefined : new Date().toISOString().split('T')[0],
          };
        }
        return m;
      });

      return {
        ...c,
        paymentMilestones: updatedMilestones,
        updatedAt: new Date().toISOString().split('T')[0],
      };
    });

    updateAndPersistContracts(updatedList);
    showToast(`Payment status updated for "${milestoneTitle || 'Milestone'}".`);
  };

  const handleDataReset = () => {
    const fresh = getStoredContracts();
    setContracts(fresh);
    showToast('Demo contracts successfully restored.');
  };

  // Compute overdue count and expiring count for badges
  const overdueCount = contracts.reduce((acc, c) => {
    return (
      acc +
      c.paymentMilestones.filter((m) => {
        if (m.status === 'paid') return false;
        const days = getDaysRemaining(m.dueDate);
        return m.status === 'overdue' || days < 0;
      }).length
    );
  }, 0);

  const expiringCount = contracts.filter((c) => {
    if (c.status === 'completed' || c.status === 'terminated') return false;
    const days = getDaysRemaining(c.expiryDate);
    return days <= 30 && days >= -5;
  }).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1b1c1d]">
      {/* Top App Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenNewContract={() => setIsWizardOpen(true)}
        onOpenBackendStatus={() => setIsBackendStatusOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        overdueCount={overdueCount}
        expiringCount={expiringCount}
      />

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0B1F33] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in slide-in-from-top-2 duration-150">
          <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentTab === 'dashboard' && (
          <DashboardView
            contracts={contracts}
            onSelectContract={setSelectedContract}
            onOpenNewContract={() => setIsWizardOpen(true)}
            onNavigateTab={setCurrentTab}
            onOpenConsultation={() => setIsConsultationOpen(true)}
            onMarkMilestonePaid={handleMarkMilestonePaid}
            onSendReminder={setReminderMilestone}
          />
        )}

        {currentTab === 'contracts' && (
          <ContractsView
            contracts={contracts}
            onSelectContract={setSelectedContract}
            onOpenNewContract={() => setIsWizardOpen(true)}
          />
        )}

        {currentTab === 'payments' && (
          <PaymentsView
            contracts={contracts}
            onSelectContract={setSelectedContract}
            onMarkMilestonePaid={handleMarkMilestonePaid}
            onSendReminder={setReminderMilestone}
          />
        )}

        {currentTab === 'expiries' && (
          <ExpiryTrackerView
            contracts={contracts}
            onSelectContract={setSelectedContract}
            onUpdateContract={handleUpdateContract}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        )}

        {currentTab === 'templates' && (
          <TemplatesView
            onConvertTemplateToContract={handleSaveNewContract}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        )}

        {currentTab === 'guides' && (
          <LegalGuidesView
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={setCurrentTab}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenBackendStatus={() => setIsBackendStatusOpen(true)}
      />

      {/* Mobile Destination Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        overdueCount={overdueCount}
      />

      {/* Modals & Dialogs */}
      {selectedContract && (
        <ContractModal
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
          onUpdateContract={handleUpdateContract}
          onOpenConsultation={() => {
            setSelectedContract(null);
            setIsConsultationOpen(true);
          }}
          onSendReminder={(m) => setReminderMilestone(m)}
        />
      )}

      <ContractWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSaveContract={handleSaveNewContract}
      />

      <PaymentReminderModal
        milestone={reminderMilestone}
        onClose={() => setReminderMilestone(null)}
      />

      <BookConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <BackendStatusModal
        isOpen={isBackendStatusOpen}
        onClose={() => setIsBackendStatusOpen(false)}
        onDataReset={handleDataReset}
      />
    </div>
  );
}
