import React, { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';

const API_BASE = 'http://localhost:5000/api';

const PAGE_BG = '#fff';
const CARD_BG = '#181c2f';
const ACCENT = '#ffb400';
const TEXT_LIGHT = '#fff';
const TABLE_HEADER_BG = '#23263a';
const TABLE_ROW_ALT = '#23263a';

const cardStyle = {
  background: CARD_BG,
  borderRadius: '16px',
  boxShadow: '0 6px 32px rgba(24,28,47,0.10)',
  padding: '2.5rem',
  maxWidth: '520px',
  width: '100%',
  margin: '2.5rem auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: TEXT_LIGHT,
};
const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '1rem',
  width: '100%',
  background: '#23263a',
  color: '#fff', // Use white for text on dark input
  marginBottom: '0.5rem',
};
const buttonStyle = {
  padding: '0.75rem 1.5rem',
  borderRadius: '8px',
  border: 'none',
  background: `linear-gradient(90deg, ${ACCENT}, #ffd580)`,
  color: '#fff', // Use white for button text
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '0.5rem',
  transition: 'background 0.2s',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
};
const tableStyle = {
  borderCollapse: 'separate',
  borderSpacing: 0,
  width: '100%',
  margin: '1.5rem 0',
  background: CARD_BG,
  borderRadius: '12px',
  overflow: 'hidden',
  color: TEXT_LIGHT,
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
};
const thtdStyle = {
  padding: '0.85rem',
  borderBottom: '1px solid #ececec',
  textAlign: 'left',
  fontSize: '1rem',
};
const sectionTitle = {
  margin: '1.5rem 0 0.5rem',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  color: ACCENT,
  alignSelf: 'flex-start',
};
const errorStyle = {
  color: '#dc2626',
  background: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  margin: '1rem 0',
  width: '100%',
  textAlign: 'center',
};
const logoutBtn = {
  background: 'linear-gradient(135deg, #ff5858 0%, #f87171 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '2rem',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(255,88,88,0.15)',
  cursor: 'pointer',
  position: 'absolute',
  top: '-1.2rem',
  right: '-1.2rem',
  fontSize: '1.1rem',
  transition: 'background 0.2s, box-shadow 0.2s',
  zIndex: 2,
};

const TOURNAMENTS = [
  { name: 'FULL MAP', slots: 12 },
  { name: 'CLASH SQUAD', slots: 4 },
  { name: 'SOLO', slots: 2 },
];

