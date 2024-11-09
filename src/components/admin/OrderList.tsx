/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import {
  useAllPaymentQuery,
  useDeletePaymentMutation,
} from "../../redux/features/payment/paymentApi";
import { TPayment } from "../../types";
import { toast } from "sonner";

const OrderList = () => {
  const { data: allPay } = useAllPaymentQuery(undefined);

  const [deletePayment] = useDeletePaymentMutation();
  const [deleteOpen, setDeleteOpen] = useState("");
  const handleDeletePayment = async (id: string) => {
    const res: any = await deletePayment(id);
    if (res?.data?.success) {
      toast.message("User deleted");
    }
  };
  return (
    <div className="max-w-full p-4 font-titlefont">
      <div className="flex items-center space-x-2 mb-4">
        <FaUserAlt className="text-gray-600" />
        <h1 className="text-xl font-semibold">{allPay?.data?.length} Order</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Username
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Email
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Phone No
              </th>

              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Options
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Address
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Remove Order
              </th>
            </tr>
          </thead>
          <tbody>
            {allPay?.data?.map((user: TPayment, index: any) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 flex items-center space-x-2">
                  <span className="text-gray-800">{user?.fullName}</span>
                </td>

                <td className="px-4 py-2 text-gray-600">{user?.email}</td>
                <td className="px-4 py-2 text-gray-600">{user?.phoneNumber}</td>
                <td className="px-4 py-2  text-designColor">
                  {user?.deliveryOption}
                </td>
                <td className="px-4 py-2 text-gray-600">{user?.address}</td>

                <td className="py-2 px-4 52">
                  {deleteOpen === user._id ? (
                    <div className=" flex gap-4">
                      <button
                        onClick={() => handleDeletePayment(user?._id)}
                        className=" text-white p-1 rounded text-sm bg-red-600"
                      >
                        Yes
                      </button>
                      <p>or</p>
                      <button
                        onClick={() => setDeleteOpen("")}
                        className="  p-1  text-white text-sm rounded bg-designColor"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <MdDelete
                      onClick={() => setDeleteOpen(user._id)}
                      className="   text-red-600 text-2xl ml-4"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
