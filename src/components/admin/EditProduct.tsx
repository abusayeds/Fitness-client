/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { imgBbKey } from "../../config";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useUpdateProductMutation } from "../../redux/features/productManagementPage/productManagementApi";
import { useSingleproductQuery } from "../../redux/features/productDetailsPage/productdetailspageApi";

interface ProductFormInputs {
  name: string;
  price: number;
  category: string;
  description?: string;
  stock: number;
  quantity: number;
  images: string[];
}

const ImgUploadKey = imgBbKey;

const EditProduct: React.FC = () => {
  const location = useLocation();
  const productId = location.state?.productId;
  const { data: singleProduct } = useSingleproductQuery(productId);
  console.log(singleProduct?.data?.name);

  const { register, handleSubmit, reset } = useForm<ProductFormInputs>();
  const [images, setImages] = useState<string[]>([]);
  const [imgUploadLoading, setImgUploadLoading] = useState(false);
  const [updatePruduct] = useUpdateProductMutation();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgUploadLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${ImgUploadKey}`,
          formData
        );
        if (res.data.success) {
          const imgURL = res.data.data.url;
          setImages((prev) => [...prev, imgURL]);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setImgUploadLoading(false);
      }
    }
  };
  const onSubmit: SubmitHandler<ProductFormInputs> = async (values) => {
    const data = { ...values, images };
    console.log(data);

    const args = {
      id: productId,
      data: data,
    };
    try {
      const res = await updatePruduct(args);
      console.log(res);

      if (res?.data?.success) {
        toast.success("Product update successfully!");
        reset();
        setImages([]);
      }
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className=" p-6 bg-white shadow-md rounded-md font-titlefont ">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <section className=" flex w-full gap-4">
          <div className=" w-full">
            <label className="block text-gray-700">Product Name</label>
            <input
              defaultValue={singleProduct?.data?.name}
              {...register("name", { required: "Name is required" })}
              className="w-full border  border-gray-300 rounded px-3 py-2"
              type="text"
              placeholder="Product Name"
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Price</label>
            <input
              defaultValue={singleProduct?.data?.price}
              {...register("price", {
                required: "Price is required",

                valueAsNumber: true,
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="number"
              placeholder="Price"
            />
          </div>
        </section>
        <section className=" flex gap-4">
          <div className=" w-full">
            <label className="block text-gray-700">Category</label>
            <input
              defaultValue={singleProduct?.data?.category}
              {...register("category", { required: "Category is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              value="Kettlebells"
              placeholder="Category"
            />
          </div>
          <div className=" w-full ">
            <label className="block text-gray-700">Stock</label>
            <input
              defaultValue={singleProduct?.data?.stock}
              {...register("stock", {
                required: "Stock is required",
                value: 12,
                valueAsNumber: true,
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="number"
              placeholder="Stock"
            />
          </div>
          <div className=" w-full">
            <label className="block text-gray-700">Quantity</label>
            <input
              defaultValue={singleProduct?.data?.quantity}
              {...register("quantity", {
                required: "Quantity is required",
                value: 1,
                valueAsNumber: true,
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="number"
              placeholder="Quantity"
            />
          </div>
        </section>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            defaultValue={singleProduct?.data?.description}
            {...register("description")}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Description"
          />
        </div>

        <div>
          <label className="block text-gray-700">Upload Images</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {imgUploadLoading ? <p>Uploading...</p> : <p>{images.length}</p>}

          <div className="mt-2 flex gap-2">
            {images.map((imgUrl: any, index: any) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Uploaded ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="  bg-designColor text-white p-2 rounded   opacity-80 hover:opacity-100 duration-700 transition-colors"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
