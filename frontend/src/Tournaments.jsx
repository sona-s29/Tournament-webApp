import React, { useState, useEffect } from 'react';
import './Tournaments.css';
import { useNavigate, Link } from 'react-router-dom';
import fullMapImg from './assets/brsquad.png';
import clashSquad2v2Img from './assets/clashsquad2v2.png';
import clashSquad1v1Img from './assets/clashsquad1v1.png';

const maxSlotsArr = [12, 4, 2];

const tournaments = [
  {
    id: 'full-map',
    name: 'FULL MAP',
    title: 'FULL MAP',
    description: 'BR Per kill Squad Tournament',
    image: fullMapImg,
    details: [
      { label: 'Entry fee', value: '₹40' },
      { label: 'Per kill', value: '₹7' },
      { label: 'Booyah bonus', value: '₹40' },
    ],
  },
  {
    id: 'clash-squad-2v2',
    name: 'CLASH SQUAD',
    title: 'CLASH SQUAD',
    description: '2V2 Onetap Custom',
    image: clashSquad2v2Img,
    details: [
      { label: 'Entry fee', value: '₹25' },
      { label: 'Booyah bonus', value: '₹85(to duo)' },
    ],
  },
  {
    id: 'clash-squad-1v1',
    name: 'SOLO',
    title: 'CLASH SQUAD',
    description: '1V1 Onetap Custom',
    image: clashSquad1v1Img, // Replace with a SOLO image if you have one
    details: [
      { label: 'Entry fee', value: '₹20' },
      { label: 'Win', value: '₹50' },
    ],
  },
];

