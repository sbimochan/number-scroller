import React, { useState, useEffect, useRef } from "react";

const NumberScroller = ({
  delay,
  from = 0,
  localeStringProps,
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
            currentNumber < to ? ++currentNumber : --currentNumber
          );
          runEngine();
        }, delay || timeout / initialDifference.current);
      }
    };

    initialDifference.current = Math.abs(currentNumber - to);
    runEngine();
  }, [to]);

  return (
    <>
      {!localeStringProps
        ? currentNumber
        : currentNumber.toLocaleString(...localeStringProps)}
    </>
  );
};

export default NumberScroller;
