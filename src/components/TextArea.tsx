import { classNames } from '../utils';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  rows?: number;
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 3,
}: TextAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <textarea
        className={classNames(
          'mt-1 w-full rounded-xl border p-2.5 outline-none focus:ring-2 focus:ring-slate-400 transition-shadow',
          error && 'border-red-500'
        )}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
