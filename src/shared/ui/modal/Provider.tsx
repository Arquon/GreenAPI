import { type ReactNode } from "react";
import { ModalContext } from "./context";

interface ModalProviderProps {
   children: ReactNode;
   closeFn: () => void;
}

export function ModalProvider({ children, closeFn }: ModalProviderProps) {
   return <ModalContext value={{ closeFn }}>{children}</ModalContext>;
}
