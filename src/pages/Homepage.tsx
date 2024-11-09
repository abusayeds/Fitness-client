/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import {
  useFewProductQuery,
  useCategoryProductQuery,
} from "../redux/features/home/productApi";
import { useAppDispatch } from "../redux/hooks";
import { category } from "../redux/features/home/productSlice";
import BenefitPage from "./BenefitPage";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const { data: products, isLoading } = useCategoryProductQuery(undefined);
  const { data: fewproducts } = useFewProductQuery(undefined);
  const backgroundImageUrl =
    "https://www.northernfitness.ca/cdn/shop/files/image-4.jpg?v=1727970176&width=1920";

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="mt-20 w-full">
      <div
        className="bg-cover bg-center h-screen flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className=" bg-opacity-50 text-white text-center px-4 md:px-8 py-8 rounded-md">
          <h1 className="text-4xl md:text-6xl font-bodyfont font-bold mb-4">
            Welcome to Our Fitness Zone
          </h1>
          <p className="text-lg md:text-2xl  font-titlefont mb-8">
            Achieve your fitness goals with personalized plans and expert
            guidance.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Get Started
          </button>
        </div>
      </div>
      <p className="md:text-4xl text-center font-titlefont">
        Category Product in hear !!!{" "}
      </p>

      <div className="  grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4  justify-center items-center">
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
      <p className="md:text-4xl text-center py-10 font-titlefont ">
        Few Products in hear !!!{" "}
      </p>

      <div className=" grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4  justify-center items-center">
        {fewproducts?.data?.map((item: any) => (
          <div>
            <img
              className=" mt-5 w-72 h-72 rounded-lg "
              src={item.images}
              alt=""
            />
            <p className=" text-1xl font-semibold text-slate-700 mt-5">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <p className="text-center my-10 font-semibold text-2xl">
        <NavLink
          className=" text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded-lg"
          to="product-page"
        >
          Expoler more ...
        </NavLink>
      </p>
      <p className="mx-5 md:text-4xl text-center font-titlefont">
        Benefits of a Healthy Lifestyle
      </p>
      <BenefitPage></BenefitPage>
    </main>
  );
};

export default Homepage;
