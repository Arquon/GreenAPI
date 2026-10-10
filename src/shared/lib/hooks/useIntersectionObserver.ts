import { useEffect, useEffectEvent, type RefObject } from "react";

interface ExtendedIntersectionObserverInit extends Omit<IntersectionObserverInit, "root"> {
   root?: RefObject<HTMLElement | null>;
}

interface useIntersectionObserverQueryParams {
   targetRef: RefObject<HTMLElement | null>;
   options?: ExtendedIntersectionObserverInit;
   cb: () => void;
}

export function useIntersectionObserver({ options, targetRef, cb }: useIntersectionObserverQueryParams) {
   const stableCb = useEffectEvent(cb);

   useEffect(() => {
      if (!targetRef.current) return;

      const observer = new IntersectionObserver(
         ([entity]) => {
            if (entity.isIntersecting) stableCb();
         },
         { ...options, root: options?.root?.current }
      );

      observer.observe(targetRef.current);

      return () => observer.disconnect();
   }, [options, targetRef]);

   return;
}
