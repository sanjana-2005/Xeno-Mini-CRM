import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SegmentBuilder() {
  const [segmentName, setSegmentName] = useState('');
  const [rules, setRules] = useState([{ field: '', operator: '', value: '' }]);
  const [logic, setLogic] = useState('AND');
  const [audienceSize, setAudienceSize] = useState(null);
  const navigate = useNavigate();

  const fields = ['spend', 'visits', 'lastActiveDaysAgo'];
  const operators = ['>', '<', '='];

  const updateRule = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
  };

  const addRule = () => {
    setRules([...rules, { field: '', operator: '', value: '' }]);
  };

  const previewAudience = async () => {
    try {
      const res = await axios.post('/api/segments/preview', { rules, logic });
      setAudienceSize(res.data.audienceSize);
    } catch (err) {
      alert('Failed to preview audience');
    }
  };

  const saveSegment = async () => {
    try {
      const payload = { name: segmentName, rules, logic };
      const res = await axios.post('/api/segments', payload);
      navigate('/segments');
    } catch (err) {
      console.error('Save segment error:', err.response?.data || err.message);
      alert('Failed to save segment');
    }
  };

  return (
    <div style={{ background: '#0d0d14', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        padding: '2rem',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ marginBottom: '0.25rem' }}>Create New Segment</h2>
        <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '1.5rem' }}>
          Define a new customer segment with rules.
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
          <input
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Enter segment name"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              background: '#2b2b40',
              border: '1px solid #444',
              color: '#fff',
              marginTop: '0.25rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label>Combine Rules With</label>
          <select
            value={logic}
            onChange={(e) => setLogic(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              background: '#2b2b40',
              border: '1px solid #444',
              color: '#fff',
              marginTop: '0.25rem'
            }}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>

        <div>
          <label style={{ marginBottom: '0.5rem', display: 'block' }}>Rules</label>
          {rules.map((rule, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <select
                value={rule.field}
                onChange={(e) => updateRule(index, 'field', e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  background: '#2b2b40',
                  color: '#fff',
                  border: '1px solid #444'
                }}
              >
                <option value="">Field</option>
                {fields.map(f => <option key={f} value={f}>{f}</option>)}
              </select>

              <select
                value={rule.operator}
                onChange={(e) => updateRule(index, 'operator', e.target.value)}
                style={{
                  width: 80,
                  padding: '8px',
                  borderRadius: '6px',
                  background: '#2b2b40',
                  color: '#fff',
                  border: '1px solid #444'
                }}
              >
                <option value="">Op</option>
                {operators.map(op => <option key={op} value={op}>{op}</option>)}
              </select>

              <input
                type="text"
                value={rule.value}
                onChange={(e) => updateRule(index, 'value', e.target.value)}
                placeholder="Value"
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  background: '#2b2b40',
                  color: '#fff',
                  border: '1px solid #444'
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={addRule}
            style={{
              padding: '10px 16px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            + Add Rule
          </button>

          <button
            onClick={previewAudience}
            style={{
              padding: '10px 16px',
              backgroundColor: '#8b5cf6',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            👁 Preview Audience
          </button>
        </div>

        {audienceSize !== null && (
          <p style={{ marginBottom: '1rem', color: '#90ee90' }}>
            🎯 Estimated Audience: <strong>{audienceSize}</strong>
          </p>
        )}

        <button
          onClick={saveSegment}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#22c55e',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          💾 Create Segment
        </button>
      </div>
    </div>
  );
}
