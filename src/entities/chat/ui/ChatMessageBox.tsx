import { useSendMessageMutation } from "@/entities/message/@x/chat";
import { ArrowIcon } from "@/shared/assets";
import { BaseTextarea, Button } from "@/shared/ui";
import { useState } from "react";

interface ChatMessageBoxProps {
   scrollToBottom: () => void;
   chatId: string;
}

export const ChatMessageBox = ({ chatId, scrollToBottom }: ChatMessageBoxProps) => {
   const [message, setMessage] = useState("");

   const { mutate: sendChatMessage } = useSendMessageMutation();

   const onSendMessage = () => {
      sendChatMessage({ chatId, message });
      scrollToBottom();
      setMessage("");
   };

   return (
      <div className="w-200 mb-5 mx-auto">
         <div className="bg-sidebar rounded-4xl flex gap-3 px-6 py-4 items-center">
            <div className="max-h-50 overflow-y-auto flex-auto">
               <BaseTextarea value={message} onChange={setMessage} rows={1} placeholder="Сообщение" />
            </div>
            <div>
               <Button size="icon" type="submit" disabled={!message} onClick={onSendMessage}>
                  <ArrowIcon className="rotate-90 w-6 h-6" />
               </Button>
            </div>
         </div>
      </div>
   );
};
