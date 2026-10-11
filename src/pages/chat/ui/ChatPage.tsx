import { ApiKeysRequired } from "@/features/manage-api-keys";
import { appRoutes } from "@/shared/config";
import { Loader } from "@/shared/ui";
import { useEffect } from "react";
import { toast } from "sonner";
import { Navigate, useNavigate, useParams } from "react-router";
import { ChatHeader } from "@/widgets/chat/heading";
import { ChatMessagesList } from "@/widgets/chat/messages-list";
import { useCurrentChatQuery } from "../model/hooks/useCurrentChatQuery";
import { useNotification } from "@/features/process-notification";

interface ChatComponentProps {
   chatId: string;
}

const ChatPageComponent = ({ chatId }: ChatComponentProps) => {
   const [contactQuery, messagesQuery] = useCurrentChatQuery({ chatId });

   useNotification();

   const isPending = contactQuery.isPending || messagesQuery.isPending;

   return (
      <div className="grow flex flex-col relative">
         {isPending && (
            <div className="flex h-full items-center justify-center">
               <Loader size="large" />
            </div>
         )}
         {!isPending && (
            <>
               <ChatHeader query={contactQuery} />
               <ChatMessagesList chatId={chatId} query={messagesQuery} />
            </>
         )}
      </div>
   );
};

interface ChatPageProps {}

export const ChatPage = ({}: ChatPageProps) => {
   const { chatId } = useParams<{ chatId: string }>();

   const navigate = useNavigate();

   useEffect(() => {
      if (!chatId) {
         toast.error("Чат не указан");
         navigate(appRoutes.mainPage);
      }
   }, [chatId, navigate]);

   if (!chatId) return null;

   return (
      <ApiKeysRequired fallBack={<Navigate to={appRoutes.mainPage} />}>
         <ChatPageComponent chatId={chatId} />
      </ApiKeysRequired>
   );
};
