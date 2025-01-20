/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const Header = ({ setTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleColorScheme = () => {
    const htmlElement = document.documentElement;
    console.log(htmlElement, "htmlElement");
    if (isDarkMode) {
      htmlElement.setAttribute("color-scheme", "light");
    } else {
      htmlElement.setAttribute("color-scheme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    setTheme(isDarkMode);
  }, [isDarkMode]);
  return (
    <>
      <header id="header" className="header d-flex justify-content-between">
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
      </header>
    </>
  );
};

export default Header;
