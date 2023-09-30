import { createPortal } from "react-dom";
import ModalContent from "./ModalContent.js";

export default function Portal({ children }) {
  return createPortal(
    // <ModalContent onClose={onClose}>{children}</ModalContent>,
    children,
    document.body
  );
}
