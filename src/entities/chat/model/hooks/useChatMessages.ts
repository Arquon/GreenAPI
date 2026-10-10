import type { Message } from "@/entities/message/@x/chat";
import { useIntersectionObserver } from "@/shared/lib";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useRef, useLayoutEffect, useEffect, useEffectEvent } from "react";

interface useInfiniteChatMessagesQueryParams {
   chatId: string;
   query: UseInfiniteQueryResult<Message[], Error>;
}

interface PreviousScrollValues {
   scrollTop: number;
   scrollHeight: number;
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

   const stableObserveTarget = useEffectEvent(observeTarget);

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
   const { setElementRef: setTargetRef, isElementMounted: isTargetMounted } = target;

   // Обновление обсервера после получения данных
   useEffect(() => {
      if (!isFetchingNextPage && hasNextPage) {
         stableObserveTarget();
      }
   }, [isFetchingNextPage, hasNextPage, isTargetMounted]);

   // Сохранение позиции скролла перед добавлением
   useLayoutEffect(() => {
      if (!scrollWrapperRef.current) return;
      const wrapper = scrollWrapperRef.current;

      const handleScroll = () => {
         prevScrollValues.current = {
            scrollHeight: wrapper.scrollHeight,
            scrollTop: wrapper.scrollTop,
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
      const wrapper = scrollWrapperRef.current;

      const observer = new MutationObserver(() => {
         if (!prevScrollValues.current || !wrapper) return;

         const { scrollHeight: prevScrollHeight, scrollTop: prevScrollTop } = prevScrollValues.current;
         const delta = prevScrollHeight - prevScrollTop;
         const { scrollHeight } = wrapper;
         wrapper.scrollTo({ top: scrollHeight - delta });
      });

      observer.observe(container, { childList: true, subtree: false });

      return () => observer.disconnect();
   }, [isContainerMounted, containerRef, scrollWrapperRef]);

   // Скролл в самый низ про загрузке чата
   useLayoutEffect(() => {
      if (!scrollWrapperRef.current) return;

      scrollWrapperRef.current.scrollTo({
         top: scrollWrapperRef.current.scrollHeight,
      });
   }, [chatId, isScrollWrapperMounted, scrollWrapperRef]);

   return { setTargetRef, setScrollWrapperRef, setContainerRef };
}
