/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type THeaderType = {
  name: string;
  path: string;
};
export type TProduct = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  stock: number;
  quantity: number;
};
export interface QueryParam {
  name: string;
  value: string;
}
export type TPayment = {
  _id: string;
  address: string;
  city: string;
  deliveryOption: "Pick up" | "Delivery";
  email: string;
  fullName: string;
  phoneNumber: string;
  state: string;
  terms: boolean;
  totalItem: number;
  totalPrice: number;
};
