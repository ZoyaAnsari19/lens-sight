export type ToastType = 'success' | 'error' | 'info';
export type Toast = { id: number; message: string; type: ToastType };

let id = 0;
let toasts: Toast[] = [];
let listeners: Array<(ts: Toast[]) => void> = [];

export const showToast = (message: string, type: ToastType = 'info') => {
  const t: Toast = { id: id++, message, type };
  toasts = [...toasts, t];
  listeners.forEach(l => l(toasts));
  setTimeout(() => {
    toasts = toasts.filter(x => x.id !== t.id);
    listeners.forEach(l => l(toasts));
  }, 3000);
};

export const subscribeToToasts = (fn: (ts: Toast[]) => void) => {
  listeners.push(fn);
  fn(toasts); // initial push
  return () => { listeners = listeners.filter(l => l !== fn); };
};
