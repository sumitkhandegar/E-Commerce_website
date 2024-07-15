import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth(); 
    const authURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await axios.get(`${authURL}/api/techhaven/auth/admin-auth`);
                if (response.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error("Auth check failed", error);
                setOk(false);
            }
        };

        if (auth?.token) {
            authCheck();
        } else {
            setOk(false);
        }
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="" />;
}
