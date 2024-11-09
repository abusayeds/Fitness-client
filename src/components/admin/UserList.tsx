/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import {
  useAllUserQuery,
  useDeleteUserMutation,
} from "../../redux/features/authantication/AuthenticationApi";
import { TUser } from "../../redux/features/authantication/authanticationSlice";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";

const UserList = () => {
  const { data: allUser } = useAllUserQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const [deleteOpen, setDeleteOpen] = useState("");
  const handleDeleteUser = async (id: string) => {
    const res: any = await deleteUser(id);
    if (res?.data?.success) {
      toast.message("User deleted");
    }
  };
  return (
    <div className="max-w-full p-4 font-titlefont">
      <div className="flex items-center space-x-2 mb-4">
        <FaUserAlt className="text-gray-600" />
        <h1 className="text-xl font-semibold">{allUser?.data?.length} users</h1>
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
                Address
              </th>

              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Community Role
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Delete user
              </th>
            </tr>
          </thead>
          <tbody>
            {allUser?.data?.map((user: TUser, index: any) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 flex items-center space-x-2">
                  <span className="text-gray-800">{user?.name}</span>
                </td>

                <td className="px-4 py-2 text-gray-600">{user?.email}</td>
                <td className="px-4 py-2 text-gray-600">{user?.address}</td>
                <td className="px-4 py-2 text-gray-600">{user?.role}</td>
                <td className="py-2 px-4 52">
                  {deleteOpen === user._id ? (
                    <div className=" flex gap-4">
                      <button
                        onClick={() => handleDeleteUser(user?._id)}
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

export default UserList;
