import React from 'react';
import { motion } from 'framer-motion';
import FormField from '@/components/molecules/FormField';

const TimerConfiguration = ({ config, updateConfig }) => {
  const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Courier New, monospace', label: 'Courier New' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  ];

  const formatDateTimeLocal = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  const handleDateTimeChange = (value) => {
    updateConfig('targetDate', value);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="premium-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">1</span>
          </div>
          Timer Settings
        </h2>
        
        <div className="space-y-4">
          <FormField
            label="Event Name"
            value={config.eventName}
            onChange={(e) => updateConfig('eventName', e.target.value)}
            placeholder="Black Friday Sale, Product Launch, etc."
          />
          
          <FormField
            label="Target Date & Time"
            type="datetime-local"
            value={formatDateTimeLocal(config.targetDate)}
            onChange={(e) => handleDateTimeChange(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="premium-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">2</span>
          </div>
          Display Options
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            type="toggle"
            label="Show Days"
            checked={config.showDays}
            onChange={(checked) => updateConfig('showDays', checked)}
          />
          <FormField
            type="toggle"
            label="Show Hours"
            checked={config.showHours}
            onChange={(checked) => updateConfig('showHours', checked)}
          />
          <FormField
            type="toggle"
            label="Show Minutes"
            checked={config.showMinutes}
            onChange={(checked) => updateConfig('showMinutes', checked)}
          />
          <FormField
            type="toggle"
            label="Show Seconds"
            checked={config.showSeconds}
            onChange={(checked) => updateConfig('showSeconds', checked)}
          />
        </div>
      </div>

      <div className="premium-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">3</span>
          </div>
          Style Customization
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="color"
              label="Text Color"
              value={config.textColor}
              onChange={(color) => updateConfig('textColor', color)}
            />
            <FormField
              type="color"
              label="Background Color"
              value={config.backgroundColor}
              onChange={(color) => updateConfig('backgroundColor', color)}
            />
          </div>
          
          <FormField
            type="select"
            label="Font Family"
            value={config.fontFamily}
            onChange={(e) => updateConfig('fontFamily', e.target.value)}
            options={fontOptions}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Font Size (px)"
              type="number"
              value={config.fontSize}
              onChange={(e) => updateConfig('fontSize', parseInt(e.target.value) || 16)}
              min="12"
              max="72"
            />
            <FormField
              label="Padding (px)"
              type="number"
              value={config.padding}
              onChange={(e) => updateConfig('padding', parseInt(e.target.value) || 0)}
              min="0"
              max="50"
            />
            <FormField
              label="Border Radius (px)"
              type="number"
              value={config.borderRadius}
              onChange={(e) => updateConfig('borderRadius', parseInt(e.target.value) || 0)}
              min="0"
              max="50"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimerConfiguration;