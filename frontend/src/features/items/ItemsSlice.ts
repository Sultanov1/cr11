import { Item, ValidationError } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createItem, getItemById, getItems } from './ItemsThunk.ts';

interface ItemsState {
  items: Item[];
  item: Item | null;
  itemsLoading: boolean;
  itemLoading: boolean;
  createLoading: boolean;
  itemError: ValidationError | null;
}

const initialState: ItemsState = {
  items: [],
  item: null,
  itemsLoading: false,
  itemLoading: false,
  createLoading: false,
  itemError: null,
};

const itemsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(createItem.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createItem.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createItem.rejected, (state, {payload: error}) => {
      state.createLoading = false;
      state.itemError = error || null;
    });
    builder.addCase(getItems.pending, (state) => {
      state.itemsLoading = true;
    });
    builder.addCase(
      getItems.fulfilled,
      (state, {payload: items}: PayloadAction<Item[]>) => {
        state.itemsLoading = false;
        state.items = items;
      },
    );
    builder.addCase(getItems.rejected, (state) => {
      state.itemsLoading = false;
    });
    builder.addCase(getItemById.pending, (state) => {
      state.itemLoading = true;
    });
    builder.addCase(
      getItemById.fulfilled,
      (state, {payload: item}: PayloadAction<Item>) => {
        state.itemLoading = false;
        state.item = item;
      },
    );
    builder.addCase(getItemById.rejected, (state) => {
      state.itemLoading = false;
    });
  },
  initialState,
  name: 'items',
  reducers: {},
});

export const itemsReducer = itemsSlice.reducer;
export const selectItems = (state: RootState) => state.items.items;
export const selectItem = (state: RootState) => state.items.item;
export const selectItemsLoading = (state: RootState) =>
  state.items.itemsLoading;
export const selectItemLoading = (state: RootState) => state.items.itemLoading;
export const selectItemError = (state: RootState) => state.items.itemError;
export const selectCreateItemLoading = (state: RootState) =>
  state.items.createLoading;
