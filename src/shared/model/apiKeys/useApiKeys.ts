import { useAppStore } from "@/app/store/store";
import { apiKeysSelectors } from "./selectors";

export function useApiKeys() {
   const apiKeys = useAppStore((store) => apiKeysSelectors.apiKeys(store.apiKeys));

   if (!apiKeys.apiTokenInstance) throw new Error("api keys must be provided");

   return apiKeys;
}
