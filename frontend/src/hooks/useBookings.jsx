import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../context/UserDetailContext';
import { getAllBookings } from '../utils/api';

const useBookings = () => {
    const { userDetails, setUserDetails } = useContext(UserDetailContext);
    const { user } = useAuth0();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["allBookings", user?.email, userDetails?.token],
        queryFn: () => getAllBookings(user?.email, userDetails?.token),
        onSuccess: (data) => setUserDetails((prev) => ({ ...prev, bookings: data })),
        enabled: !!user?.email && !!userDetails?.token,
        staleTime: 30000,
    });

    useEffect(() => {
        if (userDetails?.token) {
            refetch();
        }
    }, [userDetails?.token, refetch]);

    return { data, isError, isLoading, refetch };
};

export default useBookings;
