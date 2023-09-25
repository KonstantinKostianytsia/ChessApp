import {useEffect, useRef, useState} from 'react';

export const useTimer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isCounterStarted, setIsCounterStarted] = useState(false);

  const intervalID = useRef<number | null>(null);

  useEffect(() => {
    if (isCounterStarted) {
      intervalID.current = setInterval(() => {
        setCurrentTime(time => time + 1);
      }, 1000);
    } else {
      if (intervalID.current) {
        clearInterval(intervalID.current);
      }
    }
  }, [isCounterStarted]);

  const startTimer = () => {
    setIsCounterStarted(true);
  };

  const resetTimer = () => {
    setCurrentTime(0);
    setIsCounterStarted(false);
  };

  return {currentTime, isCounterStarted, startTimer, resetTimer};
};
