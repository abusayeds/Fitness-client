/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useAddProductsMutation } from "../home/productApi";

// Importing the TProduct type
export type TProduct = {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string[];
  stock: number;
  quantity: number;
};

const AddNewProduct: React.FC = () => {
  const [addProduct] = useAddProductsMutation();
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  // Using TProduct as a generic type for useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>();

  const CLIENT_API_KEY = "92d252bf68d6b31fef4e36b725cf9979";

  const uploadImagesToImgBB = async (files: any) => {
    const formData = new FormData();
    formData.append("image", files);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${CLIENT_API_KEY}`,
        formData
      );

      if (res.data.success) {
        const imgURL = res.data.data.url;

        setImageURLs((prev) => [...prev, imgURL]);
      }
    } catch (error) {
      console.error("Error uploading image to imgbb:", error);
    }
  };

  const onSubmit = async (data: TProduct) => {
    const formData = {
      ...data,
      image: imageURLs,
    };

    try {
      const res: any = await addProduct(formData);
      if (res?.data?.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res?.data?.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (!res?.data?.success) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${res?.error?.data?.message}`,
          showConfirmButton: false,
          timer: 2000,
        });

        console.log(res);
        console.log(res?.error?.errorSources[0].message);
      }
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 shadow-md rounded my-40">
      <h1 className="text-xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            defaultValue="Benches"
            {...register("category", { required: "Category is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Image (File Upload) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Images</label>
          <input
            type="file"
            onChange={(e) => uploadImagesToImgBB(e.target.files?.[0])}
            multiple
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          {imageURLs.length > 0 && (
            <div className="mt-4">
              <h2 className="font-bold">Uploaded Images:</h2>
              <div className="flex gap-2 border-dashed border-1 p-2">
                {imageURLs.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="w-16 h-16 object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            defaultValue={2}
            {...register("stock", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
