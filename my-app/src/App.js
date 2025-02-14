import React from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Title from "./components/Title";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";

function App() {
  return (
    <div class="main">
      <div class="background"></div>
      <Navbar />
      <SearchBar />
      <div class="wrapper">
        <Banner />
        <div class="gray-background"></div>
      </div>
      <Title />
      <FilterBar />
      <Pagination />
      <div class="footer-background">
          <nav aria-label="breadcrumb" class="breadcrumb-container">
              <div class="container main-container">
                  <ol class="breadcrumb">
                      <li class="breadcrumb-item">Trang chủ</li>
                      <li class="breadcrumb-item active" aria-current="page">Tất cả việc làm IT</li>
                  </ol>
              </div>
          </nav>
          <footer class="footer mt-auto py-4 bg-dark text-white">
              <div class="container main-container">
                  <div class="row d-flex flex-wrap justify-content-between">
                      <div class="col-md-2 col-sm-6">
                          <div class="footer-logo">
                              <img src="assets/images/logo.png" alt="ITViec" class="img-fluid"/>
                              <p class="footer-slogan">Ít nhưng mà chất</p>
                          </div>
                          <div class="social-icons">
                              <a href="/"><i class="fa-brands fa-linkedin"></i></a>
                              <a href="/"><i class="fa-brands fa-facebook"></i></a>
                              <a href="/"><i class="fa-brands fa-youtube"></i></a>
                          </div>
                      </div>
          
                      <div class="col-md-2 col-sm-6">
                          <h5>Về ITviec</h5>
                          <ul class="footer-links">
                              <li><a href="/">Trang Chủ</a></li>
                              <li><a href="/">Về ITviec.com</a></li>
                              <li><a href="/">Dịch vụ gợi ý ứng viên</a></li>
                              <li><a href="/">Liên Hệ</a></li>
                              <li><a href="/">Việc Làm IT</a></li>
                              <li><a href="/">Câu hỏi thường gặp</a></li>
                          </ul>
                      </div>
          
                      <div class="col-md-2 col-sm-6">
                          <h5>Chương trình</h5>
                          <ul class="footer-links">
                              <li><a href="/">Chuyện IT</a></li>
                              <li><a href="/">Cuộc thi viết</a></li>
                              <li><a href="/">Việc làm IT nổi bật</a></li>
                              <li><a href="/">Khảo sát thường niên</a></li>
                          </ul>
                      </div>
          
                      <div class="col-md-2 col-sm-6">
                          <h5>Điều khoản chung</h5>
                          <ul class="footer-links">
                              <li><a href="/">Quy định bảo mật</a></li>
                              <li><a href="/">Quy chế hoạt động</a></li>
                              <li><a href="/">Giải quyết khiếu nại</a></li>
                              <li><a href="/">Thỏa thuận sử dụng</a></li>
                              <li><a href="/">Thông cáo báo chí</a></li>
                          </ul>
                      </div>
          
                      <div class="col-md-3 col-sm-6">
                          <h5>Liên hệ</h5>
                          <ul class="footer-contact">
                              <li><i class="fa-solid fa-phone"></i> Hồ Chí Minh: (+84) 977 460 519</li>
                              <li><i class="fa-solid fa-phone"></i> Hà Nội: (+84) 983 131 351</li>
                              <li><i class="fa-solid fa-envelope"></i> Email: love@itviec.com</li>
                              <li><i class="fa-solid fa-paper-plane"></i> Gửi thông tin liên hệ</li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div class="footer-bottom text-center pt-3">
                  <p>Copyright © IT VIEC JSC | MST: 0312192258</p>
              </div>
          </footer>
      </div>
    </div>
  );
}

export default App;
