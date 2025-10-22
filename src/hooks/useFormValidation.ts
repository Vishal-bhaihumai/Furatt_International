import { useState, useCallback } from 'react';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export interface FieldRules {
  [key: string]: ValidationRules;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export const useFormValidation = (initialValues: { [key: string]: string }, rules: FieldRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((name: string, value: string): string | undefined => {
    const fieldRules = rules[name];
    if (!fieldRules) return undefined;

    if (fieldRules.required && !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (fieldRules.minLength && value.trim().length < fieldRules.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${fieldRules.minLength} characters`;
    }

    if (fieldRules.maxLength && value.trim().length > fieldRules.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${fieldRules.maxLength} characters`;
    }

    if (fieldRules.pattern && !fieldRules.pattern.test(value.trim())) {
      return `Please enter a valid ${name.toLowerCase()}`;
    }

    if (fieldRules.custom) {
      return fieldRules.custom(value);
    }

    return undefined;
  }, [rules]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(rules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, rules, validateField]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, [validateField]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues
  };
};