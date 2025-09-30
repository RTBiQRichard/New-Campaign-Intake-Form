import { FormData, FormErrors } from '../types';
import { TextField } from '../components/TextField';
import { GeoTargeting } from '../components/GeoTargeting';
import { Placements } from '../components/Placements';
import { Payment } from '../components/Payment';
import { FileUpload } from '../components/FileUpload';
import { classNames } from '../utils';

interface VariantCardsProps {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FormErrors;
  onSubmit: (ev: React.FormEvent) => void;
}

export function VariantCards({ data, setData, errors, onSubmit }: VariantCardsProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Campaign Intake</h1>
      <p className="text-sm text-slate-500">Classic card layout</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Advertiser"
            value={data.advertiser}
            onChange={(v) => setData((d) => ({ ...d, advertiser: v }))}
            placeholder="ACME Corp"
            error={errors.advertiser}
          />
          <TextField
            label="Campaign"
            value={data.campaign}
            onChange={(v) => setData((d) => ({ ...d, campaign: v }))}
            placeholder="Fall Launch"
            error={errors.campaign}
          />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField
            label="Start date"
            type="date"
            value={data.startDate}
            onChange={(v) => setData((d) => ({ ...d, startDate: v }))}
            error={errors.startDate}
          />
          <TextField
            label="End date"
            type="date"
            value={data.endDate}
            onChange={(v) => setData((d) => ({ ...d, endDate: v }))}
            error={errors.endDate}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700">Spend budget</label>
            <div className="mt-1 flex rounded-xl border focus-within:ring-2 focus-within:ring-slate-400">
              <span className="inline-flex items-center px-3 text-slate-500">$</span>
              <input
                inputMode="decimal"
                className={classNames(
                  'w-full rounded-r-xl p-2.5 outline-none',
                  errors.budget && 'ring-2 ring-red-500'
                )}
                value={data.budget}
                onChange={(e) => setData((d) => ({ ...d, budget: e.target.value }))}
                placeholder="10,000.00"
              />
            </div>
            {errors.budget && <p className="mt-1 text-xs text-red-600">{errors.budget}</p>}
          </div>
        </section>

        <GeoTargeting data={data} setData={setData} errors={errors} />
        <Placements data={data} setData={setData} errors={errors} />

        <FileUpload
          files={data.creativeFiles}
          onChange={(files) => setData((d) => ({ ...d, creativeFiles: files }))}
          error={errors.creativeFiles}
        />

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Click URL"
            value={data.clickUrl}
            onChange={(v) => setData((d) => ({ ...d, clickUrl: v }))}
            placeholder="https://example.com/landing"
            error={errors.clickUrl}
          />
          <TextField
            label="Email for reports"
            value={data.reportEmail}
            onChange={(v) => setData((d) => ({ ...d, reportEmail: v }))}
            placeholder="you@company.com"
            error={errors.reportEmail}
          />
        </section>

        <Payment data={data} setData={setData} errors={errors} />

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() =>
              setData({
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
              })
            }
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
          >
            Clear
          </button>
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow hover:bg-slate-800 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
