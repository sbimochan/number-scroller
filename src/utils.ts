/**
 * Round Float with Proper Precision.
 *
 * @param {number} num
 * @param {number} [precision=2]
 * @returns {number}
 */
export function getRoundedFloatWithPrecision(num: number, precision = 2): number {
  const ROUND_UPTO = Math.pow(10, precision);

  return Math.round((num + Number.EPSILON) * ROUND_UPTO) / ROUND_UPTO;
}

/**
 * Get Next Step Value for the number change.
 *
 * @param {number} currentStepValue
 * @param {number} toValue
 * @param {number} step
 *
 * @returns {number}
 */
export function getNextStepValue(currentStepValue: number, toValue: number, step: number): number {
  if (currentStepValue < (toValue ?? 0)) {
    return (currentStepValue += Math.min(Math.abs(step), (toValue ?? 0) - currentStepValue));
  } else {
    return (currentStepValue -= Math.min(Math.abs(step), (toValue ?? 0) + currentStepValue));
  }
}
