/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig"; // Ensure correct import of Firebase config
import { useNavigate } from "react-router-dom"; // to navigate between pages
import "./Project.css"; // Assuming custom styling
import TopButtons from "./component/TopButtons";

const Reviews = () => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]); // Store reviews
  const [loading, setLoading] = useState(true); // Loading state

  const fetchReviews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
      setLoading(false);
    }
  };

  const handleApprove = async (review) => {
    const reviewData = {
      name: review.name,
      rating: review.rating,
      feedback: review.feedback,
      status: review.status === 0 ? 1 : 0,
      timestamp: review.timestamp,
    };

    try {
      const reviewDocRef = doc(db, "reviews", review.id);

      await updateDoc(reviewDocRef, reviewData);
      fetchReviews();
      alert("Review approved successfully!");
    } catch (error) {
      console.error("Error updating review: ", error);
      alert("Error approving review.");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "reviews", id));
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review: ", error);
      alert("Error deleting review.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []); // Fetch reviews on page load

  if (loading) {
    return <div>Loading reviews...</div>; // Show loading message while fetching data
  }

  return (
    <div className="dashboard-container">
      <TopButtons />
      <h2>Reviews</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Review ID</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Feedback</th>
            <th>Actions</th> {/* Add a column for action buttons */}
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.name}</td>
                <td>{review.rating}</td>
                <td>{review.feedback}</td>
                <td>
                  <button
                    className="btn btn-sucess"
                    onClick={() => handleApprove(review)} // Pass review to handleApprove
                  >
                    {review.status == 0 ? "Approve" : "Un Approve"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(review.id)} // Pass review ID to handleDelete
                  >
                    Trash
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No reviews available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
