import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Custom hook to track previous values
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const TimerDisplay = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Track previous time values to detect changes
  const previousTimeLeft = usePrevious(timeLeft);

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
    boxShadow: config.boxShadow || 'none',
    border: config.border || 'none',
    textShadow: config.textShadow || 'none',
    transition: 'all 0.3s ease',
  };

  // Apply style preset class if selected
  const stylePresetClass = config.stylePreset ? `timer-style-${config.stylePreset}` : '';
const AnimatedNumber = ({ value, animationType, shouldAnimate = true }) => {
    const animationVariants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 }
      },
      slide: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
        transition: { duration: 0.4, ease: "easeOut" }
      },
      bounce: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
        transition: { duration: 0.5, type: "spring", bounce: 0.4 }
      },
      scale: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
        transition: { duration: 0.3, ease: "easeOut" }
      },
      flip: {
        initial: { rotateY: 90, opacity: 0 },
        animate: { rotateY: 0, opacity: 1 },
        exit: { rotateY: -90, opacity: 0 },
        transition: { duration: 0.4 }
      }
    };

    const variant = animationVariants[animationType] || animationVariants.fade;

    // Only animate when shouldAnimate is true
    if (!shouldAnimate) {
      return (
        <div className="text-2xl font-bold tabular-nums">
          {String(value).padStart(2, '0')}
        </div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`${animationType}-${value}`}
          className="text-2xl font-bold tabular-nums"
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          transition={variant.transition}
        >
          {String(value).padStart(2, '0')}
        </motion.div>
      </AnimatePresence>
    );
  };

const TimerUnit = ({ value, label, show, animationType, shouldAnimate = true }) => {
    if (!show) return null;
    
    return (
      <motion.div 
        className="timer-digit flex flex-col items-center justify-center min-w-[60px] p-3 rounded-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <AnimatedNumber 
          value={value} 
          animationType={animationType} 
          shouldAnimate={shouldAnimate}
        />
        <div className="text-xs uppercase tracking-wide opacity-75 mt-1">
          {label}
        </div>
      </motion.div>
    );
  };

// Determine which units should animate based on value changes
  const shouldAnimateDays = previousTimeLeft ? previousTimeLeft.days !== timeLeft.days : false;
  const shouldAnimateHours = previousTimeLeft ? previousTimeLeft.hours !== timeLeft.hours : false;
  const shouldAnimateMinutes = previousTimeLeft ? previousTimeLeft.minutes !== timeLeft.minutes : false;
  const shouldAnimateSeconds = previousTimeLeft ? previousTimeLeft.seconds !== timeLeft.seconds : false;

  return (
    <div className="w-full max-w-lg mx-auto">
    {config.eventName && <motion.div
        className="text-center mb-6"
        initial={{
            opacity: 0,
            y: -20
        }}
        animate={{
            opacity: 1,
            y: 0
        }}
        transition={{
            duration: 0.5
        }}>
        <h3 className="text-xl font-semibold text-gray-800">
            {config.eventName}
        </h3>
    </motion.div>}
    <motion.div
        className="rounded-xl p-6 shadow-medium"
        style={timerStyle}
        initial={{
            opacity: 0,
            scale: 0.9
        }}
        animate={{
            opacity: 1,
            scale: 1
        }}
        transition={{
            duration: 0.5,
            delay: 0.2
        }}>
        <div className="flex items-center justify-center gap-4 flex-wrap">
            <TimerUnit
                value={timeLeft.days}
                label="Days"
                show={config.showDays}
                animationType={config.animationType}
                shouldAnimate={shouldAnimateDays} />
            <motion.div
                className={`rounded-xl p-6 shadow-medium ${stylePresetClass}`}
                style={timerStyle}
                initial={{
                    opacity: 0,
                    scale: 0.9
                }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.2
                }}>
                <TimerUnit
                    value={timeLeft.minutes}
                    label="Minutes"
                    show={config.showMinutes}
                    animationType={config.animationType}
                    shouldAnimate={shouldAnimateMinutes} />
                <TimerUnit
                    value={timeLeft.seconds}
                    label="Seconds"
                    show={config.showSeconds}
                    animationType={config.animationType}
                    shouldAnimate={shouldAnimateSeconds} />
            </motion.div></div>
    </motion.div>
</div>
  );
};

export default TimerDisplay;