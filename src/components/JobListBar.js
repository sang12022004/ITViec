import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import "../assets/css/jobbar.css"

function JobListBar({ jobs, currentPage, setCurrentPage, totalPages }) {
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companies, setCompanies] = useState({});
    const jobListContainerRef = useRef(null);   
    const [selectedJobId, setSelectedJobId] = useState(null);
   
    // Số trang & phân trang
    const itemsPerPage = 4;
    
    useEffect(() => {
        if (!selectedJob) return;
    
        axios.get(`https://67ad4bd83f5a4e1477dd4a73.mockapi.io/api/jobs/companies/${selectedJob.company_id}`)
          .then((res) => setSelectedCompany(res.data))
          .catch((error) => console.error("Lỗi tải thông tin công ty:", error));
      }, [selectedJob]);

    useEffect(() => {
        // Gọi API danh sách công ty
        axios.get("https://67ad4bd83f5a4e1477dd4a73.mockapi.io/api/jobs/companies")
            .then((response) => {
                // Chuyển danh sách công ty thành object { id: companyData }
                const companyData = response.data.reduce((acc, company) => {
                    acc[company.id] = company;
                    return acc;
                }, {});
                setCompanies(companyData);
            })
            .catch((error) => {
                
            });
    }, []);

    useEffect(() => {
        let observer; // Biến theo dõi DOM
    
        function updateCardPosition() {
            requestAnimationFrame(() => {
                const bodyContent = document.querySelector('.body-content');
                const cardContent = document.querySelector('.card-content.fixed');
    
                if (!bodyContent) {
                    return;
                }
                if (!cardContent) {
                    return;
                }
    
                let bodyRect = bodyContent.getBoundingClientRect();
                cardContent.style.right = `${window.innerWidth - bodyRect.right}px`;
            });
        }

        function resetCardPosition() {
            requestAnimationFrame(() => {
                const cardContent = document.querySelector('.card-content');
    
                if (!cardContent) {
                    return;
                }
    
                cardContent.style.right = "";
            });
        }
    
        function handleScroll() {
            const jobDetail = document.querySelector(".card-content");
            const jobListContainer = document.querySelector(".job-list-container");
    
            if (!jobDetail || !jobListContainer) {
                return;
            }

            let originalWidth = jobDetail.offsetWidth + "px";
            let rect = jobListContainer.getBoundingClientRect();
            let windowHeight = window.innerHeight;
    
            if (rect.top > 20) {
                jobDetail.classList.remove("fixed", "bottom");
                jobDetail.style.height = "94vh";
                resetCardPosition();
            } else if (rect.top <= 20 && rect.bottom >= windowHeight - 25) {
                jobDetail.classList.add("fixed");
                jobDetail.classList.remove("bottom");
                jobDetail.style.height = "94vh";
                jobDetail.style.width = originalWidth;
                updateCardPosition();
            } else {
                jobDetail.classList.remove("fixed");
                jobDetail.classList.add("bottom");
                jobDetail.style.height = "94vh";
                resetCardPosition();
            }
        }
    
        // Dùng MutationObserver để theo dõi khi `.card-content` xuất hiện
        observer = new MutationObserver(() => {
            const jobDetail = document.querySelector(".card-content");
            if (jobDetail) {
                observer.disconnect(); // Ngừng quan sát
                updateCardPosition();
            }
        });
    
        observer.observe(document.body, { childList: true, subtree: true });
    
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", updateCardPosition);
    
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateCardPosition);
        };
    }, [selectedJob]);
    
    useEffect(() => {
        function updateCardPosition() {
            requestAnimationFrame(() => {
                const bodyContent = document.querySelector('.body-content');
                const cardContent = document.querySelector('.card-content.fixed');
    
                if (!bodyContent) {
                    return;
                }
                if (!cardContent) {
                    return;
                }
    
                let bodyRect = bodyContent.getBoundingClientRect();
                const cardWidth = cardContent.offsetWidth;
                cardContent.style.left = `${bodyRect.right - cardWidth}px`;
            });
        }
    
        function resetCardPosition() {
            const cardContent = document.querySelector(".card-content");
            if (cardContent) {
                cardContent.style.left = "auto";
            }
        }
    
        function handleScroll() {
            const cardContent = document.querySelector(".card-content.fixed");
            if (cardContent) {
                updateCardPosition(); // Chỉ cập nhật nếu `.fixed` tồn tại
            } else {
                resetCardPosition(); // Nếu `.fixed` mất, reset vị trí
            }
        }
    
        // Lắng nghe khi `.fixed` xuất hiện hoặc mất đi
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.attributeName === "class") {
                    const target = mutation.target;
                    if (target.classList.contains("fixed")) {
                        updateCardPosition();
                    } else {
                        resetCardPosition();
                    }
                }
            }
        });
    
        const jobDetail = document.querySelector(".card-content");
        if (jobDetail) {
            observer.observe(jobDetail, { attributes: true, attributeFilter: ["class"] }); // Quan sát thay đổi class
        }
    
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", updateCardPosition);
    
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateCardPosition);
        };
    }, [selectedJob]); 

    const displayedJobs = (jobs || [])
        .sort((a, b) => new Date(b.posted_time) - new Date(a.posted_time))
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    // Hàm tính thời gian đăng (X giờ/ngày trước)
    const timeAgo = (dateString) => {
        const postedDate = new Date(dateString);
        const now = new Date();
    
        if (postedDate > now) {
            return "Vừa đăng";
        }
    
        const diffInSeconds = Math.floor((now - postedDate) / 1000);
    
        if (diffInSeconds < 60) {
            return `${diffInSeconds} giây trước`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)} phút trước`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
        } else {
            return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
        }
    };

    return (
    <div className="body-content">
        <div className="row">
            <div className="col-md-5 job-list-container" ref={jobListContainerRef}>
                <div className="job-list">
                    {displayedJobs.length === 0 ? (
                        <p className="Non-find">Không tìm thấy...</p>
                    ) : (
                        displayedJobs.map((job) => {
                            const company = companies[job.company_id] || {};

                            const top3Section = job.content.find((section) => section.section === "Top 3 reasons to join us");

                            return (
                                <div 
                                    key={job.id} 
                                    className={`card job-card ${selectedJobId === job.id ? "selected-job" : ""}`} 
                                    onClick={() => {
                                        setSelectedJob(job);
                                        setSelectedJobId(job.id);
                                      }} 
                                    style={{ cursor: "pointer" }}>
                                    <div 
                                        className= "card-body position-relative p-3"
                                        style={job.hot_level === 1 ? { backgroundColor: "#FDF1E6", borderRadius: "6px"} : {}}>
                                        <div className="time-and-badge d-flex justify-content-between align-items-center">
                                            <p className="text-muted small mb-0">{timeAgo(job.posted_time)}</p>
                                            {job.hot_level > 0 && job.hot_level < 3 && (
                                                <span className={`hot-badge ${job.hot_level === 1 ? "super-hot" : "normal-hot"}`}>
                                                    {job.hot_level === 1 && <span className="fire-icon">🔥</span>}
                                                    {job.hot_level === 1 ? " SUPER HOT" : "HOT"}
                                                </span>
                                            )}
                                        </div>

                                        <h6 className="job-title">
                                            <strong>{job.title}</strong>
                                        </h6>

                                        <div className="align-items-center d-flex">
                                            <img src={company.logo_url || "/assets/images/default-company.png"} alt={company.name || "Company"} className="company-logo" />
                                            <div className="company-info">
                                                <span className="text-muted small company-name">{company.name || "Không rõ"}</span>
                                                {/* <p className="text-muted small">{company.slogan || ""}</p> */}
                                            </div>
                                        </div>

                                        <p className="salary">
                                            <i className="fa-solid fa-dollar-sign"></i> 
                                            <a href="/">Đăng nhập để xem mức lương</a>
                                        </p>

                                        <hr className="dot-hr" />

                                        <p className="job-location">
                                            <i className="fa-solid fa-building"></i> 
                                                {job.work_type.includes("at_office") ? " Tại văn phòng" :
                                                job.work_type.includes("hybrid") ? " Linh hoạt" : " Từ xa"}
                                            <br />
                                            <i className="fa-solid fa-location-dot"></i> {job.location}
                                        </p>

                                        <div className="job-tags">
                                            {job.skills.map((skill, idx) => (
                                                <span key={idx} className="badge-tag text-dark">{skill}</span>
                                            ))}
                                        </div>

                                        {top3Section && (
                                            <>
                                                <hr className="dot-hr" />
                                                <ul className="custom-list">
                                                    {top3Section.items.map((item, idx) => (
                                                        <li key={idx}>{item.title}</li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <div className="col-md-7 position-relative">
            {selectedJob && (
            <div className="card card-content">
                <div className="card-body">
                    <div className="job-header">
                        <img src={selectedCompany?.logo_url || "/assets/images/default-logo.png"} 
                            alt={selectedCompany?.name || "Company"} 
                            className="company-logo-in-content"/>

                        <div className="job-info">
                            <h3 className="job-title">
                                {selectedJob.title}
                                <a href={selectedJob.apply_url} className="external-link">
                                    <i className="fa-solid fa-up-right-from-square"></i>
                                </a>
                            </h3>
                            <p className="company-name-detail">{selectedCompany?.name || "Không rõ"}</p>
                            <p className="salary">
                                <i className="fa-solid fa-dollar-sign"></i> 
                                <a href="/">Đăng nhập để xem mức lương</a>
                            </p>
                        </div>
                    </div>

                    <div className="job-footer">
                        <button className="apply-btn">Apply now</button>
                        <i className="fa-regular fa-heart favorite-icon"></i>
                    </div>

                    <div className="scrollable-section">
                        <p className="job-location">
                            <i className="fa-solid fa-location-dot">
                            </i> 
                            {selectedJob.location} 
                            <a href={selectedJob.apply_url} 
                                className="external-link"> 
                                <i className="fa-solid fa-up-right-from-square"></i>
                            </a>
                            <br/>  
                            <i className="fa-solid fa-building"></i> 
                                                {selectedJob.work_type.includes("at_office") ? " Tại văn phòng" :
                                                selectedJob.work_type.includes("hybrid") ? " Linh hoạt" : " Từ xa"}
                                            <br />
                            <i className="fas fa-clock"></i> {new Date(selectedJob.posted_time).toLocaleDateString()}
                        </p>

                        <div className="skills-job">
                            <div>Skills:</div>
                            <div className="job-tags">
                                {selectedJob.skills.map((skill, idx) => (
                                    <span key={idx} className="badge-tag text-dark">{skill}</span>
                                ))}
                            </div>
                        </div>
                        
                        <hr className="dot-hr"/>

                        {/* Hiển thị nội dung công việc */}
                        {selectedJob.content.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="title-top-in-content">{section.section}</h3>
                                <ul className="custom-list-in-content">
                                    {section.items.map((item, itemIdx) => (
                                        <li key={itemIdx}>{item.title}: {item.details || ""}</li>
                                    ))}
                                </ul>  
                                <hr className="dot-hr"/>
                            </div>
                        ))}

                        {/* Thông tin công ty */}
                        {selectedCompany && (
                            <div className="company-card">
                                <h4 className="company-name-in-info">{selectedCompany.name}</h4>
                                <p className="company-description">{selectedCompany.slogan}</p>

                                <div className="row mt-3">
                                <div className="col-md-4">
                                        <p className="company-label">Mô hình công ty</p>
                                        <p className="company-value">{selectedCompany.company_model}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="company-label">Lĩnh vực công ty</p>
                                        <p className="company-value">{selectedCompany.industry}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="company-label">Quy mô</p>
                                        <p className="company-value">{selectedCompany.company_size} nhân viên</p>
                                    </div>
                                    
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-4">
                                        <p className="company-label">Quốc gia</p>
                                        <p className="company-value">
                                            <img src={selectedCompany.country_flag} 
                                                alt={selectedCompany.country} 
                                                className="country-flag"/> {selectedCompany.country}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="company-label">Thời gian làm việc</p>
                                        <p className="company-value">{selectedCompany.working_days}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="company-label">Làm việc ngoài giờ</p>
                                        <p className="company-value">{selectedCompany.overtime_policy}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}
            </div>
        </div>
        {/* Thêm Pagination */}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>   
    );
}

export default JobListBar;
