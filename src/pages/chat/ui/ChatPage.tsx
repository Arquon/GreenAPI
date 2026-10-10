import { ChatHeader, ChatMessagesList, ChatMessageBox } from "@/entities/chat";
import { ApiKeysRequired } from "@/features/manage-api-keys";
import { appRoutes } from "@/shared/config";
import { Loader } from "@/shared/ui";
import { Suspense, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

interface ChatComponentProps {
   chatId: string;
}

export const ChatComponent = ({ chatId }: ChatComponentProps) => {
   // TODO useSuspenseQuery
   // const { isPending, isSuccess } = useCurrentChatQuery({ chatId });

   return (
      <div className="grow flex flex-col relative">
         <Suspense
            fallback={
               <div className="flex h-full justify-center items-center">
                  <Loader size="large" />
               </div>
            }
         >
            <ChatHeader chatId={chatId} />
            <ChatMessagesList chatId={chatId} />
            <ChatMessageBox chatId={chatId} />
         </Suspense>
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

   return (
      <ApiKeysRequired fallBack={<Navigate to={appRoutes.mainPage} />}>
         <ChatComponent chatId={chatId} />
      </ApiKeysRequired>
   );
};
