import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get('http://localhost:5000/api/customers');
    setCustomers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/customers', form);
    setForm({ name: '', email: '', phone: '' });
    setShowModal(false);
    fetchCustomers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this customer?')) {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      fetchCustomers();
    }
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    page: { backgroundColor: '#0e0e1a', color: 'white', minHeight: '100vh', padding: '2rem', fontFamily: 'Segoe UI' },
    headerRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' },
    title: { fontSize: '2.5rem', fontWeight: 'bold' },
    description: { color: '#ccc' },
    searchBox: {
      width: '100%', padding: '0.75rem 1rem', fontSize: '1rem',
      borderRadius: '8px', backgroundColor: '#1a1a2e', color: '#fff', border: '1px solid #333', marginBottom: '2rem'
    },
    createBtn: {
      padding: '10px 18px', backgroundColor: '#fff', color: '#0e0e1a',
      fontWeight: 'bold', fontSize: '1rem', borderRadius: '8px', border: 'none', cursor: 'pointer'
    },
    grid: {
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem'
    },
    card: {
      backgroundColor: '#1a1a2e', border: '1px solid #2e2e3e',
      borderRadius: '10px', padding: '1.5rem'
    },
    cardHeader: { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' },
    cardText: { color: '#aaa', fontSize: '0.95rem', marginBottom: '0.3rem' },
    footer: { display: 'flex', justifyContent: 'space-between', marginTop: '1rem' },
    btn: {
      backgroundColor: '#9370db', color: '#fff', border: 'none',
      padding: '6px 12px', borderRadius: '6px', cursor: 'pointer'
    },
    deleteBtn: { backgroundColor: '#d9534f' },
    // Modal
    modalOverlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    modalContent: {
      backgroundColor: '#1e1e2e', padding: '2rem', borderRadius: '10px',
      width: '90%', maxWidth: '400px', color: 'white'
    },
    modalInput: {
      width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '6px',
      border: '1px solid #555', backgroundColor: '#2a2a3d', color: '#fff'
    },
    modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px' }
  };

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <div style={styles.title}>Customers</div>
          <div style={styles.description}>Manage your customer records</div>
        </div>
        <button style={styles.createBtn} onClick={() => setShowModal(true)}>＋ Add Customer</button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search customers..."
        style={styles.searchBox}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.grid}>
        {filteredCustomers.map((cust) => (
          <div key={cust._id} style={styles.card}>
            <div style={styles.cardHeader}>{cust.name}</div>
            <div style={styles.cardText}>📧 {cust.email}</div>
            <div style={styles.cardText}>📱 {cust.phone}</div>
            <div style={styles.footer}>
              <button style={styles.btn}>Edit</button>
              <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => handleDelete(cust._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Add Customer</h3>
            <form onSubmit={handleSubmit}>
              <input
                style={styles.modalInput}
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                style={styles.modalInput}
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                style={styles.modalInput}
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} style={{ ...styles.btn, backgroundColor: '#444' }}>
                  Cancel
                </button>
                <button type="submit" style={styles.btn}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
