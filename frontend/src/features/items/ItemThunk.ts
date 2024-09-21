import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getItems = createAsyncThunk<Item[], string | undefined>(
  'items/getAll',
  async (categoryId) => {
    let items: Item[] = [];
    if (categoryId) {
      const response = await axiosApi.get<Item[]>(`/items/${categoryId}`);
      items = response.data;
    } else {
      const response = await axiosApi.get<Item[]>('/items');
      items = response.data;
    }
    return items;
  },
);
