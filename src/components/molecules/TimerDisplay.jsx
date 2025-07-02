import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TimerDisplay = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!config.targetDate) return;
      
      const now = new Date().getTime();
      const target = new Date(config.targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [config.targetDate]);

  const timerStyle = {
    color: config.textColor,
    backgroundColor: config.backgroundColor,
    fontSize: `${config.fontSize}px`,
    fontFamily: config.fontFamily,
    padding: `${config.padding}px`,
    borderRadius: `${config.borderRadius}px`,
  };

  const TimerUnit = ({ value, label, show }) => {
    if (!show) return null;
    
    return (
      <motion.div 
        className="timer-digit flex flex-col items-center justify-center min-w-[60px] p-3 rounded-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="text-2xl font-bold tabular-nums">
          {String(value).padStart(2, '0')}
        </div>
        <div className="text-xs uppercase tracking-wide opacity-75 mt-1">
          {label}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {config.eventName && (
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-800">
            {config.eventName}
          </h3>
        </motion.div>
      )}
      
      <motion.div 
        className="rounded-xl p-6 shadow-medium"
        style={timerStyle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <TimerUnit 
            value={timeLeft.days} 
            label="Days" 
            show={config.showDays} 
          />
          <TimerUnit 
            value={timeLeft.hours} 
            label="Hours" 
            show={config.showHours} 
          />
          <TimerUnit 
            value={timeLeft.minutes} 
            label="Minutes" 
            show={config.showMinutes} 
          />
          <TimerUnit 
            value={timeLeft.seconds} 
            label="Seconds" 
            show={config.showSeconds} 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TimerDisplay;