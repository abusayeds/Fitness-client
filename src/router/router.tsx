import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProductManagement from "../pages/ProductManagement";
import AboutPage from "../pages/AboutPage";
import Homepage from "../pages/Homepage";

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
        
    ]
    
},

])

export default router