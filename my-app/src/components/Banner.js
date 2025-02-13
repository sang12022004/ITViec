import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner() {
  const [spotlightCompany, setSpotlightCompany] = useState(null);
  const [jobCount, setJobCount] = useState(0);

  const COMPANIES_API = "https://67ad4bd83f5a4e1477dd4a73.mockapi.io/api/jobs/companies";
  const JOBS_API = "https://67ad4bd83f5a4e1477dd4a73.mockapi.io/api/jobs/jobs";

  useEffect(() => {
    axios.get(COMPANIES_API)
      .then((response) => {
        const spotlightCompanies = response.data.filter(company => company.is_spotlight);
        if (spotlightCompanies.length > 0) {
          setSpotlightCompany(spotlightCompanies[0]);
        }
      })
      .catch(error => console.error("Lỗi khi lấy danh sách công ty:", error));
  }, []);

  useEffect(() => {
    if (spotlightCompany) {
      axios.get(JOBS_API)
        .then((response) => {
          const jobs = response.data.filter(job => job.company_id === spotlightCompany.id);
          setJobCount(jobs.length);
        })
        .catch(error => console.error("Lỗi khi lấy danh sách công việc:", error));
    }
  }, [spotlightCompany]);

  if (!spotlightCompany) return null;

  return (
    <div className="banner-background">
      <div className="container main-container">
        <div className="highlighted-employer">
          <div className="row">
            <div className="col-md-4">
              <div className="highlighted-image">
                <img src={spotlightCompany.logo_url} alt={spotlightCompany.name} className="img-fluid" />
                <span className="highlighted-label">Nhà Tuyển Dụng Nổi Bật</span>
              </div>
            </div>

            <div className="col-md-5">
              <h4>{spotlightCompany.name}</h4>
              <p><i className="fa-solid fa-location-dot"></i> {spotlightCompany.location}</p>
              <p>{spotlightCompany.slogan}</p>
              <a href="/" className="highlighted-link">Xem {jobCount} việc làm</a>
            </div>

            <div className="col-md-3">
              <ul className="job-list">
                {spotlightCompany.highlight_text.map((textObj, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-circle-arrow-right"></i> {textObj.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
