import { classNames } from '../utils';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'search' | 'email' | 'url';
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  inputMode,
}: TextFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        inputMode={inputMode}
        className={classNames(
          'mt-1 w-full rounded-xl border p-2.5 outline-none focus:ring-2 focus:ring-slate-400 transition-shadow',
          error && 'border-red-500'
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
