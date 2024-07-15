import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 

const AdminMenu = () => {
  const location = useLocation(); 

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <ul className="space-y-2">
        <h4 className="text-gray-700 text-lg font-semibold mb-2">Admin Panel</h4>
        <li>
          <Link to="/dashboard/admin"
            className={`block px-4 py-2 text-sm text-gray-700 ${location.pathname === '/dashboard/admin' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 hover:text-gray-900'}`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dashboard/admin/add-category"
            className={`block px-4 py-2 text-sm text-gray-700 ${location.pathname === '/dashboard/admin/add-category' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 hover:text-gray-900'}`}>
            Category
          </Link>
        </li>
        <li>
          <Link to="/dashboard/admin/add-product"
            className={`block px-4 py-2 text-sm text-gray-700 ${location.pathname === '/dashboard/admin/add-product' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 hover:text-gray-900'}`}>
            Product
          </Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users"
            className={`block px-4 py-2 text-sm text-gray-700 ${location.pathname === '/dashboard/admin/add-users' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 hover:text-gray-900'}`}>
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
