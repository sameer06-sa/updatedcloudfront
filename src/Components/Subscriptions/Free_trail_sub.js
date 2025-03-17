import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./Free_trail_sub.css";

const Free_trail_sub = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

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

          const currentDate = new Date();
          const endDate = new Date(subscriptionData.subscriptionType.endDate);

          const isActive = endDate > currentDate;

          if (isActive) {
            setSubscriptions([
              {
                email: subscriptionData.email || "N/A",
                type: subscriptionData.subscriptionType.type || "N/A",
                userId: subscriptionData.id || "N/A",
                status: "Active",
              },
            ]);
          } else {
            setSubscriptions([]); // No active subscriptions
          }
        } else {
          setSubscriptions([]); // No subscriptions at all
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

  return (
    <div className="App">
      <Header />
      <div className="subs-main-container">
        <Sidebar />
        <div className="content">
          <div className="subscriptions-container">
            <h1 className="subscriptions-title">Subscriptions</h1>
            {subscriptions.length > 0 ? (
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
                    {subscriptions.map((subscription, index) => (
                      <tr key={index}>
                        <td>{subscription.email}</td>
                        <td className="subscription-type">{subscription.type}</td>
                        <td>{subscription.userId}</td>
                        <td className="subscription-status active">Active</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-subscription-message">
                <p>You don't have any active subscriptions. Please subscribe to a plan.</p>
                <button className="subscribe-button" onClick={() => navigate("/subscriptions")}>
                  Subscription Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Free_trail_sub;
