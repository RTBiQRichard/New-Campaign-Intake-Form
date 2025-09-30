import { FormData, FormErrors } from './types';
import { currencyToNumber, luhnCheck } from './utils';

export function validate(data: FormData): FormErrors {
  const e: FormErrors = {};

  if (!data.advertiser?.trim()) e.advertiser = 'Required';
  if (!data.campaign?.trim()) e.campaign = 'Required';
  if (!data.startDate) e.startDate = 'Required';
  if (!data.endDate) e.endDate = 'Required';

  if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
    e.endDate = 'End date must be after start date';
  }

  const budgetNum = currencyToNumber(data.budget);
  if (!budgetNum || budgetNum <= 0) e.budget = 'Enter a positive amount';

  if (!data.geoValue?.trim()) e.geoValue = 'Enter targeting details';

  try {
    if (data.clickUrl && !new URL(data.clickUrl)) {}
  } catch {
    e.clickUrl = 'Enter a valid URL (incl. https://)';
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.reportEmail || '')) {
    e.reportEmail = 'Enter a valid email';
  }

  if (!data.ccName?.trim()) e.ccName = 'Required';

  const raw = (data.ccNumber || '').replace(/\D/g, '');
  if (raw.length < 12 || !luhnCheck(raw)) {
    e.ccNumber = 'Card number looks invalid';
  }

  if (!/^\d{2}\/(\d{2})$/.test(data.ccExp || '')) e.ccExp = 'Use MM/YY';
  if (!/^\d{3,4}$/.test(data.ccCvc || '')) e.ccCvc = '3–4 digits';
  if (!/^\d{3,10}$/.test(data.ccZip || '')) e.ccZip = 'ZIP/postal required';

  if (data.placements.includes('display') && data.displaySizes.length === 0) {
    e.displaySizes = 'Pick at least one display size';
  }

  return e;
}
