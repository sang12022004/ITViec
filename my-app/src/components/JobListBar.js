import React from "react";

function JobListBar() {
  return (
    <div class="job-list">
        <div class="card job-card">
            <div class="card-body position-relative p-3">

                <div class="time-and-badge d-flex justify-content-between align-items-center">
                    <p class="text-muted small mb-0">Đăng 4 giờ trước</p>
                    <span class="hot-badge">HOT</span>
                </div>                                                     
        
                <h6 class="job-title"> <strong>[Urgent] Technical Business Analyst</strong></h6>
                
                <div class="align-items-center">
                    <img src="assets/images/test.png" alt="CubicStack" class="company-logo"/>
                    <span class="company-name">CUBICSTACK SOLUTIONS</span>
                </div>                                
        
                <p class="salary">
                    <i class="fa-solid fa-dollar-sign"></i> 
                    <a href="/">Đăng nhập để xem mức lương</a>
                </p>
        
                <hr class="dot-hr"> 
                </hr>
        
                <p class="job-location">
                    <i class="fa-solid fa-building"></i> Tại văn phòng <br></br>
                    <i class="fa-solid fa-location-dot"></i> Hồ Chí Minh
                </p>
        
                <div class="job-tags">
                    <span class="badge-tag text-dark">Business Analyst</span>
                    <span class="badge-tag text-dark">Tester</span>
                    <span class="badge-tag text-dark">Project Manager</span>
                </div>

                <hr class="dot-hr"> 
                </hr>

                <ul class="custom-list">
                    <li>Attractive remuneration package with 18 days off</li>
                    <li>Smart people, interesting project & swiss quality</li>
                    <li>Travel opportunities to Switzerland</li>
                </ul>                                
            </div>
        </div>
    </div>                   
  );
}

export default JobListBar;