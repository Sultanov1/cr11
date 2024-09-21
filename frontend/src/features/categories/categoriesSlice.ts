import { Category } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from './categoriesThunk';
import { RootState } from '../../app/store';

interface CategoriesState {
  categories: Category[];
  categoriesLoading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  categoriesLoading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.categoriesLoading = true;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state, { payload: categories }: PayloadAction<Category[]>) => {
        state.categoriesLoading = false;
        state.categories = categories;
      },
    );
    builder.addCase(getCategories.rejected, (state) => {
      state.categoriesLoading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) =>
  state.categories.categories;
