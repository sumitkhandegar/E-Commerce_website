import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';

const Orders = () => {
  return (
    <Layout>
        <div className="m-2">
          <div className="flex flex-row flex-wrap">
            <div className="mx-2 md:w-1/4">
              <UserMenu />
            </div>
            <div className="mx-2 md:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-4">
                <h1>All Orders</h1>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Orders;