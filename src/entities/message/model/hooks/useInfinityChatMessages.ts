import { useIntersectionObserver } from "@/shared/lib";
import type { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { type RefObject, useRef, useLayoutEffect } from "react";
import type { Message } from "../types";

interface UseInfinityChatMessagesQueryParams {
   chatId: string;
   scrollWrapperRef: RefObject<HTMLDivElement | null>;
   isFetchingNextPage: boolean;
   hasNextPage: boolean;
   fetchNextPage: () => Promise<InfiniteQueryObserverResult<Message[], Error>>;
   targetRef: RefObject<HTMLDivElement | null>;
   containerRef: RefObject<HTMLDivElement | null>;
}

interface PreviousScrollValues {
   scrollTop: number;
   scrollHeight: number;
}

export function useInfinityChatMessages({
   chatId,
   scrollWrapperRef,
   isFetchingNextPage,
   hasNextPage,
   fetchNextPage,
   targetRef,
   containerRef,
}: UseInfinityChatMessagesQueryParams) {
   const prevScrollValues = useRef<PreviousScrollValues>(null);

   useLayoutEffect(() => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      const handleScroll = () => {
         prevScrollValues.current = {
            scrollHeight: wrapper.scrollHeight,
            scrollTop: wrapper.scrollTop,
         };
      };
      handleScroll();
      wrapper.addEventListener("scroll", handleScroll);

      return () => wrapper.removeEventListener("scroll", handleScroll);
   }, [scrollWrapperRef]);

   useLayoutEffect(() => {
      if (!containerRef.current) return;

      const observer = new MutationObserver(() => {
         if (!prevScrollValues.current || !scrollWrapperRef.current) return;

         const { scrollHeight: prevScrollHeight, scrollTop: prevScrollTop } = prevScrollValues.current;

         const delta = prevScrollHeight - prevScrollTop;

         console.log({ delta });

         const { scrollHeight } = scrollWrapperRef.current;

         scrollWrapperRef.current.scrollTo({ top: scrollHeight - delta });
      });

      observer.observe(containerRef.current, { childList: true, subtree: true });

      return () => observer.disconnect();
   }, [containerRef, scrollWrapperRef]);

   const fetchPageWithPositionSaved = async () => {
      if (isFetchingNextPage || !hasNextPage) return;
      if (!scrollWrapperRef.current) return;

      await fetchNextPage();
   };

   useIntersectionObserver({
      targetRef,
      cb: fetchPageWithPositionSaved,
      options: { rootMargin: "500px 0px 0px 0px", root: scrollWrapperRef },
   });

   useLayoutEffect(() => {
      if (scrollWrapperRef.current) {
         scrollWrapperRef.current.scrollTo({
            top: scrollWrapperRef.current.scrollHeight,
         });
      }
   }, [chatId, scrollWrapperRef]);

   // useLayoutEffect(() => {
   //    if (!scrollWrapperRef.current || !prevScrollDelta.current) return;

   //    const currentHeight = scrollWrapperRef.current.scrollHeight;

   //    scrollWrapperRef.current.scrollTo({ top: currentHeight - prevScrollDelta.current });
   // }, [messagesLength, scrollWrapperRef, prevScrollDelta]);

   // useLayoutEffect(() => {
   //    if (!scrollDeltaRef.current || !scrollWrapperRef.current) return;
   //    console.log("useLayoutEffect", scrollWrapperRef.current.scrollHeight);
   //    scrollWrapperRef.current?.scrollTo({
   //       top: scrollWrapperRef.current.scrollHeight - scrollDeltaRef.current,
   //    });
   //    scrollDeltaRef.current = 0;
   // }, [messagesLength, scrollDeltaRef, scrollWrapperRef]);

   // useLayoutEffect(() => {
   //    if (!scrollWrapperRef.current) return;

   //    const condition =
   //       Math.abs(
   //          scrollWrapperRef.current.scrollHeight -
   //             scrollWrapperRef.current.scrollTop -
   //             scrollWrapperRef.current.clientHeight
   //       ) <= 1;

   //    console.log({ condition });
   //    if (condition) scrollWrapperRef.current.scrollTo({ top: scrollWrapperRef.current.scrollHeight });
   // }, [messagesLength, scrollWrapperRef]);
}
