import React, { useEffect, useState } from "react";
import "./SucessModal.css";

const SuccessModal = ({ setSuccess }) => {
  const [theme, setTheme] = useState(false);

  const htmlElement = document.documentElement.getAttribute("color-scheme");

  useEffect(() => {
    setTheme(htmlElement);
  }, [htmlElement]);
  console.log(htmlElement, "htmlElement");
  return (
    <div className="success-modal-overlay">
      <div
        className={`success-modal-content ${theme === "dark" ? "darkThemeColorModal" : "lightThemeColorModal"}`}
      >
        <img
          src="/img/success/giphy.gif"
          alt="Success Checkmark"
          className="checkmark-icon"
        />
        <p className="teaser__text">Thank you for reaching out!</p>
        <p className="teaser__text">
          Your message has been successfully sent to Axandra. I will contact you
          through the username you provided on Twitter, Discord, or Instagram.
        </p>
        <button className="ok-button px-5" onClick={() => setSuccess(false)}>
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
