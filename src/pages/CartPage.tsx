/* eslint-disable @typescript-eslint/no-explicit-any */



import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from "../redux/features/cartPage/cartpageSlice";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cartProduct.items);

  const handleIncrement = (id: any) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: any) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id: any) => {
    if (
      window.confirm(
        "Are you sure you want to remove this product from the cart?"
      )
    ) {
      dispatch(removeProduct(id));
    }
  };

  const totalPrice = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (products.length > 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [products]);
  const isCheckoutDisabled = products.some((item) => item.stock === 0);

  return (
    <div className="mt-40 flex justify-center  ">
    
      <div>
        {products.map((item) => (
          <div
            key={item._id}
            className="md:flex justify-between border px-20 rounded   gap-5 mt-5 "
          >
            <div>
              <img className="h-52" src={item.images} alt="" />
            </div>
            <div className="mt-5 w-80">
              <p className=" font-semibold text-slate-700"> {item.name}</p>
              <p className="mt-5">$ {item.price}</p>
              <p className="mt-5">Stock: {item.stock}</p>

              <div className="flex gap-6 mt-5">
                <div className="flex justify-between  w-24 px-2  border ">
                  <button
                    onClick={() => handleIncrement(item._id)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => handleDecrement(item._id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                </div>
                <small
                  className=" hover:font-semibold"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                  <hr className=" font-bold text-black" />
                </small>
              </div>
            </div>
          </div>
        ))}

        {
            products.length ? <div className="flex justify-between items-center mt-5">
            <div  className="flex items-center gap-5">
            <p className=" text-xl font-semibold text-slate-700">Total Price: </p>
            <p>{totalPrice.toFixed(2)} $</p>
            </div>
  
            <button
            className=" bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => console.log("Proceeding to checkout")}
              disabled={isCheckoutDisabled}
            >
              <NavLink to="/checkout-page"> Proceed to Checkout</NavLink>
            </button>
          </div>
          :   <div className="flex items-center justify-center h-52">
                 
          <div>
              <div className="flex items-center justify-center ">
               <p className="text-4xl bg-blue-200 text-blue-500 rounded-full px-6 py-5"><FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon></p>    
              </div>
              <div className="text-center md:w-5/6 m-auto">
              <p className="text-2xl md:font-semibold">Opps !!! Your cart is empty</p>    
             <p>No items added in your cart. Please add product to your cart list. <Link to='/' className="text-blue-500"> Back to Home</Link></p> 
               </div>   
          </div>

       </div>
        }
      </div>
    </div>
  );
};

export default CartPage;
