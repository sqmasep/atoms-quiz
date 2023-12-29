import { useEffect, useRef, useState } from "react";

const useLocalStorage = <TValue>(key: string, defaultValue: TValue) => {
  const isMounted = useRef(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item !== null) {
      setValue(JSON.parse(item) as TValue);
    }

    return () => {
      isMounted.current = false;
    };
  }, [key]);

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      isMounted.current = true;
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
