import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Help from './pages/Help';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Register from './pages/Auth/Register';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddCategory from './pages/Admin/AddCategory';
import AddProduct from './pages/Admin/AddProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Product from './pages/Admin/Product';
import Search from './pages/SearchResults';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/product/:slug' element={<ProductDetails />} />
                {/* user */}
                <Route path='/dashboard' element={<PrivateRoute />}>
                    <Route path="user" element={<Dashboard />} />
                    <Route path="user/profile" element={<Profile />} />
                    <Route path="user/orders" element={<Orders />} />
                </Route>
                {/* admin */}
                <Route path='/dashboard' element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/add-category" element={<AddCategory />} />
                    <Route path="admin/add-product" element={<AddProduct />} />
                    <Route path="admin/products" element={<Product />} />
                    <Route path="admin/users" element={<Users />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/reset-password' element={<ForgotPassword />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/policy' element={<Policy />} />
                <Route path='/help' element={<Help />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
