import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface ErrorDisplayProps {
  error: string | Error | null;
  className?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  className = '',
  onRetry,
  retryText = 'Try Again',
}) => {
  if (!error) return null;

  const errorMessage = error instanceof Error ? error.message : String(error);

  return (
    <div
      className={`bg-red-50 border-l-4 border-red-400 p-4 ${className}`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            {errorMessage || 'An unexpected error occurred'}
          </p>
          {onRetry && (
            <div className="mt-2">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {retryText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PageError: React.FC<{
  error: string | Error | null;
  className?: string;
  onRetry?: () => void;
}> = ({ error, className = '', onRetry }) => (
  <div className={`flex items-center justify-center min-h-[50vh] ${className}`}>
    <ErrorDisplay 
      error={error} 
      onRetry={onRetry} 
      className="w-full max-w-md" 
    />
  </div>
);
