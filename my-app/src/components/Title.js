import React from "react";
import "../assets/css/Titlebar.css"

const Title = ({ jobCount, filterType, filterValue }) => {
  let filterText = <>{jobCount} Việc làm IT tại Việt Nam</>;

  if (filterType === "skills" || filterType === "level") {
      filterText = (
          <>
              {jobCount} việc làm <span style={{ color: "red" }}>{filterValue}</span> tại Việt Nam
          </>
      );
  } else if (filterType === "location") {
      filterText = (
          <>
              {jobCount} việc làm IT tại <span style={{ color: "red" }}>{filterValue}</span>
          </>
      );
  } else if (filterType === "search") {
      filterText = (
          <>
              {jobCount} việc làm <span style={{ color: "red" }}>{filterValue}</span> tại Việt Nam
          </>
      );
  }

  return (
    <div className="main-container-body">
      <h2 className="job-section-title">{filterText}</h2>
    </div>
  );
};

export default Title;