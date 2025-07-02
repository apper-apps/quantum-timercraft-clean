import React from 'react';
import { motion } from 'framer-motion';

const Toggle = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false,
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    sm: {
      track: 'w-10 h-5',
      thumb: 'w-4 h-4',
      translate: 'translate-x-5'
    },
    md: {
      track: 'w-12 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-6'
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7'
    }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <button
        type="button"
        className={`
          relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${checked ? 'bg-primary-600' : 'bg-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${currentSize.track}
        `}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
      >
        <motion.span
          className={`
            pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out
            ${currentSize.thumb}
          `}
          animate={{
            x: checked ? (size === 'sm' ? 20 : size === 'md' ? 24 : 28) : 0
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      {label && (
        <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Toggle;