import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = 'No data available',
  message = 'Get started by adding your first item.',
  icon = 'Package',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <ApperIcon name={icon} size={40} className="text-gray-500" />
      </motion.div>
      
      <motion.h3
        className="text-xl font-semibold text-gray-900 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h3>
      
      <motion.p
        className="text-gray-600 mb-8 max-w-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {message}
      </motion.p>
      
      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="primary"
            onClick={onAction}
            icon="Plus"
            size="lg"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
      
      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex flex-col items-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg">
          <ApperIcon name="Zap" size={24} className="text-blue-600 mb-2" />
          <p className="text-sm font-medium text-blue-800">Fast Setup</p>
          <p className="text-xs text-blue-600 mt-1">Get started in minutes</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg">
          <ApperIcon name="Palette" size={24} className="text-green-600 mb-2" />
          <p className="text-sm font-medium text-green-800">Customizable</p>
          <p className="text-xs text-green-600 mt-1">Match your brand</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg">
          <ApperIcon name="Code" size={24} className="text-purple-600 mb-2" />
          <p className="text-sm font-medium text-purple-800">Easy Embed</p>
          <p className="text-xs text-purple-600 mt-1">Copy & paste code</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Empty;