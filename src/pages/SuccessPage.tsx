// SuccessPage.tsx
import React from "react";
import { useAppSelector } from "../redux/hooks";
import { NavLink } from "react-router-dom";

const SuccessPage = () => {
  const {userData} = useAppSelector((state) => state.cartUserDetails);
  console.log(userData);
  
  const products = useAppSelector((state) => state.cartProduct.items);
  const totalPrice = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-lg mb-2">Thank you for your order, {userData.name}!</p>
        <p className="text-lg mb-2">We have received your order for {products.length} items.</p>
        <p className="text-lg mb-2">Total Price: ${totalPrice.toFixed(2)}</p>
         <NavLink to= '/'>Back to home page</NavLink>
      </div>
    </div>
  );
};

export default SuccessPage;
