import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../context/UserDetailContext';
import { useMutation } from 'react-query';
import { createUser } from '../utils/api';
import useFavourites from '../hooks/useFavourites';
import useBookings from '../hooks/useBookings';

const Layout = () => {
  useFavourites();
  useBookings();

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0(); // Use getAccessTokenSilently instead
  const { setUserDetails } = useContext(UserDetailContext);
  const { mutate } = useMutation(createUser);

  useEffect(() => {
    if(!window) {
      return;
    }

    const getTokenAndRegister = async () => {
      try {
        let token = localStorage.getItem('propertyxchange_access_token');
        console.log("Before fetch: ", token);
        if (!token) {
          token = await getAccessTokenSilently();

          console.log("After fetch: ", token);
          localStorage.setItem('propertyxchange_access_token', token);
        }

        if (user?.email) {
          setUserDetails((prev) => ({ ...prev, token }));
          mutate(user.email, token);
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    if (isAuthenticated && user?.email) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, user?.email, getAccessTokenSilently, setUserDetails, mutate]);

  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
