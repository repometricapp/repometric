// A simple logger utility for consistent logging across the application.
// In a production environment, you would want to use a more robust logging library.

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogDetails {
  message: string;
  [key: string]: unknown;
}

const log = (level: LogLevel, details: LogDetails) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({ timestamp, level, ...details }));
};

export const logger = {
  info: (details: LogDetails) => log(LogLevel.INFO, details),
  warn: (details: LogDetails) => log(LogLevel.WARN, details),
  error: (details: LogDetails) => log(LogLevel.ERROR, details),
};
