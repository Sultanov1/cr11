import { NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2, background: '#22ca46' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            fontWeight={700}
            fontSize={24}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link to="/">Flea Market</Link>
          </Typography>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
