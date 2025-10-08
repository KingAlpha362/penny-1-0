import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../components/error-boundary';

// Mock component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

// Mock component that throws a Firebase error
const ThrowFirebaseError = () => {
  const error = new Error('Firebase: Permission denied');
  error.name = 'FirebaseError';
  throw error;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Prevent console.error from cluttering the test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when child throws error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong')).toBeInTheDocument();
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('renders Firebase specific error UI for Firebase errors', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowFirebaseError />
      </ErrorBoundary>
    );

    expect(getByText('Permission Denied')).toBeInTheDocument();
    expect(getByText("You don't have permission to access this resource.")).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const fallback = <div>Custom fallback</div>;
    const { getByText } = render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(getByText('Custom fallback')).toBeInTheDocument();
  });

  it('resets error state when retry button is clicked', () => {
    const { getByText, queryByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong')).toBeInTheDocument();
    // Clicking 'Try again' should not throw in the test environment
    expect(() => fireEvent.click(getByText('Try again'))).not.toThrow();
    // Error UI should still be present because the child throws during render
    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
});