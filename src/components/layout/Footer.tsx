import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Map, LayoutDashboard, Menu, X } from 'lucide-react';

const Footer = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: '#4f46e5', // indigo-600
    borderBottom: '2px solid #4f46e5',
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <footer className="bg-white shadow-md fixed bottom-0 left-0 right-0 z-[100]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:justify-center">
          {/* Mobile menu button - visible only on mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-8 w-8" aria-hidden="true" />
              ) : (
                <Menu className="block h-8 w-8" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Navigation Links - Desktop (small) & Mobile (full screen) */}
          <nav className="flex space-x-4 md:space-x-8 w-full justify-around md:justify-center">
            <NavLink
              to="/"
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 px-4 py-3 rounded-md text-sm font-medium transition-colors md:text-base"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <LayoutDashboard className="h-6 w-6 md:h-8 md:w-8" />
              <span className="mt-1 text-xs md:text-sm">Dashboard</span>
            </NavLink>
            <NavLink
              to="/map"
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 px-4 py-3 rounded-md text-sm font-medium transition-colors md:text-base"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <Map className="h-6 w-6 md:h-8 md:w-8" />
              <span className="mt-1 text-xs md:text-sm">Interactive Map</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Mobile menu panel - full screen */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center">
          <div className="px-2 pt-2 pb-3 space-y-6 sm:px-3 w-full text-center">
            <NavLink
              to="/"
              className="flex items-center justify-center text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium text-3xl"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              <LayoutDashboard className="mr-2 h-10 w-10" />
              Dashboard
            </NavLink>
            <NavLink
              to="/map"
              className="flex items-center justify-center text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium text-3xl"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              <Map className="mr-2 h-10 w-10" />
              Interactive Map
            </NavLink>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
