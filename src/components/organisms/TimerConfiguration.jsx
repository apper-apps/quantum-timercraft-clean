import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import FormField from "@/components/molecules/FormField";
import templateService from "@/services/templateService";
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

  const timerFormatOptions = [
    {
      value: 'minimal',
      label: 'Minimal',
      example: '15:30',
      description: 'Hours and minutes only',
      config: { showDays: false, showHours: true, showMinutes: true, showSeconds: false }
    },
    {
      value: 'standard',
      label: 'Standard',
      example: '2:15:30',
      description: 'Days, hours, and minutes',
      config: { showDays: true, showHours: true, showMinutes: true, showSeconds: false }
    },
    {
      value: 'detailed',
      label: 'Detailed',
      example: '2:15:30:45',
      description: 'Full countdown with seconds',
      config: { showDays: true, showHours: true, showMinutes: true, showSeconds: true }
    },
    {
      value: 'hours-only',
      label: 'Hours Only',
      example: '63:30',
      description: 'Hours and minutes (no days)',
      config: { showDays: false, showHours: true, showMinutes: true, showSeconds: false }
    },
    {
      value: 'compact',
      label: 'Compact',
      example: '30:45',
      description: 'Minutes and seconds only',
      config: { showDays: false, showHours: false, showMinutes: true, showSeconds: true }
    },
    {
      value: 'days-only',
      label: 'Days Only',
      example: '2 Days',
      description: 'Days counter only',
      config: { showDays: true, showHours: false, showMinutes: false, showSeconds: false }
    },
    {
      value: 'precision',
      label: 'High Precision',
      example: '2d 15h 30m 45s',
      description: 'All units with labels',
      config: { showDays: true, showHours: true, showMinutes: true, showSeconds: true }
    },
    {
      value: 'simple',
      label: 'Simple',
      example: '15h 30m',
      description: 'Hours and minutes with labels',
      config: { showDays: false, showHours: true, showMinutes: true, showSeconds: false }
    }
  ];

