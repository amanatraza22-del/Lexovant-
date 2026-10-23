import { Contract, LegalTemplate, LegalArticle } from '../types/contract';

export const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 'cnt-01',
    code: 'LXV-2026-081',
    title: 'Master Service Agreement (Cloud Infrastructure & AI Ops)',
    type: 'service_agreement',
    counterparty: {
      name: 'Vikramaditya Deshmukh',
      organization: 'Aethelgard Technologies Pvt. Ltd.',
      email: 'vikram@aethelgard.io',
      phone: '+91 98201 44921',
      role: 'client',
    },
    value: 850000,
    currency: 'INR',
    category: 'Technology & SaaS',
    status: 'active',
    startDate: '2026-04-01',
    expiryDate: '2026-11-30', // ~38 days left
    autoRenewal: true,
    renewalNoticeDays: 30,
    governingLaw: 'High Court of Karnataka, Bengaluru, India',
    summary: 'Provisioning of enterprise cloud architecture, automated data pipelines, and Level-3 DevOps engineering for retail analytics platforms.',
    clauses: [
      {
        title: 'Intellectual Property Vesting',
        description: 'All custom source code and architectural documentation vest immediately in client upon receipt of milestone milestone payments.',
        riskLevel: 'low',
      },
      {
        title: 'Limitation of Liability',
        description: 'Aggregate liability capped strictly at total contract consideration paid in preceding 3 billing months.',
        riskLevel: 'low',
      },
      {
        title: 'Service Level Agreement (99.9% Uptime)',
        description: 'Tier-1 outage resolution within 120 minutes with penalty rebates credited toward subsequent invoice.',
        riskLevel: 'medium',
      },
    ],
    paymentMilestones: [
      {
        id: 'pm-01-a',
        contractId: 'cnt-01',
        contractTitle: 'Master Service Agreement (Cloud Infrastructure & AI Ops)',
        counterparty: 'Aethelgard Technologies Pvt. Ltd.',
        title: 'Initial Architecture Blueprint & Provisioning',
        amount: 350000,
        currency: 'INR',
        dueDate: '2026-05-15',
        status: 'paid',
        paidDate: '2026-05-12',
        invoiceNumber: 'INV-2026-041',
      },
      {
        id: 'pm-01-b',
        contractId: 'cnt-01',
        contractTitle: 'Master Service Agreement (Cloud Infrastructure & AI Ops)',
        counterparty: 'Aethelgard Technologies Pvt. Ltd.',
        title: 'Q3 Pipeline Automation & Load Stress Benchmarks',
        amount: 250000,
        currency: 'INR',
        dueDate: '2026-10-31', // Approaching due date
        status: 'pending',
        invoiceNumber: 'INV-2026-077',
      },
      {
        id: 'pm-01-c',
        contractId: 'cnt-01',
        contractTitle: 'Master Service Agreement (Cloud Infrastructure & AI Ops)',
        counterparty: 'Aethelgard Technologies Pvt. Ltd.',
        title: 'Final Acceptance Testing & Handoff Escrow',
        amount: 250000,
        currency: 'INR',
        dueDate: '2026-11-25',
        status: 'pending',
        invoiceNumber: 'INV-2026-088',
      },
    ],
    signedByCounterparty: true,
    signedByClient: true,
    createdAt: '2026-03-25',
    updatedAt: '2026-10-18',
    tags: ['DevOps', 'Cloud', 'Bengaluru', 'Milestones'],
  },
  {
    id: 'cnt-02',
    code: 'LXV-2026-082',
    title: 'Senior Frontend Design & Engineering Retainer',
    type: 'freelance_agreement',
    counterparty: {
      name: 'Rohan Mehra',
      organization: 'VoxelStudio Creative Ltd.',
      email: 'rohan.m@voxelstudio.in',
      phone: '+91 99112 30142',
      role: 'freelancer',
    },
    value: 240000,
    currency: 'INR',
    category: 'Freelancers',
    status: 'active',
    startDate: '2026-08-01',
    expiryDate: '2026-10-31', // Expiring in 8 days!
    autoRenewal: false,
    renewalNoticeDays: 14,
    governingLaw: 'Courts of New Delhi, India',
    summary: 'Design system curation, mobile design implementation, and design QA for high-conversion web apps.',
    clauses: [
      {
        title: 'Scope of Work & Revision Caps',
        description: 'Includes up to 2 review cycles per sprint; additional major revisions billed at standard hourly schedule.',
        riskLevel: 'low',
      },
      {
        title: 'Payment Terms & Overdue Interest',
        description: 'Net-15 payment terms. Delayed invoices subject to 1.5% statutory monthly interest after grace period.',
        riskLevel: 'medium',
      },
    ],
    paymentMilestones: [
      {
        id: 'pm-02-a',
        contractId: 'cnt-02',
        contractTitle: 'Senior Frontend Design & Engineering Retainer',
        counterparty: 'VoxelStudio Creative Ltd.',
        title: 'Sprint 1 Design System & Component Library',
        amount: 120000,
        currency: 'INR',
        dueDate: '2026-09-15',
        status: 'paid',
        paidDate: '2026-09-16',
        invoiceNumber: 'INV-2026-052',
      },
      {
        id: 'pm-02-b',
        contractId: 'cnt-02',
        contractTitle: 'Senior Frontend Design & Engineering Retainer',
        counterparty: 'VoxelStudio Creative Ltd.',
        title: 'Sprint 2 Mobile Web Build & Usability Verification',
        amount: 120000,
        currency: 'INR',
        dueDate: '2026-10-15', // OVERDUE! 8 days late
        status: 'overdue',
        invoiceNumber: 'INV-2026-065',
        notes: 'Client accounts department requested revised TDS certificate before clearing disbursement.',
      },
    ],
    signedByCounterparty: true,
    signedByClient: true,
    createdAt: '2026-07-28',
    updatedAt: '2026-10-20',
    tags: ['Frontend', 'UI/UX', 'Delhi', 'Overdue Alert'],
  },
  {
    id: 'cnt-03',
    code: 'LXV-2026-083',
    title: 'Mutual Non-Disclosure Agreement (Fintech M&A Exploration)',
    type: 'nda',
    counterparty: {
      name: 'Ananya Singhania',
      organization: 'Kuber Capital Advisors LLP',
      email: 'ananya@kubercapital.com',
      phone: '+91 97184 88320',
      role: 'partner',
    },
    value: 0,
    currency: 'INR',
    category: 'Legal & IP',
    status: 'expiring',
    startDate: '2024-11-05',
    expiryDate: '2026-11-05', // Expiring in 13 days!
    autoRenewal: false,
    renewalNoticeDays: 30,
    governingLaw: 'High Court of Judicature at Bombay, Mumbai, India',
    summary: 'Mutual protection of trade secrets, credit underwriting algorithms, and prospective acquisition data between founders and financial sponsor.',
    clauses: [
      {
        title: 'Standard of Care & Access Restrictions',
        description: 'Information restricted strictly to named advisory directors on strict need-to-know basis with encrypted transmission.',
        riskLevel: 'low',
      },
      {
        title: '2-Year Sunset Clause',
        description: 'Obligation of confidentiality survives 24 calendar months post formal termination of talks.',
        riskLevel: 'low',
      },
    ],
    paymentMilestones: [],
    signedByCounterparty: true,
    signedByClient: true,
    createdAt: '2024-10-29',
    updatedAt: '2026-10-10',
    tags: ['NDA', 'Fintech', 'M&A', 'Expiring Soon'],
  },
  {
    id: 'cnt-04',
    code: 'LXV-2026-084',
    title: 'Enterprise SaaS Software License & Support Agreement',
    type: 'service_agreement',
    counterparty: {
      name: 'Harish Chandra Roy',
      organization: 'NavGati Logistics Corp',
      email: 'h.roy@navgati-supply.com',
      phone: '+91 98450 11200',
      role: 'client',
    },
    value: 1450000,
    currency: 'INR',
    category: 'Enterprise',
    status: 'active',
    startDate: '2026-01-15',
    expiryDate: '2027-01-14',
    autoRenewal: true,
    renewalNoticeDays: 60,
    governingLaw: 'High Court of Delhi, New Delhi, India',
    summary: 'Annual multi-tier subscription for dispatch telemetry engine and fleet route optimization with dedicated enterprise SLAs.',
    clauses: [
      {
        title: 'Quarterly Advance Billing',
        description: 'Payment due on the 1st calendar day of each operating quarter against GST compliant tax invoices.',
        riskLevel: 'low',
      },
      {
        title: 'Data Privacy & DPDP Act 2023 Compliance',
        description: 'Full adherence to Indian Digital Personal Data Protection Act with encrypted data storage within Indian borders.',
        riskLevel: 'low',
      },
    ],
    paymentMilestones: [
      {
        id: 'pm-04-a',
        contractId: 'cnt-04',
        contractTitle: 'Enterprise SaaS Software License & Support Agreement',
        counterparty: 'NavGati Logistics Corp',
        title: 'Q1 2026 Enterprise License & Custom Setup',
        amount: 362500,
        currency: 'INR',
        dueDate: '2026-01-20',
        status: 'paid',
        paidDate: '2026-01-18',
        invoiceNumber: 'INV-2026-004',
      },
      {
        id: 'pm-04-b',
        contractId: 'cnt-04',
        contractTitle: 'Enterprise SaaS Software License & Support Agreement',
        counterparty: 'NavGati Logistics Corp',
        title: 'Q2 2026 Maintenance & Telemetry Processing',
        amount: 362500,
        currency: 'INR',
        dueDate: '2026-04-20',
        status: 'paid',
        paidDate: '2026-04-19',
        invoiceNumber: 'INV-2026-033',
      },
      {
        id: 'pm-04-c',
        contractId: 'cnt-04',
        contractTitle: 'Enterprise SaaS Software License & Support Agreement',
        counterparty: 'NavGati Logistics Corp',
        title: 'Q3 2026 Platform Support & Dedicated Cloud Broker',
        amount: 362500,
        currency: 'INR',
        dueDate: '2026-07-20',
        status: 'paid',
        paidDate: '2026-07-25',
        invoiceNumber: 'INV-2026-059',
      },
      {
        id: 'pm-04-d',
        contractId: 'cnt-04',
        contractTitle: 'Enterprise SaaS Software License & Support Agreement',
        counterparty: 'NavGati Logistics Corp',
        title: 'Q4 2026 Platform Support & Annual Audit Package',
        amount: 362500,
        currency: 'INR',
        dueDate: '2026-10-20', // OVERDUE by 3 days!
        status: 'overdue',
        invoiceNumber: 'INV-2026-075',
        notes: 'Followed up with finance manager; batch clearance scheduled for upcoming Friday.',
      },
    ],
    signedByCounterparty: true,
    signedByClient: true,
    createdAt: '2026-01-08',
    updatedAt: '2026-10-22',
    tags: ['Enterprise', 'SaaS', 'DPDP Act', 'Logistics'],
  },
  {
    id: 'cnt-05',
    code: 'LXV-2026-085',
    title: 'Strategic Co-Development MoU (Autonomous Vision Lab)',
    type: 'mou',
    counterparty: {
      name: 'Dr. Praveen Nambiar',
      organization: 'HexaVision Robotics Labs',
      email: 'praveen.n@hexavision.ai',
      phone: '+91 94480 99124',
      role: 'partner',
    },
    value: 0,
    currency: 'INR',
    category: 'Technology & SaaS',
    status: 'under_review',
    startDate: '2026-11-01',
    expiryDate: '2027-04-30',
    autoRenewal: false,
    renewalNoticeDays: 30,
    governingLaw: 'High Court of Judicature at Hyderabad, India',
    summary: 'Non-binding strategic framework defining resource allocation, GPU compute sharing, and patent filing rights for joint edge camera models.',
    clauses: [
      {
        title: 'Non-Binding Intention Protocol',
        description: 'MoU does not establish an agency or joint venture partnership; enforceable solely on confidentiality and exclusivity covenants.',
        riskLevel: 'low',
      },
      {
        title: '90-Day Exclusivity Period',
        description: 'Both parties agree to not negotiate competing joint commercial agreements with third-party drone manufacturers.',
        riskLevel: 'medium',
      },
    ],
    paymentMilestones: [],
    signedByCounterparty: false,
    signedByClient: true,
    createdAt: '2026-10-18',
    updatedAt: '2026-10-23',
    tags: ['MoU', 'Robotics', 'Hyderabad', 'Under Review'],
  },
  {
    id: 'cnt-06',
    code: 'LXV-2026-086',
    title: 'Brand Intellectual Property & Trademark Assignment Deed',
    type: 'ip_assignment',
    counterparty: {
      name: 'Kavita Sundaram',
      organization: 'Sundaram Design House LLP',
      email: 'kavita@sundaramdesign.com',
      phone: '+91 98840 55670',
      role: 'vendor',
    },
    value: 180000,
    currency: 'INR',
    category: 'Legal & IP',
    status: 'completed',
    startDate: '2026-02-01',
    expiryDate: '2026-08-31',
    autoRenewal: false,
    renewalNoticeDays: 0,
    governingLaw: 'High Court of Madras, Chennai, India',
    summary: 'Full worldwide copyright, logo trademark, and design asset assignment with statutory waiver of moral rights under Section 57 of Copyright Act.',
    clauses: [
      {
        title: 'Absolute Transfer of Copyright',
        description: 'Assignor transfers all current and future proprietary interests in visual identity, packaging guides, and typography licenses.',
        riskLevel: 'low',
      },
      {
        title: 'No Residual Rights & Moral Rights Waiver',
        description: 'Assignor waives any right to claim paternity or restrain modification of the assigned marks.',
        riskLevel: 'low',
      },
    ],
    paymentMilestones: [
      {
        id: 'pm-06-a',
        contractId: 'cnt-06',
        contractTitle: 'Brand Intellectual Property & Trademark Assignment Deed',
        counterparty: 'Sundaram Design House LLP',
        title: 'Full Consideration Upon Trademark Registry Filing',
        amount: 180000,
        currency: 'INR',
        dueDate: '2026-03-01',
        status: 'paid',
        paidDate: '2026-02-28',
        invoiceNumber: 'INV-2026-019',
      },
    ],
    signedByCounterparty: true,
    signedByClient: true,
    createdAt: '2026-01-22',
    updatedAt: '2026-09-02',
    tags: ['IP Assignment', 'Trademark', 'Chennai', 'Completed'],
  },
  {
    id: 'cnt-07',
    code: 'LXV-2026-087',
    title: 'Corporate Legal Advisory & Regulatory Compliance Retainer',
    type: 'service_agreement',
    counterparty: {
      name: 'Aditya Birla Verma',
      organization: 'NexaHealth D2C Brands',
      email: 'aditya.v@nexahealth.co',
      phone: '+91 98110 77319',
      role: 'client',
    },
    value: 360000,
    currency: 'INR',
    category: 'Operations',
    status: 'expiring',
    startDate: '2025-10-30',
    expiryDate: '2026-10-29', // Expiring in 6 days! CRITICAL
    autoRenewal: false,
    renewalNoticeDays: 15,
    governingLaw: 'High Court of Punjab & Haryana, Chandigarh, India',
    summary: 'Ongoing advisory for FSSAI compliance, packaging claim audits, consumer grievances, and e-commerce terms of service.',
    clauses: [
      {
        title: 'Monthly Advisory Quota',
        description: 'Up to 20 billable hours per calendar month including contract redlines and legal notice drafted responses.',
        riskLevel: 'low',
      },
      {
        title: 'Notice of Renewal / Non-Renewal',
        description: 'Either party may propose renewal terms at least 15 calendar days prior to contract termination.',
        riskLevel: 'medium',
      },
    ],
    paymentMilestones: [
      {
        id: 'pm-07-a',
        contractId: 'cnt-07',
        contractTitle: 'Corporate Legal Advisory & Regulatory Compliance Retainer',
        counterparty: 'NexaHealth D2C Brands',
        title: 'Final Month Retainer (October 2026)',
        amount: 30000,
        currency: 'INR',
        dueDate: '2026-10-28',
        status: 'pending',
        invoiceNumber: 'INV-2026-079',
      },
    ],
    signedByCounterparty: true,
    signedByClient: true,
    createdAt: '2025-10-15',
    updatedAt: '2026-10-21',
    tags: ['Advisory', 'Retainer', 'Compliance', 'Urgent Renewal'],
  },
];

