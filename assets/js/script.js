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
            jobDetail.style.width = originalWidth;
            jobDetail.style.height = originalHeight;
        } 
        else if (rect.top <= 20 && rect.bottom >= windowHeight - 25) {
            jobDetail.classList.add("fixed");
            jobDetail.classList.remove("bottom");
            jobDetail.style.width = originalWidth; // Dùng kích thước gốc
            jobDetail.style.height = "95vh"; // Định nghĩa chiều cao hợp lý
        } 
        else {
            jobDetail.classList.remove("fixed");
            jobDetail.classList.add("bottom");
            jobDetail.style.width = originalWidth;
            jobDetail.style.height = originalHeight;
        }
    });
});
