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
         apiTokenInstance: "42ac6e3524f844ce912be5346208bf594a748a705d43478fae",
         idInstance: "410022757998",
      },
      setApiKeys: (apiKeys) =>
         set((store) => {
            store.apiKeys.state = apiKeys;
         }),
   });
