import { useState } from "react";
import { ChatSidebarHeading } from "./chat-sidebar-heading/ChatSidebarHeading";
import { ChatsList } from "./chats-list/ChatsList";
import { SearchChatInput } from "./search-chat-input/SearchChatInput";

interface ChatSidebarProps {}

export const ChatSidebar = ({}: ChatSidebarProps) => {
   const [searchString, setSearchString] = useState("");

   return (
      <div className="w-100 bg-sidebar flex flex-col">
         <ChatSidebarHeading />
         <SearchChatInput value={searchString} onChange={setSearchString} />
         <ChatsList searchString={searchString} />
      </div>
   );
};
