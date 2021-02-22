import React, { useState, useEffect, useRef, FC } from 'react';

export interface NumberScrollerProps {
  /**
   * Time in milliseconds to delay the start of the number scroll
   */
  delay?: number;
  /**
   * Provide a default value to display if to is ever undefined
   */
  fallback?: number;
  /**
   * Provide the starting number before number scroll animation
   */
  from?: number;
  /**
   * provide options for converting number to a localized string (such as currency)
   */
  localeStringProps?: [string, any];
  /**
   * Instead of a timeout, specify the exact number of milliseconds between each scroll
   */
  renderFrequency?: number;
  /**
   * Customize the increment amount between each scroll
   */
  step?: number;
  /**
   * How long it should take for the number to reach its 'to' value
   */
  timeout?: number;
  /**
   * The value that it should scroll to
   */
  to?: number;
}

export const NumberScroller: FC<NumberScrollerProps> = ({
  delay = 0,
  renderFrequency,
  fallback = 0,
  from = 0,
  localeStringProps,
  step = 3,
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
            currentNumber < (to ?? 0)
              ? (currentNumber += Math.abs(step))
              : (currentNumber -= Math.abs(step))
          );
          runEngine();
        }, renderFrequency || timeout / initialDifference.current || 1);
      }
    };
    initialDifference.current = Math.abs(currentNumber - (to ?? 0)) || 1;
    setTimeout(() => runEngine(), delay);
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
