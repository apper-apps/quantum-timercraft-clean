import React from 'react';
import { motion } from 'framer-motion';

const ColorPicker = ({ 
  label, 
  value, 
  onChange, 
  presetColors = [], 
  className = '',
  required = false 
}) => {
  const defaultPresets = [
    '#5B4FE9', '#8B85F0', '#FF6B6B', '#4CAF50', '#2196F3',
    '#FF9800', '#9C27B0', '#F44336', '#607D8B', '#795548',
    '#000000', '#FFFFFF', '#666666', '#CCCCCC', '#E0E0E0'
  ];

  const colors = presetColors.length > 0 ? presetColors : defaultPresets;

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg border-3 border-white shadow-lg cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="form-input flex-1 px-3 py-2 text-sm rounded-lg"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;