const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const templateData = await templateService.getTemplates();
        setTemplates(templateData);
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

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

  const handleFormatChange = (formatValue) => {
    updateConfig('timerFormat', formatValue);
    
    // Find the selected format and apply its configuration
    const selectedFormat = timerFormatOptions.find(format => format.value === formatValue);
    if (selectedFormat && selectedFormat.config) {
      Object.entries(selectedFormat.config).forEach(([key, value]) => {
        updateConfig(key, value);
      });
    }
};

  const handleStyleChange = (styleId) => {
    updateConfig('stylePreset', styleId);
    
    // Define style configurations
    const styleConfigs = {
      modern: {
        textColor: '#ffffff',
        backgroundColor: 'transparent',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
        border: 'none',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
      },
      classic: {
        textColor: '#333333',
        backgroundColor: 'transparent',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        border: '2px solid #e0e0e0',
        textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
      },
      neon: {
        textColor: '#00ffff',
        backgroundColor: 'transparent',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
        border: '1px solid #00ffff',
        textShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
      },
      minimal: {
        textColor: '#2d3748',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        textShadow: 'none'
      },
      elegant: {
        textColor: '#f7fafc',
        backgroundColor: 'transparent',
        boxShadow: '0 15px 35px rgba(30, 60, 114, 0.4)',
        border: '1px solid rgba(247, 250, 252, 0.2)',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'
      },
      bold: {
        textColor: '#ffffff',
        backgroundColor: 'transparent',
        boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
        border: 'none',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
      }
    };

    // Apply style configuration
    const selectedStyle = styleConfigs[styleId];
    if (selectedStyle) {
      Object.entries(selectedStyle).forEach(([key, value]) => {
        updateConfig(key, value);
      });
    }
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
        
{loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-32"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                className={`
                  relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-300
                  ${selectedTemplate === template.id 
                    ? 'border-primary-500 bg-primary-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }
                `}
                onClick={() => handleTemplateClick(template)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Template Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                    ${selectedTemplate === template.id 
                      ? 'bg-primary-500 text-white' 
                      : 'text-gray-600'
                    }
                  `}
                  style={{
                    backgroundColor: selectedTemplate === template.id 
                      ? template.colors?.primary || '#3B82F6'
                      : template.colors?.accent || '#F3F4F6'
                  }}>
                    <ApperIcon name={template.icon} size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{template.name}</h3>
                      {template.featured && (
                        <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                    <p className="text-xs text-primary-600 font-medium mt-1">{template.category}</p>
                  </div>
                </div>

                {/* Color Palette Preview */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.colors?.primary || '#000000' }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.colors?.secondary || '#666666' }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.colors?.background || '#FFFFFF' }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.colors?.accent || '#F5F5F5' }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">Color Scheme</span>
                </div>

                {/* Template Preview */}
                <div 
                  className="rounded-lg p-4 mb-4 border"
                  style={{
                    backgroundColor: template.colors?.background || '#FFFFFF',
                    borderColor: template.colors?.accent || '#E5E7EB',
                    background: template.style?.background || template.colors?.background || '#FFFFFF'
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="text-lg font-bold mb-1"
                      style={{
                        color: template.colors?.primary || '#000000',
                        fontFamily: template.config?.fontFamily || 'Arial, sans-serif',
                        textShadow: template.style?.textShadow || 'none',
                        letterSpacing: template.config?.letterSpacing || 'normal'
                      }}
                    >
                      {template.preview}
                    </div>
                    <div className="text-xs text-gray-500">
                      Live Preview
                    </div>
                  </div>
                </div>

                {/* Font & Style Info */}
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Font:</span>
                    <span className="font-medium">{template.config?.fontFamily?.split(',')[0] || 'Arial'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium">{template.config?.fontSize || 24}px</span>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedTemplate === template.id && (
                  <motion.div 
                    className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                    style={{ 
                      backgroundColor: template.colors?.primary || '#3B82F6',
                      color: template.colors?.background || '#FFFFFF'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, type: 'spring' }}
                  >
                    <ApperIcon name="Check" size={16} />
                  </motion.div>
                )}

                {/* Hover Effect Overlay */}
                <div className={`
                  absolute inset-0 rounded-xl transition-opacity duration-200
                  ${selectedTemplate === template.id ? 'opacity-0' : 'opacity-0 hover:opacity-5'}
                `}
                style={{ backgroundColor: template.colors?.primary || '#3B82F6' }}
                ></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
{/* Timer Settings */}
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

{/* Display Options */}
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

      {/* Timer Format Section */}
      <div className="premium-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">2.5</span>
          </div>
          Timer Format
        </h2>
        
        <FormField
          type="select"
          label="Display Format"
          value={config.timerFormat || 'standard'}
          onChange={(e) => handleFormatChange(e.target.value)}
          options={timerFormatOptions}
          renderOption={true}
        />
</div>

      {/* Timer Styles */}
      <div className="premium-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">2.7</span>
          </div>
          Timer Styles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 'modern',
              name: 'Modern',
              description: 'Gradient background with vibrant colors',
              preview: '12:34:56',
              className: 'timer-style-modern'
            },
            {
              id: 'classic',
              name: 'Classic',
              description: 'Clean and professional appearance',
              preview: '12:34:56',
              className: 'timer-style-classic'
            },
            {
              id: 'neon',
              name: 'Neon',
              description: 'Cyberpunk-inspired glowing effect',
              preview: '12:34:56',
              className: 'timer-style-neon'
            },
            {
              id: 'minimal',
              name: 'Minimal',
              description: 'Simple and clean design',
              preview: '12:34:56',
              className: 'timer-style-minimal'
            },
            {
              id: 'elegant',
              name: 'Elegant',
              description: 'Sophisticated blue gradient',
              preview: '12:34:56',
              className: 'timer-style-elegant'
            },
            {
              id: 'bold',
              name: 'Bold',
              description: 'Eye-catching red gradient',
              preview: '12:34:56',
              className: 'timer-style-bold'
            }
          ].map((style) => (
            <motion.div
              key={style.id}
              className={`
                relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300
                ${config.stylePreset === style.id 
                  ? 'border-primary-500 bg-primary-50 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }
              `}
              onClick={() => handleStyleChange(style.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center mb-3">
                <h3 className="font-semibold text-gray-800 mb-1">{style.name}</h3>
                <p className="text-xs text-gray-500">{style.description}</p>
              </div>
              
              <div className="flex justify-center mb-3">
                <div className={`
                  ${style.className} 
                  text-sm font-bold px-3 py-2 rounded-lg
                  transition-all duration-300
                `}>
                  {style.preview}
                </div>
              </div>

              {config.stylePreset === style.id && (
                <motion.div 
                  className="absolute top-2 right-2 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, type: 'spring' }}
                >
                  <ApperIcon name="Check" size={12} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

{/* Style Customization */}
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