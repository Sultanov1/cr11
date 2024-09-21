import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { ItemMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories } from '../categories/categoriesSlice';
import { getCategories } from '../categories/categoriesThunk';
import { blue, green } from '@mui/material/colors';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { selectCreateItemLoading, selectItemError } from './ItemsSlice.ts';
import { createItem } from './ItemsThunk.ts';

const ItemForm = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [state, setState] = useState<ItemMutation>({
    category: '',
    title: '',
    price: '',
    description: '',
    image: null,
  });
  const error = useAppSelector(selectItemError);
  const loading = useAppSelector(selectCreateItemLoading);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createItem(state));
    setState({
      category: '',
      title: '',
      price: '',
      description: '',
      image: null,
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    }
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            id="category"
            label="Category"
            value={state.category}
            onChange={inputChangeHandler}
            name="category"
            required
          >
            <MenuItem value="" disabled>
              Please select a category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="price"
            label="Price"
            value={state.price}
            onChange={inputChangeHandler}
            name="price"
            required
            error={Boolean(getFieldError('price'))}
            helperText={getFieldError('price')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="description"
            label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <input
            style={{ display: 'none' }}
            type="file"
            name="image"
            onChange={fileInputChangeHandler}
            ref={inputRef}
          />
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                disabled
                label="Image"
                value={filename}
                onClick={activateInput}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={loading}
                sx={{ background: '#22ca46' }}
                onClick={activateInput}
              >
                Browse
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              disabled={loading}
              type="submit"
              sx={{ background: loading ? blue[500] : '#22ca46' }}
              variant="contained"
            >
              Create
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '6px',
                  left: '30px',
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;
