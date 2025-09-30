import { FormData, FormErrors } from '../types';
import { TextArea } from './TextArea';

interface GeoTargetingProps {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FormErrors;
  accent?: string;
}

export function GeoTargeting({ data, setData, errors, accent = '#475569' }: GeoTargetingProps) {
  const opts = ['ZIP Code/s', 'DMA', 'State'];

  return (
    <section className="rounded-2xl border border-slate-200 p-5 bg-white">
      <h2 className="text-sm font-semibold text-slate-900">Geographic targeting</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {opts.map((t) => (
          <label
            key={t}
            className="flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-all hover:bg-slate-50"
            style={
              data.geoType === t
                ? { borderColor: accent, boxShadow: `0 0 0 1px ${accent}` }
                : {}
            }
          >
            <input
              type="radio"
              name="geoType"
              checked={data.geoType === t}
              onChange={() => setData((d) => ({ ...d, geoType: t }))}
              className="accent-slate-700"
            />
            <span className="text-sm">{t}</span>
          </label>
        ))}
      </div>
      <div className="mt-3">
        <TextArea
          label={
            data.geoType === 'ZIP Code/s'
              ? 'ZIP code list (comma or newline separated)'
              : data.geoType === 'DMA'
              ? 'DMA name(s) or code(s)'
              : 'State name(s)'
          }
          value={data.geoValue}
          onChange={(v) => setData((d) => ({ ...d, geoValue: v }))}
          placeholder={
            data.geoType === 'ZIP Code/s'
              ? '10001, 11201, 60601'
              : data.geoType === 'DMA'
              ? 'New York, Los Angeles'
              : 'NY, CA'
          }
          error={errors.geoValue}
        />
      </div>
    </section>
  );
}
