import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "premium-button text-white focus:ring-primary-300",
    accent: "accent-button text-white focus:ring-accent-300",
    secondary: "bg-white border-2 border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300 focus:ring-primary-300",
    outline: "bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:ring-gray-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
    xl: "px-8 py-4 text-lg gap-3",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={iconSizes[size]} />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={iconSizes[size]} />
      )}
    </motion.button>
  );
};

export default Button;