/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink } from "react-router-dom";
import { useCategoryProductQuery } from "../redux/features/home/productApi";
import { useAppDispatch } from "../redux/hooks";
import { category } from "../redux/features/home/productSlice";
import BenefitPage from "./BenefitPage";
import { useEffect, useState } from "react";
import { useProductLengthQuery } from "../redux/features/productPage/productPageApi";
import { TProduct } from "../types";
import HomeCategory from "../ui/HomeCategory";
import HomePageFreatures from "../ui/HomePageFreatures";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const { data: products, isLoading } = useCategoryProductQuery(undefined);
  const { data: allProduct } = useProductLengthQuery(undefined);
  const [randomProducts, setRandomProducts] = useState<TProduct[]>([]);
  const backgroundImageUrl =
    "https://i.ibb.co/cJkTHfM/home-gym-high-performance-hero.jpg";

  useEffect(() => {
    if (allProduct?.data?.length) {
      const shuffledProducts = [...allProduct.data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setRandomProducts(shuffledProducts);
    }
  }, [allProduct]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="mt-20 w-full">
      <div
        className="bg-cover bg-center h-[400px] flex flex-col  justify-center  items-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className=" bg-opacity-50 text-white text-center px-4 md:px-8 py-8 rounded-md">
          <h1 className="text-4xl md:text-6xl font-bodyfont font-bold mb-4">
            Welcome to Our Fitness Zone
          </h1>
          <p className="text-lg md:text-2xl    font-bodyfont mb-8">
            Achieve your fitness goals with personalized plans and expert
            guidance.
          </p>
          <button className=" bg-designColor hover:bg-designColor text-white font-bold py-2 px-4 rounded-full">
            Get Started
          </button>
        </div>
      </div>

      <div className="  ">
        <HomeCategory />
      </div>
      <div className="  grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4 w-full   justify-center items-center">
        {products?.data?.map((item: any) => (
          <NavLink
            onClick={() => dispatch(category(item.category))}
            to="/product-page"
            key={item._id}
          >
            <img
              className=" mt-5 w-72 h-72 rounded-lg "
              src={item.images}
              alt=""
            />
            <p className=" rounded hover:bg-slate-100 p-2 text-slate-700 mt-3 font-bold text-1xl text-center ">
              {item.category}
            </p>
          </NavLink>
        ))}
      </div>
      <p className="md:text-4xl text-start py-10 px-4 font-titlefont ">
        Few Products in hear !!!{" "}
      </p>

      <div className=" grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4  justify-center items-center">
        {randomProducts?.map((item: any) => (
          <div
            key={item._id}
            className="group relative border h-64 rounded-lg flex flex-col gap-3"
          >
            {/* Button container to show on hover, centered */}
            <div
              className="absolute inset-0  bg-black bg-opacity-30 opacity-0 
            hover:opacity-100 transition-opacity duration-700 flex items-center justify-center"
            >
              <Link
                to="/product-details"
                state={{ productId: item._id }}
                className="text-white bg-designColor  px-4 py-2 rounded-lg"
              >
                See details
              </Link>
            </div>

            <ul className="h-3/4 w-full flex justify-center items-center">
              <img className="h-3/4" src={item.images} alt={item.name} />
            </ul>
            <ul className="h-1/3 relative">
              <p className="px-2 text-lg font-semibold text-slate-700">
                {item?.name}
              </p>
              <p className="px-2 text-sm font-semibold text-slate-700">
                ${item?.price}.00
              </p>
            </ul>
          </div>
        ))}
      </div>
      <p className="text-center my-10 font-semibold text-2xl">
        <NavLink
          className=" text-white bg-designColor hover:designColor py-1 px-2 rounded-lg"
          state={{
            category: "",
          }}
          to="/product-page"
        >
          All Products ...
        </NavLink>
      </p>

      <BenefitPage></BenefitPage>
      <HomePageFreatures></HomePageFreatures>
    </main>
  );
};

export default Homepage;
