/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ProductDetails.jsx

import { useLocation } from "react-router-dom";
import { useSingleproductQuery } from "../redux/features/productDetailsPage/productdetailspageApi";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { setCartOpen } from "../redux/features/cartPage/openCartSlice";
import { useAddCartProductMutation } from "../redux/features/cartPage/cartPageApi";
import RendomProduct from "./RendomProduct";
import { useState } from "react";

const ProductDetailsPage = () => {
  const location = useLocation();
  const { productId } = location.state || {};
  const { data: singleProduct } = useSingleproductQuery(productId);
  const [addToCartProduct] = useAddCartProductMutation();
  const [imagesIndex, setImageIndex] = useState(0);
  const dispatch = useAppDispatch();
  const handleAddToCart = async (id: string) => {
    const addToCart = {
      productId: id,
    };
    const res: any = await addToCartProduct(addToCart);
    if (res?.error) {
      toast.success(res?.error?.data?.message);
    }
    if (res?.data?.success) {
      toast.success("Product added successfully");
      dispatch(setCartOpen(true));
    }
  };
  const addwishList = () => {
    toast.message("Added wish list ❤️ ");
  };
  return (
    <div className="max-w-5xl flex flex-col gap-8 mx-auto p-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Product Image */}
        <div className="flex flex-col items-center justify-between  h-[300px]">
          <div className=" flex  justify-center items-center h-full w-full border">
            <img
              src={singleProduct?.data?.images[imagesIndex]}
              alt="Light Gray Top"
              className=" rounded-lg "
            />
          </div>
          <div className="flex mt-4 space-x-2">
            {singleProduct?.data?.images?.map((img: string, index: number) => (
              <ul
                onClick={() => setImageIndex(index)}
                key={index}
                className={`w-16 h-16 cursor-pointer ${
                  imagesIndex === index ? "border-2 border-designColor" : ""
                }`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full rounded-lg"
                />
              </ul>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{singleProduct?.data?.name}</h1>
          <p className="text-lg text-gray-400 line-through">$100.00</p>
          <p className="text-2xl font-bold">${singleProduct?.data?.price}.00</p>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => handleAddToCart(singleProduct?.data?._id)}
              className=" bg-designColor text-white px-4 py-2 rounded-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addwishList()}
              className="border px-4 py-2 rounded-lg"
            >
              Wishlist
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>Product Details:</strong>{" "}
              {singleProduct?.data?.description}
            </p>
            <p className="mt-4">
              <strong>Stock:</strong> Aviable
            </p>
          </div>
        </div>
      </div>
      <RendomProduct />
    </div>
  );
};

export default ProductDetailsPage;
