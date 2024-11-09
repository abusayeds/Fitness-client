import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterItem {
  name: string;
  value: number | string;
}

interface FilterState {
  productfilter: FilterItem[];
}
const loadFiltersFromLocalStorage = (): FilterItem[] => {
  const savedFilters = localStorage.getItem("productFilter");
  return savedFilters
    ? JSON.parse(savedFilters)
    : [
        {
          name: "limit",
          value: 10,
        },
      ];
};
const saveFiltersToLocalStorage = (filters: FilterItem[]) => {
  localStorage.setItem("productFilter", JSON.stringify(filters));
};

const initialState: FilterState = {
  productfilter: loadFiltersFromLocalStorage(),
};

const filterSlice = createSlice({
  name: "ProductFilter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterItem>) => {
      const trimmedName = action.payload.name.trim();
      const existingItem = state.productfilter.find(
        (item) => item.name === trimmedName
      );
      if (existingItem) {
        existingItem.value = action.payload.value;
      } else {
        state.productfilter.push({
          name: trimmedName,
          value: action.payload.value,
        });
      }
      saveFiltersToLocalStorage(state.productfilter);
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
