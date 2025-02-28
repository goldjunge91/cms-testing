export const logger = {
  error: (message: string, error: unknown) => {
    // In Produktionsumgebung könnte dies an einen Dienst wie Sentry gesendet werden
    if (process.env.NODE_ENV !== 'production') {
      console.error(message, error);
    }
  },
  warn: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(message, data);
    }
  },
  info: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV !== 'production') {
      console.info(message, data);
    }
  }
};
