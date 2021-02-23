/**
 * Round Float with Proper Precision.
 *
 * @param {number} num
 * @param {number} [precision=2]
 * @returns {number}
 */
export function getRoundedFloatWithPrecision(num, precision = 2) {
  const ROUND_UPTO = Math.pow(10, precision);

  return Math.round((num + Number.EPSILON) * ROUND_UPTO) / ROUND_UPTO;
}
