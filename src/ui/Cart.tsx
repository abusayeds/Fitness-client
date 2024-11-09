/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import {
  useDeleteCartProductMutation,
  useUpdateQuantityMutation,
} from "../redux/features/cartPage/cartPageApi";
import { useState } from "react";

const Cart = ({ product }: { product: any }) => {
  const [updateQuantity] = useUpdateQuantityMutation();
  const [deleteState, setDeleteState] = useState(false);
  const [deleteCartProduct] = useDeleteCartProductMutation();
  const [loading, setLoading] = useState(false);

  const incressQuantity = async (value: number) => {
    if (loading) return;
    setLoading(true);

    const args = {
      id: product?._id,
      quantity: value,
    };

    setTimeout(async () => {
      await updateQuantity(args);
      setLoading(false);
    }, 500);
  };

  const decressQuantity = async (value: number) => {
    if (loading || product.quantity <= 1) return;
    setLoading(true);

    const args = {
      id: product?._id,
      quantity: value,
    };

    setTimeout(async () => {
      await updateQuantity(args);
      setLoading(false);
    }, 500);
  };
  const handleDeleteProduct = async (id: string) => {
    setTimeout(async () => {
      const res = await deleteCartProduct(id);
      if (res?.data?.success) {
        toast.message(" Producte deleted !  ");
        setDeleteState(false);
      }
    }, 500);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={product?.productId?.images[0]}
          alt="product- img"
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <p className="text-sm font-medium">Ombre Seamless Crop</p>
          <p className="text-gray-500">$ {product?.price}</p>
        </div>
      </div>
      {deleteState ? (
        <div className=" flex gap-4">
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className=" bg-red-600 px-1  rounded text-white text-center text-sm "
          >
            yes{" "}
          </button>
          <p>Or</p>
          <button
            onClick={() => setDeleteState(false)}
            className=" bg-designColor px-1  text-sm rounded text-white"
          >
            {" "}
            no{" "}
          </button>
        </div>
      ) : (
        <div className=" flex gap-3">
          {loading ? (
            <span className="ml-4 spinner-border  animate-spin inline-block w-4 h-4 border-2  border-designColor rounded-full"></span>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decressQuantity(-1)}
                className="px-2 py-1 bg-gray-200 rounded"
                disabled={loading || product.quantity <= 1}
              >
                -
              </button>
              <span>{product?.quantity}</span>
              <button
                onClick={() => incressQuantity(1)}
                className="px-2 py-1 bg-gray-200 rounded"
                disabled={loading}
              >
                +
              </button>
            </div>
          )}

          <button
            onClick={() => setDeleteState(true)}
            className="text-gray-500 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
