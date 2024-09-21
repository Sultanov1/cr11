import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories } from './categoriesSlice';
import { useEffect } from 'react';
import { getCategories } from './categoriesThunk';
import { getItems } from '../items/ItemsThunk.ts';

const Categories = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const selectCategory = async (id: string) => {
    await dispatch(getItems(id));
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        marginRight: '50px',
        borderRight: '1px solid gray',
      }}
    >
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => dispatch(getItems())}>
              <ListItemText>All items</ListItemText>
            </ListItemButton>
          </ListItem>
          {categories.map((category) => (
            <ListItem key={category._id} disablePadding>
              <ListItemButton onClick={() => selectCategory(category._id)}>
                <ListItemText>{category.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default Categories;