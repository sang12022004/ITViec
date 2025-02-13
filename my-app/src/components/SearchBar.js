import React from "react";

function SearchBar() {
  return (
    <div class="search-container">
            <div class="container">
                <div class="search-bar">
                    <div class="dropdown">
                        <button class="btn btn-light dropdown-toggle search-dropdown" type="button" data-bs-toggle="dropdown">
                            <i class="fa-solid fa-location-dot"></i> Tất cả thành phố
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/">Hà Nội</a></li>
                            <li><a class="dropdown-item" href="/">Hồ Chí Minh</a></li>
                            <li><a class="dropdown-item" href="/">Đà Nẵng</a></li>
                        </ul>
                    </div>

                    <input type="text" class="form-control search-input" placeholder="Nhập từ khóa theo kỹ năng, chức vụ, công ty..."/>

                    <button class="btn btn-danger search-btn">
                        <i class="fa-solid fa-search"></i> Tìm Kiếm
                    </button>
                </div>
            </div>
        </div>
  );
}

export default SearchBar;
