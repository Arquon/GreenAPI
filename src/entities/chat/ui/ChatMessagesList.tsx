import { useInfiniteChatMessagesQuery, type Message } from "@/entities/message";
import { MessageItem } from "@/entities/message";
import { useInfinityChatMessages } from "@/entities/message/@x/chat";
import { Loader } from "@/shared/ui/loader/Loader";
import type { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useLayoutEffect, useRef } from "react";

interface ChatMessagesListProps {
   chatId: string;
}

export const ChatMessagesList = ({ chatId }: ChatMessagesListProps) => {
   const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteChatMessagesQuery({
      chatId,
   });

   const scrollWrapperRef = useRef<HTMLDivElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const targetRef = useRef<HTMLDivElement>(null);

   useInfinityChatMessages({
      chatId,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      targetRef,
      scrollWrapperRef,
      containerRef,
   });

   // useLayoutEffect(() => {
   //    if (!containerRef.current) return;

   //    const observer = new MutationObserver((mutations) => {
   //       let isEndAdded = false;

   //       console.log("cb", { mutations });

   //       for (const mutation of mutations) {
   //          if (mutation.addedNodes.length === 0) continue;

   //          if (mutation.previousSibling) isEndAdded = true;
   //       }
   //    });

   //    observer.observe(containerRef.current, { childList: true, subtree: false });

   //    return () => observer.disconnect();
   // }, [scrollWrapperRef]);

   return (
      <div className="grow overflow-y-auto py-5" ref={scrollWrapperRef}>
         <div className="flex min-h-full flex-col-reverse max-w-180 mx-auto gap-2" ref={containerRef}>
            {data.map((message) => (
               <MessageItem key={message.idMessage} message={message} />
            ))}
            <div ref={targetRef} />
            {isFetchingNextPage && <Loader size="medium" />}
         </div>
      </div>
   );
};
