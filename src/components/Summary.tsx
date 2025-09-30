import { FormData } from '../types';

interface SummaryProps {
  data: FormData;
}

export function Summary({ data }: SummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5 text-sm bg-white shadow-sm">
      <h3 className="font-semibold text-slate-900">Summary</h3>
      <div className="mt-3 space-y-2 text-slate-600">
        <div>
          <span className="font-medium">Advertiser:</span> {data.advertiser || '—'}
        </div>
        <div>
          <span className="font-medium">Campaign:</span> {data.campaign || '—'}
        </div>
        <div>
          <span className="font-medium">Dates:</span> {data.startDate || '—'} → {data.endDate || '—'}
        </div>
        <div>
          <span className="font-medium">Budget:</span> {data.budget || '—'}
        </div>
        <div>
          <span className="font-medium">Geo:</span> {data.geoType} — {data.geoValue || '—'}
        </div>
        <div>
          <span className="font-medium">Placements:</span>{' '}
          {data.placements.length ? data.placements.join(', ') : '—'}
          {data.placements.includes('display') && data.displaySizes.length
            ? ` [${data.displaySizes.join(', ')}]`
            : ''}
        </div>
        <div>
          <span className="font-medium">Click URL:</span> {data.clickUrl || '—'}
        </div>
        <div>
          <span className="font-medium">Report email:</span> {data.reportEmail || '—'}
        </div>
      </div>
    </div>
  );
}
