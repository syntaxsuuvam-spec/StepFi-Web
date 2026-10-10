const formatCache = new Map<string, Intl.NumberFormat | Intl.DateTimeFormat>();

export function formatNumber(value: number, options?: { locale?: string; maximumFractionDigits?: number }): string {
  const locale = options?.locale || 'en-US';
  const digits = options?.maximumFractionDigits ?? 2;
  const key = 
um__;
  if (!formatCache.has(key)) {
    formatCache.set(key, new Intl.NumberFormat(locale, { maximumFractionDigits: digits }));
  }
  return (formatCache.get(key) as Intl.NumberFormat).format(value);
}

export function formatCurrency(value: number, currency = 'USDC', locale = 'en-US'): string {
  const formatted = formatNumber(value, { locale });
  return ${formatted} ;
}

export function formatDate(value: string | number | Date, locale = 'en-US'): string {
  const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
  const key = date_;
  if (!formatCache.has(key)) {
    formatCache.set(key, new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }));
  }
  return (formatCache.get(key) as Intl.DateTimeFormat).format(date);
}

export function formatDateTime(value: string | number | Date, locale = 'en-US'): string {
  const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
  const key = dt_;
  if (!formatCache.has(key)) {
    formatCache.set(key, new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }));
  }
  return (formatCache.get(key) as Intl.DateTimeFormat).format(date);
}

export function formatPercent(value: number, locale = 'en-US'): string {
  const key = pct_;
  if (!formatCache.has(key)) {
    formatCache.set(key, new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }));
  }
  return (formatCache.get(key) as Intl.NumberFormat).format(value);
}