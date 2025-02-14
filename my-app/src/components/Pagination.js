import React, { useEffect } from "react";

function Pagination() {
    useEffect(() => {
      const totalPages = 50; 
      let currentPage = 1;

      function renderPagination() {
          const pagination = document.getElementById("pagination");
          pagination.innerHTML = "";

          const createButton = (text, page, isActive = false, isDisabled = false) => {
              const button = document.createElement("button");
              button.textContent = text;
              if (isActive) button.classList.add("active");
              if (isDisabled) button.disabled = true;
              button.addEventListener("click", () => {
                  if (!isDisabled) {
                      currentPage = page;
                      renderPagination();
                  }
              });
              return button;
          };

          if (currentPage !== 1) {
              // Nút Previous
              pagination.appendChild(createButton("<", currentPage - 1, false, currentPage === 1));
          }

          // Trang đầu
          pagination.appendChild(createButton("1", 1, currentPage === 1));

          if (currentPage > 4) {
              pagination.appendChild(createButton("...", currentPage - 2, false, true));
          }

          for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
              pagination.appendChild(createButton(i, i, currentPage === i));
          }

          if (currentPage < totalPages - 3) {
              pagination.appendChild(createButton("...", currentPage + 2, false, true));
          }

          // Trang cuối
          if (totalPages > 1) {
              pagination.appendChild(createButton(totalPages, totalPages, currentPage === totalPages));
          }

          if (currentPage !== totalPages) {
              // Nút Next
              pagination.appendChild(createButton(">", currentPage + 1, false, currentPage === totalPages));
          }
      }

      // Khởi tạo pagination khi trang tải lên
      renderPagination();
    }, []);

    return (
        <div className="pagination" id="pagination"></div>
    );
}

export default Pagination;
