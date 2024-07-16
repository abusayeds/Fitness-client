/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavLink } from "react-router-dom";
import { addToCart } from "../redux/features/cartPage/cartpageSlice";
import { useSingleproductQuery } from "../redux/features/productDetailsPage/productdetailspageApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const ProductDetailsPage = () => {
  const id = useAppSelector((state) => state.singleProduct.singleProduct);
  const cartItem = useAppSelector((state) =>
    state.cartProduct.items.find(item => item._id === id)
  );
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useSingleproductQuery(id);
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Error loading product details</p>;
  }
 
  const { name, price, category, description, quantity, stock, images } = data.data;
  

  const isOutOfStock = cartItem ? cartItem.quantity >= stock : false;
  return (
    <div className=" md:grid grid-cols-2 gap-5 mt-40">
      <div className="flex justify-center items-center h-96">
        <img className="h-full" src={images} alt="" />
      </div>
      <div className="p-3">
        <p className="mt-4 text-center font-semibold text-slate-700">
          {category}
        </p>
        <p className="mt-4 text-3xl">{name}</p>
        <p className="text-teal-600 mt-4">
          stock: <small className="text-red-600">Available ( {stock} )</small>
        </p>

        <p className="mt-4 ">Quantity : {quantity}</p>
        <p className="mt-4 font-semibold text-slate-600"> $ {price}</p>
        <p className="mt-4">
          Starting at $264/mo or 0% APR with Affirm. See if you qualify
        </p>

        <p className="mt-5 font-semibold text-lg">Description</p>
        <p className="mt-4">{description}</p>
        <NavLink to= '/cart-page'>
        <button
          onClick={() => dispatch(addToCart(data?.data))}
          disabled={isOutOfStock}
         className={`bg-red-500 w-full mt-5 p-1 rounded-md text-white hover:font-bold ${ isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
        >
          { isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
