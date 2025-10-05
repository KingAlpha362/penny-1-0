'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle, ShieldAlert, Key } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  private getErrorDetails() {
    const { error } = this.state;
    const errorMessage = error?.message || 'An unexpected error occurred.';

    if (error?.name === 'FirebaseError') {
      if (errorMessage.includes('permission-denied')) {
        return {
          title: 'Permission Denied',
          icon: ShieldAlert,
          message: 'You don\'t have permission to access this resource.'
        };
      }
      if (errorMessage.includes('auth')) {
        return {
          title: 'Authentication Error',
          icon: Key,
          message: 'There was a problem with authentication. Please try signing in again.'
        };
      }
      return {
        title: 'Firebase Error',
        icon: AlertCircle,
        message: errorMessage
      };
    }

    return {
      title: 'Something went wrong',
      icon: AlertCircle,
      message: errorMessage
    };
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { title, icon: Icon, message } = this.getErrorDetails();

      return (
        <div className="flex items-center justify-center min-h-[400px] p-6">
          <Alert className="max-w-lg" variant="destructive">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <AlertTitle>{title}</AlertTitle>
            </div>
            <AlertDescription className="mt-2">
              <p className="text-sm text-muted-foreground mb-4">
                {message}
              </p>
              <div className="flex gap-2">
                <Button onClick={this.handleRetry} variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try again
                </Button>
                {this.state.error?.name === 'FirebaseError' && (
                  <Button onClick={() => window.location.href = '/login'} variant="outline" size="sm">
                    <Key className="mr-2 h-4 w-4" />
                    Sign in
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}