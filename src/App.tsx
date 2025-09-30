import { useState } from 'react';
import { FormData, SubmittedPayload } from './types';
import { validate } from './validation';
import { currencyToNumber, detectBrand, classNames } from './utils';
import { VariantCards } from './variants/VariantCards';
import { VariantSplit } from './variants/VariantSplit';
import { VariantCompact } from './variants/VariantCompact';

export default function App() {
  const [variant, setVariant] = useState<'cards' | 'split' | 'compact'>('cards');
  const [data, setData] = useState<FormData>({
    advertiser: '',
    campaign: '',
    startDate: '',
    endDate: '',
    budget: '',
    geoType: 'ZIP Code/s',
    geoValue: '',
    placements: [],
    displaySizes: [],
    clickUrl: '',
    reportEmail: '',
    ccName: '',
    ccNumber: '',
    ccExp: '',
    ccCvc: '',
    ccZip: '',
    creativeFiles: [],
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState<SubmittedPayload | null>(null);

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) return;

    const payload: SubmittedPayload = {
      advertiser: data.advertiser,
      campaign: data.campaign,
      startDate: data.startDate,
      endDate: data.endDate,
      budget: currencyToNumber(data.budget),
      targeting: { type: data.geoType, value: data.geoValue },
      placements: data.placements,
      displaySizes: data.displaySizes,
      clickUrl: data.clickUrl,
      reportEmail: data.reportEmail,
      payment: {
        nameOnCard: data.ccName,
        cardBrand: detectBrand(data.ccNumber) || 'Unknown',
        cardLast4: data.ccNumber.replace(/\D/g, '').slice(-4),
      },
      creativeFiles: data.creativeFiles.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      })),
    };
    setSubmitted(payload);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="mx-auto mb-6 flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campaign Intake Form</h1>
          <p className="text-sm text-slate-500">
            Switch between three layouts. All fields are identical.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setVariant('cards')}
            className={classNames(
              'rounded-full px-4 py-2 text-sm font-medium transition-all',
              variant === 'cards'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            )}
          >
            Cards
          </button>
          <button
            onClick={() => setVariant('split')}
            className={classNames(
              'rounded-full px-4 py-2 text-sm font-medium transition-all',
              variant === 'split'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            )}
          >
            Split Sidebar
          </button>
          <button
            onClick={() => setVariant('compact')}
            className={classNames(
              'rounded-full px-4 py-2 text-sm font-medium transition-all',
              variant === 'compact'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            )}
          >
            Compact + Summary
          </button>
        </div>
      </div>

      {variant === 'cards' && (
        <VariantCards data={data} setData={setData} errors={errors} onSubmit={onSubmit} />
      )}
      {variant === 'split' && (
        <VariantSplit data={data} setData={setData} errors={errors} onSubmit={onSubmit} />
      )}
      {variant === 'compact' && (
        <VariantCompact data={data} setData={setData} errors={errors} onSubmit={onSubmit} />
      )}

      {submitted && (
        <div className="mx-auto mt-6 max-w-6xl rounded-2xl border border-slate-300 bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900">Submitted payload</h3>
          <pre className="mt-3 overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-green-400">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
