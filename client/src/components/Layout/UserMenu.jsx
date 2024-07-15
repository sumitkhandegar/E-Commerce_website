import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 

const UserMenu = () => {
  const location = useLocation(); 

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <ul className="space-y-2">
        <h4 className="text-gray-700 text-lg font-semibold mb-2">Dashboard</h4>
        <li>
          <Link to="/dashboard/user"
            className={`block px-4 py-2 text-sm text-gray-700 ${location.pathname === '/dashboard/user' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 hover:text-gray-900'}`}>
            Dashboard Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard/user/profile"
            className={`block px-4 py-2 text-sm text-gray-700 ${location.pathname === '/dashboard/user/profile' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 hover:text-gray-900'}`}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/dashboard/user/orders"
            className={`block px-4 py-2 text-sm text-gray-700 ${location.pathname === '/dashboard/user/orders' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 hover:text-gray-900'}`}>
            My Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
