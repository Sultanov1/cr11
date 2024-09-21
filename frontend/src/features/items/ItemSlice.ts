import { Item } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getItems } from './ItemThunk.ts';

interface ItemsState {
  items: Item[];
  itemsLoading: boolean;
}

const initialState: ItemsState = {
  items: [],
  itemsLoading: false,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.itemsLoading = false;
    });
    builder.addCase(
      getItems.fulfilled,
      (state, { payload: items }: PayloadAction<Item[]>) => {
        state.itemsLoading = false;
        state.items = items;
      },
    );
    builder.addCase(getItems.rejected, (state) => {
      state.itemsLoading = false;
    });
  },
});

export const itemsReducer = itemsSlice.reducer;
export const selectItems = (state: RootState) => state.items.items;
export const selectItemsLoading = (state: RootState) =>
  state.items.itemsLoading;
