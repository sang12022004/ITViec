import React, { useState, useEffect } from "react";
import "../assets/css/filterbar.css";
import AdvancedFilterModal from "./AdvancedFilterModal";

function FilterBar({
  selectedLevels, setSelectedLevels,
  selectedWorkTypes, setSelectedWorkTypes,
  salaryRange, setSalaryRange,
  appliedSalary, setAppliedSalary,
  selectedFields, setSelectedFields,
  selectedCompanyTypes, setSelectedCompanyTypes
}) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isWorkTypeOpen, setIsWorkTypeOpen] = useState(false);
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  const [isFieldOpen, setIsFieldOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const levels = ["Fresher", "Junior", "Senior", "Manager"];
  const workTypes = ["at_office", "remote", "hybrid"];

  // Xử lý chọn/bỏ chọn cấp bậc
  const handleLevelChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((item) => item !== level) : [...prev, level]
    );
  };

  // Xử lý chọn/bỏ chọn hình thức làm việc
  const handleWorkTypeChange = (type) => {
    setSelectedWorkTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  // Xử lý thanh kéo hai đầu
  const handleSalaryChange = (event) => {
    const { name, value } = event.target;
    const newRange = [...salaryRange];

    if (name === "min") {
      newRange[0] = Math.min(Number(value), salaryRange[1] - 500);
    } else {
      newRange[1] = Math.max(Number(value), salaryRange[0] + 500);
    }

    setSalaryRange(newRange);
  };

  // Áp dụng mức lương
  const applySalary = () => {
    setAppliedSalary(salaryRange);
    setIsSalaryOpen(false);
  };

  // Hiển thị text trên button
  const getButtonText = (selected, defaultText) => {
    if (selected.length === 0) return defaultText;
    if (selected.length === 1) return selected[0];
    return `${selected[0]}, +${selected.length - 1}`;
  };

  const fieldCategories = {
    "Công Nghệ Thông Tin": [
      "Phần mềm",
      "Dịch Vụ và Tư Vấn IT",
      "Phần Cứng và Điện Toán",
      "An Ninh Mạng",
      "Mạng Lưới và Cơ Sở Hạ Tầng",
      "Thuê Ngoài Phát Triển Phần Mềm",
      "Sản Phẩm Phần Mềm và Dịch Vụ Web",
      "AI, Blockchain và Dịch Vụ Deep Tech"
    ],
    "Tài Chính & Ngân Hàng": [
      "Ngân Hàng",
      "Dịch Vụ Tài Chính",
      "Bảo Hiểm",
      "Chứng Khoán",
      "Dịch Vụ Nghiên Cứu"
    ],
    "Sức Khỏe & Dược Phẩm": [
      "Chăm Sóc Sức Khỏe",
      "Dược Phẩm",
      "Y Tế",
      "Sức Khỏe & Thể Dục"
    ],
    "Sản Xuất & Công Nghiệp": [
      "Sản Xuất và Kỹ Thuật",
      "Công Nghiệp Tiện Ích",
      "Vật Liệu và Khai Thác"
    ],
    "Bất Động Sản & Xây Dựng": [
      "Bất Động Sản",
      "Xây Dựng",
      "Quản Lý Cơ Sở Vật Chất"
    ],
    "Thương Mại & Dịch Vụ": [
      "Thương Mại Điện Tử",
      "Mua Bán và Thương Mại",
      "Bán Lẻ và Bán Buôn",
      "Dịch Vụ Chuyên Nghiệp",
      "Dịch Vụ Khách Hàng"
    ],
    "Vận Tải & Logistics": [
      "Vận Tải, Logistics và Kho Hàng",
      "Giao Nhận & Chuỗi Cung Ứng"
    ],
    "Truyền Thông & Quảng Cáo": [
      "Truyền Thông",
      "Quảng Cáo và Giải Trí",
      "Xuất Bản và In Ấn"
    ],
    "Giáo Dục & Đào Tạo": [
      "Giáo Dục và Đào Tạo",
      "Dịch Vụ Nghiên Cứu"
    ],
    "Du Lịch & Dịch Vụ Lưu Trú": [
      "Du Lịch & Dịch Vụ Lưu Trú",
      "Nhà Hàng & Ẩm Thực"
    ],
    "Chính Phủ & Phi Lợi Nhuận": [
      "Chính Phủ",
      "Phi Lợi Nhuận và Dịch Vụ Xã Hội"
    ],
    "Hàng Tiêu Dùng & Thực Phẩm": [
      "Hàng Tiêu Dùng",
      "Thực Phẩm & Đồ Uống"
    ],
    "Thời Trang & Mỹ Phẩm": [
      "May mặc và Thời Trang",
      "Làm Đẹp & Mỹ Phẩm"
    ],
    "Giải Trí & Thể Thao": [
      "Trò Chơi",
      "Thể thao và Thể hình",
      "Sáng Tạo và Thiết Kế"
    ],
    "Môi Trường & Nông Nghiệp": [
      "Môi Trường",
      "Nông Nghiệp"
    ],
    "Nhân Sự & Tuyển Dụng": [
      "Cung Ứng và Tuyển Dụng"
    ]
  };  

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-in-filter")) {
        setIsLevelOpen(false);
        setIsWorkTypeOpen(false);
        setIsSalaryOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const clearSalary = (e) => {
    e.stopPropagation(); // Ngăn chặn mở dropdown khi bấm X
    setAppliedSalary(null);
    setSalaryRange([500, 10000]); // Reset về giá trị mặc định
  };

  // Xử lý chọn/bỏ chọn lĩnh vực
  const handleCheckboxChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((item) => item !== field) : [...prev, field]
    );
  };

  // Xóa toàn bộ lĩnh vực đã chọn
  const clearFields = (e) => {
    e.stopPropagation();
    setSelectedFields([]);
  };

 // Lọc danh sách theo từ khóa tìm kiếm
  const filteredCategories = Object.keys(fieldCategories).reduce((acc, category) => {
    const filteredFields = fieldCategories[category].filter((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredFields.length > 0) {
      acc[category] = filteredFields;
    }
    return acc;
  }, {});


  const clearFilters = () => {
    setSelectedLevels([]);
    setSelectedWorkTypes([]);
    setSelectedFields([]);
    setSelectedCompanyTypes([]);
    setAppliedSalary(null);
    setSalaryRange([500, 10000]); // Reset lại mức lương
  };

   // Kiểm tra nếu có ít nhất 1 filter đang được chọn
   const hasFilters =
    selectedLevels.length > 0 ||
    selectedWorkTypes.length > 0 ||
    appliedSalary !== null ||
    selectedFields.length > 0 ||
    selectedCompanyTypes.length > 0;

  return (
    <div className="filter-bar">
      <div className="filters">
        {/* Dropdown Cấp bậc */}
        <div className="dropdown-in-filter">
          <button
            className={`btn filter-btn ${selectedLevels.length > 0 ? "selected" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLevelOpen(!isLevelOpen);
              setIsWorkTypeOpen(false);
              setIsSalaryOpen(false);
            }}
          >
            {getButtonText(selectedLevels, "Cấp bậc")}
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          {isLevelOpen && (
            <div className="dropdown-menu-in-filter">
              {levels.map((level) => (
                <label key={level} className="dropdown-item-in-filter">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level)}
                    onChange={() => handleLevelChange(level)}
                    className="checkbox-in-filter"
                  />
                  {level}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown Hình thức làm việc */}
        <div className="dropdown-in-filter">
          <button
            className={`btn filter-btn ${selectedWorkTypes.length > 0 ? "selected" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsWorkTypeOpen(!isWorkTypeOpen);
              setIsLevelOpen(false);
              setIsSalaryOpen(false);
            }}
          >
            {getButtonText(selectedWorkTypes, "Hình thức làm việc")}
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          {isWorkTypeOpen && (
            <div className="dropdown-menu-in-filter">
              {workTypes.map((type) => (
                <label key={type} className="dropdown-item-in-filter">
                  <input
                    type="checkbox"
                    checked={selectedWorkTypes.includes(type)}
                    onChange={() => handleWorkTypeChange(type)}
                    className="checkbox-in-filter"
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown Mức lương */}
        <div className="dropdown-in-filter">
          <button
            className={`btn filter-btn ${appliedSalary ? "selected" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsSalaryOpen(!isSalaryOpen);
            }}
          >
            {appliedSalary ? `${appliedSalary[0]}$ - ${appliedSalary[1]}$` : "Mức lương"}
            {appliedSalary && (
              <span className="clear-salary" onClick={clearSalary}>&times;</span>
            )}
            {!appliedSalary && <i className="fa-solid fa-chevron-down salary-icon"></i>}
          </button>

          {isSalaryOpen && (
            <div className="dropdown-menu-in-filter salary-dropdown">
              <p>{salaryRange[0].toLocaleString()}$ - {salaryRange[1].toLocaleString()}$</p>

              {/* Container bọc thanh trượt */}
              <div className="range-slider-container">
                  <div className="slider-track" 
                      style={{
                          left: `${((salaryRange[0] - 500) / 9500) * 100}%`,
                          width: `${((salaryRange[1] - salaryRange[0]) / 9500) * 100}%`
                      }}>
                  </div>

                  <input
                      type="range"
                      name="min"
                      min="500"
                      max="10000"
                      value={salaryRange[0]}
                      onChange={handleSalaryChange}
                  />
                  <input
                      type="range"
                      name="max"
                      min="500"
                      max="10000"
                      value={salaryRange[1]}
                      onChange={handleSalaryChange}
                  />
              </div>


              <button className="apply-btn" onClick={applySalary}>Áp dụng</button>
            </div>
          )}
        </div>

        {/* Dropdown Lĩnh vực */}
        <div className="dropdown-in-filter">
          <button
            className={`btn filter-btn ${selectedFields.length > 0 ? "selected" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsSalaryOpen(false);
              setIsWorkTypeOpen(false);
              setIsLevelOpen(false);
              setIsFieldOpen(!isFieldOpen);
            }}
          >
            {selectedFields.length > 0 ? `${selectedFields[0]}, +${selectedFields.length - 1}` : "Lĩnh vực"}
            {selectedFields.length > 0 ? (
              <i className="fa-solid fa-xmark clear-icon" onClick={clearFields}></i>
            ) : (
              <i className="fa-solid fa-chevron-down salary-icon"></i>
            )}
          </button>

          {isFieldOpen && (
            <div className="dropdown-menu-in-filter">
              {/* Ô tìm kiếm */}
              <input
                type="text"
                placeholder="Tìm kiếm lĩnh vực"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-field"
              />

              {/* Danh sách lĩnh vực theo nhóm */}
              <div className="field-list">
                {Object.keys(filteredCategories).length > 0 ? (
                  Object.entries(filteredCategories).map(([category, fields]) => (
                    <div key={category}>
                      <p className="field-category">{category}</p>
                      {fields.map((field) => (
                        <label key={field} className="dropdown-item-in-filter">
                          <input
                            type="checkbox"
                            checked={selectedFields.includes(field)}
                            onChange={() => handleCheckboxChange(field)}
                            className="checkbox-in-filter"
                          />
                          {field}
                        </label>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="no-result">Không tìm thấy lĩnh vực</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Nút "Xoá" nếu có ít nhất 1 filter được chọn */}
        {(selectedLevels.length > 0 || 
          selectedWorkTypes.length > 0 || 
          selectedFields.length > 0 || 
          salaryRange[0] !== 500 || salaryRange[1] !== 10000) && (
          <button 
            className="clear-all-btn" 
            onClick={clearFilters}
          >
            Xoá
          </button>
        )}


      </div>

      {/* Nút "Bộ lọc" */}
      <button className="btn filter-btn-container" onClick={() => setIsFilterModalOpen(true)}>
        <i className="fa-solid fa-filter"></i> Bộ lọc
        {hasFilters && <span className="filter-count">{selectedLevels.length + selectedWorkTypes.length + (appliedSalary ? 1 : 0) + selectedFields.length + selectedCompanyTypes.length}</span>}
      </button>

      {isFilterModalOpen && (
        <AdvancedFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          setAppliedSalary={setAppliedSalary}
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
          selectedWorkTypes={selectedWorkTypes}
          setSelectedWorkTypes={setSelectedWorkTypes}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          selectedFields={selectedFields}
          setSelectedFields={setSelectedFields}
          selectedCompanyTypes={selectedCompanyTypes}
          setSelectedCompanyTypes={setSelectedCompanyTypes}
        />
      )}
    </div>
  );
}

export default FilterBar;
