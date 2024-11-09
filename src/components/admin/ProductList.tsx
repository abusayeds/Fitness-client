/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ProductList.tsx
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useProductLengthQuery } from "../../redux/features/productPage/productPageApi";
import { TProduct } from "../../types";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDeleteProductMutation } from "../../redux/features/productManagementPage/productManagementApi";
import { toast } from "sonner";

const ProductList = () => {
  const { data: allProduct } = useProductLengthQuery(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const pageRangeSize = 4;

  const totalProducts = allProduct?.data.length || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = allProduct?.data.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const startPage = Math.max(1, currentPage - Math.floor(pageRangeSize / 2));
  const endPage = Math.min(totalPages, startPage + pageRangeSize - 1);
  const pageRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteOpen, setDeleteOpen] = useState("");
  const handleDeleteProduct = async (id: string) => {
    const res: any = await deleteProduct(id);
    if (res?.data?.success) {
      toast.message("product deleted");
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 font-titlefont">
      <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-600 font-semibold">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Edit</th>
              <th className="py-2 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts?.map((product: TProduct, index: any) => (
              <tr key={index} className="text-gray-700 border-b">
                <td className="py-2 px-4 flex items-center gap-2">
                  <img className="w-12 h-12" src={product?.images[0]} alt="" />
                  <span className="text-sm text-gray-500">{product.name}</span>
                </td>
                <td className="py-2 px-4">
                  <span className="block font-semibold">
                    {product.category}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <span className="block font-semibold">{product.stock}</span>
                </td>
                <td className="py-2 px-4 ">
                  <Link
                    to={"/dashboard/edit-product"}
                    state={{ productId: product._id }}
                  >
                    <FaEdit className=" text-designColor ml-2" />
                  </Link>
                </td>
                <td className="py-2 px-4 w-24">
                  {deleteOpen === product._id ? (
                    <div className=" flex gap-4">
                      <button
                        onClick={() => handleDeleteProduct(product?._id)}
                        className=" text-white p-1 rounded text-sm bg-red-600"
                      >
                        Yes
                      </button>
                      <p>or</p>
                      <button
                        onClick={() => setDeleteOpen("")}
                        className="  p-1  text-white text-sm rounded bg-designColor"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <MdDelete
                      onClick={() => setDeleteOpen(product._id)}
                      className="   text-red-600 text-2xl ml-4"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      =
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-l-lg"
        >
          Prev
        </button>

        {pageRange.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-r-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
