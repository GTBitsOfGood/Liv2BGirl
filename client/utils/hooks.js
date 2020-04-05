import React from "react";

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const firstDebounce = React.useRef(true);

  React.useEffect(() => {
    if (value && firstDebounce.current) {
      setDebouncedValue(value);
      firstDebounce.current = false;

      return () => {};
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
