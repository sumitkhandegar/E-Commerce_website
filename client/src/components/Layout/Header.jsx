import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../context/auth';

function Header() {
  const location = useLocation(); 
  const [auth, setAuth] = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="bg-gray-800 fixed w-full z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className={`${menuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className={`${menuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center bg-gray-900 p-2 rounded-md">
              <ShoppingBagIcon className="h-6 w-6 text-white" />
              <span className="text-m font-medium text-white">TechHaven</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === '/' ? 'text-white underline' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} aria-current={location.pathname === '/' ? 'page' : undefined}>Home</Link>
                <Link to="/category" className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === '/category' ? 'text-white underline' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>Category</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">Open cart</span>
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <PersonIcon className="h-8 w-8 text-white border-2 border-gray-100 rounded-full" />
                </button>
              </div>

              <div className={`${userMenuOpen ? 'block' : 'hidden'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                {
                  !auth.user ? (<>
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Login</Link>
                    <Link to="/register" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Register</Link>
                    <Link to="/reset-password" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Forgot Password</Link>
                  </>) :(<>
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <span className="font-semibold">{auth.user.name}</span>
                    </div>
                    <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Dashboard</Link>
                    <Link to="/reset-password" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Update Password</Link>
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={handleSignOut} >Sign out</Link>
                  </>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${menuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link to="/" className={`block rounded-md bg-gray-900 px-3 py-2 text-base font-medium ${location.pathname === '/' ? 'text-white underline' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} aria-current={location.pathname === '/' ? 'page' : undefined}>Home</Link>
          <Link to="/category" className={`block rounded-md px-3 py-2 text-base font-medium ${location.pathname === '/category' ? 'text-white underline' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>Category</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
