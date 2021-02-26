import React, { useState, useEffect, useRef, FC, useCallback } from 'react';
import PropTypes from 'prop-types';
import { calcFrequency, getNextStepValue, getRoundedFloatWithPrecision } from './utils';

export interface NumberScrollerProps {
  /**
   * Calculates decimal.
   */
  decimalPlaces?: number;
  /**
   * Time in milliseconds to delay the start of the number scroll.
   */
  delay?: number;
  /**
   * Provide the starting number before number scroll animation.
   */
  from?: number;
  /**
   * Provide options for converting number to a localized string (such as currency).
   */
  toLocaleStringProps?: [string, any];
  /**
   * Instead of a timeout, specify the exact number of milliseconds between each scroll.
   */
  renderFrequency?: number;
  /**
   * Customize the increment amount between each scroll.
   */
  step?: number;
  /**
   * How long it should take for the number to reach its 'to' value.
   */
  timeout?: number;
  /**
   * The value that it should scroll to.
   */
  to?: number;
}

export const NumberScroller: FC<NumberScrollerProps> = ({
  decimalPlaces = 0,
  delay = 0,
  renderFrequency,
  from = 0,
  toLocaleStringProps,
  step = 1,
  timeout = 1000,
  to = 0
}) => {
  const isMounted = useRef<boolean>();
  const isCounting = useRef<boolean>();
  const _renderFrequency = useRef<number | undefined>(renderFrequency);
  const timer = useRef<any>(null);
  const [currentNumber, setCurrentNumber] = useState<number>(from);

  const runEngine = useCallback(
    (currentNumber: number): void => {
      if (isMounted.current && !isNaN(currentNumber) && currentNumber !== to) {
        timer.current = setTimeout(() => {
          const changedValue = getNextStepValue(currentNumber, to, step);

          runEngine(changedValue);
          setCurrentNumber(changedValue); // update UI
        }, _renderFrequency.current);
      } else {
        // indicate the counting engine has finished
        isCounting.current = false;
      }
    },
    [step, to]
  );

  useEffect(() => {
    isMounted.current = true;

    // if no custom renderFrequency calculate difference between currentNumber and new 'to' number
    if (!renderFrequency) {
      _renderFrequency.current = calcFrequency(currentNumber, to, timeout);
    }

    // if the previous runEngine recursion is still going, cancel it so the new one can start
    if (isCounting.current) {
      clearTimeout(timer.current);
    }

    // start new counting engine with or without delay
    isCounting.current = true;
    delay ? setTimeout(() => runEngine(currentNumber), delay) : runEngine(currentNumber);

    // cancel running the engine when component unmounts (prevent memory leak)
    return (): void => {
      setCurrentNumber(to);
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, renderFrequency, runEngine, timeout, to]);

  const renderedNumber = !isNaN(currentNumber) ? currentNumber : 0;

  return (
    <>
      {toLocaleStringProps
        ? renderedNumber.toLocaleString(...toLocaleStringProps)
        : getRoundedFloatWithPrecision(renderedNumber, decimalPlaces)}
    </>
  );
};

NumberScroller.propTypes = {
  decimalPlaces: PropTypes.number,
  delay: PropTypes.number,
  from: PropTypes.number,
  toLocaleStringProps: PropTypes.any,
  renderFrequency: PropTypes.number,
  step: PropTypes.number,
  timeout: PropTypes.number,
  to: PropTypes.number
};

export default NumberScroller;
