/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { categoryName } from "../../utils/headerPathsAndName";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoCartOutline } from "react-icons/io5";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { CiUser } from "react-icons/ci";
import { FaAngleDown, FaAngleUp, FaArrowRight } from "react-icons/fa6";

import CartPage from "../../pages/CartPage";
import { useCategoryProductQuery } from "../../redux/features/home/productApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFilter } from "../../redux/features/productPage/producFilterSlice";
import { logOut } from "../../redux/features/authantication/authanticationSlice";
import { setCartOpen } from "../../redux/features/cartPage/openCartSlice";
import { useMyBookingQuery } from "../../redux/features/cartPage/cartPageApi";
const MainLayout = () => {
  const { data: bookinglength } = useMyBookingQuery(undefined);
  const [hoveredItem, setHoveredItem] = useState<string | false>(false);
  const [smallDeviceCategoryOpen, setsmallDeviceCategoryOpen] = useState(false);
  const { data: categoryData } = useCategoryProductQuery(hoveredItem || "", {
    skip: !hoveredItem,
  });
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.UserDetails);
  console.log();

  const { cartOpen } = useAppSelector((state) => state.openCart);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logOut());

    navigate("/login");
  };
  return (
    <header
      className={`fixed z-50 top-0  w-full md:px-4 py-1 transition-colors duration-500  ease-linear ${
        scrolling
          ? "bg-designColor text-white "
          : "bg-white border-b border-black text-black"
      } `}
    >
      <main className="flex justify-between p-5 ">
        <div onClick={() => setOpen(!open)} className=" md:hidden ">
          {open ? (
            <FontAwesomeIcon
              className="font-semibold  text-2xl"
              icon={faX}
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              className="font-semibold  text-2xl"
              icon={faBars}
            ></FontAwesomeIcon>
          )}
        </div>
        <div className="flex gap-3 ">
          <p className=" font-semibold">Fitness zone</p>
          <img
            className="w-6 h-6 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkooLRLnw6KYliBKMSdCBPO1yyLH-ELhCTuw&s"
            alt=""
          />
        </div>
        <div className="md:flex hidden gap-x-4 items-center">
          {categoryName.map((category) => (
            <div
              key={category.category}
              className="relative"
              onMouseEnter={() => setHoveredItem(category.category)}
              onMouseLeave={() => setHoveredItem(false)}
            >
              <ul className="md:flex gap-1 hidden items-center text-sm font-titlefont cursor-pointer">
                <span className="text-sm font-bodyfont">
                  {category.category}
                </span>
                {hoveredItem === category.category ? (
                  <FaAngleUp className="text-lg transition-all duration-700" />
                ) : (
                  <FaAngleDown className="text-lg transition-all duration-700" />
                )}
              </ul>

              {hoveredItem === category?.category && (
                <div
                  className={`absolute top-full left-0 w-48 py-2 shadow-md rounded-md ${
                    scrolling
                      ? "bg-designColor text-white"
                      : "bg-white border-b border-black text-black"
                  } `}
                  onMouseEnter={() => setHoveredItem(category?.category)}
                  onMouseLeave={() => setHoveredItem(false)}
                >
                  <div className="flex mt-3 gap-10 justify-around ">
                    {categoryData?.data?.map((category: any, index: number) => (
                      <div key={index} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                          {Array.from({ length: 15 }, (_, i) => (
                            <NavLink
                              key={i}
                              to="/product-page"
                              onClick={() => {
                                dispatch(
                                  setFilter({
                                    name: "category",
                                    value: category[`category${i + 1}`],
                                  })
                                );
                                dispatch(
                                  setFilter({ name: "page", value: "1" })
                                );
                              }}
                              className=" duration-500 hover:underline"
                              state={{
                                category: category[`category${i + 1}`],
                                categorise: category,
                              }}
                            >
                              <p>{category[`category${i + 1}`]}</p>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className=" flex items-center md:space-x-5 space-x-2">
          <ul>
            {user?.user?.role === "admin" && (
              <Link to="/dashboard" className=" flex items-center gap-1">
                <span className=" md:block hidden font-bodyfont">Admin</span>
              </Link>
            )}
          </ul>
          <ul
            onClick={() => dispatch(setCartOpen(!cartOpen))}
            className=" flex items-center text-sm font-titlefont relative "
          >
            <small className=" absolute bottom-3 text-lg right-0">
              {bookinglength?.data?.length}
            </small>
            <IoCartOutline className=" text-2xl" />
          </ul>
          <ul className=" flex items-center text-sm font-titlefont">
            {!user && (
              <Link to="/login" className=" flex items-center gap-1">
                <span className=" md:block hidden font-bodyfont">Login</span>
                <CiUser className=" text-2xl" />
              </Link>
            )}
            {user && (
              <button
                className=" hover:bg-gray-300 p-1 duration-500 w-full "
                onClick={() => handleLogout()}
              >
                logout
              </button>
            )}
          </ul>
          <ul className=" md:flex hidden items-center text-sm font-titlefont ">
            <span className="font-bodyfont">Help</span>
            <FaAngleDown className=" text-lg" />
          </ul>
        </div>
      </main>
      {/* small devise */}
      <div
        className={`md:hidden bg-black absolute  h-screen w-screen overflow-auto text-amber-300  z-50 duration-500 flex flex-col items-center ${
          open ? "top-0" : "top-[-1000px]"
        }`}
      >
        <div className="w-full mt-10 px-4 md:px-6 lg:px-8">
          {categoryName.map((category) => (
            <div
              key={category.category}
              className="relative w-full border-b pb-2 pt-4"
              onClick={() => {
                setHoveredItem(category?.category);
                setsmallDeviceCategoryOpen(!smallDeviceCategoryOpen);
              }}
            >
              <ul className="w-full text-sm font-titlefont cursor-pointer">
                <div className="flex w-full justify-between">
                  <p className="text-sm font-bodyfont text-center">
                    {category?.category}
                  </p>
                  {hoveredItem === category.category &&
                  smallDeviceCategoryOpen ? (
                    <FaAngleUp className="text-lg transition-transform duration-700" />
                  ) : (
                    <FaAngleDown className="text-lg transition-transform duration-700" />
                  )}
                </div>
                {hoveredItem === category?.category &&
                  smallDeviceCategoryOpen && (
                    <div
                      className={`shadow-md rounded-md pl-4 text-white transition-all duration-00 ease-in-out`} // Adjusted duration here
                    >
                      <div className="flex flex-col mt-3 gap-4">
                        {categoryData?.data?.map(
                          (category: any, index: number) => (
                            <div key={index} className="flex flex-col gap-2">
                              {Array.from({ length: 10 }, (_, i) => (
                                <NavLink
                                  key={i}
                                  to="/product-page"
                                  onClick={() => {
                                    dispatch(
                                      setFilter({
                                        name: "category",
                                        value: category[`category${i + 1}`],
                                      })
                                    );
                                    dispatch(
                                      setFilter({ name: "page", value: "1" })
                                    );
                                    setOpen(false);
                                  }}
                                  className=" duration-500 hover:underline"
                                  state={{
                                    category: category[`category${i + 1}`],
                                    categorise: category,
                                  }}
                                >
                                  <p>{category[`category${i + 1}`]}</p>
                                </NavLink>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </ul>
            </div>
          ))}
        </div>
        <p
          onClick={() => setOpen(!open)}
          className="text-red-400 hover:text-red-500 text-3xl font-semibold absolute top-0 right-3 cursor-pointer"
        >
          x
        </p>
      </div>

      <div
        className={`fixed top-0 bg-slate-100 text-black h-screen transition-all duration-500 ease-in-out md:w-96
            ${cartOpen ? "right-0" : "-right-full"} 
            w-full `}
      >
        <button
          onClick={() => dispatch(setCartOpen(!cartOpen))}
          className=" px-4 mt-6 font-bold text-red-600  float-end"
        >
          <FaArrowRight className="  font-bold text-2xl" />
        </button>
        <CartPage />
      </div>

      <div>
        {categoryData?.data?.map((category: any, index: number) => (
          <div key={index}>
            <div>
              <p className="font-bodyfont font-semibold  hover:text-red-500 duration-500">
                {category?.subCategory}
              </p>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default MainLayout;
