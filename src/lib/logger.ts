type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

class Logger {
  private static instance: Logger;
  private isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatLogEntry(level: LogLevel, message: string, context?: Record<string, unknown>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context
    };
  }

  private logToConsole(entry: LogEntry) {
    const logMessage = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
    
    switch (entry.level) {
      case 'info':
        console.warn(logMessage, entry.context || '');
        break;
      case 'warn':
        console.warn(logMessage, entry.context || '');
        break;
      case 'error':
        console.error(logMessage, entry.context || '');
        break;
    }
  }

  public info(message: string, context?: Record<string, unknown>) {
    const entry = this.formatLogEntry('info', message, context);
    this.logToConsole(entry);
  }

  public warn(message: string, context?: Record<string, unknown>) {
    const entry = this.formatLogEntry('warn', message, context);
    this.logToConsole(entry);
  }

  public error(message: string, error?: Error, context?: Record<string, unknown>) {
    const entry = this.formatLogEntry('error', message, {
      ...context,
      error: {
        message: error?.message,
        stack: this.isDevelopment ? error?.stack : undefined
      }
    });
    this.logToConsole(entry);
  }
}

export const logger = Logger.getInstance();

export const info = logger.info.bind(logger);
export const warn = logger.warn.bind(logger);
export const error = logger.error.bind(logger);