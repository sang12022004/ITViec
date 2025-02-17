import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import "../assets/css/searchbar.css";

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
                    <ul className="dropdown-menu-in-search show">
                        {cities.map((city, index) => (
                            <li 
                                key={index} 
                                className={`dropdown-item ${selectedCity === city ? "selected" : ""}`}
                                onClick={() => handleSelectCity(city)}>
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
