/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent,  useState } from "react";
import { useAppSelector } from "../../hooks";
import { useUpdateProductMutation } from "./productManagementApi";



const UpdateProducts = () => {
  const _id = useAppSelector((state) => state.updateProductValue.UpdateProductsDefaultValue);

  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  const [updateProduct,{isSuccess, isError}] = useUpdateProductMutation();
  
  
  //   const { name, price, description, images } = data.data;
  const addProduct = (e: FormEvent) => {
    e.preventDefault();

    const options = {
      id: _id,
      product: {
        name: name,
        price: parseFloat(price),
        description: description,
        images: images,
      },
    };
 
     
    updateProduct(options);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="md:m-40 mt-40">
      <p className="text-center text-2xl font-semibold">Update Product </p>
      {isSuccess && <p>Product updated successfully!</p>}
      {isError && <p>Failed to update product!</p>}
      <form onSubmit={addProduct} className="p-4">
        <label className="flex flex-col mb-5">
          <span className="capitalize mb-2">product name *</span>
          <input
            // defaultValue={pdateProduct.name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            className="border-2 p-2 rounded"
            type="text"
            placeholder="Product name"
          />
        </label>
        <label className="flex flex-col mb-5">
          <span className="capitalize mb-2">product Price *</span>
          <input
            // defaultValue={data.data.price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            className="border-2 p-2 rounded"
            type="number"
            placeholder="Price"
          />
        </label>

        <label className="flex flex-col mb-5">
          <span className="capitalize mb-2">Description *</span>
          <input
            // defaultValue={data.data.description}
            onChange={(e) => setDescription(e.target.value)}
            name="image"
            className="border-2 p-2 rounded"
            type="text"
            placeholder="description"
          />
        </label>
        <label className="flex flex-col mb-5">
          <span className="capitalize mb-2">images *</span>
          <input
            // defaultValue={data.data.images}
            onChange={(e) => setImages(e.target.value)}
            name="category"
            className="border-2 p-2 rounded"
            type="text"
            placeholder="images"
          />
        </label>
        <input
          className="w-full  text-center bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
          type="submit"
          value=" Update Product "
        />
      </form>
    </div>
  );
};

export default UpdateProducts;
