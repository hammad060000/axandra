import React, { useState } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleColorScheme = () => {
    const htmlElement = document.documentElement; // Refers to <html>
    if (isDarkMode) {
      htmlElement.setAttribute("color-scheme", "light");
    } else {
      htmlElement.setAttribute("color-scheme", "dark");
    }
    setIsDarkMode(!isDarkMode); // Toggle state
  };
  return (
    <>
      {/* Header Start */}
      <header id="header" className="header d-flex justify-content-between">
        {/* Navigation Menu Start */}
        <div className="header__navigation">
          <nav id="menu" className="menu">
            <ul className="menu__list d-flex justify-content-start">
              <li className="menu__item">
                <a className="menu__link btn" href="#home">
                  <span className="menu__caption">Home</span>
                  <i className="ph-bold ph-house-simple" />
                </a>
              </li>
              <li className="menu__item">
                <a className="menu__link btn" href="#portfolio">
                  <span className="menu__caption">Portfolio</span>
                  <i className="ph-bold ph-squares-four" />
                </a>
              </li>
              <li className="menu__item">
                <a className="menu__link btn" href="#about">
                  <span className="menu__caption">About Me</span>
                  <i className="ph-bold ph-user" />
                </a>
              </li>
              <li className="menu__item">
                <a className="menu__link btn" href="#contact">
                  <span className="menu__caption">Contact</span>
                  <i className="ph-bold ph-envelope" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Navigation Menu End */}
        {/* Header Controls Start */}
        <div className="header__controls d-flex justify-content-end">
          <button
            id="color-switcher"
            className="menu__link btn active"
            type="button"
            role="switch"
            aria-label="light/dark mode"
            aria-checked={isDarkMode}
            onClick={toggleColorScheme}
          >
            {isDarkMode ? "☾" : "☀︎"}
          </button>
          <a
            id="notify-trigger"
            className="header__trigger btn"
            href="mailto:axandradeen@gmail.com"
          >
            <span className="trigger__caption">Let's Talk</span>
            <i className="ph-bold ph-chat-dots" />
          </a>
        </div>
        {/* Header Controls End */}
      </header>
      {/* Header End */}
    </>
  );
};

export default Header;
