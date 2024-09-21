import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/Spinner/Spinner';
import { Box, Typography } from '@mui/material';
import { selectItem, selectItemLoading } from './ItemsSlice.ts';
import { getItemById } from './ItemsThunk.ts';
import { BASE_URL } from '../../constants.ts';

const ItemPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectItem);
  const loading = useAppSelector(selectItemLoading);

  useEffect(() => {
    dispatch(getItemById(id));
  }, [dispatch, id]);

  if (loading || !item) {
    return <Spinner />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Box
        sx={{
          background: '#DAE0E6',
          padding: '20px',
          display: 'flex',
          borderRadius: '10px',
          rowGap: '20px',
          width: '60%',
        }}
      >
        <Box>
          <img
            style={{ maxWidth: 400, minWidth: 200 }}
            src={BASE_URL + '/' + item.image}
            alt="imageItem"
          />
        </Box>
        <Box
          sx={{
            marginLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Title:</Typography>
            <Typography>{item.title}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Description:</Typography>
            <Typography>{item.description}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Price:</Typography>
            <Typography>{item.price} KGS</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Owner:</Typography>
            <Typography>{item.owner.nickname}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Phone:</Typography>
            <Typography>{item.owner.phone}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemPage;
