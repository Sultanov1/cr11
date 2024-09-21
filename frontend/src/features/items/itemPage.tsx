import Items from './Items';
import { Box } from '@mui/material';
import Categories from '../categories/Categories.tsx';

const ItemsPage = () => {
  return (
    <Box display="flex">
      <Categories />
      <Items />
    </Box>
  );
};

export default ItemsPage;
