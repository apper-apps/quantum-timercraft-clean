import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';

const CodeOutput = ({ config }) => {
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    const configJson = JSON.stringify(config, null, 2);
    
    return `<!-- TimerCraft Countdown Widget -->
<div id="timercraft-widget-${Date.now()}"></div>
<script>
(function() {
  const config = ${configJson};
  
  function createTimer(containerId, config) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    function updateTimer() {
      const now = new Date().getTime();
      const target = new Date(config.targetDate).getTime();
      const difference = target - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        let html = '<div style="text-align: center; font-family: ' + config.fontFamily + '; color: ' + config.textColor + '; background-color: ' + config.backgroundColor + '; padding: ' + config.padding + 'px; border-radius: ' + config.borderRadius + 'px; font-size: ' + config.fontSize + 'px;">';
        
        if (config.eventName) {
          html += '<div style="margin-bottom: 20px; font-weight: 600;">' + config.eventName + '</div>';
        }
        
        html += '<div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">';
        
        if (config.showDays) html += '<div style="text-align: center;"><div style="font-weight: bold; font-size: 1.5em;">' + String(days).padStart(2, '0') + '</div><div style="font-size: 0.8em; opacity: 0.8;">DAYS</div></div>';
        if (config.showHours) html += '<div style="text-align: center;"><div style="font-weight: bold; font-size: 1.5em;">' + String(hours).padStart(2, '0') + '</div><div style="font-size: 0.8em; opacity: 0.8;">HOURS</div></div>';
        if (config.showMinutes) html += '<div style="text-align: center;"><div style="font-weight: bold; font-size: 1.5em;">' + String(minutes).padStart(2, '0') + '</div><div style="font-size: 0.8em; opacity: 0.8;">MINUTES</div></div>';
        if (config.showSeconds) html += '<div style="text-align: center;"><div style="font-weight: bold; font-size: 1.5em;">' + String(seconds).padStart(2, '0') + '</div><div style="font-size: 0.8em; opacity: 0.8;">SECONDS</div></div>';
        
        html += '</div></div>';
        container.innerHTML = html;
      } else {
        container.innerHTML = '<div style="text-align: center; font-family: ' + config.fontFamily + '; color: ' + config.textColor + '; background-color: ' + config.backgroundColor + '; padding: ' + config.padding + 'px; border-radius: ' + config.borderRadius + 'px; font-size: ' + config.fontSize + 'px;">Event has ended!</div>';
      }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
  }
  
  createTimer('timercraft-widget-${Date.now()}', config);
})();
</script>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopied(true);
      toast.success('Embed code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code. Please try again.');
    }
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Embed Code</h3>
        <Button
          variant={copied ? 'secondary' : 'accent'}
          size="sm"
          icon={copied ? 'Check' : 'Copy'}
          onClick={copyToClipboard}
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </Button>
      </div>
      
      <motion.div 
        className="code-block rounded-lg p-4 max-h-80 overflow-auto"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <pre className="text-sm text-green-400 whitespace-pre-wrap break-words">
          {generateEmbedCode()}
        </pre>
      </motion.div>
      
      <div className="text-sm text-gray-600 space-y-2">
        <p className="flex items-start gap-2">
          <span className="text-primary-600 font-medium">1.</span>
          Copy the embed code above
        </p>
        <p className="flex items-start gap-2">
          <span className="text-primary-600 font-medium">2.</span>
          Paste it into your website's HTML where you want the timer to appear
        </p>
        <p className="flex items-start gap-2">
          <span className="text-primary-600 font-medium">3.</span>
          The timer will automatically start counting down and update every second
        </p>
      </div>
    </motion.div>
  );
};

export default CodeOutput;