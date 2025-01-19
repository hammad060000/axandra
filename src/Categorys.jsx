/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./Project.css";
import TopButtons from "./component/TopButtons";

const Categories = () => {
  const [name, setName] = useState("");

  const handleCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Category name cannot be empty.");
      return;
    }
    try {
      await addDoc(collection(db, "categories"), {
        name,
      });
      alert("Category added successfully!");
      setName("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add category. Please try again.");
    }
  };

  const [buttonJson, setButtonJson] = useState([]);

  const getCategory = () => {
    const projectRef = collection(db, "categories");
    onSnapshot(projectRef, (snapshot) => {
      setButtonJson(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
  };

  useEffect(() => {
    getCategory();
  }, []);
  const handleDeleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="dashboard-container container py-4">
      {/* Top Buttons */}
      <TopButtons />
      {/* Add Category Section */}
      <div className="dashboard-container w-100">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title mb-4">Add Category</h2>
            <form onSubmit={handleCategory}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
              <button type="submit" className="btn btn-sucess">
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="dashboard-card mt-4">
        <h3 className="dashboard-subtitle">Projects List:</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buttonJson.length > 0 ? (
                buttonJson.map((project, i) => (
                  <tr key={i}>
                    <td className="w-25">{project?.id}</td>
                    <td>{project?.name}</td>
                    <td className="w-25">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteCategory(project.id)}
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

export default Categories;
