import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';

const Home = () => {

  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"TechHaven"}>
      <h1>Home Page</h1>

      <pre>{JSON.stringify(auth, null, 4)}</pre>

      <div className="p-32">
        <h1 className="p-32">Home Page</h1>
        <h1 className="p-32">Home Page</h1>
        <h1 className="p-32">Home Page</h1>
        <h1 className="p-32">Home Page</h1>
        <h1 className="p-32">Home Page</h1>
        <h1 className="p-32">Home Page</h1>
      </div>
      
    </Layout>
  )
}

export default Home;