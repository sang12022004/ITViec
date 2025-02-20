import React, { useState, useEffect } from "react";
import "../assets/css/filterbar.css";
import AdvancedFilterModal from "./AdvancedFilterModal";

function FilterBar() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isWorkTypeOpen, setIsWorkTypeOpen] = useState(false);
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([500, 10000]);
  const [appliedSalary, setAppliedSalary] = useState(null);

  const [isFieldOpen, setIsFieldOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);

  const levels = ["Fresher", "Junior", "Senior", "Manager"];
  const workTypes = ["Tại văn phòng", "Làm từ xa", "Linh hoạt"];

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
    "Công Nghệ": ["Phần Cứng và Điện Toán", "Trò Chơi", "Truyền Thông, Quảng Cáo và Giải Trí"],
    "Tài Chính": ["Ngân Hàng", "Dịch Vụ Tài Chính", "Bảo Hiểm"],
    "Sức Khỏe": ["Dược Phẩm", "Chăm Sóc Sức Khỏe", "Y Tế"],
    "Sản Xuất & Kinh Doanh": ["Bất Động Sản và Xây Dựng", "Vật Liệu và Khai Thác", "Công Nghiệp Tiện Ích"],
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

   // Kiểm tra nếu có ít nhất 1 filter đang được chọn
   const hasFilters =
   selectedLevels.length > 0 ||
   selectedWorkTypes.length > 0 ||
   appliedSalary !== null ||
   selectedFields.length > 0;

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
            <div className="dropdown-menu-in-filter field-dropdown">
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
            onClick={() => {
              setSelectedLevels([]);
              setSelectedWorkTypes([]);
              setSelectedFields([]);
              setAppliedSalary(null);
              setSalaryRange([500, 10000]);
            }}
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
