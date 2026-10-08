import { apiKeysLocalStorageKey, useApiKeysSlice } from "@/shared/model/apiKeys";
import { Button, type ButtonProps } from "@/shared/ui";
import type { ElementType } from "react";

interface ClearApiKeysButtonOwnProps {
   onClick?: never;
}

type ClearApiKeysButtonProps<E extends ElementType> = ButtonProps<E> & ClearApiKeysButtonOwnProps;

export const ClearApiKeysButton = <E extends ElementType>({ ...restProps }: ClearApiKeysButtonProps<E>) => {
   const setApiKeys = useApiKeysSlice((slice) => slice.setApiKeys);

   const clearApiKeys = () => {
      setApiKeys({ idInstance: null, apiTokenInstance: null });
      localStorage.removeItem(apiKeysLocalStorageKey);
   };

   return <Button {...restProps} onClick={clearApiKeys} />;
};
