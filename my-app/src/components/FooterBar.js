import React from "react";
import "../assets/css/footerbar.css";
import logo from '../assets/images/logo.png';

function FooterBar() {
    return (
        <div className="footer-background">
            <nav aria-label="breadcrumb" className="breadcrumb-container">
                <div className="container main-container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Trang chủ</li>
                        <li className="breadcrumb-item active" aria-current="page">Tất cả việc làm IT</li>
                    </ol>
                </div>
            </nav>
            <footer className="footer mt-auto py-4">
                <div className="container main-container">
                    <div className="row d-flex flex-wrap justify-content-between">
                        {/* Logo và Social Icons */}
                        <div className="col-md-2 col-sm-6 footer-logo-container">
                            <div className="footer-logo">
                                <img src={logo} alt="ITViec" className="img-fluid"/>
                                <p className="footer-slogan">Ít nhưng mà chất</p>
                            </div>
                            <div className="social-icons">
                                <a href="/"><i className="fa-brands fa-linkedin"></i></a>
                                <a href="/"><i className="fa-brands fa-facebook"></i></a>
                                <a href="/"><i className="fa-brands fa-youtube"></i></a>
                            </div>
                        </div>

                        {/* Các cột Thông tin */}
                        <div className="col-md-2 col-sm-6">
                            <h5>Về ITviec</h5>
                            <ul className="footer-links">
                                <li><a href="/">Trang chủ</a></li>
                                <li><a href="/">Về ITviec.com</a></li>
                                <li><a href="/">Dịch vụ gợi ý ứng viên</a></li>
                                <li><a href="/">Liên hệ</a></li>
                                <li><a href="/">Việc làm IT</a></li>
                                <li><a href="/">Câu hỏi thường gặp</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 col-sm-6">
                            <h5>Chương trình</h5>
                            <ul className="footer-links">
                                <li><a href="/">Chuyện IT</a></li>
                                <li><a href="/">Cuộc thi viết</a></li>
                                <li><a href="/">Việc làm IT nổi bật</a></li>
                                <li><a href="/">Khảo sát thường niên</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 col-sm-6">
                            <h5>Điều khoản chung</h5>
                            <ul className="footer-links">
                                <li><a href="/">Quy định bảo mật</a></li>
                                <li><a href="/">Quy chế hoạt động</a></li>
                                <li><a href="/">Giải quyết khiếu nại</a></li>
                                <li><a href="/">Thỏa thuận sử dụng</a></li>
                                <li><a href="/">Thông cáo báo chí</a></li>
                            </ul>
                        </div>

                        {/* Liên hệ */}
                        <div className="col-md-3 col-sm-6 contact-column">
                            <h5>Liên hệ để đăng tin tuyển dụng tại:</h5>
                            <ul className="footer-contact">
                                <li><i className="fa-solid fa-phone"></i> Hồ Chí Minh: (+84) 977 460 519</li>
                                <li><i className="fa-solid fa-phone"></i> Hà Nội: (+84) 983 131 351</li>
                                <li><i className="fa-solid fa-envelope"></i> Email: love@itviec.com</li>
                                <li><i className="fa-solid fa-paper-plane"></i> Gửi thông tin liên hệ</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom text-center pt-3">
                    <p>Copyright © IT VIEC JSC | Mã số thuế: 0312192258</p>
                </div>
            </footer>
        </div>
    );
}

export default FooterBar;
