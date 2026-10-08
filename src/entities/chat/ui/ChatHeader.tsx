import { Loader } from "@/shared/ui/loader/Loader";
import { useCurrentChatQuery } from "../model/hooks/useCurrentChatQuery";

interface ChatHeaderProps {
   chatId: string;
}

export const ChatHeader = ({ chatId }: ChatHeaderProps) => {
   const { isPending, data, isError, error } = useCurrentChatQuery({ chatId });

   if (isPending) return <Loader />;

   if (isError)
      return (
         <div className="h-10 bg-[brown]">Произошла ошибка при загрузке информации чата {error.message}</div>
      );

   if (!data) return null;

   return <div className="h-10 bg-[brown]">{data.name}</div>;
};
