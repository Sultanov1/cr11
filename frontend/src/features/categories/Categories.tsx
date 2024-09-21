import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { getItems } from '../items/ItemThunk';
import { getCategories } from './categoriesThunk';
import { selectCategories } from './categoriesSlice';

const Categories = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const selectCategory = async (id: string) => {
    try {
      await dispatch(getItems(id));
    } catch (error) {
      console.error("Error fetching items for category:", error);
    }
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
              <ListItemText primary="All items" />
            </ListItemButton>
          </ListItem>
          {categories.length > 0 ? (
            categories.map((category) => (
              <ListItem key={category._id} disablePadding>
                <ListItemButton onClick={() => selectCategory(category._id)}>
                  <ListItemText primary={category.title} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No categories available" />
            </ListItem>
          )}
        </List>
      </nav>
    </Box>
  );
};

export default Categories;
