/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import {
  useFewProductQuery,
  useProductQuery,
} from "../redux/features/home/productApi";
import { useAppDispatch } from "../redux/hooks";
import { category } from "../redux/features/home/productSlice";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const { data: products, isLoading } = useProductQuery(undefined);
  const { data: fewproducts } = useFewProductQuery(undefined);
  const backgroundImageUrl =
    "https://shop.lifefitness.com/cdn/shop/files/HOMEPAGE_clubseriesplus-cardio_021224.jpg?v=1707766353&width=1400";

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="mt-20">
      <div
        className="bg-cover bg-center h-screen flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className=" bg-opacity-50 text-white text-center px-4 md:px-8 py-8 rounded-md">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Our Fitness Zone
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Achieve your fitness goals with personalized plans and expert
            guidance.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Get Started
          </button>
        </div>
      </div>
      <p className="text-center mt-20 text-3xl font-bold">Category Product in hear !!! </p>

      <div className="md:flex md:justify-around flex-1 justify-center items-center   mt-20">
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
              <p className="text-center mt-20 text-3xl font-bold">Few Products in hear !!! </p>

            <div className="md:flex md:justify-around flex-1 justify-center items-center   mt-5">
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
    </main>
  );
};

export default Homepage;
