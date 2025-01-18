import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import TopButtons from "./component/TopButtons";

const AddProject = () => {
  const navigate = useNavigate();
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

  const [tools, setTools] = useState([""]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, SetType] = useState("");
  const [date, setDate] = useState("");
  const handleAddToolInput = () => {
    setTools([...tools, ""]);
  };
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
      navigate("/admin/project");
    } catch (error) {
      console.error("Error adding document: ", error);
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
    <div className="container py-5">
      <TopButtons />
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
    </div>
  );
};

export default AddProject;
