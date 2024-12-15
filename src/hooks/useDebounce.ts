import { useCallback, useRef } from "react";

function useDebounce<T>(onChange: (val: T) => void, duration: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEdit = useCallback(
    (val: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => onChange(val), duration);
    },
    [duration, onChange]
  );

  return onEdit;
}

export default useDebounce;
