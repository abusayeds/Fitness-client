import { useAppSelector } from "../redux/hooks"

export const usecategory = () => {
 useAppSelector((state) => state.products.products)
}