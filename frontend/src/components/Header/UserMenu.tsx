import React, { useState } from 'react';
import { User } from '../../types';
import { Button, Menu, MenuItem, styled } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunk';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const LinkItem = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.nickname}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem>
          <LinkItem to={'/submit'}>Create Item</LinkItem>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;