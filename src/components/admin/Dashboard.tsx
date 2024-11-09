// src/components/Dashboard.jsx

import {
  FaClipboardList,
  FaTimesCircle,
  FaShippingFast,
  FaDollarSign,
} from "react-icons/fa";
import OrderList from "./OrderList";
import { useAllPaymentQuery } from "../../redux/features/payment/paymentApi";

const Dashboard = () => {
  const { data: allpay } = useAllPaymentQuery(undefined);
  return (
    <div className="p-6 flex-1 font-titlefont">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-500 text-white p-4 rounded-lg text-center flex flex-col items-center">
          <FaClipboardList className="text-3xl mb-2" />
          <p>ORDER PENDING</p>
          <h3 className="text-2xl font-bold">2</h3>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg text-center flex flex-col items-center">
          <FaTimesCircle className="text-3xl mb-2" />
          <p>ORDER CANCEL</p>
          <h3 className="text-2xl font-bold">0</h3>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center flex flex-col items-center">
          <FaShippingFast className="text-3xl mb-2" />
          <p>ORDER PROCESS</p>
          <h3 className="text-2xl font-bold">{allpay?.data?.length} </h3>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg text-center flex flex-col items-center">
          <FaDollarSign className="text-3xl mb-2" />
          <p>TODAY INCOME</p>
          <h3 className="text-2xl font-bold">$9568.00</h3>
        </div>
      </div>

      <OrderList></OrderList>
    </div>
  );
};

export default Dashboard;
