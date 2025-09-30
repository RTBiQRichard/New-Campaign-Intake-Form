export function classNames(...xs: (string | boolean | undefined)[]): string {
  return xs.filter(Boolean).join(' ');
}

export function luhnCheck(num: string): boolean {
  const s = (num || '').replace(/\D/g, '');
  if (!s) return false;
  let sum = 0;
  let d = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let n = +s[i];
    if (d) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    d = !d;
  }
  return sum % 10 === 0;
}

export function detectBrand(num: string): string {
  const s = (num || '').replace(/\D/g, '');
  if (/^4\d{0,15}$/.test(s)) return 'Visa';
  if (/^5[1-5]\d{0,14}$/.test(s) || /^2(2[2-9]|[3-6]\d|7[01]|720)\d{0,12}$/.test(s))
    return 'Mastercard';
  if (/^3[47]\d{0,13}$/.test(s)) return 'AmEx';
  if (/^6(?:011|5\d{2})\d{0,12}$/.test(s)) return 'Discover';
  return '';
}

export function formatCardNumber(v: string): string {
  const s = (v || '').replace(/\D/g, '');
  const b = detectBrand(s);
  if (b === 'AmEx') {
    return s.replace(/(\d{1,4})(\d{1,6})?(\d{1,5})?/, (m, a, c, d) =>
      [a, c, d].filter(Boolean).join(' ')
    );
  }
  return s.replace(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/, (m, a, c, d, e) =>
    [a, c, d, e].filter(Boolean).join(' ')
  );
}

export function currencyToNumber(v: string): number {
  const s = (v || '').toString().replace(/[^\d.]/g, '');
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}
