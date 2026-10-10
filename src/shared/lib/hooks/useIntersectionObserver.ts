import { useEffect, useLayoutEffect, useRef } from "react";
import { useRefWithMountedFlag } from "./useRefWithMountedFlag";

interface useIntersectionObserverQueryParams extends Omit<IntersectionObserverInit, "root"> {
   cb: () => void;
}

export function useIntersectionObserver({
   rootMargin,
   scrollMargin,
   threshold,
   cb,
}: useIntersectionObserverQueryParams) {
   const target = useRefWithMountedFlag();
   const { isElementMounted: isTargetMounted, elementRef: targetRef } = target;
   const container = useRefWithMountedFlag();
   const scrollWrapper = useRefWithMountedFlag();
   const { isElementMounted: isScrollWrapperMounted, elementRef: scrollWrapperRef } = scrollWrapper;

   const optionsRef = useRef({ rootMargin, scrollMargin, threshold });
   const observerRef = useRef<IntersectionObserver>(null);

   const cbRef = useRef(cb);

   useLayoutEffect(() => {
      cbRef.current = cb;
   }, [cb]);

   useEffect(() => {
      if (!targetRef.current || !scrollWrapperRef.current) return;

      if (observerRef.current) {
         observerRef.current.disconnect();
         observerRef.current = null;
      }

      const observer = new IntersectionObserver(
         ([entity]) => {
            if (entity.isIntersecting) {
               cbRef.current();
            }
         },
         { ...optionsRef.current, root: scrollWrapperRef.current }
      );

      observerRef.current = observer;

      return () => observerRef.current?.disconnect();
   }, [isTargetMounted, targetRef, isScrollWrapperMounted, scrollWrapperRef]);

   const observeTarget = () => {
      if (!observerRef.current || !targetRef.current) return;

      observerRef.current.unobserve(targetRef.current);
      observerRef.current.observe(targetRef.current);
   };

   return {
      target,
      container,
      scrollWrapper,
      observeTarget,
   };
}
