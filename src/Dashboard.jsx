import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig"; // Import Firebase services
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tools, setTools] = useState([""]); // Tools will be an array of strings
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  // Function to handle adding a new tool input field
  const handleAddToolInput = () => {
    setTools([...tools, ""]);
  };

  // Function to handle tool input change
  const handleToolChange = (index, value) => {
    const newTools = [...tools];
    newTools[index] = value;
    setTools(newTools);
  };

  const handleRemoveToolInput = (index) => {
    const newTools = tools.filter((_, i) => i !== index);
    setTools(newTools);
  };

  const handleAddProject = async () => {
    try {
      await addDoc(collection(db, "projects"), {
        tools,
        description,
        imageUrl,
      });
      alert("Project added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const getProject = () => {
    const projectRef = collection(db, "projects");
    onSnapshot(projectRef, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };
  useEffect(() => {
    getProject();
  }, []);
  return (
    <div className="dashboard-container">
      <div className="dashboard-top-buttons">
        <button className="dashboard-btn">Go Back To Home</button>
        <button
          className="dashboard-btn"
          onClick={() => navigate("/admin/pass=wrongpass@/messages")}
        >
          Messages
        </button>
      </div>
      <h1 className="dashboard-title">Add Product</h1>

      <div className="dashboard-row">
        <div className="dashboard-card">
          <h3 className="dashboard-subtitle">Tools:</h3>
          {tools.map((tool, index) => (
            <div key={index} className="tool-input-container">
              <input
                type="text"
                className="form-control dashboard-input"
                placeholder="Enter tool"
                value={tool}
                onChange={(e) => handleToolChange(index, e.target.value)}
              />
              {tools.length > 1 && (
                <button
                  className="remove-tool-btn dashboard-button my-3 w-50"
                  onClick={() => handleRemoveToolInput(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            className=" dashboard-button my-3 w-50"
            onClick={handleAddToolInput}
          >
            Add More Tool
          </button>

          <h3 className="dashboard-subtitle">Description:</h3>
          <textarea
            className="form-control dashboard-textarea"
            rows="4"
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Image Upload Section */}
        <div className="dashboard-card">
          <h3 className="dashboard-subtitle">Upload Image:</h3>
          <input
            type="text"
            placeholder="Image URL"
            className="form-control dashboard-input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="dashboard-image-preview"
            />
          )}

          <button
            className="btn btn-primary dashboard-button mt-4"
            onClick={handleAddProject}
          >
            Add Project
          </button>
        </div>
      </div>

      {/* Display Added Projects */}
      <div className="dashboard-card mt-4">
        <h3 className="dashboard-subtitle">Projects List:</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Tools</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project, i) => (
                <tr key={i}>
                  <td>
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt="Project"
                        className="project-image"
                        style={{ width: "100px", height: "auto" }}
                      />
                    )}
                  </td>
                  <td>{project.tools && project.tools.join(", ")}</td>
                  <td>{project.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No projects available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
