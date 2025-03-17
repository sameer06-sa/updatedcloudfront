import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../Components/Header/Header";
import "../Help/Help.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Help = () => {
  const [queries, setQueries] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 1; // Show 2 queries per page

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/support`);
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries", error);
      toast.error("Failed to fetch queries!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.warn("Please fill out all fields!");
      return;
    }
    try {
      await axios.post(`http://localhost:3000/api/support`, { subject, message });
      toast.success("Query submitted successfully!");
      setSubject("");
      setMessage("");
      fetchQueries();
    } catch (error) {
      console.error("Error submitting query", error);
      toast.error("Error submitting query. Please try again.");
    }
  };

  // Pagination Logic
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = queries.slice(indexOfFirstQuery, indexOfLastQuery);

  const nextPage = () => {
    if (indexOfLastQuery < queries.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="help-container">
      <Header />
      <div className="help-wrapper">
        {/* Help & Support Form (Separate Card) */}
        <div className="help-card">
          <h2 className="help">Help & Support</h2>
          <form onSubmit={handleSubmit} className="query-form">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input-field"
            />
            <textarea
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea-field"
            />
            <button type="submit" className="submit-button">
              Submit Query
            </button>
          </form>
        </div>

        {/* Queries List (Separate Card) */}
        <div className="queries-card">
          <h3>Your Queries</h3>
          <div className="queries-container">
            {currentQueries.length === 0 ? (
              <p className="no-query-message">No queries submitted yet.</p>
            ) : (
              currentQueries.map((query) => (
                <div key={query._id} className={`query-card ${query.status === "resolved" ? "resolved" : "pending"}`}>
                  <h4>{query.subject}</h4>
                  <p>{query.message}</p>
                  <span className={`status-badge ${query.status === "resolved" ? "resolved-badge" : "pending-badge"}`}>
                    {query.status}
                  </span>
                  {query.response && <p className="admin-response">Admin: {query.response}</p>}
                </div>
              ))
            )}
          </div>

          {/* Pagination Buttons */}
          <div className="pagination-buttons">
            <button onClick={prevPage} disabled={currentPage === 1} className="nav-button">
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={nextPage} disabled={indexOfLastQuery >= queries.length} className="nav-button">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
