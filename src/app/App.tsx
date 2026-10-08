import { client } from "@/shared/api/client";
import { apiKeysLocalStorageKey, useApiKeysSlice } from "@/shared/model/apiKeys";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";

export const App = () => {
   const setApiKeys = useApiKeysSlice((slice) => slice.setApiKeys);

   const apiKeysJSON = localStorage.getItem(apiKeysLocalStorageKey);

   if (apiKeysJSON) {
      try {
         const apiKeys = JSON.parse(apiKeysJSON);
         setApiKeys(apiKeys);
      } catch (error) {
         console.log(error);
         localStorage.removeItem(apiKeysLocalStorageKey);
      }
   }

   return (
      <QueryClientProvider client={client}>
         <Outlet />
      </QueryClientProvider>
   );
};
