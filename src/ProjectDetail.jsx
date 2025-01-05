import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectDetail.css"; // External CSS file for responsive styling

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({});
  console.log(project, "safkjef");
  const getProjectById = async () => {
    const docRef = doc(db, "projects", id);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error fetching document: ", error);
    }
  };

  useEffect(() => {
    getProjectById(); // Fetch the project when the component mounts
  }, []);

  return (
    <div
      className="pswp pswp--supports-fs pswp--open pswp--animate_opacity pswp--notouch pswp--css_animation pswp--svg pswp--animated-in pswp--zoom-allowed pswp--visible pswp--has_mouse"
      tabIndex={-1}
      role="dialog"
      style={{ position: "fixed", opacity: 1 }}
    >
      <div className="pswp__bg" style={{ opacity: 1 }} />
      <div className="pswp__scroll-wrap">
        <div
          className="pswp__container"
          style={{ transform: "translate3d(0px, 0px, 0px)" }}
        >
          <div
            className="pswp__item"
            style={{
              display: "block",
              transform: "translate3d(-1786px, 0px, 0px)",
            }}
          ></div>
          <div
            className="pswp__item"
            style={{ transform: "translate3d(0px, 0px, 0px)" }}
          >
            <div className="imageShow">
              <img alt={id} className="pswp__img" src={project?.imageUrl} />
            </div>
          </div>
        </div>
        <div className="pswp__ui pswp__ui--fit pswp__ui--over-close">
          <div className="pswp__top-bar">
            <button
              className="pswp__button pswp__button--close link-s"
              title="Close (Esc)"
              onClick={() => navigate("/")}
            />
          </div>

          <div className="pswp__caption">
            <div className="pswp__caption__center">
              <h5 className="opposite">Details :</h5>
              <div className="card__tags d-flex flex-wrap">
                {project?.tools?.map((e, i) => (
                  <span className="rounded-tag" key={i}>
                    {e}
                  </span>
                ))}
              </div>
              <p className="small">{project?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
