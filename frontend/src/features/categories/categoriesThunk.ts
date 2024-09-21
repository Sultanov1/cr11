import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getCategories = createAsyncThunk<Category[]>(
  'categories/getAll',
  async () => {
    const response = await axiosApi.get<Category[]>('/categories');
    return response.data;
  },
);
