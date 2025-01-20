/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig"; // Import Firebase services
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import "./Project.css";

const EditProject = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const project = state?.project;

  const [tools, setTools] = useState(project?.tools || [""]);
  const [description, setDescription] = useState(project?.description || "");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const [type, SetType] = useState(project?.type || "");
  const [date, setDate] = useState(project?.date || "");

  const [buttonJson, setButtonJson] = useState([]);
  const token = localStorage.getItem("token");

  const getCategory = () => {
    const projectRef = collection(db, "categories");
    onSnapshot(projectRef, (snapshot) => {
      setButtonJson(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getCategory();
  }, []);
  const handleToolChange = (index, value) => {
    const newTools = [...tools];
    newTools[index] = value;
    setTools(newTools);
  };

  const handleAddToolInput = () => {
    setTools([...tools, ""]);
  };

  const handleRemoveToolInput = (index) => {
    const newTools = tools.filter((_, i) => i !== index);
    setTools(newTools);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const projectRef = doc(db, "projects", project.id);
      await updateDoc(projectRef, {
        tools,
        description,
        imageUrl,
        type,
        date,
      });
      alert("Project updated successfully!");
      navigate("/admin/project");
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  function getFileType(url) {
    if (!url) return "Unknown";

    const extension = url.split(".").pop().split("?")[0].toLowerCase();

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    if (imageExtensions.includes(extension)) {
      return "Image";
    }

    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm", "flv"];
    if (videoExtensions.includes(extension)) {
      return "Video";
    }

    if (url.includes("github.com")) {
      return "Git Repository";
    }
  }

  return (
    <div className="dashboard-container">
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

      <h1 className="dashboard-title">Edit Project</h1>

      <form onSubmit={handleUpdateProject} className="dashboard-form">
        <div className="dashboard-row">
          <div className="dashboard-card">
            <h3 className="dashboard-subtitle">Tools:</h3>
            {tools.map((tool, index) => (
              <div key={index} className="tool-input-container">
                <input
                  type="text"
                  className="form-control dashboard-input"
                  placeholder="Enter tool"
                  required
                  value={tool}
                  onChange={(e) => handleToolChange(index, e.target.value)}
                />
                {tools.length > 1 && (
                  <button
                    type="button"
                    className="remove-tool-btn dashboard-button my-3 w-50"
                    onClick={() => handleRemoveToolInput(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="dashboard-button my-3 w-50"
              onClick={handleAddToolInput}
            >
              Add More Tool
            </button>

            <h3 className="dashboard-subtitle">Description:</h3>
            <textarea
              className="form-control dashboard-textarea"
              rows="4"
              required
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="dashboard-card">
            <h3 className="dashboard-subtitle">Select Type:</h3>
            <select
              onChange={(e) => SetType(e.target.value)}
              value={type}
              style={{ textTransform: "capitalize" }}
              className="form-control dashboard-input"
              required
            >
              <option value="">Select Type</option>
              {buttonJson.map((e, i) => (
                <option key={i} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>

            <h3 className="dashboard-subtitle mt-5">Date:</h3>
            <input
              type="date"
              className="form-control dashboard-input"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="dashboard-card">
            <h3 className="dashboard-subtitle">Upload Image:</h3>
            <input
              type="text"
              placeholder="Image URL"
              className="form-control dashboard-input"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {imageUrl &&
              (getFileType(imageUrl) === "Video" ? (
                <video
                  src={imageUrl}
                  className="dashboard-image-preview"
                  controls
                ></video>
              ) : (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="dashboard-image-preview"
                />
              ))}
            <button
              type="submit"
              className="btn btn-primary dashboard-button mt-4"
            >
              Update Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
