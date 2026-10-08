import { createContext, useContext } from "react";

interface ModalContext {
   closeFn: () => void;
   modalsCount: number;
}

const initialContext: ModalContext = {
   closeFn: function (): void {
      throw new Error("Function not implemented.");
   },
   modalsCount: 0,
};

export const ModalContext = createContext<ModalContext>(initialContext);

export function useModal() {
   return useContext(ModalContext);
}
