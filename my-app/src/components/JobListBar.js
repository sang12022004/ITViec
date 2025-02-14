import React, { useEffect, useState } from "react";
import axios from "axios";

function JobListBar() {
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState({}); // Lưu thông tin công ty dưới dạng object

    useEffect(() => {
        // Gọi API danh sách công việc
        axios.get("https://67ad4bd83f5a4e1477dd4a73.mockapi.io/api/jobs/jobs")
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu công việc:", error);
            });

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
                console.error("Lỗi khi lấy dữ liệu công ty:", error);
            });
    }, []);

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
        <div className="job-list">
            {jobs.length === 0 ? (
                <p>Đang tải danh sách công việc...</p>
            ) : (
                jobs.map((job) => {
                    const company = companies[job.company_id] || {};

                    const top3Section = job.content.find((section) => section.section === "Top 3 reasons to join us");

                    return (
                        <div key={job.id} className="card job-card">
                            <div className="card-body position-relative p-3">
                                <div className="time-and-badge d-flex justify-content-between align-items-center">
                                    <p className="text-muted small mb-0">{timeAgo(job.posted_time)}</p>
                                    {job.hot_level > 0 && <span className="hot-badge">HOT</span>}
                                </div>

                                <h6 className="job-title">
                                    <strong>{job.title}</strong>
                                </h6>

                                <div className="align-items-center d-flex">
                                    <img src={company.logo_url || "/assets/images/default-company.png"} alt={company.name || "Company"} className="company-logo" />
                                    <div className="company-info">
                                        <span className="company-name">{company.name || "Không rõ"}</span>
                                        <p className="text-muted small">{company.slogan || ""}</p>
                                    </div>
                                </div>

                                <p class="salary">
                                    <i class="fa-solid fa-dollar-sign"></i> 
                                    <a href="/">Đăng nhập để xem mức lương</a>
                                </p>

                                <hr className="dot-hr" />

                                <p className="job-location">
                                    <i className="fa-solid fa-building"></i> {job.work_type.includes("at_office") ? "Tại văn phòng" : "Remote"} <br />
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
    );
}

export default JobListBar;
