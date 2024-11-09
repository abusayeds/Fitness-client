/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaList,
  FaUsers,
  FaStore,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

const Sidebar = () => {
  // States to handle sidebar and dropdown visibility
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProductOpen, setProductOpen] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isCustomerOpen, setCustomerOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);

  // Function to handle toggling
  const toggleDropdown = (setter: any) => {
    setter((prevState: any) => !prevState);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className=" font-titlefont ">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 text-white flex justify-between bg-gray-800 w-full items-center "
      >
        <Link
          to="/dashboard"
          className="text-lg font-semibold flex items-center md:gap-4 gap-1 hover:text-gray-400 transition duration-300"
        >
          <FaTachometerAlt /> Dashboard
        </Link>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:inset-auto md:h-full`}
      >
        <ul className=" flex justify-between">
          <Link
            to="/dashboard"
            className="text-lg font-semibold flex items-center md:gap-2 gap-1 hover:text-gray-400 transition duration-300"
          >
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link
            to="/"
            className="text-lg font-semibold flex items-center md:gap-2 gap-1 hover:text-gray-400 transition duration-300"
          >
            <FaHome /> Home
          </Link>
        </ul>

        {/* Menu items with dropdowns */}
        <ul className="flex flex-col md:space-y-4 mt-4">
          {/* Products Dropdown */}
          <li>
            <button
              onClick={() => toggleDropdown(setProductOpen)}
              className="flex items-center justify-between md:gap-4 gap-1 w-full text-left hover:text-gray-400 transition duration-300"
            >
              <div className="flex items-center gap-1">
                <FaBox /> Products
              </div>
              {isProductOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isProductOpen && (
              <ul className="ml-6 mt-2 space-y-2 transition duration-300">
                <li>
                  <Link
                    to="/dashboard/create-product"
                    className="block hover:text-gray-400 transition duration-300"
                  >
                    Create Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/product-list"
                    className="block hover:text-gray-400 transition duration-300"
                  >
                    Product List
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Categories Dropdown */}
          <li>
            <button
              onClick={() => toggleDropdown(setCategoryOpen)}
              className="flex items-center justify-between md:gap-4 gap-1 w-full text-left hover:text-gray-400 transition duration-300"
            >
              <div className="flex items-center gap-1">
                <FaList /> Categories
              </div>
              {isCategoryOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isCategoryOpen && (
              <ul className="ml-6 mt-2 space-y-2 transition duration-300">
                <li>
                  <Link
                    to="/dashboard/category-list"
                    className="block hover:text-gray-400 transition duration-300"
                  >
                    Category List
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Customers Dropdown */}
          <li>
            <button
              onClick={() => toggleDropdown(setCustomerOpen)}
              className="flex items-center justify-between md:gap-4 gap-1 w-full text-left hover:text-gray-400 transition duration-300"
            >
              <div className="flex items-center gap-1">
                <FaUsers /> Customers
              </div>
              {isCustomerOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isCustomerOpen && (
              <ul className="ml-6 mt-2 space-y-2 transition duration-300">
                <li>
                  <Link
                    to="/dashboard/customer-list"
                    className="block hover:text-gray-400 transition duration-300"
                  >
                    Customer List
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Orders Dropdown */}
          <li>
            <button
              onClick={() => toggleDropdown(setOrderOpen)}
              className="flex items-center justify-between md:gap-4 gap-1 w-full text-left hover:text-gray-400 transition duration-300"
            >
              <div className="flex items-center gap-1">
                <FaStore /> Orders
              </div>
              {isOrderOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isOrderOpen && (
              <ul className="ml-6 mt-2 space-y-2 transition duration-300">
                <li>
                  <Link
                    to="/dashboard/order-list"
                    className="block hover:text-gray-400 transition duration-300"
                  >
                    Order List
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
