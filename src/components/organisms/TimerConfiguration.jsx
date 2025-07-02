import React from 'react';
import { motion } from 'framer-motion';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';

const TimerConfiguration = ({ config, updateConfig, selectedTemplate, onTemplateSelect }) => {
  const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Courier New, monospace', label: 'Courier New' },
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  ];

  const templates = [
    {
      id: 'compact',
      name: 'Compact',
      description: 'Hours and minutes only',
      icon: 'Clock',
      preview: 'HH:MM',
      config: {
        showDays: false,
        showHours: true,
        showMinutes: true,
        showSeconds: false,
        fontSize: 20,
        padding: 12,
        borderRadius: 8,
      }
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Days, hours, and minutes',
      icon: 'Calendar',
      preview: 'DD:HH:MM',
      config: {
        showDays: true,
        showHours: true,
        showMinutes: true,
        showSeconds: false,
        fontSize: 24,
        padding: 20,
        borderRadius: 12,
      }
    },
    {
      id: 'expanded',
      name: 'Expanded',
      description: 'Full countdown with seconds',
      icon: 'Timer',
      preview: 'DD:HH:MM:SS',
      config: {
        showDays: true,
        showHours: true,
        showMinutes: true,
        showSeconds: true,
        fontSize: 28,
        padding: 24,
        borderRadius: 16,
      }
    }
  ];

  const formatDateTimeLocal = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  const handleDateTimeChange = (value) => {
    updateConfig('targetDate', value);
  };

  const handleTemplateClick = (template) => {
    onTemplateSelect(template.id);
    // Apply template configuration
    Object.entries(template.config).forEach(([key, value]) => {
      updateConfig(key, value);
    });
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Template Gallery */}
      <div className="premium-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">0</span>
          </div>
          Choose Template
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              className={`
                relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                ${selectedTemplate === template.id 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }
              `}
              onClick={() => handleTemplateClick(template)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Template Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${selectedTemplate === template.id 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  <ApperIcon name={template.icon} size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  <p className="text-xs text-gray-500">{template.description}</p>
                </div>
              </div>

              {/* Template Preview */}
              <div className="bg-gray-50 rounded-md p-3 mb-3">
                <div className="text-center">
                  <div className="text-lg font-mono font-bold text-gray-700 mb-1">
                    {template.preview}
                  </div>
                  <div className="text-xs text-gray-500">
                    Format Preview
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <motion.div 
                  className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ApperIcon name="Check" size={14} className="text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
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
          
          <FormField
            type="select"
            label="Number Animation"
            value={config.animationType}
            onChange={(e) => updateConfig('animationType', e.target.value)}
            options={[
              { value: 'fade', label: 'Fade' },
              { value: 'slide', label: 'Slide Up' },
              { value: 'bounce', label: 'Bounce' },
              { value: 'scale', label: 'Scale' },
              { value: 'flip', label: 'Flip' }
            ]}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TimerConfiguration;