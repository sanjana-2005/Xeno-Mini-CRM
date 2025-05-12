import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Segments from './pages/Segments';
import SegmentBuilder from './pages/SegmentBuilder';
import Campaign from './pages/Campaign';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Customers */}
        <Route path="/customers" element={<Customers />} />

        {/* Segments */}
        <Route path="/segments" element={<Segments />} />
        <Route path="/segments/new" element={<SegmentBuilder />} />
        
        {/* Campaigns */}
        <Route path="/campaign" element={<Campaign />} />

        {/* Optional: Catch-all for 404 */}
        <Route path="*" element={<h2 style={{ padding: '2rem' }}>404 Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
