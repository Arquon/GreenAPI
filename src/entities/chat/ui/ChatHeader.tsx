import { Loader } from "@/shared/ui/loader/Loader";
import { Avatar } from "@/shared/ui/avatar/Avatar";
import { useChatAvatarQuery } from "../model/hooks/useChatAvatarQuery";
import { ArrowIcon } from "@/shared/assets";
import { Link } from "react-router";
import { appRoutes } from "@/shared/config";
import { useContactInfoQuery } from "@/entities/contact/model/useGetContactInfo";

interface ChatHeaderProps {
   chatId: string;
}

export const ChatHeader = ({ chatId }: ChatHeaderProps) => {
   const { isPending, data, isError, error } = useContactInfoQuery({ chatId });
   const { data: avatarData } = useChatAvatarQuery({ chatId });

   if (isPending) return <Loader />;

   const className = "flex items-center px-4 py-3 bg-sidebar gap-2 border-b border-sidebar-light";

   const returnArrow = (
      <Link
         className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-sidebar-light transition-bg duration-100 cursor-pointer"
         to={appRoutes.mainPage}
      >
         <ArrowIcon className="w-5 h-5 fill-white" />
      </Link>
   );

   if (isError)
      return (
         <div className={className}>
            {returnArrow}
            `Произошла ошибка при загрузке информации чата ${error.message}`
         </div>
      );

   if (!data) return null;

   return (
      <div className={className}>
         {returnArrow}

         <div className="flex gap-3">
            <Avatar name={data.name} url={avatarData?.urlAvatar} />
            <div>{data.name}</div>
         </div>
      </div>
   );
};
