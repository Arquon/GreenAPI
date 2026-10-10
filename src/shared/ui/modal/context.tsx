import { createContext, useContext } from "react";

interface ModalContext {
   closeFn: () => void;
}

const initialContext: ModalContext = {
   closeFn: function (): void {
      throw new Error("Function not implemented.");
   },
};

export const ModalContext = createContext<ModalContext>(initialContext);

export function useModal() {
   return useContext(ModalContext);
}
