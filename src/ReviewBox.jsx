import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const FeedbackModal = ({ handleModalClose }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (rating === 0) {
        alert("Please select a rating!");
        return;
      }

      const reviewData = {
        name: name,
        rating: rating,
        feedback: feedback,
        status: 0,
        timestamp: new Date().toISOString(),
      };
      await addDoc(collection(db, "reviews"), reviewData);
      alert("Feedback submitted successfully!");
      setName("");
      setRating(0);
      setFeedback("");
      handleModalClose();
    } catch (error) {
      console.error("Error adding review: ", error);
      alert("Error submitting feedback.");
    }
  };

  return (
    <div className="feedback-modal" style={{ position: "absolute" }}>
      <h2>Give feedback</h2>
      <p>Share your thoughts on this project.</p>

      {/* Name Input */}
      <div className="form-group mb-3">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control p-3 border-1 rounded w-100"
          placeholder="Enter your name"
        />
      </div>

      {/* Rating - Stars */}
      <div className="rating-options pt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="border">
            <input
              type="radio"
              name="rating"
              value={star}
              onChange={() => setRating(star)}
              checked={rating === star}
            />
            <span className="emoji">
              {star}{" "}
              <i
                className={`ph-fill ph-star ${rating >= star ? "active" : ""}`}
              />
            </span>
          </label>
        ))}
      </div>

      {/* Feedback Textarea */}
      <label htmlFor="feedback-reason">
        What are the main reasons for your rating?
      </label>
      <textarea
        id="feedback-reason"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="form-control"
      />

      {/* Action Buttons */}
      <div className="actions mt-3">
        <button onClick={handleSubmit} id="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          id="cancel"
          onClick={handleModalClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
