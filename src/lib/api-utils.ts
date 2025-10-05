import { logger } from './logger';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function handleAPIRequest<T>(
  request: () => Promise<T>,
  errorContext?: Record<string, unknown>
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    logger.error('API request failed', error as Error, errorContext);
    
    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError(
      'An unexpected error occurred',
      500,
      'INTERNAL_SERVER_ERROR'
    );
  }
}

export function createErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}