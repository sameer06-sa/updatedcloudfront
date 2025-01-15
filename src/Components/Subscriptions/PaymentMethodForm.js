import React from "react";
import "./PaymentMethodForm.css";

const PaymentMethodForm = () => {
  return (
    <div className="payment-method-container">
      <h2>Payment Method</h2>
      <div className="tabs">
        <button className="tab active">Debit card</button>
        <button className="tab">Credit card</button>
        <button className="tab">Netbanking</button>
      </div>
      <form className="payment-form">
        <label>
          Card Holder Name:
          <input type="text" placeholder="Enter card holder name" />
        </label>
        <label>
          Card Name:
          <input type="text" placeholder="Enter card name" />
        </label>
        <label>
          Expire:
          <input type="text" placeholder="MM/YY" />
        </label>
        <label>
          CVV:
          <input type="password" placeholder="Enter CVV" />
        </label>
        <div className="buttons">
          <button type="button" className="back-button">
            Back
          </button>
          <button type="submit" className="enter-button">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodForm;
