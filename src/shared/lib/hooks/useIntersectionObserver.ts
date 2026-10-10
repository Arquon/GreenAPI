import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
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

   const options = useMemo(
      () => ({ rootMargin, scrollMargin, threshold }),
      [rootMargin, scrollMargin, threshold]
   );
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
         { ...options, root: scrollWrapperRef.current }
      );

      observerRef.current = observer;

      return () => observer.disconnect();
   }, [isTargetMounted, targetRef, isScrollWrapperMounted, scrollWrapperRef, options]);

   const observeTarget = useCallback(() => {
      if (!observerRef.current || !targetRef.current) return;

      observerRef.current.unobserve(targetRef.current);
      observerRef.current.observe(targetRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [observerRef, targetRef, isTargetMounted]);

   return {
      target,
      container,
      scrollWrapper,
      observeTarget,
   };
}
