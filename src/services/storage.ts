import { Contract, ConsultationBooking, PaymentMilestone } from '../types/contract';
import { INITIAL_CONTRACTS } from '../data/sampleData';

const STORAGE_KEYS = {
  CONTRACTS: 'lexovant_contracts_v1',
  BOOKINGS: 'lexovant_bookings_v1',
};

export const getStoredContracts = (): Contract[] => {
  if (typeof window === 'undefined') return INITIAL_CONTRACTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTRACTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(INITIAL_CONTRACTS));
      return INITIAL_CONTRACTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse stored contracts', err);
    return INITIAL_CONTRACTS;
  }
};

export const saveStoredContracts = (contracts: Contract[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(contracts));
  } catch (err) {
    console.error('Failed to save contracts to localStorage', err);
  }
};

export const getStoredBookings = (): ConsultationBooking[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredBookings = (bookings: ConsultationBooking[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (err) {
    console.error('Failed to save bookings', err);
  }
};

export const resetStoredData = (): Contract[] => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(INITIAL_CONTRACTS));
  }
  return INITIAL_CONTRACTS;
};

// Helper: Calculate days remaining until date
export const getDaysRemaining = (targetDateStr: string): number => {
  const target = new Date(targetDateStr);
  const now = new Date();
  // normalize to midnight
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Flatten all payment milestones across contracts
export const extractAllMilestones = (contracts: Contract[]): PaymentMilestone[] => {
  const milestones: PaymentMilestone[] = [];
  contracts.forEach((contract) => {
    if (contract.paymentMilestones && contract.paymentMilestones.length > 0) {
      contract.paymentMilestones.forEach((m) => {
        milestones.push({
          ...m,
          contractTitle: contract.title,
          counterparty: contract.counterparty.organization || contract.counterparty.name,
        });
      });
    }
  });
  return milestones;
};
