import { NavLink } from 'react-router-dom';
import { Map, LayoutDashboard } from 'lucide-react';

const Header = () => {
  // Style for the active NavLink
  const activeLinkStyle = {
    color: '#4f46e5', // indigo-600
    borderBottom: '2px solid #4f46e5',
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

          {/* Navigation Links */}
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
    </header>
  );
};

export default Header;