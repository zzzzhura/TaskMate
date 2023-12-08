import { useEffect, useRef } from "react";

export const useClickOutside = (action: () => void) => {
  let domNode = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let handler = (event: any) => { //add event type
      if (!domNode.current?.contains(event.target)) {
        action();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return domNode;
};
