import type { AppMiddlewares } from "@/shared/lib/types/store";
import type { StateCreator } from "zustand";

interface ApiKeysFilled {
   idInstance: string;
   apiTokenInstance: string;
}

interface ApiKeysEmpty {
   idInstance: null;
   apiTokenInstance: null;
}

interface ApiKeysState {
   state: ApiKeysFilled | ApiKeysEmpty;
}

interface ApiKeysActions {
   setApiKeys: (apiKeys: ApiKeysFilled | ApiKeysEmpty) => void;
}

export type ApiKeysSlice = ApiKeysState & ApiKeysActions;

interface ApiKeysStore {
   apiKeys: ApiKeysSlice;
}

export const apiKeysSlice =
   <S extends ApiKeysStore>(): StateCreator<S, AppMiddlewares, [], ApiKeysSlice> =>
   (set) => ({
      state: {
         apiTokenInstance: null,
         idInstance: null,
      },
      setApiKeys: (apiKeys) =>
         set((store) => {
            store.apiKeys.state = apiKeys;
         }),
   });
