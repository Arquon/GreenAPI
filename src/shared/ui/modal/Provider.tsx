import { useRef, type ReactNode } from "react";
import { ModalContext } from "./context";

interface ModalProviderProps {
   children: ReactNode;
   closeFn: () => void;
}

export function ModalProvider({ children, closeFn: closeFnProps }: ModalProviderProps) {
   const modalsCountRef = useRef(0);

   const closeFn = () => {
      modalsCountRef.current -= 1;
      closeFnProps();
   };

   return <ModalContext value={{ closeFn, modalsCount: modalsCountRef.current }}>{children}</ModalContext>;
}
