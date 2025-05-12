import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    customers: 0,
    segments: 0,
    campaigns: 0,
    activeCampaigns: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const customers = await axios.get('http://localhost:5000/api/customers');
        const segments = await axios.get('http://localhost:5000/api/segments');
        const campaigns = await axios.get('http://localhost:5000/api/campaigns');

        setStats({
          customers: customers.data.length,
          segments: segments.data.length,
          campaigns: campaigns.data.length,
          activeCampaigns: campaigns.data.filter(c => c.sent > 0 && c.failed === 0).length
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  const cardStyle = {
    backgroundColor: '#1a1a2e',
    borderRadius: '10px',
    padding: '1.5rem',
    flex: '1',
    margin: '0.5rem',
    textAlign: 'center',
    color: 'white',
  };

  const quickBtn = {
    backgroundColor: '#fff',
    color: '#000',
    padding: '12px',
    marginBottom: '1rem',
    width: '100%',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none'
  };

  return (
    <div style={{ backgroundColor: '#0e0e1a', minHeight: '100vh', color: 'white', padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome back, Test User! Here's an overview of your CRM platform.</p>

      {/* Metrics */}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem' }}>
        <div style={cardStyle}>
          <h3>Total Customers</h3>
          <p style={{ fontSize: '2rem' }}>{stats.customers}</p>
          <p>Active customers in your database</p>
        </div>
        <div style={cardStyle}>
          <h3>Segments</h3>
          <p style={{ fontSize: '2rem' }}>{stats.segments}</p>
          <p>Customer segments created</p>
        </div>
        <div style={cardStyle}>
          <h3>Campaigns</h3>
          <p style={{ fontSize: '2rem' }}>{stats.campaigns}</p>
          <p>Total campaigns created</p>
        </div>
        <div style={cardStyle}>
          <h3>Active Campaigns</h3>
          <p style={{ fontSize: '2rem' }}>{stats.activeCampaigns}</p>
          <p>Currently running campaigns</p>
        </div>
      </div>

      {/* Activity + Quick Actions */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
        {/* Recent Activity */}
        <div style={{ flex: 2 }}>
          <h3>Recent Activity</h3>
          <div style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '10px',
            padding: '2rem',
            marginTop: '1rem',
            color: '#aaa'
          }}>
            No recent activity to display.
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ flex: 1 }}>
          <h3>Quick Actions</h3>
          <div style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '10px',
            padding: '1.5rem',
            marginTop: '1rem'
          }}>
            <button style={quickBtn} onClick={() => navigate('/campaigns')}>
              Create New Campaign
            </button>
            <button style={quickBtn} onClick={() => navigate('/segments/new')}>
              Create New Segment
            </button>
            <button style={quickBtn} onClick={() => navigate('/customers')}>
              Import Customers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
