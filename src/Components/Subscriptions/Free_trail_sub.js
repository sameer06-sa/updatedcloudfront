import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./Free_trail_sub.css";

const apiUrl = process.env.REACT_APP_API_URL;
 
const Free_trail_sub = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const userEmail = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).email
      : null;
 
    if (!userEmail) {
      setError("User session expired. Please log in again.");
      setLoading(false);
      return;
    }
 
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/subscriptions/${userEmail}`
        );
   
        if (response.data.subscription) {
          const subscriptionData = response.data.subscription;
   
          // Debug logs
          console.log("Fetched Subscription Data:", subscriptionData);
   
          const processedData = [
            {
              email: subscriptionData.email || "N/A",
              type: subscriptionData.subscriptionType.type || "N/A",
              userId: subscriptionData.id || "N/A",
              status: (() => {
                const currentDate = new Date();
                const endDate = new Date(subscriptionData.subscriptionType.endDate);
   
                console.log("Current Date:", currentDate);
                console.log("End Date:", endDate);
   
                return endDate > currentDate ? "Active" : "Expired";
              })(),
            },
          ];
   
          setSubscriptions(processedData);
        } else {
          setSubscriptions([]);
        }
   
        setLoading(false);
      } catch (err) {
        console.error("Error fetching subscriptions:", err.message);
        setError(
          err.response && err.response.status === 404
            ? "No subscriptions found for this user."
            : "Failed to fetch subscriptions. Please try again later."
        );
        setLoading(false);
      }
    };
   
    fetchSubscriptions();
  }, []);
 
  if (loading) {
    return <div className="loading-message">Loading subscriptions...</div>;
  }
 
  if (error) {
    return <div className="error-message">{error}</div>;
  }
 
  return (
    <div className="App">
      <Header />
      <div className="subs-main-container">
        <Sidebar />
        <div className="content">
          <div className="subscriptions-container">
            <h1 className="subscriptions-title">Subscriptions</h1>
            <div className="subscriptions-table-container">
              <table className="subscriptions-table">
                <thead>
                  <tr>
                    <th>Subscription Email</th>
                    <th>Subscription Type</th>
                    <th>Subscription ID</th>
                    <th>Subscription Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.length > 0 ? (
                    subscriptions.map((subscription, index) => (
                      <tr key={index}>
                        <td>{subscription.email}</td>
                        <td className="subscription-type">{subscription.type}</td>
                        <td>{subscription.userId}</td>
                        <td
                          className={`subscription-status ${
                            subscription.status === "Active" ? "active" : "expired"
                          }`}
                        >
                          {subscription.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No subscriptions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Free_trail_sub;