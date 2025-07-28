import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Map, LayoutDashboard, Medal } from 'lucide-react';

const Footer: FC = () => {
  // Style for the active navigation link
  const activeLinkStyle = {
    color: '#FFB300', // amber-600
    borderBottom: '2px solid #FFB300',
  };

  return (
    <footer className="bg-white shadow-md fixed bottom-0 left-0 right-0 z-[100]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:justify-center">
          <nav className="flex space-x-4 md:space-x-8 w-full justify-around md:justify-center">
            <NavLink
              to="/"
              className="flex flex-col items-center text-gray-600 hover:text-amber-600 px-4 py-3 rounded-md text-sm font-medium transition-colors md:text-base"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <LayoutDashboard className="h-6 w-6 md:h-8 md:w-8" />
              <span className="mt-1 text-xs md:text-sm">Dashboard</span>
            </NavLink>
            <NavLink
              to="/leaderboard"
              className="flex flex-col items-center text-gray-600 hover:text-amber-600 px-4 py-3 rounded-md text-sm font-medium transition-colors md:text-base"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <Medal className="h-6 w-6 md:h-8 md:w-8" />
              <span className="mt-1 text-xs md:text-sm">Leader Board</span>
            </NavLink>
            <NavLink
              to="/map"
              className="flex flex-col items-center text-gray-600 hover:text-amber-600 px-4 py-3 rounded-md text-sm font-medium transition-colors md:text-base"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <Map className="h-6 w-6 md:h-8 md:w-8" />
              <span className="mt-1 text-xs md:text-sm">Interactive Map</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;