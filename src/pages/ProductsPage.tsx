/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useProductPageQuery } from "../redux/features/productPage/productPageApi";
// import { useAppSelector } from "../redux/hooks";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

// const ProductsPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [sortOption, setSortOption] = useState("");
  
//   const category = useAppSelector((state) => state.products.products);
//   const { data, isLoading } = useProductPageQuery(category);

//   if (isLoading) {
//     return <p>Loading ...</p>;
//   }

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prev) => 
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//     );
//   };

//   const handleSortChange = (e : any) => {
//     setSortOption(e.target.value);
//   };

//   const clearFilters = () => {
//     setSearchQuery("");
//     setSelectedCategories([]);
//     setSortOption("");
//   };

//   const filteredProducts = data.data
//     .filter((item : any)  =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter((item : any) =>
//       selectedCategories.length === 0 ||
//       selectedCategories.includes(item.category)
//     )
//     .sort((a, b) => {
//       if (sortOption === "price-asc") {
//         return a.price - b.price;
//       } else if (sortOption === "price-desc") {
//         return b.price - a.price;
//       } else {
//         return 0;
//       }
//     });

//   return (
//     <div className="md:flex pt-40 p-2 ">
//       <div className="md:w-96 bg-slate-00 px-4  ">
//         <div className="flex justify-center items-center border rounded-lg">
//           <input
//             className="px-3 py-1 w-full outline-none"
//             name=""
//             id=""
//             placeholder="search"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           <FontAwesomeIcon className="pr-3 text-xxl font-semibold" icon={faSearch} />
//         </div>

//         {/* Category Filters */}
//         <div>
//           <h3>Categories</h3>
//           {["TREADMILLS","STRENGTH","CABLE MACHINES","ELLIPTICALS"].map((category) => (
//             <div key={category}>
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => handleCategoryChange(category)}
//               />
//               <label>{category}</label>
//             </div>
//           ))}
//         </div>

//         {/* Sort Options */}
//         <div>
//           <h3>Sort By</h3>
//           <select value={sortOption} onChange={handleSortChange}>
//             <option value="">Default</option>
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//           </select>
//         </div>

//         {/* Clear Filters Button */}
//         <button onClick={clearFilters}>Clear Filters</button>
//       </div>

//       <div className="md:w-full grid grid-cols-2 justify-center items-center gap-5">
//         {filteredProducts.map((item :any) => (
//           <div
//             className="bg-slate-50 w-full h-full border rounded-lg"
//             key={item._id}
//           >
//             <img className="md:h-96 h-52 w-full" src={item.images} alt="" />
//             <div className="p-2 md:p-3">
//               <p className="text-slate-700 text-xl my-2">{item.name}</p>
//               <small className="text-xxl">
//                 Starting at $178/mo or 0% APR with affirm. See if you qualify
//               </small>
//               <br />
//               <small className="text-yellow-700">** / </small>
//               <span className="text-teal-600">
//                 stock: <small className="text-red-600">Available</small>
//               </span>
//               <p>${item.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;










// import { useState, ChangeEvent } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useProductPageQuery } from "../redux/features/productPage/productPageApi";
// import { useAppSelector } from "../redux/hooks";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

// interface Product {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
//   images: string;
// }

// const ProductsPage = () => {
//     const filltercategory = ["TREADMILLS","STRENGTH","CABLE MACHINES","ELLIPTICALS"]
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [sortOption, setSortOption] = useState<string>("");

//   const category = useAppSelector((state: any) => state.products.products);
//   const { data, isLoading } = useProductPageQuery(category);

//   if (isLoading) {
//     return <p>Loading ...</p>;
//   }

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//     );
//   };

//   const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setSortOption(e.target.value);
//   };

//   const clearFilters = () => {
//     setSearchQuery("");
//     setSelectedCategories([]);
//     setSortOption("");
//   };

//   const filteredProducts = data.data
//     .filter((item: Product) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter((item: Product) =>
//       selectedCategories.length === 0 ||
//       selectedCategories.includes(item.category)
//     )
//     .sort((a: Product, b: Product) => {
//       if (sortOption === "price-asc") {
//         return a.price - b.price;
//       } else if (sortOption === "price-desc") {
//         return b.price - a.price;
//       } else {
//         return 0;
//       }
//     });

