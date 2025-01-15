import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import PaymentMethodForm from "./PaymentMethodForm";

const Payment_Details = () => {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          {/* Render the payment form */}
          <PaymentMethodForm />
        </div>
      </div>
    </div>
  );
};

export default Payment_Details;
