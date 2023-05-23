import React, { useState } from "react";
import Modal from "react-modal";
import css from "./successModal.module.css";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

function SuccessModal({ isOpen, onRequestClose }) {

  const handleOutsideClick = (e) => {
    // Kiểm tra xem người dùng đã click vào bên ngoài Modal hay không
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      className={css.containerModal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onClick={handleOutsideClick}
    >
      <div>
        <h2 className={css.title}>Payment Successful!</h2>
        <p className={css.title}>
          Your payment has been processed successfully.
        </p>
        <div className={css.buttonBox}>
          <button className={css.button} onClick={onRequestClose}>
            Close
          </button>
          <Link className={css.button} to={"/"}>
            Continue shopping
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default SuccessModal;
