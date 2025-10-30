interface Window {
  confirm(message?: string): boolean;
}

declare const window: Window & typeof globalThis;
