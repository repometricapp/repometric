// A simple logger utility. In a real-world application, you would use a more
// robust logging library like Winston or Pino.

enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

function log(level: LogLevel, message: string, ...args: unknown[]) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`, ...args);
}

export const logger = {
  info: (message: string, ...args: unknown[]) =>
    log(LogLevel.INFO, message, ...args),
  warn: (message: string, ...args: unknown[]) =>
    log(LogLevel.WARN, message, ...args),
  error: (message: string, ...args: unknown[]) =>
    log(LogLevel.ERROR, message, ...args),
};
