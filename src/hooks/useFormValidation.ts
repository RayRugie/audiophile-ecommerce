'use client';

import { useState, useCallback } from 'react';

export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface FormValidation {
  [key: string]: ValidationRule[];
}

export interface ValidationErrors {
  [key: string]: string;
}

/**
 * Custom hook for form validation
 */
export function useFormValidation(validationRules: FormValidation) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validate = useCallback(
    (name: string, value: string) => {
      const rules = validationRules[name];
      if (!rules) return '';

      for (const rule of rules) {
        if (!rule.test(value)) {
          return rule.message;
        }
      }

      return '';
    },
    [validationRules]
  );

  const validateAll = useCallback(
    (values: { [key: string]: string }) => {
      const newErrors: ValidationErrors = {};

      for (const [name, value] of Object.entries(values)) {
        const error = validate(name, value);
        if (error) {
          newErrors[name] = error;
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validate]
  );

  const handleBlur = useCallback(
    (name: string, value: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validate]
  );

  const handleChange = useCallback(
    (name: string, value: string) => {
      // Clear error when user starts typing
      if (errors[name]) {
        const error = validate(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [errors, validate]
  );

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validate,
    validateAll,
    handleBlur,
    handleChange,
    resetValidation,
  };
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    test: (value) => value.trim().length > 0,
    message,
  }),

  email: (message = 'Invalid email address'): ValidationRule => ({
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  phone: (message = 'Invalid phone number'): ValidationRule => ({
    test: (value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value),
    message,
  }),

  zipCode: (message = 'Invalid ZIP code'): ValidationRule => ({
    test: (value) => /^\d{5}(-\d{4})?$/.test(value),
    message,
  }),

  minLength: (length: number, message: string): ValidationRule => ({
    test: (value) => value.length >= length,
    message,
  }),
};

