import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import TimerConfiguration from '@/components/organisms/TimerConfiguration';
import TimerPreview from '@/components/organisms/TimerPreview';

const TimerBuilder = () => {
  const [config, setConfig] = useState({
    eventName: 'Special Event',
    targetDate: '',
    textColor: '#1F2937',
    backgroundColor: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Arial, sans-serif',
    padding: 20,
    borderRadius: 12,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
  });

  // Set default target date to 7 days from now
  useEffect(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    defaultDate.setHours(23, 59, 0, 0);
    
    setConfig(prev => ({
      ...prev,
      targetDate: defaultDate.toISOString().slice(0, 16)
    }));
  }, []);

  const updateConfig = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full">
          {/* Configuration Panel */}
          <motion.div 
            className="h-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-8 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <TimerConfiguration 
                config={config} 
                updateConfig={updateConfig} 
              />
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div 
            className="h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-8 h-[calc(100vh-6rem)]">
              <TimerPreview config={config} />
            </div>
          </motion.div>
        </div>

        {/* Mobile-only footer with tips */}
        <motion.div 
          className="xl:hidden mt-12 premium-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Configure your timer settings and styling options above</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Preview your timer in real-time before embedding</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Copy the embed code and paste it into your website</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Your timer will automatically update every second</p>
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default TimerBuilder;