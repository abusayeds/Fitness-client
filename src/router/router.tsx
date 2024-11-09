import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProductManagement from "../components/admin/ProductManagement";
import AboutPage from "../pages/AboutPage";
import Homepage from "../pages/Homepage";
import SuccessPage from "../pages/SuccessPage";
import Login from "../components/authanticationPages/Login";
import Signup from "../components/authanticationPages/Signup";
import Dashboard from "../components/admin/Dashboard";
import CreateProducts from "../components/admin/CreateProducts";
import ProductList from "../components/admin/ProductList";
import EditProduct from "../components/admin/EditProduct";
import CategoryList from "../components/admin/CategoryList";
import UserList from "../components/admin/UserList";
import OrderList from "../components/admin/OrderList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/product-page",
        element: <ProductsPage></ProductsPage>,
      },
      {
        path: "/product-details",
        element: <ProductDetailsPage></ProductDetailsPage>,
      },
      {
        path: "/cart-page",
        element: <CartPage></CartPage>,
      },
      {
        path: "/checkout-page",
        element: <CheckoutPage></CheckoutPage>,
      },

      {
        path: "/about-page",
        element: <AboutPage></AboutPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProductManagement></ProductManagement>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/create-product",
        element: <CreateProducts></CreateProducts>,
      },
      {
        path: "/dashboard/edit-product",
        element: <EditProduct></EditProduct>,
      },
      {
        path: "/dashboard/product-list",
        element: <ProductList></ProductList>,
      },
      {
        path: "/dashboard/category-list",
        element: <CategoryList></CategoryList>,
      },
      {
        path: "/dashboard/customer-list",
        element: <UserList></UserList>,
      },
      {
        path: "/dashboard/order-list",
        element: <OrderList></OrderList>,
      },
    ],
  },
  {
    path: "success-page",
    element: <SuccessPage></SuccessPage>,
  },
]);

export default router;
