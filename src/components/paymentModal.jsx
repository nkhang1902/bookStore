import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

Modal.setAppElement("#root");

function PaymentModal({ isOpen, onRequestClose }) {
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
    paymentMethod: paymentMethod,
    paymentInfo:{
      ownerName: "",
      cardNumber: "",
      expiryDate: null,
    }
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
      })
      .catch((error) => {
        console.error("Error adding payment information: ", error);
      });
    onRequestClose();
  };

  return (
    <Modal
      className="containerModal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div style={{ maxHeight: "500px", overflow: "auto" }}>
        <button className="closeButton" onClick={onRequestClose}>
          X
        </button>
        <h2 className="heading">Payment Information</h2>
        <form className="paymentForm" onSubmit={handleSubmit}>

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
          <div className="chooseOption">
            <div>
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
              />
              <label className="optionName" htmlFor="cash">
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
              <label className="optionName" htmlFor="online">
                Online Banking
              </label>
            </div>
          </div>
          {paymentMethod === "online" && (
            <div className="paymentInfo">
              <h4 className="heading">Enter card information to pay</h4>
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

              {/* <label htmlFor="ownerPhone">Owner phone number</label>
            <input
              type="tel"            
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
            /> */}
            </div>
          )}
          <button className="confirmButton" type="submit">
            Confirm
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default PaymentModal;
