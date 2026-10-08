import { useChatMessagesQuery } from "@/entities/message/model/hooks/useChatMessagesQuery";
import { MessageItem } from "@/entities/message/ui/MessageItem";
import { Loader } from "@/shared/ui/loader/Loader";

interface ChatMessagesListProps {
   chatId: string;
}

export const ChatMessagesList = ({ chatId }: ChatMessagesListProps) => {
   const { data: messages, isPending, isError, error } = useChatMessagesQuery({ chatId });

   if (isError) return <div>произошла ошибка при загрузке сообщений {error.message}</div>;

   if (isPending) return <Loader />;

   return (
      <div className="grow overflow-y-auto py-5">
         <div className="flex min-h-full flex-col-reverse max-w-180 mx-auto gap-2">
            {messages.map((message) => (
               <MessageItem key={message.idMessage} message={message} />
            ))}
         </div>
      </div>
   );
};
