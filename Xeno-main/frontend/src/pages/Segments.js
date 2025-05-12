import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Segments() {
  const [segments, setSegments] = useState([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState(null);
  const [matchedCustomers, setMatchedCustomers] = useState([]);

  useEffect(() => {
    axios.get('/api/segments')
      .then(res => setSegments(res.data))
      .catch(err => console.error("Failed to fetch segments:", err));
  }, []);

  const fetchMatchingCustomers = async (segmentId) => {
    try {
      const res = await axios.get(`/api/segments/${segmentId}/customers`);
      setMatchedCustomers(res.data);
      setSelectedSegmentId(segmentId);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
  };

  const containerStyle = {
    backgroundColor: '#0e0e1a',
    color: '#ffffff',
    padding: '2rem',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem'
  };

  const cardStyle = {
    backgroundColor: '#1a1a2e',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.3)'
  };

  const buttonStyle = {
    marginTop: '1rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer'
  };

  const ruleList = (rules) => (
    <ul style={{ margin: '0.5rem 0 0 1rem', fontSize: '0.9rem', color: '#ddd' }}>
      {rules.map((rule, i) => (
        <li key={i}>
          <code>{rule.field} {rule.operator} {rule.value}</code>
        </li>
      ))}
    </ul>
  );

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Audience Segments</h2>

      {segments.length === 0 ? (
        <p style={{ color: '#aaa' }}>No segments created yet.</p>
      ) : (
        <div style={gridStyle}>
          {segments.map(seg => (
            <div key={seg._id} style={cardStyle}>
              <h3 style={{ fontSize: '1.2rem' }}>{seg.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#bbb' }}>Logic: <strong>{seg.logic}</strong></p>
              <div>
                <strong>Rules:</strong>
                {ruleList(seg.rules)}
              </div>
              <button onClick={() => fetchMatchingCustomers(seg._id)} style={buttonStyle}>
                View Matching Customers
              </button>
            </div>
          ))}
        </div>
      )}

      {matchedCustomers.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem' }}>Matched Customers</h3>
          <ul style={{ marginTop: '1rem', listStyleType: 'none', paddingLeft: 0 }}>
            {matchedCustomers.map(c => (
              <li key={c._id} style={{ marginBottom: '0.75rem', background: '#1a1a2e', padding: '1rem', borderRadius: '8px' }}>
                <strong>{c.name}</strong> — {c.email} <br />
                <span style={{ color: '#aaa' }}>Spend: {c.spend} | Visits: {c.visits} | Last Active: {c.lastActiveDaysAgo} days ago</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
