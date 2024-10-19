import { useAppSelector } from "../redux/hooks";

export const Usecategory = () => {
  useAppSelector((state) => state.products.products);
};
