import { ClearApiKeysButton } from "@/features/manage-api-keys/ui/ClearApiKeysButton";
import { PlusIcon } from "@/shared/assets";
import { Button } from "@/shared/ui/button/Button";

interface ChatSidebarHeadingProps {
   openPhoneNumberModal: () => void;
}

export const ChatSidebarHeading = ({ openPhoneNumberModal }: ChatSidebarHeadingProps) => {
   return (
      <div className="flex justify-between px-4 pt-3 pb-2">
         <h2 className="text-2xl font-medium">Чаты</h2>
         <div className="flex gap-2">
            <ClearApiKeysButton size="small">Выйти</ClearApiKeysButton>
            <Button onClick={openPhoneNumberModal} size="icon">
               <PlusIcon className="w-5 h-5 fill-white" />
            </Button>
         </div>
      </div>
   );
};
