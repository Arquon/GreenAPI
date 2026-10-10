import type { Message } from "@/entities/message/@x/chat";
import { useIntersectionObserver } from "@/shared/lib";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useRef, useLayoutEffect, useEffect } from "react";

interface useInfiniteChatMessagesQueryParams {
   chatId: string;
   query: UseInfiniteQueryResult<Message[], Error>;
}

interface PreviousScrollValues {
   scrollTop: number;
   scrollHeight: number;
   clientHeight: number;
}

export function useChatMessages({ chatId, query }: useInfiniteChatMessagesQueryParams) {
   const prevScrollValues = useRef<PreviousScrollValues>(null);

   const { fetchNextPage, isFetchingNextPage, hasNextPage } = query;

   const intersectionCb = () => {
      if (isFetchingNextPage || !hasNextPage) return;

      fetchNextPage();
   };

   const { target, container, scrollWrapper, observeTarget } = useIntersectionObserver({
      cb: intersectionCb,
      rootMargin: "500px 0px 0px 0px",
   });

   const {
      elementRef: scrollWrapperRef,
      isElementMounted: isScrollWrapperMounted,
      setElementRef: setScrollWrapperRef,
   } = scrollWrapper;
   const {
      elementRef: containerRef,
      isElementMounted: isContainerMounted,
      setElementRef: setContainerRef,
   } = container;
   const { setElementRef: setTargetRef } = target;

   const scrollToBottom = () => {
      const wrapper = scrollWrapperRef.current;

      wrapper?.scrollTo({ top: wrapper?.scrollHeight });
   };

   // Обновление наблюдателя после получения данных
   useEffect(() => {
      if (!isFetchingNextPage && hasNextPage) {
         observeTarget();
      }
   }, [isFetchingNextPage, hasNextPage, observeTarget]);

   useLayoutEffect(() => {
      prevScrollValues.current = null;
   }, [chatId]);

   // Сохранение позиции скролла перед добавлением
   useLayoutEffect(() => {
      if (!scrollWrapperRef.current) return;
      const wrapper = scrollWrapperRef.current;

      const handleScroll = () => {
         prevScrollValues.current = {
            scrollHeight: wrapper.scrollHeight,
            scrollTop: wrapper.scrollTop,
            clientHeight: wrapper.clientHeight,
         };
      };
      handleScroll();
      wrapper.addEventListener("scroll", handleScroll);

      return () => wrapper.removeEventListener("scroll", handleScroll);
   }, [isScrollWrapperMounted, scrollWrapperRef]);

   // Корректирование скролла после добавления
   useLayoutEffect(() => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      const observer = new MutationObserver((mutations) => {
         const hasAdditions = mutations.some((m) => m.addedNodes.length > 0);
         if (!hasAdditions) return;

         const wrapper = scrollWrapperRef.current;
         if (!prevScrollValues.current || !wrapper) return;

         const {
            scrollHeight: prevScrollHeight,
            scrollTop: prevScrollTop,
            clientHeight: prevClientHeight,
         } = prevScrollValues.current;
         const { scrollHeight } = wrapper;

         const wasAtTop = prevScrollTop < 10;

         if (wasAtTop) {
            wrapper.scrollTo({ top: scrollHeight - prevScrollHeight + prevScrollTop });
            return;
         }

         const wasAtBottom = Math.abs(prevScrollHeight - prevScrollTop - prevClientHeight) < 10;

         if (wasAtBottom) wrapper.scrollTo({ top: scrollHeight });
      });

      observer.observe(container, { childList: true, subtree: false });

      return () => observer.disconnect();
   }, [isContainerMounted, containerRef, scrollWrapperRef]);

   // Скролл в самый низ при загрузке чата
   useLayoutEffect(() => {
      if (!scrollWrapperRef.current) return;

      scrollWrapperRef.current.scrollTo({
         top: scrollWrapperRef.current.scrollHeight,
      });
   }, [chatId, isScrollWrapperMounted, scrollWrapperRef]);

   return { setTargetRef, setScrollWrapperRef, setContainerRef, scrollToBottom };
}
