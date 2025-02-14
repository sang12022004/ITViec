document.addEventListener("DOMContentLoaded", function () {
    let jobDetail = document.querySelector(".card-content");
    let jobListContainer = document.querySelector(".job-list-container");

    // Lưu kích thước ban đầu
    let originalWidth = jobDetail.offsetWidth + "px";

    window.addEventListener("scroll", function () {
        let rect = jobListContainer.getBoundingClientRect();
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
