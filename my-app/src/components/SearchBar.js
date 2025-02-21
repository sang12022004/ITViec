import React, { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import "../assets/css/searchbar.css";

const SearchBar = ({ searchTerm, setSearchTerm, selectedCity, setSelectedCity, allJobs, allCompanies }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    
    // Biến tạm để lưu từ khóa và thành phố trước khi bấm tìm kiếm
    const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
    const [tempSelectedCity, setTempSelectedCity] = useState(selectedCity);
    const [suggestions, setSuggestions] = useState([]);

    const cities = ["Tất cả thành phố", "Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Others"];

    const handleSelectCity = (city) => {
        setTempSelectedCity(city);
        setShowDropdown(false);
    };

    const handleSearch = () => {
        setSearchTerm(tempSearchTerm);
        setSelectedCity(tempSelectedCity);
        setSuggestions([]); // Ẩn gợi ý khi tìm kiếm
    };

    const handleSelectSuggestion = (suggestion) => {
        setTempSearchTerm(suggestion);
        setSuggestions([]); // Ẩn gợi ý sau khi chọn
    };

    useEffect(() => {
        if (tempSearchTerm.trim() === "") {
            setSuggestions([]); // Không hiển thị gợi ý nếu ô tìm kiếm trống
            return;
        }

        // Tạo danh sách gợi ý từ tiêu đề công việc và tên công ty
        const jobSuggestions = allJobs
            .map(job => job.title)
            .filter(title => title.toLowerCase().includes(tempSearchTerm.toLowerCase()));

        const companySuggestions = allCompanies
            .map(company => company.name)
            .filter(name => name.toLowerCase().includes(tempSearchTerm.toLowerCase()));

        setSuggestions([...jobSuggestions, ...companySuggestions]); // Gộp gợi ý
    }, [tempSearchTerm, allJobs, allCompanies]);

    return (
        <div className="search-container">
            {/* Dropdown chọn thành phố */}
            <div className="relative">
                <button className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                    <span className="icon-text">
                        <FaMapMarkerAlt className="text-gray-500" /> {tempSelectedCity}
                    </span>
                    <FaChevronDown className="text-gray-500" />
                </button>
                {showDropdown && (
                    <ul className="dropdown-menu-in-search show">
                        {cities.map((city, index) => (
                            <li 
                                key={index} 
                                className={`dropdown-item ${tempSelectedCity === city ? "selected" : ""}`}
                                onClick={() => handleSelectCity(city)}>
                                {city}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Input tìm kiếm và dropdown gợi ý */}
            <div className="search-input-container">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Nhập từ khóa tìm kiếm..." 
                    value={tempSearchTerm} 
                    onChange={(e) => setTempSearchTerm(e.target.value)} 
                />

                {/* Hiển thị danh sách gợi ý */}
                {suggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                        {suggestions.map((suggestion, index) => (
                            <li 
                                key={index} 
                                className="suggestion-item"
                                onClick={() => handleSelectSuggestion(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Nút tìm kiếm */}
            <button className="search-btn" onClick={handleSearch}>
                <FaSearch className="mr-2" /> Tìm Kiếm
            </button>
        </div>
    );
};

export default SearchBar;