function Admin() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(() => sessionStorage.getItem('adminToken') || '');
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');
  const [resettingTournament, setResettingTournament] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [confirmResetTournament, setConfirmResetTournament] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    if (token) {
      fetchSlots();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        sessionStorage.setItem('adminToken', data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const fetchSlots = async () => {
    try {
      const res = await fetch(`${API_BASE}/slots`);
      const data = await res.json();
      setSlots(data);
    } catch {
      setSlots([]);
    }
  };

  const handleReset = async (tournamentName) => {
    setConfirmResetTournament(tournamentName);
  };

  // Confirm reset modal logic
  const confirmReset = async () => {
    const tournamentName = confirmResetTournament;
    setResettingTournament(tournamentName);
    setError('');
    setConfirmResetTournament(null);
    try {
      const res = await fetch(`${API_BASE}/slots/reset?tournamentName=${encodeURIComponent(tournamentName)}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        fetchSlots();
        setModalMessage(data.message || `Slots reset for ${tournamentName}`);
      } else {
        setError(data.message || 'Reset failed');
        setModalMessage(data.message || 'Reset failed');
      }
    } catch {
      setError('Network error');
      setModalMessage('Network error');
    }
    setResettingTournament(null);
  };

  const handleLogout = () => {
    setConfirmLogout(true);
  };

  const confirmLogoutAction = () => {
    setToken('');
    sessionStorage.removeItem('adminToken');
    setSlots([]);
    setPassword('');
    setConfirmLogout(false);
  };

  // Modal component for user feedback
  const renderModal = () => (
    modalMessage && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(24,28,47,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: '#23263a',
          color: '#fff',
          borderRadius: '12px',
          padding: '2rem 2.5rem',
          boxShadow: '0 6px 32px rgba(24,28,47,0.18)',
          minWidth: '320px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>{modalMessage}</div>
          <button
            onClick={() => setModalMessage('')}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(90deg, #ffb400, #ffd580)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            Close
          </button>
        </div>
      </div>
    )
  );

  // Modal for confirming reset
  const renderConfirmModal = () => (
    confirmResetTournament && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(24,28,47,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: '#23263a',
          color: '#fff',
          borderRadius: '12px',
          padding: '2rem 2.5rem',
          boxShadow: '0 6px 32px rgba(24,28,47,0.18)',
          minWidth: '320px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
            Are you sure you want to reset all slots for <b>{confirmResetTournament}</b>?
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <button
              onClick={confirmReset}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(90deg, #ffb400, #ffd580)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmResetTournament(null)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: '#23263a',
                color: '#ffb400',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderColor: '#ffb400',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  const renderLogoutConfirmModal = () => (
    confirmLogout && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(24,28,47,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: '#23263a',
          color: '#fff',
          borderRadius: '12px',
          padding: '2rem 2.5rem',
          boxShadow: '0 6px 32px rgba(24,28,47,0.18)',
          minWidth: '320px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
            Are you sure you want to logout?
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <button
              onClick={confirmLogoutAction}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(90deg, #ffb400, #ffd580)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmLogout(false)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: '#23263a',
                color: '#ffb400',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderColor: '#ffb400',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', background: PAGE_BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleLogin} style={cardStyle}>
          <h2 style={{ marginBottom: '1.5rem', color: ACCENT }}>Admin Login</h2>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Admin Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: ACCENT,
                cursor: 'pointer',
                fontSize: '1.1rem',
                padding: 0
              }}
              tabIndex={-1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" disabled={resettingTournament} style={buttonStyle}>
            {resettingTournament ? 'Logging in...' : 'Login'}
          </button>
          {error && <div style={errorStyle}>{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, padding: '2rem 0' }}>
      <div style={cardStyle}>
        <div style={{ width: '100%', position: 'relative', marginBottom: '1.5rem' }}>
          <button
            onClick={handleLogout}
            style={logoutBtn}
            title="Logout"
          >
            <FiLogOut />
          </button>
          <h2 style={{ color: ACCENT, margin: 0, textAlign: 'center', fontWeight: 'bold', fontSize: '2rem' }}>Admin Panel</h2>
        </div>
        {error && <div style={errorStyle}>{error}</div>}
        {TOURNAMENTS.map((t, idx) => {
          // For CLASH SQUAD, show two tables: one for 4 slots, one for 2 slots
          // We'll distinguish by index for now
          const filteredSlots = slots.filter(slot => slot.tournamentName === t.name).slice(0, t.slots);
          return (
            <div key={idx} style={{ width: '100%', marginBottom: '2.5rem' }}>
              <div style={sectionTitle}>{t.name} ({t.slots} slots)</div>
              <button onClick={() => handleReset(t.name)} disabled={resettingTournament === t.name} style={buttonStyle}>
                {resettingTournament === t.name ? `Resetting ${t.name}...` : `Reset ${t.name} Slots`}
              </button>
              <div style={{ width: '100%', overflowX: 'auto', marginTop: '1rem' }}>
                <table style={{ ...tableStyle, background: CARD_BG, color: TEXT_LIGHT }}>
                  <thead style={{ background: TABLE_HEADER_BG }}>
                    <tr>
                      <th style={{ ...thtdStyle, color: ACCENT }}>Slot No.</th>
                      <th style={{ ...thtdStyle, color: ACCENT }}>User ID</th>
                      <th style={{ ...thtdStyle, color: ACCENT }}>Tournament Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSlots.map((slot, idx2) => (
                      <tr key={`${slot.tournamentName}-${slot.slotNumber}-${idx2}`} style={{ background: idx2 % 2 === 0 ? TABLE_ROW_ALT : CARD_BG }}>
                        <td style={thtdStyle}>{slot.slotNumber}</td>
                        <td style={thtdStyle}>{(slot.userIds && slot.userIds.length > 0) ? slot.userIds.join(', ') : '-'}</td>
                        <td style={thtdStyle}>{slot.tournamentName || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        {renderLogoutConfirmModal()}
        {renderConfirmModal()}
        {renderModal()}
      </div>
    </div>
  );
}

export default Admin; 