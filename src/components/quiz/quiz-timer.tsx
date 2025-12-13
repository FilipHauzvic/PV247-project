import { useState, useEffect, useRef } from 'react';

export const useQuizTimer = () => {
  const startTimeRef = useRef(Date.now());
  
  const getElapsedSeconds = () => Math.floor((Date.now() - startTimeRef.current) / 1000);
  
  const reset = () => {
    startTimeRef.current = Date.now();
  };
  
  return { getElapsedSeconds, reset };
};

export const TimerDisplay: React.FC<{ startTime: number }> = ({ startTime }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  return (
    <div className="text-sm text-blue-600">
      Time: {minutes}:{remainderSeconds.toString().padStart(2, '0')}
    </div>
  );
};