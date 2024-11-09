/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NavLink } from "react-router-dom";
// import {
//   useDeleteProductMutation,
//   useProductManagemetQuery,
// } from "../../redux/features/productManagementPage/productManagementApi";
// import { useAppDispatch } from "../../redux/hooks";
// import { UpdateProductdefaultValue } from "../../redux/features/productManagementPage/productManegementSlice";

import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const ProductManagement = () => {
  return (
    <div>
      <div className="h-screen md:flex font-titlefont">
        <Sidebar />
        <div className="flex-1 bg-gray-100">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
