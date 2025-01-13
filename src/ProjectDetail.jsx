/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectDetail.css"; // External CSS file for responsive styling
import { LoadingScreen } from "./component/loadingScreen";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [loader, setLoader] = useState(false);
  console.log(project, "safkjef");
  const getProjectById = async () => {
    const docRef = doc(db, "projects", id);

    try {
      setLoader(true);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject(docSnap.data());
        setLoader(false);
      } else {
        console.log("No such document!");
        setLoader(false);
      }
    } catch (error) {
      console.log("Error fetching document: ", error);
      setLoader(false);
    }
  };

  function getFileType(url) {
    if (!url) return "Unknown";

    const extension = url.split(".").pop().split("?")[0].toLowerCase();

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    if (imageExtensions.includes(extension)) {
      return "Image";
    }

    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm", "flv"];
    if (videoExtensions.includes(extension)) {
      return "Video";
    }

    if (url.includes("github.com")) {
      return "Git Repository";
    }

    return "Unknown";
  }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    getProjectById();
  }, []);

  return (
    <>
      {loader && <LoadingScreen />}

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
                {getFileType(project?.imageUrl) === "Video" ? (
                  <video
                    className="pswp__img"
                    playsInline
                    autoPlay
                    loop
                    muted
                    controls
                    poster={project?.poster || ""}
                  >
                    <source src={project?.imageUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : getFileType(project?.imageUrl) === "Image" ? (
                  <img alt={id} className="pswp__img" src={project?.imageUrl} />
                ) : (
                  <>Nothing Found in database</>
                )}
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
                {/* <h5 className="opposite">Details :</h5> */}
                <div className="card__tags d-flex flex-wrap">
                  {project?.tools?.map((e, i) => (
                    <span className="rounded-tag" key={i}>
                      {e}
                    </span>
                  ))}
                </div>
                <p className="small">{`${project?.description?.slice(
                  0,
                  50
                )}......`}</p>
                <p className="small">{formatDate(project?.date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
