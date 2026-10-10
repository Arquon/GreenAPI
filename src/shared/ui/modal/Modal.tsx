import { useLayoutEffect, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useModal } from "./context";
import { cva, type VariantProps } from "class-variance-authority";

const modalVariants = cva("fixed inset-0 bg-modal/80 backdrop-blur-xs z-5", {
   variants: {
      variant: {
         centered: "fixed inset-0 bg-modal/80 backdrop-blur-xs z-5 flex justify-center items-center",
         custom: "",
      },
   },
});

type ModalProps = {
   children: ReactNode;
   className?: string;
} & Required<VariantProps<typeof modalVariants>>;

export const Modal = ({ children, variant }: ModalProps) => {
   const { closeFn: closeFnContext } = useModal();

   useLayoutEffect(() => {
      document.body.classList.add("overflow-hidden");

      return () => {
         document.body.classList.remove("overflow-hidden");
      };
   }, []);

   const closeFn = (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
         closeFnContext();
      }
   };

   const className = modalVariants({ variant });

   return createPortal(
      <div className={className} onClick={closeFn}>
         {children}
      </div>,
      document.getElementById("modal-root")!
   );
};
