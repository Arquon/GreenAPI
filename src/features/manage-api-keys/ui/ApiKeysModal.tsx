import { apiKeysLocalStorageKey, useApiKeysSlice } from "@/shared/model/apiKeys";
import { BaseInput, Button, InputError } from "@/shared/ui";
import { Modal } from "@/shared/ui/modal";
import { useState, type SubmitEvent } from "react";
import { validateApiKeys } from "../model/validation";

interface ApiKeysModalProps {
   closeFn: () => void;
}

export const ApiKeysModal = ({ closeFn }: ApiKeysModalProps) => {
   const setApiKeys = useApiKeysSlice((slice) => slice.setApiKeys);

   const [idInstance, setIdInstance] = useState("");
   const [idInstanceError, setIdInstanceError] = useState<string | null>(null);

   const [apiTokenInstance, setApiTokenInstance] = useState("");
   const [apiTokenInstanceError, setApiTokenInstanceError] = useState<string | null>(null);

   const [saveKeys, setSaveKeys] = useState(false);
   const toggleSaveCheckBox = () => setSaveKeys((prev) => !prev);

   const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      const {
         apiTokenInstanceError: apiTokenInstanceErrorValidate,
         idInstanceError: idInstanceErrorValidate,
      } = validateApiKeys({ apiTokenInstance, idInstance });

      setIdInstanceError(idInstanceErrorValidate);
      setApiTokenInstanceError(apiTokenInstanceErrorValidate);

      const isError = idInstanceErrorValidate || apiTokenInstanceErrorValidate;
      if (isError) return;

      const apiKeys = { idInstance, apiTokenInstance };

      if (saveKeys) localStorage.setItem(apiKeysLocalStorageKey, JSON.stringify(apiKeys));

      setApiKeys(apiKeys);
      closeFn();
   };

   return (
      <Modal.Provider closeFn={closeFn}>
         <Modal.Modal variant="centered">
            <Modal.Layout>
               <form onSubmit={onSubmit}>
                  <h3 className="mb-5">Введите API ключи</h3>
                  <div className="flex flex-col gap-5">
                     <div className="flex flex-col gap-2">
                        <BaseInput
                           placeholder="idInstance"
                           value={idInstance}
                           onChange={(value) => {
                              setIdInstance(value);
                              setIdInstanceError(null);
                           }}
                        />
                        <InputError error={idInstanceError} />
                     </div>

                     <div className="flex flex-col gap-2">
                        <BaseInput
                           placeholder="apiTokenInstance"
                           value={apiTokenInstance}
                           onChange={(value) => {
                              setApiTokenInstance(value);
                              setApiTokenInstanceError(null);
                           }}
                        />
                        <InputError error={apiTokenInstanceError} />
                     </div>

                     <div>
                        <label className="flex gap-2">
                           Запомнить ключи
                           <input type="checkbox" checked={saveKeys} onChange={toggleSaveCheckBox} />
                        </label>
                     </div>

                     <div className="self-center">
                        <Button size="default" type="submit">
                           Применить
                        </Button>
                     </div>
                  </div>
               </form>
            </Modal.Layout>
         </Modal.Modal>
      </Modal.Provider>
   );
};
