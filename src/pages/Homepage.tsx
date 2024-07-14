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
 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="md:flex md:justify-around flex-1 justify-center items-center   mt-40">
        {products.data.map((item: any) => (
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
      <div className="md:flex md:justify-around flex-1 justify-center items-center   mt-5">
        {fewproducts.data.map((item :any) => (
          <div>
            <img
              className=" mt-5 w-72 h-72 rounded-lg "
              src={item.images}
              alt=""
            />
              <p className=" text-1xl font-semibold text-slate-700 mt-5">{item.name}</p>
          </div>
        ))}
        
      </div>
      <p className="text-center my-10 font-semibold text-2xl"><NavLink className= ' text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded-lg' to='product-page'>Expoler more ...</NavLink></p>
    </main>
  );
};

export default Homepage;
