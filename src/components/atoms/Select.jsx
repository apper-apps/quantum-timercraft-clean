import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option...",
  disabled = false,
  error,
  className = '',
  required = false,
  renderOption = false,
  ...props
}) => {
  const selectClasses = `
    form-input appearance-none w-full px-4 py-2.5 pr-10 rounded-lg text-gray-900
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}
    ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
{options.map((option, index) => (
            <option key={index} value={option.value}>
              {renderOption && option.example 
                ? `${option.label} - ${option.example} (${option.description})`
                : option.label
              }
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon 
            name="ChevronDown" 
            size={18} 
            className={`${error ? 'text-red-400' : 'text-gray-400'}`} 
          />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;