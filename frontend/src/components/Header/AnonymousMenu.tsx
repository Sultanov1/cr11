import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Grid item>
      <Button
        sx={{ fontWeight: 600, fontSize: 18 }}
        component={NavLink}
        to="/register"
        color="inherit"
      >
        Sign Up
      </Button>
      <Button
        sx={{ fontWeight: 600, fontSize: 18 }}
        component={NavLink}
        to="/login"
        color="inherit"
      >
        Sign In
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;