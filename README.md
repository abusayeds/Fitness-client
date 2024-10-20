**Live link** https://fitness-client-theta.vercel.app/

**Project Overview**
This project is an e-commerce website that allows users to explore various products, view detailed product information, manage their cart, and proceed to checkout using different payment methods. It also includes product management functionality for admins. The site has been designed with a focus on user experience, responsiveness, and ease of use.


**Homepage**
The homepage is the main entry point with a visually engaging Hero Section that draws users' attention.
The Categories Section showcases various product categories. Clicking on a category redirects users to the Products page, with the selected category automatically applied as a filter.
The Featured Products Section highlights a few selected products, and a "View More" button directs users to the Products page for more exploration.
The Footer includes contact information and links to social media, ensuring users can easily connect with the company.

**Products Page**
Displays all products with search and filter functionalities to refine the product listings.
Category Filters allow users to select multiple categories, displaying products that match any of the selected categories.
Price Filtering and Sorting Options (ascending/descending by price) provide additional ways to customize the product listings.
A "Clear Filter" button resets all applied filters.

**Product Details Page**
Shows detailed information about a product, including the name, price, stock status, description, images, and its category.
The Add to Cart button increases the product quantity in the cart. Duplicate products are not allowed in the cart; instead, the quantity is updated. When the stock limit is reached, the Add to Cart button is disabled.

**Cart Page**
Lists all cart items, each with controls to increase/decrease quantities, subject to stock limits.
Remove Product functionality with confirmation before deleting an item.
Dynamic Pricing updates as quantities change, ensuring users can track their total cost.
The Proceed to Checkout button becomes active when products are in stock and redirects users to the checkout page.

**Checkout Page**
Collects user details (name, email, phone, address) and provides two payment options: Cash on Delivery or Stripe.
On successful payment (or order placement in the case of Cash on Delivery), users are redirected to a success page, and product stock is adjusted accordingly.

**Product Management**
Admins can view a Product List table displaying product details with action buttons for updating and deleting products.
The Update Product form is prefilled with the existing product information for editing, while the Delete Product button confirms before removal.
A Create New Product form allows admins to add new products with fields for name, price, description, images, category, and stock.
Changes are reflected in real-time on the UI with optimistic updates for a smooth user experience.



