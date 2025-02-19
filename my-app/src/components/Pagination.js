import React from "react";

function Pagination({ currentPage, setCurrentPage, totalPages }) {
    function renderPagination() {
        const buttons = [];

        // Nút Previous
        if (currentPage > 1) {
            buttons.push(
                <button key="prev" onClick={() => setCurrentPage(currentPage - 1)}>
                    {"<"}
                </button>
            );
        }

        // Trang đầu
        buttons.push(
            <button key="1" onClick={() => setCurrentPage(1)} className={currentPage === 1 ? "active" : ""}>
                1
            </button>
        );

        // Dấu ...
        if (currentPage > 4) {
            buttons.push(<span key="dots1">...</span>);
        }

        // Số trang gần trang hiện tại
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            buttons.push(
                <button key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? "active" : ""}>
                    {i}
                </button>
            );
        }

        // Dấu ...
        if (currentPage < totalPages - 3) {
            buttons.push(<span key="dots2">...</span>);
        }

        // Trang cuối
        if (totalPages > 1) {
            buttons.push(
                <button key={totalPages} onClick={() => setCurrentPage(totalPages)} className={currentPage === totalPages ? "active" : ""}>
                    {totalPages}
                </button>
            );
        }

        // Nút Next
        if (currentPage < totalPages) {
            buttons.push(
                <button key="next" onClick={() => setCurrentPage(currentPage + 1)}>
                    {">"}
                </button>
            );
        }

        return buttons;
    }

    return <div className="pagination">{renderPagination()}</div>;
}

export default Pagination;
