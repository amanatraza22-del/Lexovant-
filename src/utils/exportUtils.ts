import { Contract } from '../types/contract';
import { getDaysRemaining } from '../services/storage';

export const exportContractsToCSV = (contracts: Contract[], filename = 'lexovant_contracts_report') => {
  const headers = [
    'Contract Code',
    'Contract Title',
    'Category',
    'Agreement Type',
    'Counterparty Organization',
    'Counterparty Contact',
    'Counterparty Email',
    'Counterparty Role',
    'Value (INR)',
    'Status',
    'Start Date',
    'Expiry Date',
    'Days Remaining',
    'Auto Renewal',
    'Governing Law',
    'Total Milestones',
    'Settled Milestones',
    'Client Signed',
    'Counterparty Signed',
  ];

  const escapeCSV = (str: string | number | boolean | undefined) => {
    if (str === undefined || str === null) return '""';
    const stringified = String(str).replace(/"/g, '""');
    return `"${stringified}"`;
  };

  const rows = contracts.map((c) => {
    const daysLeft = getDaysRemaining(c.expiryDate);
    const paidCount = c.paymentMilestones.filter((m) => m.status === 'paid').length;
    const totalMilestones = c.paymentMilestones.length;

    return [
      escapeCSV(c.code),
      escapeCSV(c.title),
      escapeCSV(c.category),
      escapeCSV(c.type.replace('_', ' ')),
      escapeCSV(c.counterparty.organization || 'Individual'),
      escapeCSV(c.counterparty.name),
      escapeCSV(c.counterparty.email),
      escapeCSV(c.counterparty.role),
      escapeCSV(c.value),
      escapeCSV(c.status),
      escapeCSV(c.startDate),
      escapeCSV(c.expiryDate),
      escapeCSV(daysLeft),
      escapeCSV(c.autoRenewal ? 'Yes' : 'No'),
      escapeCSV(c.governingLaw),
      escapeCSV(totalMilestones),
      escapeCSV(paidCount),
      escapeCSV(c.signedByClient ? 'Yes' : 'No'),
      escapeCSV(c.signedByCounterparty ? 'Yes' : 'No'),
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  link.href = url;
  link.setAttribute('download', `${filename}_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
