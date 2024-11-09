/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useProductLengthQuery } from "../redux/features/productPage/productPageApi";
import { TProduct } from "../types";
import { useAddCartProductMutation } from "../redux/features/cartPage/cartPageApi";
import { toast } from "sonner";
import { setCartOpen } from "../redux/features/cartPage/openCartSlice";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const RendomProduct = () => {
  const dispatch = useAppDispatch();
  const [addToCartProduct] = useAddCartProductMutation();
  const { data: allProduct } = useProductLengthQuery(undefined);
  const [mainImages, setMainImages] = useState<{ [key: number]: string }>({});
  const [randomProducts, setRandomProducts] = useState<TProduct[]>([]);
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
    if (allProduct?.data?.length) {
      const shuffledProducts = [...allProduct.data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setRandomProducts(shuffledProducts);
    }
  }, [allProduct]);
  const handleImageClick = (image: string, productIndex: number) => {
    setMainImages((prevMainImages) => ({
      ...prevMainImages,
      [productIndex]: image,
    }));
  };

  return (
    <div>
      <div className=" flex-col flex gap-8 py-5">
        <p className=" uppercase text-3xl font-bodyfont  text-designColor">
          Top 4 propurlers Product{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {randomProducts?.map((item: TProduct, productIndex: number) => (
            <div
              className="group w-full h-full border border-gray-300 rounded-sm relative"
              key={productIndex}
            >
              <div className="flex justify-center items-center">
                <img
                  className="object-cover bg-white h-32"
                  src={mainImages[productIndex] || item.images[0]}
                  alt={item.name}
                />
              </div>
              <div className="grid grid-cols-4">
                {item?.images?.map((image: string, thumbnailIndex: number) => (
                  <img
                    key={thumbnailIndex}
                    className={`object-cover bg-white h-12 w-12 cursor-pointer border-2 ${
                      mainImages[productIndex] === image
                        ? "border-blue-500"
                        : "border-transparent"
                    } hover:border-blue-500`}
                    src={image}
                    alt={`Thumbnail ${thumbnailIndex + 1}`}
                    onClick={() => handleImageClick(image, productIndex)}
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
                className="absolute top-1 right-1 bg-gray-200 hover:bg-slate-300 duration-700 p-2 text-3xl rounded-full"
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
      </div>
    </div>
  );
};

export default RendomProduct;
