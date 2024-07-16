import { FormEvent, useState } from "react";
import { useAddProductMutation } from "./productManagementApi";

const AddNewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setstock] = useState("");
  const [quantity, setquantity] = useState("");
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");

const [addProduct ,{isSuccess, isError}] = useAddProductMutation()
  const hendleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const product = {
      name: name,
      price: parseFloat(price),
      stock : parseFloat(stock),
      quantity : parseFloat(quantity),
      description: description,
      images: images,
      category : category
    };
    addProduct(product);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="md:mx-40 mx-5 mt-40">
    <p className="text-center font-semibold text-2xl">Add new Product </p>
    {isSuccess && <p>Product updated successfully!</p>}
    {isError && <p>Failed to update product!</p>}
      <form onSubmit={hendleSubmit} className="p-4">
        <label className="flex flex-col mb-5">
          <span className="capitalize mb-2">product name *</span>
          <input
          
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
           
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            className="border-2 p-2 rounded"
            type="number"
            placeholder="Price"
          />
        </label>
        <label className="flex flex-col mb-5">
          <span className="capitalize mb-2">Stock *</span>
          <input
            
            onChange={(e) => setstock(e.target.value)}
            name="price"
            className="border-2 p-2 rounded"
            type="number"
            placeholder="Stock"
          />
        </label>
        <label className="flex flex-col mb-5">
          <span className="capitalize mb-2">Quantity</span>
          <input
        
            onChange={(e) => setquantity(e.target.value)}
            name="price"
            className="border-2 p-2 rounded"
            type="number"
            placeholder="Quantity"
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
        <label className="flex flex-col mb-5">
          <span className="capitalize mb-2">Category*</span>
          <input
           
            onChange={(e) => setCategory(e.target.value)}
            name="price"
            className="border-2 p-2 rounded"
            type="text"
            placeholder="Price"
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

export default AddNewProduct;
