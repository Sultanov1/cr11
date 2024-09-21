import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Grid>
      <Button
        sx={{ fontWeight: 600, fontSize: 18 }}
        component={NavLink}
        to="/register"
        color="inherit"
      >
        Register
      </Button>
      <Button
        sx={{ fontWeight: 600, fontSize: 18 }}
        component={NavLink}
        to="/login"
        color="inherit"
      >
        Log in
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;
