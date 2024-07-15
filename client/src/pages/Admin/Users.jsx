import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

const Users = () => {
  return (
    <Layout>
        <div className="flex flex-row flex-wrap m-2">
            <div className="mx-2 md:w-1/4">
                <AdminMenu />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 mx-2 md:w-1/3">
                <h1>All Users</h1>
            </div>
        </div>
    </Layout>
  )
}

export default Users;