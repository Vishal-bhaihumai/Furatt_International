import React from 'react';
import { SITE_CONFIG } from '../config/constants';

interface FormFieldProps {
  field: typeof SITE_CONFIG.forms.reservation.fields[0];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  touched?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched
}) => {
  const hasError = touched && error;
  const baseInputClasses = `mt-1 block w-full px-4 py-2 border rounded-md ${
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'
  }`;

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            rows={4}
            className={baseInputClasses}
            required={field.required}
          />
        );

      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseInputClasses}
            required={field.required}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseInputClasses}
            required={field.required}
            min={field.validation?.min}
            max={field.validation?.max}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            {...(field.type === 'date' && {
              min: field.validation?.minDate === 'today' 
                ? new Date().toISOString().split('T')[0]
                : field.validation?.minDate
            })}
            {...(field.type === 'time' && {
              min: field.validation?.minTime,
              max: field.validation?.maxTime
            })}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
        {field.label} {field.asterisk && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
      {hasError && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;