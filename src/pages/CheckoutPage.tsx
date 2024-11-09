/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Checkout.jsx

import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useCreatePaymentMutation } from "../redux/features/payment/paymentApi";

const Checkout = () => {
  const location = useLocation();
  const { reviewCart } = location.state || {};
  const [addPayment] = useCreatePaymentMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (Object.keys(errors).length > 0) {
    Object.values(errors).forEach((error) => {
      toast.error((error?.message as any) || "An error occurred");
    });
  }

  const onSubmit = async (data: any) => {
    const bookingData = {
      ...data,
      totalItem: reviewCart?.totalItem,
      totalPrice: reviewCart?.totalPrice,
    };

    try {
      const res: any = await addPayment(bookingData);
      console.log("Form Data:", res);
      if (res.error) {
        toast.message(res?.error?.data?.errorSources[0].message);
      } else {
        toast.message(" Booking successful!");
        window.location.href = res?.data?.data?.paymentSession?.payment_url;
      }
    } catch {
      toast.message("Something went wrong");
    }

    // Handle form submission (e.g., send data to the backend)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-20 lg:flex-row bg-gray-50 min-h-screen p-8"
    >
      {/* Shipping Information */}
      <div className="lg:w-2/3 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
        <div className="space-y-4">
          {/* Delivery / Pick up options */}
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Delivery"
                {...register("deliveryOption", {
                  required: "Please select a delivery option",
                })}
                className="text-blue-600"
              />
              <span>Delivery</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Pick up"
                {...register("deliveryOption", {
                  required: "Please select a delivery option",
                })}
                className="text-blue-600"
              />
              <span>Pick up</span>
            </label>
          </div>
          {errors.deliveryOption && (
            <p className="text-red-500 text-sm">
              {errors.deliveryOption.message as any}
            </p>
          )}

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full name"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full border rounded-lg p-2"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">
              {errors.fullName.message as any}
            </p>
          )}

          {/* Email Address */}
          <input
            type="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full border rounded-lg p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message as any}
            </p>
          )}

          {/* Phone Number */}
          <input
            type="tel"
            placeholder="Phone number"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^(?:\+8801|01)[3-9]\d{8}$/,
                message: "Enter a valid Bangladeshi phone number",
              },
            })}
            className="w-full border rounded-lg p-2"
          />

          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">
              {errors?.phoneNumber?.message as any}
            </p>
          )}

          {/* Country */}
          <input
            type="tel"
            placeholder="Enter address"
            {...register("address", {
              required: "adddress is required",
            })}
            className="w-full border rounded-lg p-2"
          />
          {errors?.address && (
            <p className="text-red-500 text-sm">
              {errors?.address?.message as any}
            </p>
          )}

          {/* City, State, and ZIP Code */}
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
              className="w-1/3 border rounded-lg p-2"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">
                {errors?.city?.message as any}
              </p>
            )}

            <input
              type="text"
              placeholder="State"
              {...register("state", { required: "State is required" })}
              className="w-1/3 border rounded-lg p-2"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">
                {errors.state.message as any}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must agree to the terms and conditions",
              })}
              className="text-blue-600"
            />
            <label htmlFor="terms" className="text-sm">
              I have read and agree to the Terms and Conditions
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">
              {errors.terms.message as any}
            </p>
          )}
        </div>
      </div>

      {/* Review Your Cart */}
      <div className="lg:w-1/3 p-8 bg-gray-100 rounded-lg shadow-md mt-8 lg:mt-0 lg:ml-8">
        <h2 className="text-xl font-semibold mb-4">Review your cart</h2>
        <div className="space-y-2">
          {/* Sample Cart Items */}
          <div className="flex items-center justify-between">
            <span>Total items :</span>
            <span> {reviewCart?.totalItem}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span>$0.00</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span>Subtotal</span>
          <span>${reviewCart?.totalPrice}.00</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>$80.00</span>
        </div>
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span>${reviewCart?.totalPrice + 80}.00</span>
        </div>
        <button className="w-full mt-6 p-3 bg-blue-600 text-white rounded-lg font-semibold">
          Pay Now
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Secure Checkout – 128-bit Encrypted
        </p>
      </div>
    </form>
  );
};

export default Checkout;
