import React, { useState } from "react";
import "./CreateOrganization.css";
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const apiUrl = process.env.REACT_APP_API_URL;

const CreateOrganization = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [formData, setFormData] = useState({
        name: "",
        details: "",
        contact: "",
        email: "",
        paymentMethod: "",
    });
    const [emailError, setEmailError] = useState(""); // State for email error


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Reset email error when user types in the email field
        if (name === "email") {
            setEmailError("");
        }
    };

    const validateEmail = (email) => {
        // Simple regex for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);

        // Validate email format
        if (!validateEmail(formData.email)) {
            setEmailError("Invalid email format.");
            return; // Stop form submission
        }

        // Proceed with form submission if email is valid
        try {
            const response = await fetch(`http://localhost:3000/api/org/organizations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    organizationName: formData.name,
                    organizationDetails: formData.details,
                    contactNo: formData.contact,
                    organizationEmail: formData.email,
                    paymentMethod: formData.paymentMethod,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("Organization created:", data);

            // Navigate to OrganizationPage and pass the created organization data
            navigate("/organizations", { state: { organization: data } });
        } catch (error) {
            console.error("Error creating organization:", error);
        }
    };

    const handleCancel = () => {
        console.log("Form canceled");
        // Optionally, reset the form or navigate away
    };

    return (
        <div className="App">
            <Header />
            <div className="create-organization-container">
                <h2>Create Organization</h2>
                <form onSubmit={handleSubmit} className="organization-form">
                    <div className="form-group">
                        <label htmlFor="name">Organization name *</label>
                        <input
                            type="text"
                            className="search-bar"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="details">Organization details *</label>
                        <input
                            type="text"
                            className="search-bar"
                            id="details"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Organization contact number *</label>
                        <input
                            type="text"
                            className="search-bar"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Organization mail id *</label>
                        <input
                            type="email"
                            className="search-bar"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {emailError && <p className="error-message">{emailError}</p>} {/* Display email error */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentMethod">Organization payment method *</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Online">Online</option>
                            <option value="Card">Card</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="create-btn">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOrganization;