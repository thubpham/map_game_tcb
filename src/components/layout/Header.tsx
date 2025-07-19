import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Map, LayoutDashboard, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: '#4f46e5', // indigo-600
    borderBottom: '2px solid #4f46e5',
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Name */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-indigo-600">
              Techcombank Loyalty
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex md:space-x-8">
            <NavLink
              to="/"
              className="flex items-center text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </NavLink>
            <NavLink
              to="/map"
              className="flex items-center text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <Map className="mr-2 h-5 w-5" />
              Interactive Map
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className="flex items-center text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </NavLink>
            <NavLink
              to="/map"
              className="flex items-center text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              <Map className="mr-2 h-5 w-5" />
              Interactive Map
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
