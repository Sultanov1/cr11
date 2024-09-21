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
import { getItems } from './ItemThunk.ts';
import { API_URL } from '../../constants.ts';
import { selectItems, selectItemsLoading } from './ItemSlice.ts';

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

  if (loading) {
    return <Spinner />;
  }
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item key={item._id}>
          <LinkItem to={`/items/` + item._id}>
            <Card sx={{ maxWidth: 345, minWidth: 250 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="item"
                  height="140"
                  image={API_URL + '/' + item.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {item.price} KGS
                  </Typography>
                </CardContent>
              </CardActionArea>
              {item.owner._id === user?._id ? (
                <CardActions>
                  <Button size="small" color="error">
                    Delete
                  </Button>
                </CardActions>
              ) : null}
            </Card>
          </LinkItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default Items;
