/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const TestimonialsSlider = () => {
  const [testimonial, setTestimonal] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch and filter reviews from Firestore
  const getReview = () => {
    const ReviewRef = collection(db, "reviews");

    onSnapshot(ReviewRef, (snapshot) => {
      const filteredReviews = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((review) => review.status === 1);

      setTestimonal(filteredReviews);
    });
  };

  useEffect(() => {
    getReview();

    // Autoplay functionality
    const autoplay = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonial.length); // Move to next slide
    }, 3000); // Change every 3 seconds

    return () => clearInterval(autoplay); // Clean up the interval on unmount
  }, [testimonial.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonial.length); // Move to next slide
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonial.length) % testimonial.length // Move to previous slide
    );
  };

  return (
    <div className="testimonials-slider">
      <div className="swiper-testimonials">
        <div
          className="swiper-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease",
          }}
        >
          {testimonial?.map((e) => (
            <div className="swiper-slide" key={e.id}>
              <div className="testimonials-card animate-in-up">
                <div className="testimonials-card__tauthor d-flex animate-in-up">
                  <div className="tauthor__avatar">
                    <img
                      src="img/avatars/400x400_t02.webp"
                      alt="Review Author"
                    />
                  </div>
                  <div className="tauthor__info d-flex flex-column justify-content-center">
                    <p className="tauthor__name">{e?.name}</p>
                    <p className="tauthor__position">
                      <a
                        href="#0"
                        className="text-link-bold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {e?.timestamp}
                      </a>
                    </p>
                    <div className="tauthor__rating d-flex">
                      {Array.from({ length: e?.rating }, (_, index) => (
                        <i key={index} className="ph-fill ph-star" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="testimonials-card__descr animate-in-up">
                  <p>{e?.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Slider Navigation buttons */}
        <div className="swiper-button-prev mxd-slider-btn-square mxd-slider-btn-square-prev animate-in-up">
          <a
            className="btn btn-square btn-square-s btn-outline slide-left"
            onClick={handlePrev}
          >
            <i className="ph-bold ph-caret-left" />
          </a>
        </div>
        <div className="swiper-button-next mxd-slider-btn-square mxd-slider-btn-square-next animate-in-up">
          <a
            className="btn btn-square btn-square-s btn-outline slide-right"
            onClick={handleNext}
          >
            <i className="ph-bold ph-caret-right" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
