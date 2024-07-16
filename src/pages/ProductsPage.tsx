/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProductPageQuery } from "../redux/features/productPage/productPageApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { singleProductId } from "../redux/features/productDetailsPage/productdetailspageSlice";


interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string;
}

const ProductsPage = () => {
  const filltercategory = [
    "TREADMILLS",
    "STRENGTH",
    "CABLE MACHINES",
    "ELLIPTICALS",
  ];
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const dispatch = useAppDispatch()
  const category = useAppSelector((state: any) => state.products.products);
  const { data, isLoading } = useProductPageQuery(category);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSortChange = (e: any) => {
    setSortOption(e.target.value);
  };

  const handlePriceRangeChange = (e: any, index: number) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange([newRange[0], newRange[1]]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSortOption("");
    setPriceRange([0, 1000]);
  };

  const filteredProducts = data.data
    .filter((item: Product) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (item: Product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category)
    )
    .filter(
      (item: Product) =>
        item.price >= priceRange[0] && item.price <= priceRange[1]
    )
    .sort((a: Product, b: Product) => {
      if (sortOption === "price-asc") {
        return a.price - b.price;
      } else if (sortOption === "price-desc") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  return (
    <div className="md:flex py-40 p-2 ">
      <div className=" md:w-96 bg-slate-00 px-4  ">
        <div className="flex justify-center items-center border rounded-lg">
          <input
            className="px-3 py-1 w-full outline-none"
            name=""
            id=""
            placeholder="search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon
            className="pr-3 text-xxl font-semibold"
            icon={faSearch}
          />
        </div>

        {/* Category Filters */}
        <div className="mt-2">
          <h3 className=" font-semibold text-slate-700">Categories</h3>
          {filltercategory.map((category) => (
            <div className="mt-2" key={category}>
              <input
                className=" ml-5"
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label className="ml-2">{category}</label>
            </div>
          ))}
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className=" font-semibold text-slate-700">Price Range $</h3>
          <label className="flex gap-2 my-1 ml-5 ">
            <span> Min Price: </span>
            <input
              className=" outline-0 border px-1 w-28 rounded "
              type="number"
              defaultValue={0}
              onChange={(e) => handlePriceRangeChange(e, 0)}
            />
          </label>
          <label className="flex gap-2 ml-5">
            <span>Max price</span>
            <input
              className=" outline-0 border px-1 w-28 rounded my-1"
              type="number"
              defaultValue={10999}
              onChange={(e) => handlePriceRangeChange(e, 1)}
            />
          </label>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className=" font-semibold text-slate-700">Sort By</h3>
          <select
            className=" outline-0 border ml-5 mt-2"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          className="bg-red-500 w-full mt-5 p-1 rounded-md text-white hover:font-bold hover:bg-red-600"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      <div className="md:w-full grid grid-cols-2 justify-center items-center  gap-5 mt-4">
        {filteredProducts.map((item: Product) => (
          <div
            className="bg-slate-50 w-full h-full border "
            key={item._id}
          >
            <img
              className="md:h-96 h-52 w-full"
              src={item.images}
              alt={item.name}
            />
            <div className="p-2 md:p-3">
              <p className="text-slate-700 text-xl my-2">{item.name}</p>
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
            <p onClick={() => dispatch(singleProductId(item._id))} className="text-center bg-green-500  bottom-0 w-full mt- p-1  text-white hover:font-bold hover:bg-red-600-"><NavLink to= '/product-details'>view details</NavLink></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
