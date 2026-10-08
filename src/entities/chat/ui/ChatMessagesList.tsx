import { useChatMessagesQuery } from "@/entities/message/model/useChatMessagesQuery";
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
      <div className="grow">
         <div className="h-full flex flex-col-reverse gap-3">
            {messages.map((message) => (
               <MessageItem key={message.idMessage} message={message} />
            ))}
         </div>
      </div>
   );
};
