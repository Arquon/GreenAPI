import { ChatHeader, ChatMessagesList, ChatMessageBox } from "@/entities/chat";
import { appRoutes } from "@/shared/config";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

interface ChatComponentProps {
   chatId: string;
}

export const ChatComponent = ({ chatId }: ChatComponentProps) => {
   return (
      <div className="grow flex flex-col">
         <ChatHeader chatId={chatId} />
         <ChatMessagesList chatId={chatId} />
         <ChatMessageBox />
      </div>
   );
};

interface ChatPageProps {}

export const ChatPage = ({}: ChatPageProps) => {
   const { chatId } = useParams<{ chatId: string }>();

   const navigate = useNavigate();

   useEffect(() => {
      if (!chatId) {
         alert("chatId must be provided");
         navigate(appRoutes.mainPage);
      }
   }, [chatId, navigate]);

   if (!chatId) return null;

   return <ChatComponent chatId={chatId} />;
};
