import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { selectUser } from '../users/usersSlice';
import { selectItems, selectItemsLoading } from './ItemsSlice.ts';
import { deleteItem, getItems } from './ItemsThunk.ts';
import { BASE_URL } from '../../constants.ts';

const Items = () => {
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectItemsLoading);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const LinkItem = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  });

  const handleDelete = async (id: string) => {
    await dispatch(deleteItem(id));
    await dispatch(getItems());
  };

  if (loading) {
    return <Spinner />;
  }

  if (items && items.length === 0) {
    return <Typography variant="h2">No items!</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item key={item._id}>
          <Card sx={{ maxWidth: 345, minWidth: 250 }}>
            <CardActionArea>
              <LinkItem to={`/items/` + item._id}>
                <CardMedia
                  component="img"
                  alt="item"
                  height="140"
                  image={BASE_URL + '/' + item.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {item.price} KGS
                  </Typography>
                </CardContent>
              </LinkItem>
            </CardActionArea>
            {item.owner._id === user?._id && user ? (
              <CardActions>
                <Button
                  onClick={() => handleDelete(item._id)}
                  size="small"
                  color="error"
                >
                  Delete
                </Button>
              </CardActions>
            ) : null}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Items;
