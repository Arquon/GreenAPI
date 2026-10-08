import { client } from "@/shared/api/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";

export const App = () => {
   return (
      <QueryClientProvider client={client}>
         <Outlet />
      </QueryClientProvider>
   );
};
