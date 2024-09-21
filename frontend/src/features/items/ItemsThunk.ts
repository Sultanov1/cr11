import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item, ItemMutation, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi.ts';

export const createItem = createAsyncThunk<
  void,
  ItemMutation,
  { state: RootState; rejectValue: ValidationError }
>('items/create', async (item, { getState, rejectWithValue }) => {
  try {
    const token = getState().users.user?.token;
    const userId = getState().users.user?._id;
    const formData = new FormData();
    formData.append('title', item.title);
    formData.append('description', item.description);
    formData.append('price', item.price);
    if (userId) {
      formData.append('owner', userId);
    }
    formData.append('category', item.category);
    if (item.image) {
      formData.append('image', item.image);
    }
    await axiosApi.post('/items', formData, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const getItems = createAsyncThunk<Item[], string | undefined>(
  'items/getAll',
  async (categoryId) => {
    let items: Item[] = [];
    if (categoryId) {
      const response = await axiosApi.get<Item[]>(`/categories/${categoryId}`);
      items = response.data;
    } else {
      const response = await axiosApi.get<Item[]>('/items');
      items = response.data;
    }
    return items;
  },
);

export const getItemById = createAsyncThunk<Item, string>(
  'items/getOne',
  async (id) => {
    const response = await axiosApi.get<Item>(`/items/${id}`);
    if (!response.data) {
      throw new Error('No found!');
    }
    return response.data;
  },
);

export const deleteItem = createAsyncThunk<void, string, { state: RootState }>(
  'items/delete',
  async (id, { getState }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`/items/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
  },
);
