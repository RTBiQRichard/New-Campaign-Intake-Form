import { PLACEMENTS, DISPLAY_SIZES } from '../constants';
import { FormData, FormErrors } from '../types';

interface PlacementsProps {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FormErrors;
  accent?: string;
}

export function Placements({ data, setData, errors, accent = '#475569' }: PlacementsProps) {
  function togglePlacement(key: string) {
    setData((d) => {
      const has = d.placements.includes(key);
      const placements = has ? d.placements.filter((x) => x !== key) : [...d.placements, key];
      const displaySizes = placements.includes('display') ? d.displaySizes : [];
      return { ...d, placements, displaySizes };
    });
  }

  function toggleDisplaySize(size: string) {
    setData((d) => {
      const has = d.displaySizes.includes(size);
      const displaySizes = has ? d.displaySizes.filter((x) => x !== size) : [...d.displaySizes, size];
      return { ...d, displaySizes };
    });
  }

  return (
    <section className="rounded-2xl border border-slate-200 p-5 bg-white">
      <h2 className="text-sm font-semibold text-slate-900">Placement/s</h2>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {PLACEMENTS.map((p) => (
          <label key={p.key} className="flex items-center gap-3 rounded-xl border p-3 cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="checkbox"
              checked={data.placements.includes(p.key)}
              onChange={() => togglePlacement(p.key)}
              className="accent-slate-700"
            />
            <span className="text-sm">{p.label}</span>
          </label>
        ))}
      </div>
      {data.placements.includes('display') && (
        <div className="mt-4">
          <h3 className="text-xs font-medium text-slate-600">Display sizes</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {DISPLAY_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                className="rounded-full border px-3 py-1.5 text-xs transition-all hover:bg-slate-50"
                style={
                  data.displaySizes.includes(size)
                    ? { borderColor: accent, backgroundColor: `${accent}1A` }
                    : {}
                }
                onClick={() => toggleDisplaySize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.displaySizes && <p className="mt-1 text-xs text-red-600">{errors.displaySizes}</p>}
        </div>
      )}
    </section>
  );
}
