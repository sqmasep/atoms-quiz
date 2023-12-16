import { useEffect, useState } from "react";

const useLocalStorage = <TValue>(key: string, initialValue: TValue) => {
  const [value, setValue] = useState<TValue>(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
