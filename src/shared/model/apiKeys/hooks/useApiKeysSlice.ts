import type { Selector } from "@/shared/lib/types/store";
import type { ApiKeysSlice } from "../slice";
import { useAppStore } from "@/app/store/store";

export function useApiKeysSlice<T>(selector: Selector<ApiKeysSlice, T>) {
   return useAppStore((store) => selector(store.apiKeys));
}
