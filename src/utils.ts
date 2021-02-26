export function getRoundedFloatWithPrecision(num: number, precision = 2): number {
  const ROUND_UPTO = Math.pow(10, precision);

  return Math.round((num + Number.EPSILON) * ROUND_UPTO) / ROUND_UPTO;
}

export function getNextStepValue(currentStepValue: number, toValue: number, step: number): number {
  if (currentStepValue < toValue) {
    return (currentStepValue += Math.min(Math.abs(step), toValue - currentStepValue));
  } else {
    return (currentStepValue -= Math.min(Math.abs(step), toValue + currentStepValue));
  }
}

export function calcFrequency(currentNumber: number, toValue: number, timeout: number): number {
  return timeout / Math.abs(currentNumber - toValue) || 1;
}
