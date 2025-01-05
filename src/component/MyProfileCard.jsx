/* eslint-disable react/jsx-no-target-blank */
import React from "react";

const MyProfileCard = () => {
  return (
    <>
      {/* Avatar Side Block Start */}
      <div id="avatar" className="avatar">
        <div className="avatar__container d-flex flex-column justify-content-lg-between">
          {/* image and logo */}
          <div className="avatar__block">
            <div className="avatar__logo d-flex align-items-center">
              <div className="logo__image">
                {/* Your Logo Here!!! */}
                {/*<img src="img/logo.svg" alt="Braxton - Personal Portfolio & Resume HTML Template Logo">*/}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="85px"
                  height="85px"
                  viewBox="0 0 85 85"
                  style={{ enableBackground: "new 0 0 85 85" }}
                  xmlSpace="preserve"
                  className="gradient-fill"
                >
                  <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                  .gradient-fill {\n                    fill: url(#gradientFill);\n                  }\n                ",
                    }}
                  />
                  <g>
                    <linearGradient
                      id="gradientFill"
                      gradientUnits="userSpaceOnUse"
                      x1="9.9604"
                      y1="75.0338"
                      x2="75.0387"
                      y2="9.9555"
                    >
                      <stop offset={0} style={{ stopColor: "var(--accent)" }} />
                      <stop
                        offset={1}
                        style={{ stopColor: "var(--secondary)" }}
                      />
                    </linearGradient>
                    <path
                      className="gradient-fill"
                      d="M51,0H34C15.2,0,0,15.2,0,34v17c0,14.3,8.9,26.6,21.4,31.6c0,0,0,0,0,0l0,0C25.3,84.1,29.5,85,34,85h17
                c6,0,11.7-1.6,16.6-4.3c0.1-0.1,0.2-0.1,0.3-0.2C78.1,74.6,85,63.6,85,51V34C85,15.2,69.8,0,51,0z M83,51c0,10.7-5.3,20.2-13.4,26
                v-2.5v-3.9h3.9v-3.9h-3.9v-3.9h3.9v-3.9h-3.9H67v-3.9V51h-3.9v3.9v3.9h2.6v3.9v3.9v3.9h-3.9h-3.9v3.9h3.9h3.9v3.9v1
                C61.3,81.7,56.3,83,51,83H34c-4.5,0-8.7-0.9-12.6-2.6v-2v-3.9h3.9h3.9v-3.9h-3.9h-3.9v-3.9v-3.9v-3.9H24v-3.9V51h-3.9v3.9v3.9h-2.6
                h-3.9v3.9h3.9v3.9h-3.9v3.9h3.9v3.9v3.9C8.2,72.8,2,62.6,2,51V34C2,16.4,16.4,2,34,2h17c17.6,0,32,14.4,32,32V51z M50.1,54.9H54
                v3.9v3.9h-3.9v-3.9V54.9z M33.1,54.9H37v3.9v3.9h-3.9v-3.9V54.9z M27.9,51H24v-3.9v-3.9v-3.9h3.9v3.9v3.9V51z M31.8,39.3h-3.9v-3.9
                h3.9V39.3z M31.8,43.2v-3.9h3.9v3.9H31.8z M63.1,47.1V51h-3.9v-3.9v-3.9v-3.9h3.9v3.9V47.1z M35.7,47.1v-3.9h3.9h3.9h3.9h3.9v3.9
                h-3.9h-3.9h-3.9H35.7z M59.2,39.3h-3.9v-3.9h3.9V39.3z M55.3,43.2h-3.9v-3.9h3.9V43.2z"
                    />
                  </g>
                </svg>
              </div>
              <div className="logo__caption">
                <p>
                  Axandra
                  <br />
                  Deen
                </p>
              </div>
            </div>
            <div className="avatar__image">
              <img
                src="img/avatars/catgirl.webp"
                alt="Braxton - Personal Portfolio & Resume HTML Template Avatar"
              />
            </div>
          </div>
          {/* data caption #1 */}
          <div className="avatar__block">
            <h6>
              <small className="top">Specialization:</small>
              Digital Arts / Illustration
              <br />
              and Web / App Development
            </h6>
          </div>
          {/* data caption #2 */}
          <div className="avatar__block">
            <h6>
              <small className="top">Based in:</small>
              Australis, UAE (Dubai)
            </h6>
          </div>
          {/* socials and CTA button */}
          <div className="avatar__block">
            <div className="avatar__socials">
              <ul className="socials-square d-flex justify-content-between">
                {/* <li className="socials-square__item">
                  <a
                    className="socials-square__link btn"
                    href="https://dribbble.com/"
                    target="_blank"
                  >
                    <i className="ph-bold ph-dribbble-logo" />
                  </a>
                </li> */}
                {/* <li className="socials-square__item">
                  <a
                    className="socials-square__link btn"
                    href="https://behance.net/"
                    target="_blank"
                  >
                    <i className="ph-bold ph-behance-logo" />
                  </a>
                </li> */}
                <li className="socials-square__item">
                  <a
                    className="socials-square__link btn"
                    href="https://instagram.com/axandra_deenn"
                    target="_blank"
                  >
                    <i className="ph-bold ph-instagram-logo" />
                  </a>
                </li>
                <li className="socials-square__item">
                  <a
                    className="socials-square__link btn"
                     href="https://pinterest.com/axandradeen/"
                    target="_blank"
                  >
                    <i className="ph-bold ph-pinterest-logo" />
                  </a>
                </li>
                <li className="socials-square__item">
                  <a
                    className="socials-square__link btn"
                    href="https://x.com/axandra_deenn"
                    target="_blank"
                  >
                    <i className="ph-bold ph-twitter-logo" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="avatar__btnholder">
              <a
                className="btn btn-default btn-fullwidth btn-hover btn-hover-accent"
                href="#contact"
                target="_blank"
              >
                <span className="btn-caption">Let's Work Together!</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Avatar Side Block End */}
    </>
  );
};

export default MyProfileCard;
