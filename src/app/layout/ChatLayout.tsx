import { ChatSidebar } from "@/widgets/chat-sidebar";
import { Outlet } from "react-router";

interface ChatLayoutProps {}

export const ChatLayout = ({}: ChatLayoutProps) => {
   return (
      <div className="flex min-h-screen">
         <ChatSidebar />
         <Outlet />
      </div>
   );
};
