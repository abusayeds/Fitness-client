/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAllCategoryProductQuery } from "../../redux/features/home/productApi";

const CategoryList = () => {
  const { data: allCategory } = useAllCategoryProductQuery(undefined);

  return (
    <div className=" grid grid-cols-2 md:grid-cols-4 justify-between p-4 font-titlefont ">
      {allCategory?.data?.map((category: any, index: number) => (
        <div key={index} className="flex flex-col gap-2">
          <p className=" text-2xl font-semibold">{category.mainCategory}</p>
          {Array.from({ length: 10 }, (_, i) => (
            <p className=" md:text-lg text-sm  duration-500 hover:underline">
              <p>{category[`category${i + 1}`]}</p>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
