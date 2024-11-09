/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, NavLink, useLocation } from "react-router-dom";
import { IoCartOutline, IoCloseOutline } from "react-icons/io5";
import {
  useProductLengthQuery,
  useProductPageQuery,
} from "../redux/features/productPage/productPageApi";
import { IoIosMenu } from "react-icons/io";
import { useEffect, useState } from "react";
import { TProduct } from "../types";
import { categoryName } from "../utils/headerPathsAndName";
import { useCategoryProductQuery } from "../redux/features/home/productApi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import ProductPagenete from "../ui/ProductPagenete";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setFilter } from "../redux/features/productPage/producFilterSlice";
import { FaSearch } from "react-icons/fa";
import { useAddCartProductMutation } from "../redux/features/cartPage/cartPageApi";
import { toast } from "sonner";
import { setCartOpen } from "../redux/features/cartPage/openCartSlice";

const ProductsPage = () => {
  const { data: productsLength } = useProductLengthQuery(undefined);
  const { productfilter } = useAppSelector((state) => state.productfilter);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const args = {
    productfilter: productfilter,
    searchValue: debouncedValue,
  };
  const { data: products } = useProductPageQuery(args);
  const location = useLocation();
  const { category, categorise } = location.state || {};
  const [categoryItem, setCategoryItem] = useState<string | false>(false);
  const [allCategoryOpen, setAllCategoryOpen] = useState(false);
  const { data: categoryData } = useCategoryProductQuery(categoryItem || "", {
    skip: !categoryItem,
  });
  const [addToCartProduct] = useAddCartProductMutation();
  const existingItem = productfilter.find((item) => item.name === "category");
  const selectedCategory = existingItem?.value;

  const [mainImages, setMainImages] = useState<string[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    dispatch(setFilter({ name: "category", value: category }));
    dispatch(setFilter({ name: "page", value: "1" }));
  };
  const handleImageClick = (image: string, index: number) => {
    setMainImages((prevMainImages) => {
      const updatedImages = [...prevMainImages];
      updatedImages[index] = image;
      return updatedImages;
    });
  };
  const handleAddToCart = async (id: string) => {
    const addToCart = {
      productId: id,
    };
    const res: any = await addToCartProduct(addToCart);

    if (res?.error) {
      toast.success(res?.error?.data?.message);
    }

    if (res?.data?.success) {
      toast.success("Product added successfully");
      dispatch(setCartOpen(true));
    }
  };
  useEffect(() => {
    return () => {
      localStorage.removeItem("productFilter");
    };
  }, [location]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  return (
    <section className="md:flex my-20">
      <div className="bg-gray-50 fixed z-50 top-20 border md:w-1/6 sm:w-2/6 lg:w-1/6  w-full px-5 py-2 flex justify-between">
        <Link to="/">Home</Link>
        <ul
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          {category === "" ? (
            <p>All category</p>
          ) : (
            <p>{categorise?.mainCategory}</p>
          )}
          {categoryOpen ? <IoCloseOutline /> : <IoIosMenu />}
        </ul>
      </div>

      <section
        className={`fixed top-20 left-0 mx-auto flex flex-col  gap-2 h-screen overflow-y-auto transition-transform duration-700 ease-in-out z-50 md:z-0 bg-slate-50 mt-10 px-5 ${
          categoryOpen
            ? "md:w-1/6  w-screen   translate-x-0"
            : "w-0 -translate-x-full"
        } scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
      >
        {categorise &&
          Array.from({ length: 15 }, (_, i) => {
            const currentCategory = categorise[`category${i + 1}`];
            return (
              <p
                key={i}
                className={`hover:text-designColor duration-500 hover:underline ${
                  currentCategory === selectedCategory ? "text-designColor" : ""
                }`}
                onClick={() => handleCategoryClick(currentCategory)}
              >
                {currentCategory}
              </p>
            );
          })}
        {category === "" && (
          <div className="w-full">
            {categoryName.map((category) => (
              <div
                key={category.category}
                className="relative w-full border-b pb-2 pt-4"
              >
                <ul className="w-full text-sm font-titlefont cursor-pointer">
                  <div
                    onClick={() => {
                      setCategoryItem(category?.category);
                      setAllCategoryOpen(!allCategoryOpen);
                    }}
                    className="flex w-full justify-between"
                  >
                    <p className="text-sm font-bodyfont text-center">
                      {category?.category}
                    </p>
                    {categoryItem === category.category && allCategoryOpen ? (
                      <FaAngleUp className="text-lg transition-transform duration-700" />
                    ) : (
                      <FaAngleDown className="text-lg transition-transform duration-700" />
                    )}
                  </div>
                  {categoryItem === category?.category && allCategoryOpen && (
                    <div
                      className={`shadow-md rounded-md pl-4 transition-all duration-00 ease-in-out`}
                    >
                      <div className="flex flex-col mt-3 gap-4">
                        {categoryData?.data?.map(
                          (category: any, index: number) => (
                            <div key={index} className="flex flex-col gap-2">
                              {Array.from({ length: 10 }, (_, i) => (
                                <p
                                  className={`hover:text-designColor duration-500 hover:underline ${
                                    category[`category${i + 1}`] ===
                                    selectedCategory
                                      ? "text-designColor"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleCategoryClick(
                                      category[`category${i + 1}`]
                                    )
                                  }
                                >
                                  {category[`category${i + 1}`]}
                                </p>
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
        )}
      </section>

      <section
        className={`transition-all duration-700 ease-in-out md:mt-12 mt-40 flex flex-col md:gap-10 gap-10 ${
          categoryOpen ? " md:w-5/6" : "md:w-full"
        } ml-auto md:px-20 px-4`}
      >
        <div className="flex items-center border md:w-1/2 mx-auto w-full relative  border-gray-300 rounded-full ">
          <input
            type="text"
            placeholder="Type here"
            onChange={(e: any) => setSearchValue(e.target.value)}
            className="outline-none px-4 py-2 bg-transparent text-gray-500 placeholder-gray-400 rounded-l-full w-full"
          />
          <FaSearch className=" text-lg mr-4 text-gray-600"></FaSearch>
        </div>
        <div className=" md:flex sm:flex md:justify-between items-center ">
          <div className=" flex flex-col gap-4">
            {category === "" ? (
              <p className=" text-center font-bodyfont md:text-4xl ">
                All Products/{selectedCategory}
              </p>
            ) : (
              <p className=" text-center font-bodyfont md:text-4xl ">
                {categorise?.mainCategory}/{selectedCategory}
              </p>
            )}
            {selectedCategory ? (
              <p className=" uppercase font-bodyfont ">
                TOTal ITems {products?.data?.length}{" "}
              </p>
            ) : (
              <p className=" uppercase font-bodyfont ">
                Total Items {productsLength?.data?.length}
              </p>
            )}
            <p className="  uppercase"> </p>
          </div>

          <div className=" border md:px-3 py-2">
            <select
              className=" outline-none"
              onClick={(e: any) =>
                dispatch(
                  setFilter({
                    name: "sort",
                    value: e.target.value,
                  })
                )
              }
              name="features"
            >
              <option value="price">Price Low to High</option>
              <option value="-price">Price High to low</option>
            </select>
          </div>
        </div>

        <div
          className={`grid  mx-auto justify-center items-center  sm:grid-cols-2  ${
            categoryOpen
              ? "md:grid-cols-3 lg:grid-cols-3"
              : "md:grid-cols-3 lg:grid-cols-4 "
          }    gap-5  `}
        >
          {products?.data?.map((item: TProduct, index: number) => (
            <div
              className="group w-full h-full border border-gray-300 rounded-sm relative "
              key={item._id}
            >
              <div className="flex justify-center items-center">
                <img
                  className="object-cover bg-white h-32"
                  src={mainImages[index] || item.images[0]}
                  alt={item.name}
                />
              </div>
              <div className=" grid grid-cols-4  ">
                {item?.images
                  ?.slice(0, 4)
                  ?.map((image: string, thumbIndex: number) => (
                    <img
                      key={thumbIndex}
                      className={`object-cover bg-white h-12 w-12 cursor-pointer border-2 ${
                        mainImages[index] === image
                          ? "border-blue-500"
                          : "border-transparent"
                      } hover:border-blue-500`}
                      src={image}
                      alt={`Thumbnail ${thumbIndex + 1}`}
                      onClick={() => handleImageClick(image, index)}
                    />
                  ))}
              </div>
              <div className="p-2 md:p-3">
                <p className="text-slate-700 font-titlefont text-sm my-2">
                  {item.name}
                </p>
                <small className="text-xxl">
                  Starting at $178/mo or 0% APR with affirm. See if you qualify
                </small>
                <br />
                <small className="text-yellow-700">** / </small>
                <span className="text-teal-600">
                  stock: <small className="text-red-600">Available</small>
                </span>
                <p>${item.price}</p>
              </div>
              <button
                onClick={() => handleAddToCart(item?._id)}
                className="  absolute top-1 right-1 bg-gray-200 hover:bg-slate-300 duration-700 p-2 text-3xl  rounded-full"
              >
                <IoCartOutline />
              </button>
              <p className="opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-700 absolute bg-teal-500 bottom-0 w-full p-1 text-white text-center hover:font-bold hover:bg-teal-700">
                <NavLink to="/product-details" state={{ productId: item._id }}>
                  view details
                </NavLink>
              </p>
            </div>
          ))}
        </div>
        {!selectedCategory && (
          <ProductPagenete totalItems={productsLength?.data?.length} />
        )}
      </section>
    </section>
  );
};

export default ProductsPage;