export const LEGAL_TEMPLATES: LegalTemplate[] = [
  {
    id: 'tpl-nda',
    type: 'nda',
    title: 'Mutual Non-Disclosure Agreement (NDA)',
    category: 'Intellectual Property & Confidentiality',
    turnaroundEstimate: '24–48 Hours',
    description: 'Enforceable bilateral confidentiality agreement protecting proprietary code, customer lists, investor data, and trade secrets under Indian jurisdiction.',
    recommendedFor: 'Founders sharing pitch decks, tech teams collaborating with external agencies, or partnership talks.',
    keyClausesIncluded: [
      'Comprehensive Definition of Confidential Material',
      'Exclusions (Public Knowledge, Prior Possession)',
      'Statutory Period (2 Years Survival)',
      'Remedies of Injunctive Relief & SIAC/Indian Arbitration',
      'Return & Certified Destruction of Sensitive Assets',
    ],
    defaultJurisdiction: 'High Court of Delhi, New Delhi, India',
    defaultVariables: {
      partyOneName: 'Lexovant Operations Pvt. Ltd.',
      partyOneSignatory: 'Amanat Raza, Director',
      partyTwoName: '[Counterparty Entity / Individual]',
      partyTwoSignatory: '[Authorized Representative]',
      purposeOfDisclosure: 'Evaluating prospective commercial alliance, software integrations, and technical due diligence',
      confidentialityYears: '2',
      governingJurisdiction: 'Courts of New Delhi, India',
    },
    rawTemplateText: (vars) => `MUTUAL NON-DISCLOSURE AGREEMENT

THIS MUTUAL NON-DISCLOSURE AGREEMENT ("Agreement") is executed on this ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by and between:

PARTY 1: ${vars.partyOneName || 'Lexovant Technologies'} (represented by ${vars.partyOneSignatory || 'Authorized Officer'}), hereinafter referred to as the "First Party";

AND

PARTY 2: ${vars.partyTwoName || 'Counterparty Entity'} (represented by ${vars.partyTwoSignatory || 'Authorized Representative'}), hereinafter referred to as the "Second Party".

WHEREAS both parties intend to discuss, explore and evaluate a prospective commercial relationship regarding:
"${vars.purposeOfDisclosure || 'Business evaluation & technical partnership'}".

1. CONFIDENTIAL INFORMATION
"Confidential Information" encompasses all non-public information, technical designs, source algorithms, pricing tables, client rosters, and financial projections disclosed in written, verbal, or electronic form.

2. OBLIGATIONS & NON-DISCLOSURE
Each Party agrees:
a) To preserve the other party's Confidential Information with at least reasonable care;
b) Not to disclose, publish, or disseminate Confidential Information to any third party without prior written consent;
c) To disclose strictly to directors, employees, and legal counsel with a verifiable need-to-know who are bound by non-disclosure terms no less stringent.

3. TERM & SURVIVAL
This Agreement shall remain effective for a period of ${vars.confidentialityYears || '2'} years from the date of disclosure.

4. REMEDIES
Both parties acknowledge that unauthorized breach causes irreparable commercial injury for which monetary damages alone are inadequate. The Disclosing Party shall be entitled to seek temporary and permanent injunctive relief without the necessity of posting bond.

5. GOVERNING LAW & JURISDICTION
This Agreement shall be construed and governed in all respects under the laws of India. Any dispute arising out of this Agreement shall be subject to the exclusive jurisdiction of the ${vars.governingJurisdiction || 'Courts of New Delhi, India'}.

IN WITNESS WHEREOF, the parties hereto have set their hands and corporate seals on the date first above written.

For First Party: ___________________________
For Second Party: ___________________________`,
  },
  {
    id: 'tpl-freelance',
    type: 'freelance_agreement',
    title: 'Independent Freelancer & Contractor Agreement',
    category: 'Operations & Remote Talent',
    turnaroundEstimate: '48 Hours',
    description: 'Watertight contract covering scope creep, milestone disbursements, GST compliance, kill fees, and critical IP vesting upon full payment.',
    recommendedFor: 'Agencies hiring contract developers/designers, or freelancers protecting their work product from non-payment.',
    keyClausesIncluded: [
      'Milestone-Based Disbursement Schedule',
      'IP Transfer Conditioned Upon Receipt of Full Consideration',
      'Revision Quotas & Scope Creep Hourly Rate',
      'Kill Fee (Cancellation Penalty if Client Halts Project)',
      'Independent Contractor Status (No Employment/PF Liabilities)',
    ],
    defaultJurisdiction: 'Courts of Bengaluru, Karnataka, India',
    defaultVariables: {
      clientName: 'Lexovant Client Partners',
      contractorName: '[Freelancer / Independent Specialist]',
      scopeOfServices: 'Full-stack software development, API design, and responsive frontend implementation',
      totalCompensation: '₹2,50,000 INR',
      milestoneBreakdown: '40% advance upon project kickoff, 40% upon staging demo, 20% upon production deployment',
      killFeePercent: '30%',
      governingJurisdiction: 'Courts of Bengaluru, India',
    },
    rawTemplateText: (vars) => `INDEPENDENT CONTRACTOR & SERVICE AGREEMENT

This Agreement is made on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} between:

CLIENT: ${vars.clientName || 'Principal Client'}, and
CONTRACTOR: ${vars.contractorName || 'Independent Specialist'}.

1. ENGAGEMENT & SCOPE
The Client hereby engages the Contractor to perform the following designated services:
${vars.scopeOfServices || 'Full software engineering services as defined in Exhibit A'}.

2. CONSIDERATION & MILESTONE SCHEDULE
The total agreed fee for satisfactory delivery is ${vars.totalCompensation || 'Agreed Sum'}, payable per the following disbursement schedule:
${vars.milestoneBreakdown || 'Standard progressive milestones'}.
All overdue undisputed payments past fifteen (15) calendar days shall accrue simple interest at 1.5% per month.

3. OWNERSHIP OF WORK PRODUCT & IP VESTING
CRITICAL: Full title, copyright, and patentable rights in Deliverables shall vest in the Client IF AND ONLY IF the Contractor has received full payment of all agreed milestones. Until full consideration is settled, the Contractor retains full moral and statutory copyright ownership.

4. CANCELLATION & KILL FEE
If the Client terminates this engagement prior to completion without fault on the part of the Contractor, the Client shall pay for all hours completed plus a kill fee equivalent to ${vars.killFeePercent || '30%'} of the remaining contract balance.

5. INDEPENDENT CONTRACTOR RELATIONSHIP
Contractor is an independent party. Nothing herein shall be construed as creating an employer-employee, partnership, or agency relationship.

6. GOVERNING LAW
This contract is governed by the laws of India and subject to the exclusive jurisdiction of the ${vars.governingJurisdiction || 'Courts of Bengaluru, India'}.`,
  },
  {
    id: 'tpl-service',
    type: 'service_agreement',
    title: 'Master Service Agreement (MSA) for B2B Clients',
    category: 'Commercial Contracts',
    turnaroundEstimate: '2–3 Days',
    description: 'Comprehensive B2B framework agreement for technology companies, agencies, and vendors with Statement of Work (SOW) protocols and SLA safeguards.',
    recommendedFor: 'Enterprise clients, ongoing monthly retainers, and multi-project agency customer engagements.',
    keyClausesIncluded: [
      'Modular Statement of Work (SOW) Structure',
      'Liability Cap (Direct Damages Only, 1x Annual Fees)',
      'Indemnification for Third-Party IP Infringement',
      'Service Level Agreements (Uptime & Bug Resolution Windows)',
      'Non-Solicitation of Key Personnel (12 Months)',
    ],
    defaultJurisdiction: 'High Court of Delhi, New Delhi, India',
    defaultVariables: {
      providerName: 'Lexovant Enterprise Services',
      clientName: '[Client Corporation / Entity]',
      serviceDescription: 'Enterprise software architecture, quarterly auditing, and continuous technical maintenance',
      liabilityCapMultiplier: '1x',
      nonSolicitDuration: '12 months',
      governingJurisdiction: 'Courts of New Delhi, India',
    },
    rawTemplateText: (vars) => `MASTER SERVICES AGREEMENT (MSA)

This Master Services Agreement is entered into as of ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by and between:

SERVICE PROVIDER: ${vars.providerName || 'Provider Entity'}, and
CUSTOMER: ${vars.clientName || 'Customer Corporation'}.

1. PURPOSE & STATEMENTS OF WORK (SOW)
This Agreement provides the general terms under which Provider will deliver services to Customer. Specific projects, timelines, and deliverables will be set forth in individually executed Statements of Work (SOW).

2. SERVICE STANDARDS & WARRANTIES
Provider warrants that services will be performed in a professional, workmanlike manner adhering to prevailing industry standards.

3. LIMITATION OF LIABILITY
TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY SHALL BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. EACH PARTY'S TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT IS CAPPED AT ${vars.liabilityCapMultiplier || '1x'} THE TOTAL FEES PAID IN THE PRECEDING TWELVE (12) MONTHS.

4. NON-SOLICITATION
During the term of this Agreement and for a period of ${vars.nonSolicitDuration || '12 months'} following termination, neither party shall intentionally solicit for employment any employee or key contractor of the other party without prior written consent.

5. DISPUTE RESOLUTION & ARBITRATION
Disputes unresolved through amicable negotiation within 30 days shall be referred to sole arbitration in accordance with the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be ${vars.governingJurisdiction || 'New Delhi, India'}.`,
  },
  {
    id: 'tpl-mou',
    type: 'mou',
    title: 'Strategic Memorandum of Understanding (MoU)',
    category: 'Partnerships & Alliances',
    turnaroundEstimate: '48 Hours',
    description: 'Pre-contractual framework establishing mutual intention, resource sharing, and exclusivity boundaries without creating unintended commercial liabilities.',
    recommendedFor: 'Joint venture explorations, academic-industry partnerships, and startup co-marketing alliances.',
    keyClausesIncluded: [
      'Express Non-Binding Intention Proviso',
      'Exclusivity Period for Due Diligence',
      'Allocation of Initial Research Expenses',
      'Confidentiality & Non-Circumvention',
      'Good Faith Dispute Resolution',
    ],
    defaultJurisdiction: 'High Court of Judicature at Bombay, Mumbai, India',
    defaultVariables: {
      partyOne: 'Lexovant Ventures',
      partyTwo: '[Strategic Partner Entity]',
      allianceScope: 'Joint development and commercialization of next-generation legal telemetry tools',
      exclusivityDays: '60',
      governingJurisdiction: 'Courts of Mumbai, India',
    },
    rawTemplateText: (vars) => `MEMORANDUM OF UNDERSTANDING (MoU)

This Memorandum of Understanding is recorded on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} between:

PARTICIPANT 1: ${vars.partyOne || 'First Partner'}
PARTICIPANT 2: ${vars.partyTwo || 'Second Partner'}

1. PURPOSE & VISION
The participants wish to collaborate in good faith toward:
"${vars.allianceScope || 'Strategic exploration & joint co-development'}".

2. NON-BINDING NATURE (EXCEPT CONFIDENTIALITY)
This MoU does not constitute an enforceable contract to execute the ultimate project, nor does it create a joint venture, partnership, or principal-agent relationship. Neither party shall have authority to bind the other. However, Section 3 (Confidentiality) and Section 4 (Exclusivity) SHALL be legally binding upon signature.

3. EXCLUSIVITY
For a duration of ${vars.exclusivityDays || '60'} calendar days from the date of this MoU, neither party shall enter into parallel negotiations with any direct competitor regarding the specific scope defined herein.

4. EXPENSES
Each participant shall bear its own operational, legal, and travel costs in furtherance of the objectives of this MoU unless agreed otherwise in writing.

5. GOVERNING LAW
This MoU is governed by Indian law under the jurisdiction of ${vars.governingJurisdiction || 'Courts of Mumbai, India'}.`,
  },
  {
    id: 'tpl-ip-assignment',
    type: 'ip_assignment',
    title: 'Intellectual Property Assignment Deed',
    category: 'Intellectual Property & Copyright',
    turnaroundEstimate: '24 Hours',
    description: 'Statutory deed under Section 19 of the Copyright Act, 1957 ensuring complete and irrevocable transfer of all patents, trademarks, source code, and design rights.',
    recommendedFor: 'Software founders acquiring code from founding engineers, or businesses acquiring logos and brand marks.',
    keyClausesIncluded: [
      'Worldwide, Perpetual & Royalty-Free Assignment',
      'Explicit Waiver of Moral Rights (Section 57)',
      'Statutory Consideration Recital',
      'Further Assurances for Patent/Trademark Office Filings',
      'Indemnity Against Counterparty Title Defects',
    ],
    defaultJurisdiction: 'High Court of Delhi, New Delhi, India',
    defaultVariables: {
      assignorName: '[Assignor / Originating Creator]',
      assigneeName: 'Lexovant Group Pvt. Ltd.',
      workDescription: 'All proprietary software repositories, architecture schematics, trademarks, and associated documentation',
      statutorySum: '₹1,00,000 INR',
      governingJurisdiction: 'Courts of New Delhi, India',
    },
    rawTemplateText: (vars) => `INTELLECTUAL PROPERTY ASSIGNMENT DEED

THIS DEED OF ASSIGNMENT is executed on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by:

ASSIGNOR: ${vars.assignorName || 'Originating Creator'}, in favor of
ASSIGNEE: ${vars.assigneeName || 'Acquiring Entity'}.

1. ASSIGNMENT OF ALL RIGHTS
For the valuable consideration of ${vars.statutorySum || 'the agreed consideration'}, receipt and sufficiency of which is hereby acknowledged, the Assignor hereby sells, assigns, transfers, and conveys unto the Assignee, its successors, and assigns, all right, title, and interest throughout the universe in perpetuity in:
${vars.workDescription || 'The proprietary software, designs, algorithms, and brand elements'}.

2. WAIVER OF MORAL RIGHTS
The Assignor unconditionally and irrevocably waives, to the fullest extent permitted by Section 57 of the Copyright Act, 1957, all moral rights, rights of paternity, and rights of integrity in the Works.

3. FURTHER ASSURANCES
The Assignor covenants to execute all documents, affidavits, and trademark/patent powers of attorney reasonably requested by the Assignee to perfect title in relevant government registries.

4. GOVERNING LAW
Governed by the laws of India under the exclusive jurisdiction of the ${vars.governingJurisdiction || 'Courts of New Delhi, India'}.`,
  },
];

