import type { ReactNode } from "react";
import { PlusIcon } from "@/shared/assets";
import { useModal } from "./context";

interface LayoutProps {
   children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
   const { closeFn } = useModal();

   return (
      <div className="relative w-md bg-sidebar p-5 rounded-lg">
         {children}
         <button className="absolute top-2 right-2 cursor-pointer" onClick={closeFn}>
            <PlusIcon className="rotate-45 w-5 h-5 fill-white" />
         </button>
      </div>
   );
};
