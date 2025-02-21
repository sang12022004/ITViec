import React, { useState } from "react";
import "../assets/css/advancedFilterModal.css";

function AdvancedFilterModal({
  isOpen,
  onClose,
  selectedLevels,
  setSelectedLevels,
  selectedWorkTypes,
  setSelectedWorkTypes,
  salaryRange,
  setSalaryRange,
  selectedFields,
  setSelectedFields,
  selectedCompanyTypes,
  setSelectedCompanyTypes,
  setAppliedSalary,
}) {
  const levels = ["Fresher", "Junior", "Senior", "Manager"];
  const workTypes = ["at_office", "remote", "hybrid"];
  const companyTypes = ["Thuê ngoài", "Sản phẩm", "Headhunt", "Dịch vụ & Tư vấn giải pháp", "Non-IT"];
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

  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleSelection = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSalaryChange = (event) => {
    const { name, value } = event.target;
    setSalaryRange((prev) =>
      name === "min" ? [Math.min(value, prev[1] - 500), prev[1]] : [prev[0], Math.max(value, prev[0] + 500)]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="adv-filter-modal-overlay" onClick={onClose}>
      <div className="adv-filter-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="adv-filter-header">
          <h5>Bộ lọc</h5>
          <button className="adv-close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="adv-filter-body">
            {/* Cấp bậc */}
            <div className="adv-filter-section">
                <h3>Cấp bậc</h3>
                <div className="adv-filter-options">
                {levels.map((level) => (
                    <button 
                    key={level} 
                    className={`adv-filter-option ${selectedLevels.includes(level) ? "selected" : ""}`} 
                    onClick={() => handleToggleSelection(selectedLevels, setSelectedLevels, level)}
                >
                    {level}
                </button>
                ))}
                </div>
            </div>

            {/* Hình thức làm việc */}
            <div className="adv-filter-section">
                <h3>Hình thức làm việc</h3>
                <div className="adv-filter-options">
                {workTypes.map((type) => (
                    <button key={type} className={`adv-filter-option ${selectedWorkTypes.includes(type) ? "selected" : ""}`} onClick={() => handleToggleSelection(selectedWorkTypes, setSelectedWorkTypes, type)}>
                    {type}
                    </button>
                ))}
                </div>
            </div>

            <div className="col adv-filter-section">
                <h3>Mức lương</h3>
                <div className="row adv-salary-wrapper">
                    <div className="adv-salary-range-container">
                        <p className="adv-salary-range">
                            {salaryRange[0].toLocaleString()}$ - {salaryRange[1].toLocaleString()}$
                        </p>

                        <div className="adv-container-range-slider">
                            <div className="adv-range-slider">
                                <input
                                    type="range"
                                    name="min"
                                    min="500"
                                    max="10000"
                                    value={salaryRange[0]}
                                    onChange={handleSalaryChange}
                                    className="adv-salary-slider"
                                />
                                <input
                                    type="range"
                                    name="max"
                                    min="500"
                                    max="10000"
                                    value={salaryRange[1]}
                                    onChange={handleSalaryChange}
                                    className="adv-salary-slider"
                                />
                                <div className="slider-track" style={{
                                    left: `${((salaryRange[0] - 500) / 9500) * 100}%`,
                                    width: `${((salaryRange[1] - salaryRange[0]) / 9500) * 100}%`
                                }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lĩnh vực */}
            <div className="container-field adv-filter-section">
                <h3>Lĩnh vực</h3>
                <input
                    type="text"
                    placeholder="Tìm kiếm lĩnh vực"
                    className="adv-search-field"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="adv-field-list">
                {Object.entries(fieldCategories).map(([category, fields]) => (
                    <div key={category}>
                    <p className="adv-field-category">{category}</p>
                    {fields.map((field) => (
                        <label key={field} className="adv-filter-dropdown-item">
                        <input
                            type="checkbox"
                            checked={selectedFields.includes(field)}
                            onChange={() => handleToggleSelection(selectedFields, setSelectedFields, field)}
                        />
                        {field}
                        </label>
                    ))}
                    </div>
                ))}
                </div>
            </div>

            {/* Loại công ty */}
            <div className="adv-filter-section">
                <h3>Loại công ty</h3>
                <div className="adv-filter-options">
                {companyTypes.map((type) => (
                    <button key={type} className={`adv-filter-option ${selectedCompanyTypes.includes(type) ? "selected" : ""}`} onClick={() => handleToggleSelection(selectedCompanyTypes, setSelectedCompanyTypes, type)}>
                    {type}
                    </button>
                ))}
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="adv-filter-footer">
          <button className="adv-clear-btn" onClick={() => { setSelectedLevels([]); setSelectedWorkTypes([]); setSelectedFields([]); setSelectedCompanyTypes([]); setSalaryRange([500, 10000]);}}>Xóa bộ lọc</button>
          <button className="adv-apply-btn" onClick={onClose}>Áp dụng</button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedFilterModal;
