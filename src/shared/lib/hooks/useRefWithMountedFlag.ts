import { useCallback, useRef, useState } from "react";

export function useRefWithMountedFlag<T extends HTMLElement>() {
   const [isElementMounted, setIsElementMounted] = useState(false);
   const elementRef = useRef<T>(null);

   const setElementRef = useCallback((node: T | null) => {
      elementRef.current = node;
      if (!node) {
         setIsElementMounted(false);
         return;
      }

      setIsElementMounted(true);
   }, []);

   return { isElementMounted, elementRef, setElementRef };
}
