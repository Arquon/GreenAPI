import { Button } from "@/shared/ui/button/Button";

interface ChatSidebarHeadingProps {}

export const ChatSidebarHeading = ({}: ChatSidebarHeadingProps) => {
   return (
      <div className="flex justify-between px-4 pt-3 pb-2">
         <h2 className="text-2xl font-medium">Чаты</h2>
         <Button variant="icon">+</Button>
      </div>
   );
};
