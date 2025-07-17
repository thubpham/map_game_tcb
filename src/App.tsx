// App.tsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InteractiveMap from './pages/InteractiveMap';
import Header from './components/layout/Header';
import PageWrapper from './components/layout/PageWrapper';

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<InteractiveMap />} />
        </Routes>
      </PageWrapper>
    </div>
  );
};

export default App;