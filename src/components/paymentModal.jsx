import React, { useState } from "react";
import Modal from "react-modal";
import css from "./paymentModal.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
// import SuccessModal from "./successModal";

Modal.setAppElement("#root");

function PaymentModal({ isOpen, onRequestClose, total, onConfirm }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardNumberChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\s/g, "");
    value = value.replace(/(.{4})/g, "$1 ");
    setCardNumber(value);
  };

  const paymentData = {
    recipientName: name,
    name: name,
    phone: phone,
    address: address,
    totalCash: total,
    paymentMethod: paymentMethod,
    paymentInfo: {
      ownerName: "",
      cardNumber: "",
      expiryDate: null,
    },
  };

  if (paymentMethod === "online") {
    paymentData.paymentInfo.ownerName = ownerName;
    paymentData.paymentInfo.cardNumber = cardNumber;
    paymentData.paymentInfo.expiryDate = expiryDate;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "Order"), paymentData)
      .then(() => {
        console.log("Payment information added successfully!");
        onConfirm();      
      })
      .catch((error) => {
        console.error("Error adding payment information: ", error);
      });
    onRequestClose();
  };


  return (
    <Modal
      className={css.containerModal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div style={{ maxHeight: "500px" }}>
        <button className={css.closeButton} onClick={onRequestClose}>
          X
        </button>
        <h2 className={css.heading}>Payment Information</h2>
        <form className={css.paymentForm} onSubmit={handleSubmit}>
          <label htmlFor="name">Recipient's Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="name">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="total">Total</label>
          <input
            className={css.totalCash}
            type="text"
            value={"$" + total}
            readOnly
          />
          <div className={css.chooseOption}>
            <div>
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
              />
              <label className={css.optionName} htmlFor="cash">
                Cash
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="online"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={handlePaymentMethodChange}
              />
              <label className={css.optionName} htmlFor="online">
                Online Banking
              </label>
            </div>
          </div>
          {paymentMethod === "online" && (
            <div className={css.paymentInfo}>
              <h4 className={css.heading}>Enter card information to pay</h4>
              <label htmlFor="ownerName">Owner Name</label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                maxLength={19}
                onChange={handleCardNumberChange}
              />
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="month"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          )}
          <button className={css.confirmButton} type="submit">
            Confirm
          </button>  
          {/* <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleSuccessModalClose}
          />         */}
        </form>
      </div>
    </Modal>
  );
}

export default PaymentModal;
