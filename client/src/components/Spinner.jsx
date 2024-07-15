import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => prevValue - 1)
        }, 1000);

        if (count === 0) {
            navigate(`/${path}`, { state: { from: location.pathname } });
        }

        return () => clearInterval(interval);
    }, [count, navigate, path, location]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div>
                <h1 className="text-center">Redirecting you in {count} seconds</h1>
            </div>
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;