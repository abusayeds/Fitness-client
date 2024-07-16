import  { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userDetails } from "../redux/features/chechOUtPage/checkOutPageSlice";
import { NavLink } from "react-router-dom";

const UserDetailsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const products = useAppSelector((state) => state.cartProduct.items);
  const totalPrice = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
 const dispatch = useAppDispatch()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const Details = {
        name :name,
        email : email,
        phone : phone,
        description : description
    }
     dispatch(userDetails(Details))
     console.log(Details);
     
  };

  return (
   <main className="flex mt-40 gap-5  justify-around px-10">
     <form className="space-y-4 w-full" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="phone"
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          name="address"
          placeholder="Address"
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  sm:text-sm"
          required
        />
      </div>
      <NavLink to='/success-page'>
      <button
        type="submit"
        className="w-full mt-5 bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       Place Order
      </button>
      </NavLink>
    </form>
    <div className="w-full ">
    <div>
        {products.map((item) => (
          <div
            key={item._id}
            className="md:flex justify-between items-center border px-20 rounded   gap-5 mt-5 "
          >
            <div>
              <img className="h-24 w-24" src={item.images} alt="" />
            </div>
            <div className="mt-2 w-60 ">
              <p className=" font-semibold text-slate-700"> {item.name}</p>
              <p className="mt-2">$ {item.price}</p>
              <p className="mt-2">Stock: {item.stock}</p>

            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-5">
          <div  className="flex items-center gap-5">
          <p className=" text-xl font-semibold text-slate-700">Total Price: </p>
          <p>{totalPrice.toFixed(2)} $</p>
       
          </div>

          
        </div>
      </div>
    </div>
   </main>
  );
};

export default UserDetailsForm;
