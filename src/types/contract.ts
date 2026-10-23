export type ContractStatus = 'draft' | 'under_review' | 'active' | 'expiring' | 'completed' | 'terminated';

export type ContractType =
  | 'nda'
  | 'freelance_agreement'
  | 'service_agreement'
  | 'mou'
  | 'ip_assignment'
  | 'commercial_lease';

export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'disputed';

export interface PaymentMilestone {
  id: string;
  contractId: string;
  contractTitle: string;
  counterparty: string;
  title: string;
  amount: number;
  currency: 'INR' | 'USD';
  dueDate: string; // ISO date YYYY-MM-DD
  status: PaymentStatus;
  paidDate?: string;
  invoiceNumber: string;
  notes?: string;
}

export interface Contract {
  id: string;
  code: string; // e.g. LXV-2026-081
  title: string;
  type: ContractType;
  counterparty: {
    name: string;
    organization: string;
    email: string;
    phone?: string;
    role: 'client' | 'vendor' | 'freelancer' | 'partner';
  };
  value: number;
  currency: 'INR' | 'USD';
  category: 'Operations' | 'Freelancers' | 'Technology & SaaS' | 'Enterprise' | 'Legal & IP';
  status: ContractStatus;
  startDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  autoRenewal: boolean;
  renewalNoticeDays: number;
  governingLaw: string;
  summary: string;
  clauses: {
    title: string;
    description: string;
    riskLevel?: 'low' | 'medium' | 'high';
  }[];
  paymentMilestones: PaymentMilestone[];
  signedByCounterparty: boolean;
  signedByClient: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface LegalTemplate {
  id: string;
  type: ContractType;
  title: string;
  category: string;
  turnaroundEstimate: string;
  description: string;
  recommendedFor: string;
  keyClausesIncluded: string[];
  defaultJurisdiction: string;
  rawTemplateText: (vars: Record<string, string>) => string;
  defaultVariables: Record<string, string>;
}

export interface LegalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  author: {
    name: string;
    title: string;
    verified: boolean;
  };
  featured?: boolean;
  imageUrl?: string;
  caseMatter?: string;
  statuteInterplay?: string;
  takeaways?: string[];
  fullBody?: string[];
}

export interface ConsultationBooking {
  id: string;
  tier: 'strategy_30' | 'deepdive_60' | 'emergency_24h';
  tierName: string;
  fee: number;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  legalDomain: string;
  caseSummary: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'pending_review';
  createdAt: string;
}
