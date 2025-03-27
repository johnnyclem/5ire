export function init() {
  // Initialization removed as Sentry is no longer used
}

export function captureException(error: Error | string) {
  console.error(error);
}

export function captureWarning(warning: any) {
  console.warn(warning);
}

export function debug(...messages: any[]) {
  console.debug(...messages);
}

export function info(...messages: any[]) {
  console.info(...messages);
}

export function warn(...messages: any[]) {
  console.warn(...messages);
} 