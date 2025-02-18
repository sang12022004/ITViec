// import "../assets/css/searchbar.css";

// function SearchBar() {
//   return (
//     <div class="search-container">
//             <div class="container">

//                 {/* <div class="search-bar">
//                     <div class="dropdown">
//                         <button class="btn btn-light dropdown-toggle search-dropdown" type="button" data-bs-toggle="dropdown">
//                             <i class="fa-solid fa-location-dot"></i> Tất cả thành phố
//                         </button>
//                         <ul class="dropdown-menu">
//                             <li><a class="dropdown-item" href="/">Hà Nội</a></li>
//                             <li><a class="dropdown-item" href="/">Hồ Chí Minh</a></li>
//                             <li><a class="dropdown-item" href="/">Đà Nẵng</a></li>
//                         </ul>
//                     </div>

//                     <input type="text" class="form-control search-input" placeholder="Nhập từ khóa theo kỹ năng, chức vụ, công ty..."/>

//                     <button class="btn btn-danger search-btn">
//                         <i class="fa-solid fa-search"></i> Tìm Kiếm
//                     </button>
//                 </div> */}
//             </div>
//         </div>
//   );
// }

// export default SearchBar;

import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import "../assets/css/searchbar.css"; // Đảm bảo file CSS đã được import

const SearchBar = () => {
    const [selectedCity, setSelectedCity] = useState("Tất cả thành phố");
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const cities = ["Tất cả thành phố", "Ho Chi Minh", "Ha Noi", "Da Nang", "Others"];

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setShowDropdown(false);
    };

    const handleSearch = () => {
        console.log("Tìm kiếm:", searchTerm, "Tại thành phố:", selectedCity);
    };

    return (
        <div className="search-container">
            {/* Dropdown */}
            <div className="relative">
                <button className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                    <span className="icon-text">
                        <FaMapMarkerAlt className="text-gray-500" /> {selectedCity}
                    </span>
                    <FaChevronDown className="text-gray-500" />
                </button>
                {showDropdown && (
                    <ul className="dropdown-menu show">
                        {cities.map((city, index) => (
                            <li key={index} className="dropdown-item" onClick={() => handleSelectCity(city)}>
                                {city}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Input search */}
            <input 
                type="text" 
                className="search-input" 
                placeholder="Nhập từ khóa tìm kiếm..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Nút tìm kiếm */}
            <button className="search-btn" onClick={handleSearch}>
                <FaSearch className="mr-2" /> Tìm Kiếm
            </button>
        </div>
    );
};

export default SearchBar;
