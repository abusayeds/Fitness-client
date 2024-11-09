import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppDispatch } from "../redux/hooks";
import { setFilter } from "../redux/features/productPage/producFilterSlice";

type ProductPaginateProps = {
  totalItems: number;
};

const ProductPaginate = ({ totalItems }: ProductPaginateProps) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / 10);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      dispatch(
        setFilter({
          name: "page",
          value: page,
        })
      );
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-black text-white"
              : "bg-white text-black border"
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="px-3">
          {page}
        </span>
      )
    );
  };

  const handleGoToPage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetPage = Number(
      (event.currentTarget.elements.namedItem("goToPage") as HTMLInputElement)
        .value
    );
    if (targetPage) handlePageChange(targetPage);
  };

  // Calculate the start and end item numbers for the current page
  const itemsPerPage = 10;
  const itemsStart = (currentPage - 1) * itemsPerPage + 1;
  const itemsEnd = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-6 space-x-2">
      <div className="flex flex-wrap gap-4 items-center justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-white text-black disabled:text-gray-400 disabled:border-gray-300"
        >
          <FaChevronLeft className="inline" /> Back
        </button>

        {/* Page numbers */}
        <div className="flex flex-wrap gap-2 sm:flex-row">
          {renderPageNumbers()}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-white text-black disabled:text-gray-400 disabled:border-gray-300"
        >
          Next <FaChevronRight className="inline" />
        </button>
      </div>

      {/* Go to page input */}
      <form
        onSubmit={handleGoToPage}
        className="flex flex-wrap items-center justify-center mt-4 gap-2 sm:gap-4"
      >
        <span>Page</span>
        <input
          type="number"
          name="goToPage"
          className="ml-2 px-2 py-1 border rounded w-16 text-center"
          defaultValue={currentPage}
          min="1"
          max={totalPages}
        />
        <button
          type="submit"
          className="ml-2 px-3 py-1 border rounded bg-white text-black"
        >
          Go
        </button>
        <div className="ml-4">
          <p className="text-xs">
            ({itemsStart}-{itemsEnd} of {totalItems})
          </p>
        </div>
      </form>
    </div>
  );
};

export default ProductPaginate;
