import { useState } from "react";
import { ChatSidebarHeading } from "./chat-sidebar-heading/ChatSidebarHeading";
import { ChatsList } from "./chats-list/ChatsList";
import { SearchChatInput } from "./chat-search-input/SearchChatInput";
import { ApiKeysRequired } from "@/features/manage-api-keys";
import { ApiKeysModalButton } from "./api-keys-modal-button/ApiKeysModalButton";
import { ChatPhoneNumberModal } from "@/features/chat-by-phone-number";

interface ChatSidebarProps {
   openApiKeysModal: () => void;
}

export const ChatSidebar = ({ openApiKeysModal }: ChatSidebarProps) => {
   const [searchString, setSearchString] = useState("");

   const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState(false);

   const openPhoneNumberModal = () => setIsPhoneNumberModalOpen(true);
   const closePhoneNumberModal = () => setIsPhoneNumberModalOpen(false);

   return (
      <div className="w-100 bg-sidebar flex flex-col border-r border-divider">
         <ApiKeysRequired fallBack={<ApiKeysModalButton openApiKeysModal={openApiKeysModal} />}>
            <ChatSidebarHeading openPhoneNumberModal={openPhoneNumberModal} />
            <SearchChatInput value={searchString} onChange={setSearchString} />
            <ChatsList searchString={searchString} />
            {isPhoneNumberModalOpen && <ChatPhoneNumberModal closeFn={closePhoneNumberModal} />}
         </ApiKeysRequired>
      </div>
   );
};
