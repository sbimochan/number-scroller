import React, { useState, useEffect, useRef, FC } from 'react';

export interface NumberScrollerProps {
  delay?: number;
  fallback?: number;
  from?: number;
  localeStringProps?: [string, any];
  step?: number;
  timeout?: number;
  to: number;
}

export const NumberScroller: FC<NumberScrollerProps> = ({
  delay,
  fallback = 0,
  from = 0,
  localeStringProps,
  step = 1,
  timeout = 1000,
  to,
}) => {
  let [currentNumber, setCurrentNumber] = useState(from);
  const initialDifference = useRef(0);

  useEffect(() => {
    const runEngine = () => {
      if (currentNumber !== to) {
        setTimeout(() => {
          setCurrentNumber(
            currentNumber < to
              ? (currentNumber += Math.abs(step))
              : (currentNumber -= Math.abs(step))
          );
          runEngine();
        }, delay || timeout / Math.max(initialDifference.current, 1) || 1);
      }
    };
    initialDifference.current = Math.abs(currentNumber - to);
    runEngine();
  }, [to]);

  const newNumber = currentNumber ?? fallback;

  return (
    <>
      {!localeStringProps
        ? newNumber
        : newNumber.toLocaleString(...localeStringProps)}
    </>
  );
};

export default NumberScroller;
