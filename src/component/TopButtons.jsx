/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TopButtons = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="dashboard-top-buttons">
      <button className="dashboard-btn" onClick={() => navigate("/")}>
        Go Back To Home
      </button>
      <button
        className="dashboard-btn"
        onClick={() => navigate("/admin/message")}
      >
        Messages
      </button>
      <button
        className="dashboard-btn"
        onClick={() => navigate("/admin/category")}
      >
        Category
      </button>
      <button
        className="dashboard-btn"
        onClick={() => navigate("/admin/review")}
      >
        Reviews
      </button>
      <button
        className="dashboard-btn"
        onClick={() => navigate("/admin/project")}
      >
        Projects
      </button>
      <button
        className="dashboard-btn"
        onClick={() => navigate("/admin/addproject")}
      >
        Add Project
      </button>
      <a
        className="dashboard-btn"
        href="https://imgur.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Upload Image login with axandra gmail
      </a>
    </div>
  );
};

export default TopButtons;