//   return (
//     <div className="md:flex pt-40 p-2 ">
//       <div className="md:w-96 bg-slate-00 px-4  ">
//         <div className="flex justify-center items-center border rounded-lg">
//           <input
//             className="px-3 py-1 w-full outline-none"
//             name=""
//             id=""
//             placeholder="search"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           <FontAwesomeIcon className="pr-3 text-xxl font-semibold" icon={faSearch} />
//         </div>

//         {/* Category Filters */}
//         <div>
//           <h3>Categories</h3>
//           { filltercategory.map((category) => (
//             <div key={category}>
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => handleCategoryChange(category)}
//               />
//               <label>{category}</label>
//             </div>
//           ))}
//         </div>

//         {/* Sort Options */}
//         <div>
//           <h3>Sort By</h3>
//           <select value={sortOption} onChange={handleSortChange}>
//             <option value="">Default</option>
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//           </select>
//         </div>

//         {/* Clear Filters Button */}
//         <button onClick={clearFilters}>Clear Filters</button>
//       </div>

//       <div className="md:w-full grid grid-cols-2 justify-center items-center gap-5">
//         {filteredProducts.map((item: Product) => (
//           <div
//             className="bg-slate-50 w-full h-full border rounded-lg"
//             key={item._id}
//           >
//             <img className="md:h-96 h-52 w-full" src={item.images} alt={item.name} />
//             <div className="p-2 md:p-3">
//               <p className="text-slate-700 text-xl my-2">{item.name}</p>
//               <small className="text-xxl">
//                 Starting at $178/mo or 0% APR with affirm. See if you qualify
//               </small>
//               <br />
//               <small className="text-yellow-700">** / </small>
//               <span className="text-teal-600">
//                 stock: <small className="text-red-600">Available</small>
//               </span>
//               <p>${item.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
            



import { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProductPageQuery } from "../redux/features/productPage/productPageApi";
import { useAppSelector } from "../redux/hooks";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string;
}

const ProductsPage = () => {
const filltercategory = ["TREADMILLS","STRENGTH","CABLE MACHINES","ELLIPTICALS"]
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0 ,10000]);

  const category = useAppSelector((state: any) => state.products.products);
  const { data, isLoading } = useProductPageQuery(category);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const handleSearchChange = (e : any) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSortChange = (e : any) => {
    setSortOption(e.target.value);
  };

  const handlePriceRangeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
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
    .filter((item: Product) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category)
    )
    .filter((item: Product) =>
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
    <div className="md:flex pt-40 p-2 ">
      <div className="md:w-96 bg-slate-00 px-4  ">
        <div className="flex justify-center items-center border rounded-lg">
          <input
            className="px-3 py-1 w-full outline-none"
            name=""
            id=""
            placeholder="search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon className="pr-3 text-xxl font-semibold" icon={faSearch} />
        </div>

        {/* Category Filters */}
        <div>
          <h3>Categories</h3>
          {filltercategory.map((category) => (
            <div key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label>{category}</label>
            </div>
          ))}
        </div>

        {/* Price Range Filter */}
        <div>
          <h3>Price Range</h3>
          <label>
            Min Price: 
            <input 
              type="number" 
              value={priceRange[0]} 
              onChange={(e) => handlePriceRangeChange(e, 0)} 
            />
          </label>
          <label>
            Max Price: 
            <input 
              type="number" 
              value={priceRange[1]} 
              onChange={(e) => handlePriceRangeChange(e, 1)} 
            />
          </label>
        </div>

        {/* Sort Options */}
        <div>
          <h3>Sort By</h3>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="md:w-full grid grid-cols-2 justify-center items-center gap-5">
        {filteredProducts.map((item: Product) => (
          <div
            className="bg-slate-50 w-full h-full border rounded-lg"
            key={item._id}
          >
            <img className="md:h-96 h-52 w-full" src={item.images} alt={item.name} />
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

