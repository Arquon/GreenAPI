import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/app/styles/main.css";
import { RouterProvider } from "react-router";
import { appRouter } from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <RouterProvider router={appRouter} />
   </StrictMode>
);
