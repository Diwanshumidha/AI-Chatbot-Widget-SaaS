import { useEffect, RefObject } from "react";

type EventListener = (event: MouseEvent | TouchEvent) => void;

const useOnClickOutside = (
  ref: RefObject<HTMLElement | undefined>,
  handleClickOutside: EventListener
): void => {
  useEffect(() => {
    // Function to handle clicks outside the specified ref
    const handleOutsideClick = (event: MouseEvent | TouchEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutside(event);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [ref, handleClickOutside]);
};

export default useOnClickOutside;
