import {useEffect} from 'react';

export const useDelay = (delayTime: number, callback: () => void) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      callback();
    }, delayTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
};
