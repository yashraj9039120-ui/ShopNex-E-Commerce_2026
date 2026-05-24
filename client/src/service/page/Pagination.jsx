import React from "react";
import { useSelector } from "react-redux";

function Pagination({
  currentPage,
  onPageChange,
  activeClass = "bg-indigo-600 text-white shadow-md",
  nextPageText = "Next",
  prevPageText = "Prev",
  firstPageText = "1st",
  lastPageText = "Last",
}) {
  const { totalPages, products } = useSelector((state) => state.product);
  if (products.length === 0 || totalPages <= 1) return null;

  // Generate Page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 2;
    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPages, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <nav
      className="flex flex-wrap justify-center items-center gap-2 mt-6"
      aria-label="Pagination Navigation"
    >
      {/* First and Previous */}
      <button
        disabled={currentPage === 1}
        className={`pagination-btn rounded-md px-4 py-2 text-sm font-semibold 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition 
          ${currentPage === 1 ? "cursor-not-allowed opacity-40" : "hover:bg-indigo-100"}`}
        onClick={() => onPageChange(1)}
        aria-label="Go to first page"
      >
        {firstPageText}
      </button>
      <button
        disabled={currentPage === 1}
        className={`pagination-btn rounded-md px-4 py-2 text-sm font-semibold 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition
          ${currentPage === 1 ? "cursor-not-allowed opacity-40" : "hover:bg-indigo-100"}`}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Go to previous page"
      >
        {prevPageText}
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((number) => (
        <button
          key={number}
          aria-current={currentPage === number ? "page" : undefined}
          className={`pagination-btn rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
            currentPage === number
              ? activeClass
              : "bg-white text-indigo-700 hover:bg-indigo-50"
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {/* Next and Last */}
      <button
        disabled={currentPage === totalPages}
        className={`pagination-btn rounded-md px-4 py-2 text-sm font-semibold 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition 
          ${currentPage === totalPages ? "cursor-not-allowed opacity-40" : "hover:bg-indigo-100"}`}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Go to next page"
      >
        {nextPageText}
      </button>
      <button
        disabled={currentPage === totalPages}
        className={`pagination-btn rounded-md px-4 py-2 text-sm font-semibold 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition 
          ${currentPage === totalPages ? "cursor-not-allowed opacity-40" : "hover:bg-indigo-100"}`}
        onClick={() => onPageChange(totalPages)}
        aria-label="Go to last page"
      >
        {lastPageText}
      </button>
    </nav>
  );
}

export default Pagination;
