import React, { useEffect, useState } from "react";
import "../assets/css/bannerbar.css"
import axios from "axios";
import { FaMapMarkerAlt, FaArrowCircleRight } from "react-icons/fa";

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
      <div className="highlighted-employer">
          <div className="row no-gutters">
              {/* Cột 1: Hình ảnh công ty */}
              <div className="col-md-4 company-image-container">
                {/* Banner nền */}
                <div className="company-banner-wrapper">
                    <img src={spotlightCompany.banner_url} alt={spotlightCompany.name}/>
                </div>

                {/* Logo công ty */}
                <div className="company-logo-container">
                  <img src={spotlightCompany.logo_url} alt={spotlightCompany.name} />
                </div>

                {/* Nhãn "Nhà Tuyển Dụng Nổi Bật" */}
                <span className="highlighted-label">Nhà Tuyển Dụng Nổi Bật</span>
              </div>


              {/* Cột 2: Thông tin công ty */}
              <div className="col-md-4 company-info-container">
                <h4 className="company-name">{spotlightCompany.name}</h4>
                <p className="company-location">
                    <FaMapMarkerAlt /> {spotlightCompany.location}
                </p>
                <p className="highlighted-description">{spotlightCompany.slogan}</p>
                <a href="/" className="highlighted-link">Xem {jobCount} việc làm</a>
              </div>

              {/* Cột 3: Danh sách công việc */}
              <div className="col-md-4 company-jobs-container">
                <ul className="job-list">
                  {spotlightCompany.highlight_text.map((textObj, index) => (
                      <li key={index}>
                          <FaArrowCircleRight className="job-icon" /> {textObj.text}
                      </li>
                  ))}
                </ul>
              </div>
          </div>
      </div>
      {/* <div className="highlighted-employer">
          <div className="row">
              <div className="col-md-4 company-image-container">
                  <div className="company-banner-wrapper">
                      <img src={spotlightCompany.banner_url} alt={spotlightCompany.name} className="company-banner" />
                  </div>
                  <div className="company-logo">
                      <img src={spotlightCompany.logo_url} alt={spotlightCompany.name} />
                  </div>
                  <span className="highlighted-label">Nhà Tuyển Dụng Nổi Bật</span>
              </div>

              <div className="col-md-4 company-info">
                  <h4 className="company-name">{spotlightCompany.name}</h4>
                  <p className="company-location">
                      <FaMapMarkerAlt /> {spotlightCompany.location}
                  </p>
                  <p className="highlighted-description">{spotlightCompany.slogan}</p>
                  <a href="/" className="highlighted-link">Xem {jobCount} việc làm</a>
              </div>

              <div className="col-md-4 job-list-container">
                  <ul className="job-list">
                      {spotlightCompany.highlight_text.map((textObj, index) => (
                          <li key={index}>
                              <FaArrowCircleRight className="job-icon" /> {textObj.text}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div> */}
    </div>
  );
}

export default Banner;
