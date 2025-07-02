import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import TimerDisplay from '@/components/molecules/TimerDisplay';
import CodeOutput from '@/components/molecules/CodeOutput';
import ApperIcon from '@/components/ApperIcon';

const TimerPreview = ({ config }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [deviceMode, setDeviceMode] = useState('desktop');

  const deviceModes = [
    { id: 'desktop', label: 'Desktop', icon: 'Monitor', width: '100%' },
    { id: 'tablet', label: 'Tablet', icon: 'Tablet', width: '768px' },
    { id: 'mobile', label: 'Mobile', icon: 'Smartphone', width: '375px' },
  ];

  const tabs = [
    { id: 'preview', label: 'Live Preview', icon: 'Eye' },
    { id: 'code', label: 'Embed Code', icon: 'Code' },
  ];

  return (
    <motion.div 
      className="h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="premium-card rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Preview & Export</h2>
          
          {activeTab === 'preview' && (
            <div className="flex items-center gap-2">
              {deviceModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={deviceMode === mode.id ? 'primary' : 'ghost'}
                  size="sm"
                  icon={mode.icon}
                  onClick={() => setDeviceMode(mode.id)}
                  className="hidden sm:flex"
                >
                  {mode.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              <ApperIcon name={tab.icon} size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 premium-card rounded-xl p-6">
        {activeTab === 'preview' ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl mx-auto">
              {/* Device Frame */}
              <motion.div 
                className="mx-auto bg-white rounded-lg shadow-strong p-8"
                style={{ 
                  width: deviceModes.find(m => m.id === deviceMode)?.width,
                  maxWidth: '100%'
                }}
                layout
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center min-h-[300px]">
                  {config.targetDate ? (
                    <TimerDisplay config={config} />
                  ) : (
                    <motion.div 
                      className="text-center text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <ApperIcon name="Clock" size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium">Set a target date to preview your timer</p>
                      <p className="text-sm mt-2">Configure your timer settings in the left panel</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Device Info */}
              <div className="text-center mt-4 text-sm text-gray-600">
                <p>Preview Mode: {deviceModes.find(m => m.id === deviceMode)?.label}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <CodeOutput config={config} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TimerPreview;