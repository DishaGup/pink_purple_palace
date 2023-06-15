import { useEffect, useRef, useState } from "react";

const useThrottle = (value, delay) => {
  const [throttledText, setThrottledText] = useState(value);

  useEffect(() => {
    let throttleId;
    throttleId = setTimeout(() => {
      // Update the throttledText state with the latest value
      setThrottledText(value);
    }, delay);
    // Clear the timeout if the component unmounts or "value" changes
    return () => clearTimeout(throttleId);
  }, [value, delay]);

  return throttledText;
};

export default useThrottle;
