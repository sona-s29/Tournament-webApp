// src/components/Tournaments.jsx
import React, { useState, useEffect } from 'react';
import './Tournaments.css';
import { Link } from 'react-router-dom';
import fullMapImg from './assets/brsquad.png';
import clashSquad2v2Img from './assets/clashsquad2v2.png';
import clashSquad1v1Img from './assets/clashsquad1v1.png';

const maxSlotsArr = [12, 4, 2];
const API_BASE = import.meta.env.VITE_API_BASE;

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
      { label: 'Booyah bonus', value: '₹40' }
    ]
  },
  {
    id: 'clash-squad-2v2',
    name: 'CLASH SQUAD',
    title: 'CLASH SQUAD',
    description: '2V2 Onetap Custom',
    image: clashSquad2v2Img,
    details: [
      { label: 'Entry fee', value: '₹25' },
      { label: 'Booyah bonus', value: '₹85(to duo)' }
    ]
  },
  {
    id: 'clash-squad-1v1',
    name: 'SOLO',
    title: 'CLASH SQUAD',
    description: '1V1 Onetap Custom',
    image: clashSquad1v1Img,
    details: [
      { label: 'Entry fee', value: '₹20' },
      { label: 'Win', value: '₹50' }
    ]
  }
];

function Tournaments() {
  const [slots, setSlots] = useState([0, 0, 0]);
  const [loading, setLoading] = useState(false);
  const [modalStep, setModalStep] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);
  const [modalMessage, setModalMessage] = useState('');
  const [whatsappLink, setWhatsappLink] = useState(null);

  // Razorpay script
  useEffect(() => {
    const id = 'razorpay-script';
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.src = import.meta.env.VITE_RAZORPAY_URL;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Fetch slots
  const fetchSlots = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        tournaments.map(async (t) => {
          const res = await fetch(`${API_BASE}/slots?tournamentName=${encodeURIComponent(t.name)}`);
          const data = await res.json();
          return Array.isArray(data)
            ? data.filter(s => s.userIds && s.userIds.length > 0).length
            : 0;
        })
      );
      setSlots(results);
    } catch (err) {
      console.error("fetchSlots error:", err);
      setSlots([0, 0, 0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // Payment + join flow
  const handlePayment = async () => {
    try {
      const tournament = tournaments[currentIdx];
      if (!tournament) return setModalMessage("Invalid tournament selected.");

      const feeStr = tournament.details.find(d => d.label === "Entry fee")?.value || "₹0";
      const amount = parseInt(feeStr.replace(/[^\d]/g, ""));

      // 1) create order
      const orderRes = await fetch(`${API_BASE}/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      });
      const orderJson = await orderRes.json();
      if (!orderJson || !orderJson.order) {
        setModalMessage(orderJson?.message || "Failed to create order");
        return;
      }
      const order = orderJson.order;

      // 2) Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Classy Tournament",
        description: `Joining ${tournament.name}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            // 3) verify payment
            const verifyRes = await fetch(`${API_BASE}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            if (!verifyData || !verifyData.success) {
              setModalMessage(verifyData?.message || "Payment verification failed");
              return;
            }

            // 4) join slot
            const userIds = playerNames.map(n => n.trim()).filter(Boolean);
            const joinRes = await fetch(`${API_BASE}/slots/join`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userIds, tournamentName: tournament.name })
            });
            const joinData = await joinRes.json();
            if (!joinRes.ok || !joinData.success) {
              setModalMessage(joinData?.message || "Failed to join slot");
              return;
            }

            setWhatsappLink(joinData.whatsappLink); // ✅ store link
            setModalStep("success");
            fetchSlots();
          } catch (err) {
            console.error("Handler error:", err);
            setModalMessage("Error while processing payment result");
          }
        },
        prefill: { name: "Test User", email: "test@example.com", contact: "9999999999" },
        notes: { tournament: tournament.name },
        theme: { color: "#ffb400" },
        method: { upi: true } // ✅ ensure UPI option
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("handlePayment error:", err);
      setModalMessage("Payment error. Try again.");
    }
  };

  const handleJoin = (idx) => {
    if (slots[idx] >= maxSlotsArr[idx]) {
      setModalMessage("Slots are filled for this tournament");
      return;
    }
    setCurrentIdx(idx);
    setShowModal(true);
    setModalStep('uid');
    if (idx === 0) setPlayerNames(["", "", "", ""]);
    else if (idx === 1) setPlayerNames(["", ""]);
    else setPlayerNames([""]);
  };

  const handleUidSubmit = (e) => {
    e.preventDefault();
    if (playerNames.some(n => !n.trim())) {
      setModalMessage("Please enter all player IDs");
      return;
    }
    setModalStep('pay');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalStep(null);
    setCurrentIdx(null);
    setModalMessage('');
    setWhatsappLink(null);
  };

  return (
    <div className="tournaments-container">
      <div className="tournaments-banner">
        <div className="tournaments-banner-overlay">
          <h1>Welcome to the Classy Tournament!</h1>
          <p>Join exciting tournaments, compete with the best, and win rewards.</p>
        </div>
      </div>

      <h1 className="tournaments-heading">All Tournaments</h1>
      {loading && <div style={{ color: '#ffb400', margin: '1rem' }}>Loading slots...</div>}

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

              <div className="tournament-slot-bar-wrapper">
                <div className="tournament-slot-bar-bg">
                  <div
                    className="tournament-slot-bar-fill"
                    style={{ width: `${(slots[i] / maxSlotsArr[i]) * 100}%` }}
                  />
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
                {slots[i] >= maxSlotsArr[i]
                  ? 'Filled'
                  : `Join Now (${t.details.find(d => d.label === 'Entry fee')?.value || 'N/A'})`}
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
                  />
                ))}
                <button type="submit" className="tournament-modal-btn">Continue</button>
              </form>
            )}

            {modalStep === 'pay' && (
              <div className="tournament-modal-pay">
                <h2>Payment</h2>
                <p>Amount: <b>{tournaments[currentIdx]?.details.find(d => d.label === 'Entry fee')?.value || 'N/A'}</b></p>
                <button className="tournament-modal-btn" onClick={handlePayment}>Proceed to Payment</button>
              </div>
            )}

            {modalStep === 'success' && (
              <div className="tournament-modal-success">
                <h2>Payment Successful!</h2>
                <p>Your slot has been reserved.</p>
                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tournament-modal-btn"
                    id="whatsapp-link"
                  >
                    Join WhatsApp Group
                  </a>
                )}
                <button
                  className="tournament-modal-btn"
                  style={{ marginTop: '1rem' }}
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            )}

            {modalMessage && (
              <div className="tournament-modal-error" style={{ marginTop: 12 }}>
                <p style={{ color: "#ffb400" }}>{modalMessage}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tournaments;
