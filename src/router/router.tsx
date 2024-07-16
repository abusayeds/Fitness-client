import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProductManagement from "../pages/ProductManagement";
import AboutPage from "../pages/AboutPage";
import Homepage from "../pages/Homepage";
import SuccessPage from "../pages/SuccessPage";
import UpdateProducts from "../redux/features/productManagementPage/UpdateProducts";
import AddNewProduct from "../redux/features/productManagementPage/AddNewProduct";

const router = createBrowserRouter([
{
    path: '/',
    element : <App></App>,
    children : [
        {  
            path: '/',
            element : <Homepage></Homepage>
        },
        {  
            path: '/product-page',
            element : <ProductsPage></ProductsPage>
        },
        {
            path: '/product-details',
            element : <ProductDetailsPage></ProductDetailsPage>
        },
        {
            path: '/cart-page',
            element : <CartPage></CartPage>
        },
        {
            path: '/checkout-page',
            element : <CheckoutPage></CheckoutPage>
        },
        {
            path: '/product-management',
            element : <ProductManagement></ProductManagement>
        },
        {
            path: '/about-page',
            element : <AboutPage></AboutPage>
        },
      
        {
            path: '/update-product',
            element : <UpdateProducts></UpdateProducts>
        },
        {
            path: '/add-new-product',
            element : <AddNewProduct></AddNewProduct>
        },
        
    ]
    
},
{
    path : 'success-page',
    element : <SuccessPage></SuccessPage>
}

])

export default router