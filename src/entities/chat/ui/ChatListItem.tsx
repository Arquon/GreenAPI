import { useChatMessagesQuery } from "@/entities/message/@x/chat";
import { appRoutes } from "@/shared/config";
import { Avatar } from "@/shared/ui/avatar/Avatar";
import { Loader } from "@/shared/ui/loader/Loader";
import { generatePath, useNavigate, useParams } from "react-router";
import { useChatAvatarQuery } from "../model/hooks/useChatAvatarQuery";

interface ChatListItemProps {
   name: string;
   chatId: string;
}

export const ChatListItem = ({ name, chatId }: ChatListItemProps) => {
   const navigate = useNavigate();

   const setCurrentChat = () => {
      const path = generatePath(appRoutes.chat, { chatId });
      navigate(path);
   };

   const {
      isSuccess,
      data: lastMessageArray,
      isPending,
      isError,
      error,
   } = useChatMessagesQuery({ chatId, count: 1 });
   const { data: avatarData } = useChatAvatarQuery({ chatId });

   const { chatId: routeChatId } = useParams();

   const isActive = routeChatId === chatId;

   const defaultClassName =
      "flex items-center text-start gap-4 py-3 px-4 transition-bg duration-100 cursor-pointer";
   const activeClassName = "bg-sidebar-light";
   const inActiveClassName = "hover:bg-sidebar-light";

   const className = [defaultClassName, isActive && activeClassName, !isActive && inActiveClassName]
      .filter(Boolean)
      .join(" ");

   return (
      <button className={className} onClick={setCurrentChat}>
         <Avatar name={name} url={avatarData?.urlAvatar} />
         <div className="flex flex-col gap-1">
            <span className="text-xs">{name}</span>
            {isPending && <Loader />}
            {isError && <p>Произошла ошибка при загрузке сообщения {error.message}</p>}
            {isSuccess && (
               <p className=" text-sm text-secondary line-clamp-2 overflow-hidden">
                  {lastMessageArray[0].textMessage}
               </p>
            )}
         </div>
      </button>
   );
};
