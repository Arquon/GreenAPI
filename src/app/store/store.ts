import type { AppMiddlewares } from "@/shared/lib/types/store";
import { type ApiKeysSlice, apiKeysSlice } from "@/shared/model/apiKeys/slice";
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AppStore {
   apiKeys: ApiKeysSlice;
}

const myMiddlewares = (f: StateCreator<AppStore, AppMiddlewares, [], AppStore>) => devtools(immer(f));

export const useAppStore = create<AppStore>()(
   myMiddlewares((...args) => ({
      apiKeys: apiKeysSlice<AppStore>()(...args),
   })),
);
