/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig"; // Import Firebase services
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const buttonJson = [
    { name: "logo" },
    { name: "banner" },
    { name: "animation" },
    { name: "pfp" },
    { name: "character" },
    { name: "portrait" },
    { name: "nsfw" },
    { name: "furry" },
  ];

  const [projects, setProjects] = useState([]);
  const [tools, setTools] = useState([""]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, SetType] = useState("");
  const [date, setDate] = useState("");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleAddToolInput = () => {
    setTools([...tools, ""]);
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

    return "Unknown";
  }

  const handleToolChange = (index, value) => {
    const newTools = [...tools];
    newTools[index] = value;
    setTools(newTools);
  };

  const handleRemoveToolInput = (index) => {
    const newTools = tools.filter((_, i) => i !== index);
    setTools(newTools);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "projects"), {
        tools,
        description,
        imageUrl,
        type,
        date,
      });
      alert("Project added successfully!");
      setTools([""]);
      setDescription("");
      setImageUrl("");
      SetType("");
      setDate("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const getProject = () => {
    const projectRef = collection(db, "projects");
    onSnapshot(projectRef, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getProject();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-top-buttons">
        <button className="dashboard-btn" onClick={() => navigate("/")}>
          Go Back To Home
        </button>
        <button
          className="dashboard-btn"
          onClick={() => navigate("/admin/pass=wrongpass@/messages")}
        >
          Messages
        </button>
        <a className="dashboard-btn" href="https://imgur.com/" target="_blank">
          Upload Image login with axandra gmail
        </a>
      </div>

      <h1 className="dashboard-title">Add Project</h1>

      <form onSubmit={handleAddProject} className="dashboard-form">
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
              style={{ textTransform: "capitalize" }}
              className="form-control dashboard-input"
              required
            >
              <option value="">Select Type</option>
              {buttonJson?.map((e, i) => (
                <option key={i} value={e?.name}>
                  {e?.name}
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
              Add Project
            </button>
          </div>
        </div>
      </form>

      <div className="dashboard-card mt-4">
        <h3 className="dashboard-subtitle">Projects List:</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Tools</th>
              <th>Description</th>
              <th>Type</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project, i) => (
                <tr key={i}>
                  <td>
                    <div>
                      {getFileType(project?.imageUrl) === "Video" ? (
                        <video
                          className="project-image"
                          playsInline
                          autoPlay
                          loop
                          muted
                          style={{ width: "100px", height: "auto" }}
                        >
                          <source src={project?.imageUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={project?.imageUrl}
                          alt="Project"
                          className="project-image"
                          style={{ width: "100px", height: "auto" }}
                        />
                      )}
                    </div>
                  </td>
                  <td>{project.tools && project.tools.join(", ")}</td>
                  <td>{project.description}</td>
                  <td>{project.type}</td>
                  <td>{project.date}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate("/edit-project", { state: { project } })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Trash
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No projects available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
