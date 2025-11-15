import { useRef } from "react";
import ReactDOM from "react-dom";
import { useClickOutside } from "../hooks/useClickOutside";

const Modal = ({ children, onClose }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, onClose);

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
