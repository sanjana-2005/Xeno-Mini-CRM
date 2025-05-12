import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/campaigns').then(res => setCampaigns(res.data));
  }, []);

  return (
    <div style={{ padding: '2rem', background: '#0e0e1a', color: 'white', minHeight: '100vh' }}>
      <h2>📢 Campaign History</h2>
      <table style={{ width: '100%', marginTop: '2rem', background: '#1a1a2e', color: 'white' }}>
        <thead>
          <tr>
            <th>Name</th><th>Audience</th><th>Sent</th><th>Failed</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.audienceSize}</td>
              <td>{c.sent}</td>
              <td>{c.failed}</td>
              <td>{new Date(c.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
