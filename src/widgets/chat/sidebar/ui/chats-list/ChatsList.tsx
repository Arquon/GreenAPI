import { useChatsListQuery } from "@/entities/chat";
import { Loader } from "@/shared/ui/loader/Loader";
import { ChatListItem } from "./ChatListItem";

interface ChatsListProps {
   searchString: string;
}

export const ChatsList = ({ searchString }: ChatsListProps) => {
   const { isPending, data: chatsList, isError, error } = useChatsListQuery({ searchString });

   if (isPending) return <Loader size="medium" />;

   if (isError) return <p>Ошибка при загрузке чатов {error.message}</p>;

   return (
      <div className="py-2 flex flex-col">
         {chatsList.map((chatItem) => (
            <ChatListItem key={chatItem.chatId} name={chatItem.name} chatId={chatItem.chatId} />
         ))}
      </div>
   );
};
