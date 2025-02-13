import React from "react";

function Banner() {
  return (
    <div className="banner-background">
      <div className="container main-container">
        <div className="highlighted-employer">
          <div className="row">
            <div className="col-md-4">
              <div className="highlighted-image">
                <img src="assets/images/banner.png" alt="Nhà Tuyển Dụng Nổi Bật" className="img-fluid" />
                <span className="highlighted-label">Nhà Tuyển Dụng Nổi Bật</span>
              </div>
            </div>
            <div className="col-md-5">
              <h4>Thoughtworks Vietnam</h4>
              <p><i className="fa-solid fa-location-dot"></i> Hồ Chí Minh</p>
              <p>A global tech consultancy that integrates strategy, design & engineering to drive digital innovation.</p>
              <a href="/" className="highlighted-link">Xem 4 việc làm </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
