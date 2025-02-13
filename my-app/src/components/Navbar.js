import React from "react";
import logo from '../assets/images/logo.png';

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div class="container">
                <div class="navbar-container collapse navbar-collapse" id="navbarNav">
                    <div class="logo-navbar">
                        <a class="navbar-brand" href="/">
                            <img src={logo} alt="Logo ITviec" height="40"/>
                        </a>
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="/" role="button">
                                    Việc Làm IT
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/">Việc làm theo kỹ năng</a></li>
                                    <li><a class="dropdown-item" href="/">Việc làm theo cấp bậc</a></li>
                                    <li><a class="dropdown-item" href="/">Việc làm theo công ty</a></li>
                                    <li><a class="dropdown-item" href="/">Việc làm theo thành phố</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="/" role="button">
                                    Top Công Ty IT
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/">Danh sách công ty</a></li>
                                    <li><a class="dropdown-item" href="/">Đánh giá công ty</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="/" role="button">
                                    Blog
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/">Tin tức IT</a></li>
                                    <li><a class="dropdown-item" href="/">Chia sẻ kinh nghiệm</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="/">Nhà Tuyển Dụng</a></li>
                        <li class="nav-item"><a class="nav-link" href="/">Đăng Nhập/Đăng Ký</a></li>
                        <li class="nav-item"><a class="nav-link" href="/">EN | VI</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;