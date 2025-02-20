import React from "react";
import "../assets/css/Titlebar.css"

function Title({ jobCount }) {
  return (
    <div className="main-container-body">
        <h2 className="job-section-title">{jobCount} việc làm IT tại Việt Nam</h2>
    </div>
  );
}

export default Title;