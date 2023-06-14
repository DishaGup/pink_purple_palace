import { useEffect, useRef, useState } from "react";

const useThrottle = (value, delay) => {
 
  const [throttledText, setThrottledText] = useState(value);

  useEffect(() => {
     
     let throttleId;
     throttleId= setTimeout(() => {
        setThrottledText(value);
      }, delay);
      return ()=>clearTimeout(throttleId)
    
  }, [value, delay]);

  return throttledText;
};

export default useThrottle;
