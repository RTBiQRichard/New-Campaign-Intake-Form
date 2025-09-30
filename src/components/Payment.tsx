import { useMemo } from 'react';
import { FormData, FormErrors } from '../types';
import { TextField } from './TextField';
import { detectBrand, formatCardNumber, classNames } from '../utils';

interface PaymentProps {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FormErrors;
}

export function Payment({ data, setData, errors }: PaymentProps) {
  const brand = useMemo(() => detectBrand(data.ccNumber), [data.ccNumber]);

  return (
    <section className="rounded-2xl border border-slate-200 p-5 bg-white">
      <h2 className="text-sm font-semibold text-slate-900">Credit Card (prototype only)</h2>
      <p className="mt-1 text-xs text-slate-500">
        In production, use Stripe/Adyen/Braintree Elements to tokenize—never store raw card data.
      </p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Name on card"
          value={data.ccName}
          onChange={(v) => setData((d) => ({ ...d, ccName: v }))}
          placeholder="Jane Q. Buyer"
          error={errors.ccName}
        />
        <TextField
          label="ZIP / Postal"
          value={data.ccZip}
          onChange={(v) => setData((d) => ({ ...d, ccZip: v }))}
          placeholder="10001"
          error={errors.ccZip}
        />
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">
            Card number{' '}
            {brand && (
              <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs">{brand}</span>
            )}
          </label>
          <input
            inputMode="numeric"
            className={classNames(
              'mt-1 w-full rounded-xl border p-2.5 tracking-widest outline-none focus:ring-2 focus:ring-slate-400 transition-shadow',
              errors.ccNumber && 'border-red-500'
            )}
            value={formatCardNumber(data.ccNumber)}
            onChange={(e) => setData((d) => ({ ...d, ccNumber: e.target.value }))}
            placeholder="1234 1234 1234 1234"
            maxLength={brand === 'AmEx' ? 17 : 19}
          />
          {errors.ccNumber && <p className="mt-1 text-xs text-red-600">{errors.ccNumber}</p>}
        </div>
        <TextField
          label="Expiry (MM/YY)"
          value={data.ccExp}
          onChange={(v) => {
            let s = v.replace(/\D/g, '');
            if (s.length > 4) s = s.slice(0, 4);
            if (s.length > 2) s = s.slice(0, 2) + '/' + s.slice(2);
            setData((d) => ({ ...d, ccExp: s }));
          }}
          placeholder="MM/YY"
          error={errors.ccExp}
          inputMode="numeric"
        />
        <TextField
          label="CVC"
          value={data.ccCvc}
          onChange={(v) => setData((d) => ({ ...d, ccCvc: v.replace(/\D/g, '').slice(0, 4) }))}
          placeholder="123"
          error={errors.ccCvc}
          inputMode="numeric"
        />
      </div>
    </section>
  );
}
