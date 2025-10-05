import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';

interface ValidationError {
  path: string[];
  message: string;
}

interface UseValidatedFormReturn<T extends FieldValues> extends UseFormReturn<T> {
  errors: Record<string, string>;
  isValid: boolean;
}

export function useValidatedForm<T extends FieldValues>(schema: z.ZodSchema<T>, defaultValues?: Partial<T>): UseValidatedFormReturn<T> {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const validateField = (name: keyof T, value: any) => {
    try {
      if (schema instanceof z.ZodObject) {
        const fieldSchema = schema.shape[name as string];
        fieldSchema.parse(value);
        setErrors(prev => ({ ...prev, [name]: '' }));
        return true;
      } else {
        // fallback: validate the whole schema if not an object
        schema.parse({ [name]: value });
        setErrors(prev => ({ ...prev, [name]: '' }));
        return true;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors[0];
        setErrors(prev => ({ ...prev, [name]: fieldError.message }));
        return false;
      }
      return true;
    }
  };

  const validate = async (data: T) => {
    try {
      await schema.parseAsync(data);
      setErrors({});
      setIsValid(true);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        setIsValid(false);
        return false;
      }
      return true;
    }
  };

  form.register = (name: any, options: any = {}) => {
    const baseRegister = form.register(name, {
      ...options,
      onChange: async (e: any) => {
        if (options.onChange) {
          await options.onChange(e);
        }
        validateField(name, e.target.value);
      },
    });
    return baseRegister;
  };

  const originalHandleSubmit = form.handleSubmit;
  form.handleSubmit = (onValid, onInvalid?) => {
    return originalHandleSubmit(async (data) => {
      const isValidData = await validate(data);
      if (isValidData && onValid) {
        await onValid(data);
      }
    }, onInvalid);
  };

  return {
    ...form,
    errors,
    isValid,
  };
}