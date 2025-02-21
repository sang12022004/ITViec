import React, { useState, useRef} from "react";
import logo from "../assets/images/logo.png";
import "../assets/css/navbar.css";

function Navbar({ onFilterJobs }) {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(null);

    const menuRef = useRef(null);

    const getColumnCount = (submenu) => {
        if (!submenu) return 1;
        const itemCount = submenu.length;
    
        if (itemCount <= 6) return 1; // 1 cột nếu có ít hơn hoặc bằng 6 mục
        if (itemCount <= 15) return 2; // 2 cột nếu có từ 7 đến 15 mục
        if (itemCount <= 24) return 3; // 2 cột nếu có từ 7 đến 15 mục
        if (itemCount <= 32) return 4; // 2 cột nếu có từ 7 đến 15 mục
        return 5; // 3 cột nếu nhiều hơn 15 mục
    };

    // Dữ liệu menu
    const menuData = [
        {
            title: "Việc Làm IT",
            submenu: [
                {
                    title: "Việc làm IT theo kỹ năng",
                    type: "api",
                    submenu: [
                        "Java", "Python", "JavaScript", "C#", "C++", "PHP", "Ruby", "Golang",
                        "Swift", "Kotlin", "TypeScript", "SQL", "MongoDB", "NoSQL", "DevOps",
                        "ReactJS", "VueJS", "Angular", "NodeJS", "Django", "Flask", "Spring Boot",
                        "MySQL", "Database", "UI-UX", "Tester", ".NET", "Project Manager",
                        "Business Analyst", "OOP", "Oracle", "Linux", "MVC", "Team Leader",
                        "NodeJS", "ReactJS", "System Engineer", "Embedded", "Designer", "J2EE"
                    ]
                },
                {
                    title: "Việc làm IT theo cấp bậc",
                    type: "api",
                    submenu: [
                        "Lập trình viên Java", "Lập trình viên PHP", "Lập trình viên JavaScript",
                        "Lập trình viên HTML5", "Lập trình viên SQL", "Lập trình viên Android",
                        "Lập trình viên iOS", "Lập trình viên Ruby", "Lập trình viên Python",
                        "Lập trình viên Ruby on Rails", "Lập trình viên .NET", "Lập trình viên NodeJS",
                        "Lập trình viên Linux", "Lập trình viên OOP", "Lập trình viên Oracle",
                        "Lập trình viên C++", "Lập trình viên Wordpress", "Nhân viên thiết kế",
                        "Quản trị cơ sở dữ liệu", "Lập trình viên ứng dụng di động", "Quản lý dự án",
                        "Quản lý sản phẩm", "Kỹ sư cầu nối", "Tester"
                    ]
                },
                {
                    title: "Việc làm IT theo công ty",
                    type: "link",
                    submenu: [
                        "TymeX", "NEC Vietnam", "FPT Software", "NAB Innovation Centre",
                        "Capgemini Vietnam", "PVcomBank", "Vietnam", "Techcombank", "FWD VTC",
                        "Saigon Technology", "Công ty TNHH Thankslab", "Viettel Group",
                        "MONEY FORWARD", "Việt Nam", "ANDPAD Vietnam Co., Ltd",
                        "VIETNAM CO.,LTD", "Hybrid Technologies", "Simple Tech Investment",
                        "Doctor Anywhere", "Hitachi Digital Services", "Trusting Social",
                        "MB Bank", "Endava Việt Nam", "Blogic Systems", "SkyLab",
                        "Techcom Securities", "LG CNS Việt Nam"
                    ]
                },
                {
                    title: "Việc làm IT theo thành phố",
                    type: "api",
                    submenu: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Khác"]
                }
            ]
        },
        {
            title: "Top Công Ty IT",
            submenu: [
                {
                    title: "Công ty IT Tốt Nhất",
                    type: "link",
                    submenu: [
                        "Công ty IT Tốt Nhất 2024", "Công ty IT Tốt Nhất 2023",
                        "Công ty IT Tốt Nhất 2022", "Công ty IT Tốt Nhất 2021",
                        "Công ty IT Tốt Nhất 2020", "Công ty IT Tốt Nhất 2019"
                    ]
                },
                {
                    title: "Review Công Ty",
                }
            ]
        },
        {
            title: "Blog",
            submenu: [
                {
                    title: "Báo Cáo Lương IT",
                    type: "link",
                    submenu: [
                        "Báo Cáo Lương IT 2024-2025", "Báo Cáo Lương IT 2023-2024",
                        "Báo Cáo Lương IT 2022-2023"
                    ]
                },
                {
                    title: "Sự Nghiệp IT",
                },
                {
                    title: "Ứng Tuyển & Thăng Tiến",
                },
                {
                    title: "Chuyên Môn IT",
                }
            ]
        }
    ];

    const handleMenuClick = (event, item) => {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
    
        if (!item) {
            console.error("🚨 Lỗi: Item không hợp lệ.");
            return;
        }
    
        // Nếu item là chuỗi, sử dụng trực tiếp, nếu là object, lấy item.title
        const itemTitle = typeof item === "string" ? item : item.title;
    
        // 🔍 Tìm danh mục cha chứa item này
        let parentCategory = null;
        menuData.forEach(menu => {
            menu.submenu.forEach(sub => {
                if (sub.submenu && sub.submenu.includes(itemTitle)) {
                    parentCategory = sub; // Lưu danh mục cha
                }
            });
        });
    
        if (!parentCategory) {
            console.warn("⚠️ Không tìm thấy danh mục cha cho:", itemTitle);
            return;
        }
    
        const parentTitle = parentCategory.title; // Tên danh mục cha
        const parentType = parentCategory.type || "unknown"; // Loại API hoặc Link
    
        console.log(`🔍 Item: ${itemTitle} thuộc danh mục: ${parentTitle} (Loại: ${parentType})`);
    
        // Kiểm tra nếu đã chọn cùng một filter thì không cần cập nhật lại
        if (selectedFilter === itemTitle) {
            console.warn("⚠️ Bộ lọc đã được chọn trước đó:", itemTitle);
            return;
        }
    
        // Cập nhật state
        setSelectedFilter(itemTitle);
    
        // Xử lý theo loại
        switch (parentType) {
            case "api":
                console.log(`📡 Gọi API lọc theo: ${itemTitle} (Danh mục: ${parentTitle})`);
                if (typeof onFilterJobs === "function") {
                    onFilterJobs(itemTitle);
                } else {
                    console.error("🚨 `onFilterJobs` không được truyền vào Navbar hoặc không phải là hàm hợp lệ.");
                }
                break;
    
            case "link":
                const formattedUrl = `/${itemTitle.toLowerCase().replace(/ /g, "-")}`;
                console.log(`🔗 Chuyển hướng đến: ${formattedUrl}`);
                window.location.href = formattedUrl;
                break;
    
            default:
                console.warn("⚠️ Không xác định được hành động cho item:", itemTitle);
                break;
        }
    };
    

    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container-fluid">
                <div className="navbar-container collapse navbar-collapse" id="navbarNav">
                    {/* Logo */}
                    <div className="logo-navbar">
                        <a className="navbar-brand" href="/">
                            <img src={logo} alt="Logo ITviec" height="40" />
                        </a>
                    </div>

                    {/* Menu chính */}
                    <ul className="navbar-nav">
                        {menuData.map((menu, index) => (
                            <li 
                                key={index} 
                                className="dropdown"
                                onMouseEnter={() => setActiveMenu(index)}
                                onMouseLeave={() => {
                                    setActiveMenu(null);
                                    setActiveSubmenu(null);
                                }}
                                ref={menuRef}
                            >
                                <a className={`nav-link dropdown-toggle ${activeMenu === index ? "selected" : ""}`} href="/" role="button">
                                    {menu.title}
                                    {menu.submenu && Array.isArray(menu.submenu) && menu.submenu.length > 0 && (
                                        <span className="submenu-icon">
                                            <i className="fas fa-chevron-down"></i>
                                        </span>
                                    )}
                                </a>
                                {/* Submenu */}
                                {activeMenu === index && menu.submenu.length > 0 && (
                                    <ul className={`dropdown-menu ${activeSubmenu !== null ? "active" : ""}`}
                                        onMouseEnter={() => setActiveMenu(index)}
                                        onMouseLeave={() => {
                                            setActiveMenu(null);
                                            setActiveSubmenu(null); // Ẩn submenu khi di chuột ra ngoài
                                        }}
                                    >
                                        {/* Cột bên trái */}
                                        <div className="dropdown-left">
                                            {menu.submenu.map((sub, subIndex) => (
                                                <li 
                                                    key={subIndex} 
                                                    className={`dropdown-item ${activeSubmenu === subIndex ? "active" : ""}`}
                                                    onMouseEnter={() => setActiveSubmenu(subIndex)} // Chỉ dùng để hiển thị submenu
                                                >
                                                    {sub.title}
                                                    {sub.submenu && Array.isArray(sub.submenu) && sub.submenu.length > 0 && (
                                                        <span className="submenu-icon">
                                                            <i className="fas fa-chevron-right"></i>
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </div>

                                        {/* Cột bên phải (ẩn nếu chưa chọn) */}
                                        {activeSubmenu !== null && 
                                            menu.submenu[activeSubmenu]?.submenu &&
                                            Array.isArray(menu.submenu[activeSubmenu].submenu) && (
                                                <div 
                                                    className="dropdown-right"
                                                    data-columns={getColumnCount(menu.submenu[activeSubmenu].submenu)}
                                                >
                                                    {menu.submenu[activeSubmenu].submenu.map((item, itemIndex) => (
                                                        <li 
                                                            key={itemIndex}
                                                            onClick={(event) => handleMenuClick(event, item)}
                                                        >
                                                            {item}
                                                        </li>
                                                    ))}
                                                    <li className="view-all">
                                                        <a href="/" className="view-all-link">Xem tất cả &rsaquo;</a>
                                                    </li>
                                                </div>
                                            )}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Phần bên phải */}
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="/">Nhà Tuyển Dụng</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">Đăng Nhập/Đăng Ký</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">EN | VI</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