function Tournaments() {
  // Remove all backend/API code and use only static data
  const [slots, setSlots] = useState([0, 0, 0]); // static slots, or remove slot bar if you want
  const [loading, setLoading] = useState(false);

  const [modalStep, setModalStep] = useState(null); // null, 'uid', 'pay', 'success'
  const [currentIdx, setCurrentIdx] = useState(null);
  const [uid, setUid] = useState('');
  const [showModal, setShowModal] = useState(false);
  // Add state for player names
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);
  const [modalMessage, setModalMessage] = useState('');

  // Map tournament id to index
  const idToIdx = Object.fromEntries(tournaments.map((t, i) => [t.id, i]));

  // Fetch slots from backend
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(tournaments.map(async (t, idx) => {
          const res = await fetch(`http://localhost:5000/api/slots?tournamentName=${encodeURIComponent(t.name)}`);
          const data = await res.json();
          // Count filled slots (userIds.length > 0)
          return Array.isArray(data) ? data.filter(slot => slot.userIds && slot.userIds.length > 0).length : 0;
        }));
        setSlots(results);
      } catch {
        setSlots([0, 0, 0]);
      }
      setLoading(false);
    };
    fetchSlots();
  }, []);

  // Remove useEffect that fetches from backend
  // Remove handlePayment and backend join logic
  const handlePayment = async () => {
    // Prepare data for backend
    const userIds = playerNames.map(name => name.trim()).filter(Boolean);
    const tournamentName = tournaments[currentIdx]?.name || '';
    try {
      // Fetch slots for the selected tournament
      const resSlots = await fetch(`http://localhost:5000/api/slots?tournamentName=${encodeURIComponent(tournamentName)}`);
      const slotsData = await resSlots.json();
      // Find the first available slot
      const availableSlot = Array.isArray(slotsData) ? slotsData.find(slot => !slot.userIds || slot.userIds.length === 0) : null;
      if (!availableSlot) {
        setModalMessage('No available slots for this tournament.');
        return;
      }
      const slotNumber = availableSlot.slotNumber;
      const res = await fetch('http://localhost:5000/api/slots/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds, slotNumber, tournamentName }),
      });
      const data = await res.json();
      if (res.ok) {
        setModalStep('success');
        // Refresh slots after successful join
        const results = await Promise.all(tournaments.map(async (t, idx) => {
          const res = await fetch(`http://localhost:5000/api/slots?tournamentName=${encodeURIComponent(t.name)}`);
          const data = await res.json();
          return Array.isArray(data) ? data.filter(slot => slot.userIds && slot.userIds.length > 0).length : 0;
        }));
        setSlots(results);
      } else {
        setModalMessage(data.message || 'Failed to join slot.');
      }
    } catch (err) {
      setModalMessage('Network error.');
    }
  };

  const handleJoin = (idx) => {
    if (slots[idx] < maxSlotsArr[idx]) {
      setCurrentIdx(idx);
      setModalStep('uid');
      setShowModal(true);
      // Reset player names on open
      if (idx === 0) setPlayerNames(["", "", "", ""]);
      else if (idx === 1) setPlayerNames(["", ""]);
      else setPlayerNames([""]);
    }
  };

  const handleUidSubmit = (e) => {
    e.preventDefault();
    // Optionally, validate all names are filled
    if (playerNames.some(name => !name.trim())) return;
    setModalStep('pay');
  };

  const RAZORPAY_KEY_ID = 'YOUR_KEY_ID'; // Replace with your real Razorpay key

  // Remove WhatsApp link fetch
  // In the modal, just show the success modal after payment
  const handleCloseModal = () => {
    setShowModal(false);
    setModalStep(null);
    setUid('');
    setCurrentIdx(null);
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

  return (
    <div className="tournaments-container">
      <div className="tournaments-banner">
        <div className="tournaments-banner-overlay">
          <h1>Welcome to the Classy Tournament!</h1>
          <p>Join exciting tournaments, compete with the best, and win amazing rewards. Good luck!</p>
        </div>
      </div>
      <h1 className="tournaments-heading">All Tournaments</h1>
      {loading ? <div style={{color:'#ffb400',margin:'2rem'}}>Loading slots...</div> : null}
      <div className="tournament-details-wrapper">
        {tournaments.map((t, i) => (
          <div className="tournament-detail-card full-width-card" key={t.id}>
            <img className="tournament-detail-img" src={t.image} alt={t.title} />
            <div className="tournament-detail-body">
              <h2 className="tournament-detail-title">{t.title}</h2>
              <h4 className="tournament-detail-desc">{t.description}</h4>
              <div className="tournament-detail-section details-section">
                <strong className="tournament-detail-heading">Details</strong>
                <ul className="tournament-detail-list">
                  {t.details.map((item, idx) => (
                    <li key={idx}><b>{item.label}</b> - {item.value}</li>
                  ))}
                </ul>
              </div>
              {/* Slot bar below details */}
              <div className="tournament-slot-bar-wrapper">
                <div className="tournament-slot-bar-bg">
                  <div
                    className="tournament-slot-bar-fill"
                    style={{ width: `${(slots[i] / maxSlotsArr[i]) * 100}%` }}
                  ></div>
                </div>
                <div className="tournament-slot-bar-info">
                  <span>Only {maxSlotsArr[i] - slots[i]} slots left</span>
                  <span>{slots[i]}/{maxSlotsArr[i]}</span>
                </div>
              </div>
              <button
                className="tournament-detail-btn"
                onClick={() => handleJoin(i)}
                disabled={slots[i] >= maxSlotsArr[i]}
              >
                {slots[i] >= maxSlotsArr[i] ? 'Filled' : `Join Now (${t.details.find(d => d.label === 'Entry fee')?.value || 'N/A'})`}
              </button>
            </div>
            <div className="tournament-more-details-link">
              <Link to={`/rules/${t.id}`}>More Details</Link>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="tournament-modal-backdrop" onClick={handleCloseModal}>
          <div className="tournament-modal" onClick={e => e.stopPropagation()}>
            <button className="tournament-modal-close" onClick={handleCloseModal} aria-label="Close">&times;</button>
            {modalStep === 'uid' && (
              <form onSubmit={handleUidSubmit} className="tournament-modal-form">
                <h2>Enter your Free Fire User ID{playerNames.length > 1 ? 's' : ''}</h2>
                {playerNames.map((name, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={name}
                    onChange={e => {
                      const arr = [...playerNames];
                      arr[idx] = e.target.value;
                      setPlayerNames(arr);
                    }}
                    placeholder={`Player ${playerNames.length > 1 ? idx + 1 : ''} Name`}
                    required
                    className="tournament-modal-input"
                    style={{ marginBottom: '0.7rem' }}
                  />
                ))}
                <button type="submit" className="tournament-modal-btn">Continue</button>
              </form>
            )}
            {modalStep === 'pay' && (
              <div className="tournament-modal-pay">
                <h2>Payment</h2>
                {/* Remove UID/user name display */}
                <p>Amount: <b>{tournaments[currentIdx]?.details.find(d => d.label === 'Entry fee')?.value || 'N/A'}</b></p>
                <button
                  className="tournament-modal-btn"
                  onClick={handlePayment}
                >
                  Proceed to Payment
                </button>
              </div>
            )}
            {modalStep === 'success' && (
              <div className="tournament-modal-success">
                <h2>Payment Successful!</h2>
                <p>Your slot has been reserved.</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tournament-modal-btn"
                  id="whatsapp-link"
                >
                  Join WhatsApp Group
                </a>
                <button className="tournament-modal-btn" style={{marginTop: '1rem'}} onClick={handleCloseModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
      {renderModal()}
    </div>
  );
}

export default Tournaments; 