import { useInfiniteChatMessages, type Message, MessageItem } from "@/entities/message/@x/chat";
import { Loader } from "@/shared/ui/loader/Loader";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";

interface ChatMessagesListProps {
   query: UseInfiniteQueryResult<Message[], Error>;
   chatId: string;
}

export const ChatMessagesList = ({ chatId, query }: ChatMessagesListProps) => {
   const { isFetchingNextPage, isSuccess, data, isError, error } = query;

   const { setTargetRef, setScrollWrapperRef, setContainerRef } = useInfiniteChatMessages({
      chatId,
      query,
   });

   if (isError) return <div>произошла ошибка при загрузке сообщений {error.message}</div>;

   if (isSuccess)
      return (
         <div className="grow overflow-y-auto py-5" ref={setScrollWrapperRef}>
            <div className="flex min-h-full flex-col-reverse max-w-180 mx-auto gap-2" ref={setContainerRef}>
               {data.map((message) => (
                  <MessageItem key={message.idMessage} message={message} />
               ))}
               <div ref={setTargetRef} />
               {isFetchingNextPage && <Loader size="medium" />}
            </div>
         </div>
      );
};
