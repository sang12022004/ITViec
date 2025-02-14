import React from "react";

function FilterBar() {
  return (
    <div class="filter-bar">
        <div class="filters">
            <button class="btn filter-btn">Cấp bậc <i class="fa-solid fa-chevron-down"></i></button>
            <button class="btn filter-btn">Hình thức làm việc <i class="fa-solid fa-chevron-down"></i></button>
            <button class="btn filter-btn">Mức lương <i class="fa-solid fa-chevron-down"></i></button>
            <button class="btn filter-btn">Lĩnh vực <i class="fa-solid fa-chevron-down"></i></button>
        </div>
        <button class="btn btn-light filter-control">
            <i class="fa-solid fa-filter"></i> Bộ lọc
        </button>
    </div>
  );
}

export default FilterBar;