import { ApiKeysModal } from "@/features/manage-api-keys";
import { useApiKeysSlice } from "@/shared/model/apiKeys";
import { apiKeysSelectors } from "@/shared/model/apiKeys/selectors";
import { ChatSidebar } from "@/widgets/chat/sidebar";
import { useState } from "react";
import { Outlet } from "react-router";

interface ChatLayoutProps {}

export const ChatLayout = ({}: ChatLayoutProps) => {
   const apiKeysProvided = useApiKeysSlice(apiKeysSelectors.apiKeysProvided);
   const [isApiKeysOpen, setIsApiKeysOpen] = useState(!apiKeysProvided);

   const openApiKeysModal = () => {
      setIsApiKeysOpen(true);
   };

   const closeApiKeysModal = () => {
      setIsApiKeysOpen(false);
   };

   return (
      <div className="flex h-screen">
         <ChatSidebar openApiKeysModal={openApiKeysModal} />
         <Outlet />
         {isApiKeysOpen && <ApiKeysModal closeFn={closeApiKeysModal} />}
      </div>
   );
};
