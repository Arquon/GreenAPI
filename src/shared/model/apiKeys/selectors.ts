import { createSelector } from "reselect";
import type { ApiKeysSlice } from "./slice";
import { shallow } from "zustand/shallow";

export const apiKeysSelectors = {
   apiKeys: createSelector([(slice: ApiKeysSlice) => slice], (slice) => slice.state, {
      memoizeOptions: {
         resultEqualityCheck: shallow,
      },
   }),
};
