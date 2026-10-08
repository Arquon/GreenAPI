export { useModal } from "./context";

import { Layout } from "./Layout";
import { Modal as ModalComponent } from "./Modal";
import { ModalProvider } from "./Provider";

export const Modal = {
   Modal: ModalComponent,
   Provider: ModalProvider,
   Layout: Layout,
};
