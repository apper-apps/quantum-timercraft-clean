import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ text = 'Loading...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main spinner */}
        <motion.div
          className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner spinner */}
        <motion.div
          className="absolute top-2 left-2 w-8 h-8 border-3 border-gray-100 border-t-primary-300 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      
      <motion.p
        className="mt-4 text-gray-600 font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {text}
      </motion.p>
      
      {/* Skeleton loader for content */}
      <div className="mt-8 w-full max-w-md space-y-3">
        <motion.div
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
          style={{ width: '100%' }}
        />
        <motion.div
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
          style={{ width: '75%' }}
        />
        <motion.div
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
          style={{ width: '90%' }}
        />
      </div>
    </div>
  );
};

export default Loading;