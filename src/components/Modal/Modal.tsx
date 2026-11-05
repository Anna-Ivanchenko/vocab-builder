import { useEffect, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icon/Icon";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal = ({ onClose, children, className }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div
        className={`${css.modal} ${className ?? ""}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={css.close}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon id="close" className={css.closeIcon} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
