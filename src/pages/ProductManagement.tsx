/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { useDeleteProductMutation, useProductManagemebQuery } from "../redux/features/productManagementPage/productManagementApi";
import { useAppDispatch } from "../redux/hooks";
import { UpdateProductdefaultValue} from "../redux/features/productManagementPage/productManegementSlice";

const ProductManagement = () => {
  const { data: products } = useProductManagemebQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation()
   const dispatch = useAppDispatch()
   const handleDelete = (productId :string) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      deleteProduct(productId);
    }
  };
  return (
    <div className="md:px-20 mt-40 mb-20">
        <p className="p-5 w-auto font-bold hover:text-slate-700  ">
        <NavLink to= '/add-new-product' >Add new product</NavLink>
        </p>
      {products?.data?.map((product : any) => (
        <div
          key={product._id}
          className="md:flex items-center   justify-between px-5 gap-4 mb-2 rounded bg-slate-100 p-3 "
        >
          <div className="md:flex justify-between items-center text-start  w-full">
            <img className="h-12 w-12" src={product.images} alt="" />

            <p> {product.name}</p>

            <p> Price: {product.price}</p>
            <p> Category Name : {product.category}</p>
          </div>
          <div className="flex gap-5  items-center  ">
            <NavLink onClick={() => dispatch((UpdateProductdefaultValue(product._id)))} to='/update-product' className=" p-2 rounded hover:bg-blue-500 bg-blue-600">Update</NavLink>
            <button
              onClick={() => handleDelete(product._id)}
              className=" p-2 rounded  hover:bg-red-500 bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductManagement;
