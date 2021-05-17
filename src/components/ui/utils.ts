
export function formatNumber(num: number, options?: object): string {
  if(num === undefined) return '';

  return num.toLocaleString('en-US', options);
}

export function reintervate(func: () => any, interval: number): number | Promise<number> {
  const res = func();
  if(res instanceof Promise) {
    return res.then(() => window.setTimeout(() => reintervate(func, interval), interval))
  } else {
    return window.setTimeout(() => reintervate(func, interval), interval);
  }
};