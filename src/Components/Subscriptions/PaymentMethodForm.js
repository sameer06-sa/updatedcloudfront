import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentMethodForm.css";

const PaymentMethodForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    subscriptionType: "FreeTrial", // Default subscription type (no dropdown now)
    durationInDays: 30, // Default duration
    cardHolderName: "",
    cardNumber: "",
    expire: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Card Holder Name validation
    if (!formData.cardHolderName) {
      newErrors.cardHolderName = "Card holder name is required.";
    }

    // Card Number validation
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^[0-9]{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    // Expiry Date validation
    if (!formData.expire) {
      newErrors.expire = "Expiry date is required.";
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expire)) {
      newErrors.expire = "Expiry date must be in MM/YY format.";
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // Navigate to the preview page with form data
      navigate("/preview", { state: formData });
    }
  };

  const handleBack = () => {
    navigate("/payment");
  };

  return (
    <div className="payment-method-container">
      <h2 className="pay1">Payment Method</h2>
      <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>

        {/* Subscription Type is now hardcoded as "FreeTrial" */}
        <label>
          Subscription Type:
          <input
            type="text"
            name="subscriptionType"
            value="FreeTrial" // Subscription type is fixed to FreeTrial
            readOnly
          />
        </label>

        <label>
          Card Holder Name:
          <input
            type="text"
            name="cardHolderName"
            placeholder="Enter card holder name"
            value={formData.cardHolderName}
            onChange={handleChange}
          />
          {errors.cardHolderName && <p className="error">{errors.cardHolderName}</p>}
        </label>

        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            placeholder="Enter card number"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
        </label>

        <label>
          Expiry Date:
          <input
            type="text"
            name="expire"
            placeholder="MM/YY"
            value={formData.expire}
            onChange={handleChange}
          />
          {errors.expire && <p className="error">{errors.expire}</p>}
        </label>

        <label>
          CVV:
          <input
            type="password"
            name="cvv"
            placeholder="Enter CVV"
            value={formData.cvv}
            onChange={handleChange}
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}
        </label>

        <div className="buttons">
          <button type="button" className="back" onClick={handleBack}>
            Back
          </button>
          <button type="button" className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodForm;