export const LEGAL_ARTICLES: LegalArticle[] = [
  {
    id: 'art-01',
    slug: 'registry-ho-gayi-zameen-kabza-nahi-mila',
    title: 'Registry Ho Gayi, Phir Bhi Zameen Par Kabza Nahi Mila? Ab Kya Karein?',
    category: 'Property Law',
    date: 'October 23, 2026',
    readTime: '6 min read',
    featured: true,
    summary: 'Registered sale deed ke baad bhi zameen ka possession nahi mila? Understand practical legal steps, possible civil remedies, mutation procedures, and key property-record checks under Indian revenue law.',
    author: {
      name: 'Amanat Raza',
      title: 'Advocate, Supreme Court of India',
      verified: true,
    },
    caseMatter: 'Civil Remedies Under Specific Relief Act & Section 145 CrPC / BNSS',
    statuteInterplay: 'Section 5 & 6 of Specific Relief Act 1963; Mutation under State Revenue Code',
    takeaways: [
      'Mere registration does not automatically confer physical possession if the vendor or an unauthorized third party occupies the plot.',
      'Filing a civil suit for recovery of possession under Section 5 or Section 6 of Specific Relief Act with demarcation petition.',
      'Emergency intervention under Section 145 CrPC (now BNSS 2024) before the Executive Magistrate to prevent breach of peace and seal boundary lines.',
      'Crucial cross-verification between registry deeds, Jamabandi records, and spot revenue inspection (LPC).',
    ],
    fullBody: [
      'In many parts of India, particularly in Bihar, UP, and northern states, buyers often find that even after paying stamp duty and executing a registered sale deed at the sub-registrar office, the actual spot possession (dakhal-kabza) is obstructed by previous co-sharers or unauthorized encroachers.',
      'Under Indian law, Section 54 of the Transfer of Property Act specifies that a contract of sale creates an interest in property, but registration alone without vacant possession requires immediate assertion of rights. A delay can trigger adverse possession claims after 12 statutory years.',
      'Practical Step 1: Immediately file for mutation (Dakhil Kharij) in the local revenue block/Anchal office. Do not wait for mutual understanding when possession is disputed.',
      'Practical Step 2: If there is an imminent threat of violence or obstruction during boundary wall erection, submit an urgent application under Section 145 of CrPC (Section 164 BNSS 2024) before the Sub-Divisional Magistrate (SDM) requesting an immediate police verification report and demarcation order.',
      'Practical Step 3: Initiate a regular Title & Possession Suit before the Civil Court seeking a decree for recovery of physical possession and perpetual injunction against third-party interference.',
    ],
  },
  {
    id: 'art-02',
    slug: 'supreme-court-bribe-allegations-section-17a',
    title: 'Supreme Court on Bribe Allegations: When Is Prior Approval Under Section 17A Required?',
    category: 'Supreme Court',
    date: 'October 23, 2026',
    readTime: '5 min read',
    summary: 'In Tejaram v. State of Rajasthan and allied judgments, the Supreme Court explained why Section 17A prior approval does not apply to trap cases and clarified bona fide administrative protections.',
    author: {
      name: 'Amanat Raza',
      title: 'Advocate, Supreme Court of India',
      verified: true,
    },
    caseMatter: 'State of Rajasthan v. Tejaram & Ors. / Section 17A Interpretation',
    statuteInterplay: 'Section 17A, Prevention of Corruption Act (1988 amended 2018) & Section 7 Trap Protocols',
    takeaways: [
      'Exclusion of Red-Handed Trap Cases: Prior sanction is explicitly not required when an arrest occurs during a lawful police trap for demanding illegal gratification.',
      'Protected Official Deliberations: Section 17A shields bona fide administrative files, notes, recommendations, and policy discretion made in good faith.',
      'Strict Time-Bound Protocol: Competent authorities must decide on sanction requests within 3 months, extendable by 1 month with recorded reasons.',
    ],
    fullBody: [
      'The Supreme Court of India firmly settled the recurring conflict surrounding Section 17A of the Prevention of Corruption Act. Section 17A was designed strictly as a defensive bastion for decision-makers against frivolous or motivated complaints, never as an imperviable cloak for explicit criminal demands or disproportionate asset accumulation.',
      'The Apex Court emphasized that demanding or accepting a bribe can never be categorized as part of an official recommendation or decision taken in discharge of public duty.',
    ],
  },
  {
    id: 'art-03',
    slug: 'bihar-zameen-jamabandi-mutation-registry-check',
    title: 'Bihar Mein Zameen Kharidne Se Pehle Jamabandi, Mutation Aur Registry Kaise Check Karein?',
    category: 'Land Records',
    date: 'October 22, 2026',
    readTime: '7 min read',
    summary: 'Bihar mein zameen kharidne se pehle Jamabandi, mutation aur registry ka difference samjhein. Use this practical checklist to compare records and spot fraudulent sales.',
    author: {
      name: 'Amanat Raza',
      title: 'Advocate, Supreme Court of India',
      verified: true,
    },
    takeaways: [
      'Jamabandi proves who is recognized by the State Government as the current rent-paying raiyat (landholder).',
      'Registry is merely a conveyance between two private persons; mutation is the actual entry into Government revenue ledgers.',
      'Always inspect the BiharBhumi portal for Khatiyan number, Thana number, and Jamabandi register-II status before signing agreement.',
    ],
  },
  {
    id: 'art-04',
    slug: 'buying-property-7-legal-essentials',
    title: 'Buying Property? Check These 7 Legal Essentials First',
    category: 'Property Checklist',
    date: 'October 22, 2026',
    readTime: '8 min read',
    summary: 'Planning to buy a plot, flat or house? Use this practical seven-point property document checklist, covering title deeds, encumbrance certificates, and mutation proofs.',
    author: {
      name: 'Amanat Raza',
      title: 'Advocate, Supreme Court of India',
      verified: true,
    },
    takeaways: [
      'Search 30-year mother deed chain to verify clear marketable title.',
      'Check non-encumbrance certificate (EC) from Sub-Registrar to verify bank mortgages.',
      'Verify municipal layout approvals and RERA registration compliance.',
    ],
  },
  {
    id: 'art-05',
    slug: 'you-cant-copyright-an-idea',
    title: "You Can't Copyright an Idea. Here's What You Can Protect Instead",
    category: 'Intellectual Property',
    date: 'October 21, 2026',
    readTime: '4 min read',
    summary: "Everyone tells creators to 'copyright their idea' before sharing it. Indian law doesn't work that way. Learn what the Copyright Act protects and how NDAs bridge the gap.",
    author: {
      name: 'Amanat Raza',
      title: 'Advocate, Supreme Court of India',
      verified: true,
    },
    takeaways: [
      'Copyright protects the expression of an idea (source code, written script, artwork), never the raw abstract concept itself.',
      'To safeguard pre-expression business models, pitch decks, and algorithms, you must rely on legally binding Non-Disclosure Agreements (NDAs).',
      'Trade secrets under Indian common law require verifiable documentation of reasonable steps taken to preserve confidentiality.',
    ],
  },
  {
    id: 'art-06',
    slug: 'how-to-file-fir-in-india-bnss-zero-fir',
    title: 'How to File an FIR in India (Zero FIR and e-FIR): Step-by-Step Guide Under BNSS 2024',
    category: 'BNSS 2024 / Procedure',
    date: 'October 16, 2026',
    readTime: '6 min read',
    summary: 'Police saying it is not their area? Learn how to file a Zero FIR online or at any police station across India under the newly enacted Bharatiya Nagarik Suraksha Sanhita.',
    author: {
      name: 'Amanat Raza',
      title: 'Advocate, Supreme Court of India',
      verified: true,
    },
    takeaways: [
      'Zero FIR can be registered at ANY police station irrespective of territorial jurisdiction, and is transferred subsequently.',
      'Under BNSS Section 173, electronic FIR (e-FIR) can be recorded, requiring physical signature within 3 days.',
      'Free copy of FIR is a mandatory statutory right given to the informant immediately.',
    ],
  },
];
