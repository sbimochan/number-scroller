import React, { useState, useEffect } from 'react';

export default NumberScroller = ({ to, from, delay, fallback }) => {
	const [finalNumber, setFinalNumber] = useState(parseInt(to, RADIX) || 0);
	const [initialNumber, setInitialNumber] = useState(parseInt(from, RADIX) || 0);
	const [delay, setDelay] = useState(parseInt(delay, RADIX) || 25);

  useEffect = (() => {
    runEngine();
  },[to]);
  
	const runEngine = () => {
		if (initialNumber < finalNumber) {
			setTimeout(() => {
        setInitialNumber(initialNumber++)
				runEngine();
			}, delay);
		}
	};

	return (
    if (!fallback) {
      return initialNumber;
    }

    return initialNumber > 0 ? initialNumber : fallback;
  );
};