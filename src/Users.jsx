/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import logo from "./logo.svg";
import Header from "./component/Header";
import "./App.css";
import MyProfileCard from "./component/MyProfileCard";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [description, setdescription] = useState("");
  const [project, setProject] = useState([]);

  // const buttonJson = [
  //   {
  //     name: "logo",
  //   },
  //   {
  //     name: "banner",
  //   },
  //   {
  //     name: "animation",
  //   },
  //   {
  //     name: "pfp",
  //   },
  //   {
  //     name: "portrait",
  //   },
  //   {
  //     name: "nsfw",
  //   },
  //   {
  //     name: "furry",
  //   },
  //   {
  //     name: "logo",
  //   },
  // ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "messages"), {
        name: name,
        username: username,
        email: email,
        description: description,
      });
      alert("Thanks for submittion!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  console.log(project, "fiofueh");

  // Function to get real-time users
  const getProjects = () => {
    const usersRef = collection(db, "projects");
    onSnapshot(usersRef, (snapshot) => {
      const fetchedProjects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProject(fetchedProjects);
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      {/* Loader Start */}
      {/* <div id="loader" className="loader">
    <div id="loaderContent" className="loader__content">
      <div className="loader__shadow" />
      <div className="loader__box" />
    </div>
  </div> */}
      {/* Loader End */}
      <Header />
      {/* SVG Background Start */}

      {/* SVG Background End */}
      <MyProfileCard />
      {/* Page Content Start */}
      <div id="content" className="content">
        <div className="content__wrapper">
          {/* Intro Section Start */}
          <section id="home" className="main intro">
            {/* Headline Start */}
            <div
              id="headline"
              className="headline d-flex align-items-start flex-column"
            >
              <p className="headline__subtitle animate-headline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="13px"
                  height="13px"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                >
                  <path
                    fill="currentColor"
                    d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
            C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
            C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
                  />
                </svg>
                <span>Let's make something awesome together!</span>
              </p>
              <h1 className="headline__title animate-headline">
                I'm Axandra Deen
                <br />
                Digital Artist and Web/App Developer.
              </h1>
              <div className="headline__btnholder d-flex flex-column flex-sm-row">
                <a
                  className="btn mobile-vertical btn-default btn-hover btn-hover-accent-mobile animate-headline"
                  href="#portfolio"
                >
                  <span className="btn-caption">My Works</span>
                  <i className="ph-bold ph-squares-four" />
                </a>
              </div>
            </div>
            {/* Headline End */}
            {/* Scroll Button Start */}
            <div className="rotating-btn">
              <a href="#portfolio" className="rotating-btn__link slide-down">
                {/* SVG rotating text */}
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 120 120"
                  style={{ enableBackground: "new 0 0 120 120" }}
                  xmlSpace="preserve"
                  className="animate-rotation"
                  data-value={360}
                >
                  <defs>
                    <path
                      id="textPath"
                      d="M110,59.5c0,27.6-22.4,50-50,50s-50-22.4-50-50s22.4-50,50-50S110,31.9,110,59.5z"
                    />
                  </defs>
                  <g>
                    <use xlinkHref="#textPath" fill="none" />
                    <text>
                      {/* button text here!!! */}
                      <textPath xlinkHref="#textPath">
                        Scroll for More * Scroll for More *{" "}
                      </textPath>
                    </text>
                  </g>
                </svg>
                {/* arrow icon */}
                <i className="ph-bold ph-arrow-down" />
              </a>
            </div>
            {/* Scroll Button End */}
          </section>
          <section id="portfolio" className="inner inner-first portfolio">
            {/* Content Block - H2 Section Title Start */}
            <div className="content__block section-grid-title">
              <p className="h2__subtitle animate-in-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="13px"
                  height="13px"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                >
                  <path
                    fill="currentColor"
                    d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
            C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
            C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
                  />
                </svg>
                <span>Previous Work.!</span>
              </p>
              <h2 className="h2__title animate-in-up">
                Have a look of my previous work..!
              </h2>
            </div>
            {/* Content Block - H2 Section Title End */}
            {/* Content Block - Works Gallery Start */}
            <div className="content__block grid-block">
              <div className="container-fluid px-0 inner__gallery">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {/* {buttonJson?.map((e, i) => (
                    <button
                      key={i}
                      className="menu__link btn active"
                      type="button"
                    >
                      {e.name}
                    </button>
                  ))} */}
                </div>

                <div
                  className="row gx-0 my-gallery"
                  itemScope=""
                  itemType="http://schema.org/ImageGallery"
                >
                  {/* Works Gallery Single Item Start 23*/}

                  {project?.map((project, index) => (
                    <figure
                      key={index}
                      className="col-12 col-md-6 gallery__item grid-item animate-card-2"
                      onClick={() => {
                        navigate(`/project/${project?.id}`);
                      }}
                    >
                      <div className="gallery__link">
                        <img
                          src={project?.imageUrl}
                          className="gallery__image"
                          itemProp="thumbnail"
                          alt={project?.description || "Image description"}
                        />
                      </div>
                      <figcaption
                        className="gallery__descr"
                        itemProp="caption description"
                      >
                        <h5>Isometric House</h5>
                        <div className="card__tags d-flex flex-wrap">
                          {project?.tools?.map((tool, i) => (
                            <span key={i} className="rounded-tag opposite">
                              {tool}
                            </span>
                          ))}
                        </div>
                        <p className="small">{project?.description}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
            {/* Content Block - Works Gallery End */}
          </section>
          {/* Portfolio Section End */}
          {/* About Section Start */}
          <section id="about" className="inner about">
            {/* Content Block - H2 Section Title Start */}
            <div className="content__block section-grid-title">
              <p className="h2__subtitle animate-in-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="13px"
                  height="13px"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                >
                  <path
                    fill="currentColor"
                    d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
            C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
            C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
                  />
                </svg>
                <span>About Me</span>
              </p>
              <h2 className="h2__title animate-in-up">
                Turning Imagination Into Art
              </h2>
            </div>
            {/* Content Block - H2 Section Title End */}
            {/* Content Block - Achievements Start */}
            <div className="content__block grid-block">
              <div className="achievements d-flex flex-column flex-md-row align-items-md-stretch">
                {/* achievements single item */}
                <div className="achievements__item d-flex flex-column grid-item animate-card-3">
                  <div className="achievements__card">
                    <p className="achievements__number">40+</p>
                    <p className="achievements__descr">Happy clients</p>
                  </div>
                </div>
                {/* achievements single item */}
                <div className="achievements__item d-flex flex-column grid-item animate-card-3">
                  <div className="achievements__card">
                    <p className="achievements__number">3+</p>
                    <p className="achievements__descr">Years of experience</p>
                  </div>
                </div>
                {/* achievements single item */}
                <div className="achievements__item d-flex flex-column grid-item animate-card-3">
                  <div className="achievements__card">
                    <p className="achievements__number">50+</p>
                    <p className="achievements__descr">Creative Projects one</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Content Block - Achievements End */}
            {/* Content Block - About Me Data Start */}
            <div className="content__block grid-block block-large">
              <div className="container-fluid p-0">
                <div className="row g-0 justify-content-between">
                  {/* About Me Description Start */}
                  <div className="col-12 col-xl-8 grid-item about-descr">
                    <p className="about-descr__text animate-in-up">
                      Creativity is not just about what you see; it's about what
                      you feel, what you imagine, and how you express it. I
                      strive to bring life to ideas, blending imagination with
                      precision. Every design has a story behind it, made with
                      passion and purpose, to inspire and connect with people.
                    </p>
                    <div className="btn-group about-descr__btnholder animate-in-up">
                      <a
                        className="btn mobile-vertical btn-default btn-hover btn-hover-accent"
                        href="mailto:axandradeen@gmail.com"
                      >
                        <span className="btn-caption">Drop a Mail</span>
                        <i className="ph-bold ph-download-simple" />
                      </a>
                    </div>
                  </div>
                  {/* About Me Description End */}
                  {/* About Me Information Start */}
                  <div className="col-12 col-xl-4 grid-item about-info">
                    <div className="about-info__item animate-in-up">
                      <h6>
                        <small className="top">Name</small>
                        Axandra Deen
                      </h6>
                    </div>
                    <div className="about-info__item animate-in-up">
                      <h6>
                        <small className="top">
                          Discord Instagram & Twitter <br /> usename
                        </small>
                        <a className="text-link-bold">axandra_deenn</a>
                      </h6>
                    </div>
                    <div className="about-info__item animate-in-up">
                      <h6>
                        <small className="top">Email</small>
                        <a
                          className="text-link-bold"
                          href="mailto:axandradeen@gmail.com"
                        >
                          axandradeen@gmail.com
                        </a>
                      </h6>
                    </div>
                    <div className="about-info__item animate-in-up">
                      <h6>
                        <small className="top">Location</small>
                        <a
                          className="text-link-bold"
                          href="https://maps.app.goo.gl/xMJXTEUeHkv6kYRQ6"
                          target="_blank"
                        >
                          Australis, UAE (Dubai)
                        </a>
                      </h6>
                    </div>
                  </div>
                  {/* About Me Information End */}
                </div>
              </div>
            </div>
            {/* Content Block - About Me Data End */}
            {/* Content Block - Services Start */}
            <div className="content__block grid-block">
              <div className="container-fluid p-0">
                <div className="row g-0 align-items-stretch cards">
                  {/* services cards grid single item */}
                  <div className="col-12 col-md-6 cards__item grid-item animate-card-2">
                    <div className="cards__card d-flex flex-column">
                      <div className="cards__descr">
                        <h4 className="cards__title animate-in-up">
                          Web
                          <br />
                          development
                        </h4>
                        <div className="cards__tags d-flex flex-wrap animate-in-up">
                          <span className="rounded-tag tag-outline">
                            UI/UX Design
                          </span>
                          <span className="rounded-tag tag-outline">
                            Design to Code
                          </span>
                        </div>
                        <p className="small cards__text animate-in-up">
                          I work on HTML, CSS, WordPress, PHP, React.js,
                          Next.js, and other technologies in building dynamic
                          and responsive websites and web applications with
                          seamless user experience and meeting the needs of the
                          clients.
                        </p>
                      </div>
                      <div className="cards__image d-flex animate-in-up">
                        <img
                          src="/img/services/1200x900_s01.webp"
                          alt="Service/Feature Image"
                        />
                      </div>
                    </div>
                  </div>
                  {/* services grid cards single item */}
                  <div className="col-12 col-md-6 cards__item grid-item animate-card-2">
                    <div className="cards__card d-flex flex-column">
                      <div className="cards__descr">
                        <h4 className="cards__title animate-in-up">
                          App Development
                        </h4>
                        <div className="cards__tags d-flex flex-wrap animate-in-up">
                          <span className="rounded-tag tag-outline">
                            React Native
                          </span>
                        </div>
                        <p className="small cards__text animate-in-up">
                          React Native is a mobile application development
                          framework that uses the same code for both iOS and
                          Android. This framework makes use of JavaScript and
                          React to make applications fast, responsive, and
                          scalable.
                        </p>
                      </div>
                      <div className="cards__image d-flex animate-in-up">
                        <img
                          src="/img/services/1200x900_s02.webp"
                          alt="Service/Feature Image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Content Block - Services End */}
          </section>
          {/* About Section End */}
          <section></section>
          {/* Contact Section Start */}
          <section
            id="contact"
            className="inner contact"
            style={{ height: "100%" }}
          >
            {/* Content Block - H2 Section Title Start */}
            <div className="content__block section-title">
              <p className="h2__subtitle  animate-in-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="13px"
                  height="13px"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                >
                  <path
                    fill="currentColor"
                    d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
            C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
            C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
                  />
                </svg>
                <span>Contact</span>
              </p>
              <h2 className="h2__title  animate-in-up">
                Let's make something awesome together!
              </h2>
            </div>
            <div className="form-container">
              <form
                className="form contact-form"
                id="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="container-fluid p-0">
                  <div className="row gx-0">
                    <div className="col-12 col-md-6 form__item animate-in-up">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name*"
                        required="Name is required"
                        value={name} // Bind state
                        onChange={(e) => setName(e.target.value)} // Update state
                      />
                    </div>
                    <div className="col-12 col-md-6 form__item animate-in-up">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address*"
                        required="Email is Required"
                        value={email} // Bind state
                        onChange={(e) => setemail(e.target.value)} // Update state
                      />
                    </div>
                    <div className="col-12 form__item animate-in-up">
                      <input
                        type="text"
                        name="username"
                        placeholder="Instagram / Twitter / Discord - Username*"
                        required="Username is required"
                        value={username} // Bind state
                        onChange={(e) => setuserName(e.target.value)} // Update state
                      />
                    </div>
                    <div className="col-12 form__item animate-in-up">
                      <textarea
                        name="description"
                        placeholder="What You're Looking For?*"
                        required=""
                        value={description} // Bind state
                        onChange={(e) => setdescription(e.target.value)} // Update state
                      />
                    </div>
                    <div className="col-12 form__item animate-in-up">
                      <button
                        className="btn btn-default btn-hover btn-hover-accent"
                        type="submit"
                      >
                        <span className="btn-caption">Send Message</span>
                        <i className="ph-bold ph-paper-plane-tilt" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="socials-cards d-flex justify-content-between flex-wrap">
                <div className="socials-cards__item d-flex grid-item-s animate-card-5">
                  <div className="socials-cards__card">
                    <i className="ph-bold ph-instagram-logo" />
                    <a
                      className="socials-cards__link"
                      href="https://instagram.com/axandra_deenn"
                      target="_blank"
                    />
                  </div>
                </div>
                {/* socials item */}
                <div className="socials-cards__item d-flex grid-item-s animate-card-5">
                  <div className="socials-cards__card">
                    <i className="ph-bold ph-twitter-logo" />
                    <a
                      className="socials-cards__link"
                      href="https://x.com/axandra_deenn"
                      target="_blank"
                    />
                  </div>
                </div>
                {/* socials item */}
                <div className="socials-cards__item d-flex grid-item-s animate-card-5">
                  <div className="socials-cards__card">
                    <i className="ph-bold ph-pinterest-logo" />
                    <a
                      className="socials-cards__link"
                      href="https://pinterest.com/axandradeen/"
                      target="_blank"
                    />
                  </div>
                </div>
              </div>
              <div className="teaser">
                <p className="teaser__text animate-in-up">
                  Want to know more about me, tell me about your project or just
                  to say hello?
                  <a
                    className="text-link-bold"
                    href="mailto:axandradeen@gmail.com"
                  >
                    Drop me a line{" "}
                  </a>
                  and I'll get back as soon as possible.
                </p>
              </div>
              <div className="container-fluid p-0 contact-lines animate-in-up">
                <div className="row g-0 contact-lines__item">
                  {/* data item */}
                  <div className="col-12 col-md-4 contact-lines__data">
                    <p className="contact-lines__title animate-in-up">
                      Location
                    </p>
                    <p className="contact-lines__text animate-in-up">
                      <a className="text-link-bold">Australis, UAE (Dubai)</a>
                    </p>
                  </div>
                  {/* data item */}
                  <div
                    className="col-12 col-md-4 contact-lines__data"
                    id="contact"
                  >
                    <p className="contact-lines__title animate-in-up">
                      Discord Instagram & Twitter <br /> usename
                    </p>
                    <p className="contact-lines__text animate-in-up">
                      <a className="text-link-bold">axandra_deenn</a>
                    </p>
                  </div>
                  {/* data item */}
                  <div className="col-12 col-md-4 contact-lines__data">
                    <p className="contact-lines__title animate-in-up">Email</p>
                    <p className="contact-lines__text animate-in-up">
                      <a
                        className="text-link-bold"
                        href="mailto:axandradeen@gmail.com"
                      >
                        axandradeen@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Users;
