import React from "react";

const LoadingBar = ({className = ""}) => {
  return (
    <>
      <progress className={"progress is-medium is-dark " + className} max="100">45%</progress>
    </>
  );
}

export default LoadingBar;