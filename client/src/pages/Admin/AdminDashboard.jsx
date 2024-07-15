import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
        <div className="m-2">
          <div className="flex flex-row flex-wrap">
            <div className="mx-2 md:w-1/4">
              <AdminMenu />
            </div>
            <div className="mx-2 md:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-4">
                <h1>Admin Name : {auth?.user?.name}</h1>
                <h1>Admin Email : {auth?.user?.email}</h1>
                <h1>Admin Contact : {auth?.user?.phone}</h1>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};
export default AdminDashboard;