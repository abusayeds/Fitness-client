/* eslint-disable @typescript-eslint/no-explicit-any */

import Cart from "../ui/Cart";
import { useMyBookingQuery } from "../redux/features/cartPage/cartPageApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setCartOpen } from "../redux/features/cartPage/openCartSlice";
import { toast } from "sonner";

const CartPage = () => {
  const { data: myCart } = useMyBookingQuery(undefined);
  const items = myCart?.data;
  const totalItem = myCart?.data?.length;
  const discountTarget = 10;
  const percentage = Math.min((totalItem / discountTarget) * 100, 100);
  const dispatch = useAppDispatch();
  const totalPrice = items?.reduce(
    (acc: any, item: any) => acc + item?.price * item?.quantity,
    0
  );
  const navigate = useNavigate();
  let reviewTotal = totalPrice;
  if (percentage === 100) {
    reviewTotal = totalPrice - totalPrice * 0.1;
  }
  const reviewCart = {
    totalItem,
    totalPrice: reviewTotal,
  };
  const handleCheckOut = (reviewCart: any, cartLength: any) => {
    if (cartLength <= 0) {
      toast.message("Your cart is empty. please select item ");
    } else {
      navigate("/checkout-page", { state: { reviewCart } });
      dispatch(setCartOpen(false));
    }
  };
  return (
    <div className="pt-2">
      <div className="p-4 max-w-md mx-auto  bg-gray-10 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          Total item {myCart?.data.length}
        </h2>

        {/* Free Shipping Progress */}
        <div className="p-4 bg-white rounded-lg mb-4">
          {percentage === 100 ? (
            <p>
              Congratulations !
              <span className="font-bold text-1xl">
                {" "}
                You got a 10% discount!{" "}
              </span>
            </p>
          ) : (
            <p className="text-sm font-medium">
              Buy
              <span className="text-red-500 ml-1">
                {discountTarget - totalItem}
              </span>{" "}
              or more to get
              <span className="font-bold text-1xl"> 10% discount ! </span>
            </p>
          )}

          <div
            className=" bg-red-500 rounded-full h-3  text-end  text-white text-[10px] pr-1"
            style={{ width: `${percentage}%` }}
          >
            {Math.round(percentage)}%
          </div>
        </div>

        <div className="space-y-4 h-[250px]  overflow-scroll  ">
          {myCart?.data.length > 0 ? (
            <>
              {myCart?.data?.map((product: any, index: any) => (
                <Cart key={index} product={product} />
              ))}
            </>
          ) : (
            <>
              <div className="flex items-center justify-center h-52">
                <div>
                  <div className="flex items-center justify-center ">
                    <p className="text-4xl bg-teal-100 text-designColor rounded-full px-6 py-5">
                      <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon>
                    </p>
                  </div>
                  <div className="text-center md:w-5/6 m-auto">
                    <p className="text-2xl md:font-semibold">
                      Opps !!! Your cart is empty
                    </p>
                    <p>
                      No items added in your cart. Please add product to your
                      cart list.{" "}
                      <Link
                        onClick={() => dispatch(setCartOpen(false))}
                        to="/product-page"
                        className="text-designColor"
                      >
                        {" "}
                        Go Back
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Subtotal and Buttons */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Subtotal:</span>
            {percentage === 100 ? (
              <span className="text-lg font-bold">
                ${totalPrice - totalPrice * 0.1}{" "}
                <small className="line-through text-gray-500">
                  ${totalPrice}
                </small>
              </span>
            ) : (
              <span className="text-lg font-bold">${totalPrice}</span>
            )}
          </div>
          <div
            onClick={() => handleCheckOut(reviewCart, myCart?.data?.length)}
            className="flex space-x-4"
          >
            <button className="flex-1 py-2 bg-designColor text-white rounded-lg">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
