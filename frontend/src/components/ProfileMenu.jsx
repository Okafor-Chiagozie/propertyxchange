import React, { useState } from 'react';
import { Avatar, Menu, Loader } from "@mantine/core";
import { useNavigate } from 'react-router-dom';

const PROFILE_ROUTES = {
  FAVOURITES: './favourites',
  BOOKINGS: './bookings',
};

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      localStorage.clear();
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt='userImg' radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item onClick={() => navigate(PROFILE_ROUTES.FAVOURITES, { replace: true })}>
          Favourites
        </Menu.Item>
        <Menu.Item onClick={() => navigate(PROFILE_ROUTES.BOOKINGS, { replace: true })}>
          Bookings
        </Menu.Item>
        <Menu.Label>Go back</Menu.Label>
        <Menu.Item
          onClick={handleLogout}
          color='red'
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader size="sm" />
          ) : (
            'Logout'
          )}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;