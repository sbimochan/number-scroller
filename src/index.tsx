import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef, FC, ReactElement } from 'react';

import { getNextStepValue, getRoundedFloatWithPrecision } from './utils';

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
   * Provide a default value to display if to is ever undefined.
   */
  fallback?: number;
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

/**
 * Number Scroller Component.
 *
 * @param {Object} Props {
 *   decimalPlaces,
 *   delay = 0,
 *   renderFrequency,
 *   fallback = 0,
 *   from = 0,
 *   toLocaleStringProps,
 *   step = 1,
 *   timeout = 1000,
 *   to = 0
 * }.
 *
 * @returns {ReactElement}
 */
export const NumberScroller: FC<NumberScrollerProps> = ({
  decimalPlaces,
  delay = 0,
  renderFrequency,
  fallback = 0,
  from = 0,
  toLocaleStringProps,
  step = 1,
  timeout = 1000,
  to = 0
}): ReactElement => {
  const initialDifference = useRef(0);
  const [currentNumber, setCurrentNumber] = useState(from);

  useEffect(() => {
    /**
     * Get Next Step Value and Set on State on certain Interval.
     *
     * @param {number} currentNumber
     */
    const runEngine = (currentNumber: number) => {
      if (currentNumber !== to) {
        setTimeout(() => {
          const changedValue = getNextStepValue(currentNumber, to, step);

          runEngine(changedValue);
          setCurrentNumber(changedValue);
        }, renderFrequency || timeout / initialDifference.current || 1);
      }
    };

    initialDifference.current = Math.abs(currentNumber - (to ?? 0)) || 1;
    setTimeout(() => runEngine(currentNumber), delay);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, renderFrequency, step, timeout, to]);

  let newNumber = currentNumber ?? fallback;

  if (Number.isNaN(newNumber)) {
    newNumber = 0;
  }

  return (
    <>
      {toLocaleStringProps
        ? newNumber.toLocaleString(...toLocaleStringProps)
        : decimalPlaces
        ? getRoundedFloatWithPrecision(newNumber, decimalPlaces)
        : newNumber}
    </>
  );
};

NumberScroller.propTypes = {
  decimalPlaces: PropTypes.number,
  delay: PropTypes.number,
  fallback: PropTypes.number,
  from: PropTypes.number,
  toLocaleStringProps: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  renderFrequency: PropTypes.number,
  step: PropTypes.number,
  timeout: PropTypes.number,
  to: PropTypes.number
};

export default NumberScroller;
