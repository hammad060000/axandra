import React from "react";

export const LoadingScreen = () => {
  return (
    <div id="loader" style={{ zIndex: 9999 }} className="loader">
      <div id="loaderContent" className="loader__content">
        <div className="loader__shadow" />
        <div className="loader__box" />
      </div>
    </div>
  );
};
