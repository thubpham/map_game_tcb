// App.tsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InteractiveMap from './pages/InteractiveMap';
import FriendsCompetitionDashboard from './pages/FriendsCompetitionDashboard';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import PageWrapper from './components/layout/PageWrapper';

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <PageWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/leaderboard" element={<FriendsCompetitionDashboard />} />
        </Routes>
      </PageWrapper>
      <Footer />
    </div>
  );
};

export default App;