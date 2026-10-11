import { ArrowIcon } from "@/shared/assets";
import { Link } from "react-router";
import { appRoutes } from "@/shared/config";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Contact } from "@/entities/contact";
import { ContactInfo } from "@/entities/contact";

interface ChatHeaderProps {
   query: UseQueryResult<Contact, Error>;
}
export const ChatHeader = ({ query }: ChatHeaderProps) => {
   const className = "flex items-center px-4 py-3 bg-sidebar gap-2 border-b border-sidebar-light";

   const { isSuccess, data } = query;

   const returnArrow = (
      <Link
         className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-sidebar-light transition-bg duration-100 cursor-pointer"
         to={appRoutes.mainPage}
      >
         <ArrowIcon className="w-5 h-5 fill-white" />
      </Link>
   );

   return (
      <div className={className}>
         {returnArrow}

         {isSuccess && <ContactInfo contact={data} />}
      </div>
   );
};
