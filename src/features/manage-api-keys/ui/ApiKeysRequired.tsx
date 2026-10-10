import { useApiKeysSlice } from "@/shared/model/apiKeys";
import { apiKeysSelectors } from "@/shared/model/apiKeys/selectors";
import type { ReactNode } from "react";

interface ApiKeysRequiredProps {
   children: ReactNode;
   fallBack?: ReactNode;
}

export const ApiKeysRequired = ({ children, fallBack }: ApiKeysRequiredProps) => {
   const apiKeysProvided = useApiKeysSlice(apiKeysSelectors.apiKeysProvided);

   if (!apiKeysProvided) {
      if (fallBack) return fallBack;

      return null;
   }

   return children;
};
