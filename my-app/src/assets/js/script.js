document.addEventListener("DOMContentLoaded", function () {
    let jobDetail = document.querySelector(".card-content");
    let jobListContainer = document.querySelector(".job-list-container");
    let bodyContent = document.querySelector(".body-content");

    // Lưu kích thước ban đầu
    let originalWidth = jobDetail.offsetWidth + "px";
    let originalHeight = jobDetail.offsetHeight + "px";

    window.addEventListener("scroll", function () {
        let rect = jobListContainer.getBoundingClientRect();
        let bodyRect = bodyContent.getBoundingClientRect();
        let windowHeight = window.innerHeight;

        if (rect.top > 20) {
            jobDetail.classList.remove("fixed", "bottom");
            //jobDetail.style.width = originalWidth;
            jobDetail.style.height = "94vh";
        } 
        else if (rect.top <= 20 && rect.bottom >= windowHeight - 25) {
            jobDetail.classList.add("fixed");
            jobDetail.classList.remove("bottom");
            jobDetail.style.width = originalWidth;
            jobDetail.style.height = "94vh"; // Định nghĩa chiều cao hợp lý
        } 
        else {
            jobDetail.classList.remove("fixed");
            jobDetail.classList.add("bottom");
            //jobDetail.style.width = originalWidth;
            jobDetail.style.height = "94vh";
        }
    });
});

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

    if (currentPage != 1) {
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

    if (currentPage != totalPages) {
        // Nút Next
        pagination.appendChild(createButton(">", currentPage + 1, false, currentPage === totalPages));
    }
}

// Khởi tạo pagination khi trang tải lên
renderPagination();

function updateCardPosition() {
    const bodyContent = document.querySelector('.body-content');
    const cardContent = document.querySelector('.card-content.fixed');

    if (!bodyContent || !cardContent) return;

    // Lấy vị trí & kích thước của .body-content
    let bodyRect = bodyContent.getBoundingClientRect();
    
    // Cập nhật vị trí để card-content dính sát mép phải của body-content
    cardContent.style.left = `${bodyRect.right}px`;
}

// Gọi hàm khi load trang và khi resize
window.addEventListener('resize', updateCardPosition);
window.addEventListener('load', updateCardPosition);
