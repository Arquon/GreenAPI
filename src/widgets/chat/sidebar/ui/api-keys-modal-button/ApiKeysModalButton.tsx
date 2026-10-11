import { Button } from "@/shared/ui";

interface ApiKeysModalButtonProps {
   openApiKeysModal: () => void;
}

export const ApiKeysModalButton = ({ openApiKeysModal }: ApiKeysModalButtonProps) => {
   return (
      <div className="flex h-full w-full items-center justify-center">
         <Button size="default" onClick={openApiKeysModal}>
            Ввести ключи
         </Button>
      </div>
   );
};
