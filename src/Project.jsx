/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig"; // Import Firebase services
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import "./Project.css";
import { useNavigate } from "react-router-dom";
import TopButtons from "./component/TopButtons";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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
    getProject();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Top Buttons */}
      <TopButtons />

      {/* Projects Table */}
      <div className="dashboard-card mt-4">
        <h3 className="dashboard-subtitle">Projects List:</h3>
        <div className="table-responsive">
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
                      <div className="pb-2">
                        <button
                          className="btn btn-sucess"
                          onClick={() =>
                            navigate("/editproject", { state: { project } })
                          }
                        >
                          Edit
                        </button>
                      </div>
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
                  <td colSpan="6" className="text-center">
                    No projects available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Project;
