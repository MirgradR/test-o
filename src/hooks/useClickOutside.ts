import { useEffect, RefObject } from "react";

export const useClickOutside = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
};

