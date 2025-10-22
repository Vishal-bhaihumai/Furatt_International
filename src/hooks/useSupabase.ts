import { useState } from 'react';
import { api } from '../services/supabase';

interface UseSupabaseOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSupabase = (options: UseSupabaseOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async <T>(
    apiFunction: (data: T) => Promise<any>,
    data: T,
    operationType: string = 'operation'
  ) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`🚀 Starting Supabase ${operationType}...`, {
        timestamp: new Date().toISOString(),
        data
      });

      const result = await apiFunction(data);

      console.log(`✅ Supabase ${operationType} successful!`, {
        timestamp: new Date().toISOString(),
        result,
        data
      });

      options.onSuccess?.();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      
      console.error(`❌ Supabase ${operationType} failed:`, {
        timestamp: new Date().toISOString(),
        error: error.message,
        data,
        stack: error.stack
      });

      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSubmit
  };
};