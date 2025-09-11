
import React from 'react';
import './Home.css';
import fullMapImg from './assets/brsquad.png';
import clashSquad2v2Img from './assets/clashsquad2v2.png';
import clashSquad1v1Img from './assets/clashsquad1v1.png';

const tournaments = [
  {
    title: 'FULLL MAP',
    description: 'BR Per kill Squad Tournament',
    image: fullMapImg,
  },
  {
    title: 'CLASH SQUAD',
    description: '2V2 Onetap Custom',
    image: clashSquad2v2Img,
  },
  {
    title: 'CLASH SQUAD',
    description: '1V1 Onetap Custom',
    image: clashSquad1v1Img,
  },
];

function Home() {
  return (
    <>
      {/* BANNER */}
      <div className="banner">
        <div className="banner-overlay">
          <h1>Classy Tournament</h1>
          <p>Welcome to Classy Tournament – your ultimate destination for competitive gaming! Join tournaments, compete with the best, and win exciting rewards. Experience the thrill of eSports like never before.</p>
          <a className="banner-btn" href="/about">Read More</a>
        </div>
      </div>
      {/* Short Description */}
      <div style={{
        maxWidth: 900,
        margin: '2rem auto 2.5rem',
        background: '#23263a',
        color: 'white',
        borderRadius: 14,
        fontSize: '1.18rem',
        fontWeight: 500,
        padding: '3em',
        textAlign: 'center',
        boxShadow: '0 2px 12px rgba(24,28,47,0.10)'
      }}>
        India’s most thrilling battleground for Free Fire warriors!<br/>
        Join daily competitive matches, showcase your skills, win exciting cash prizes, and climb the leaderboard. Fast registration, secure payment, fair play, and instant updates – everything a true gamer needs.<br/>
        <span style={{ display: 'block', marginTop: '0.7rem',color: '#ffb400', fontWeight: 600, fontSize: '1.1rem' }}>
          Ready to dominate the zone? Let the class begin!
        </span>
      </div>
      {/* TOURNAMENT CARDS */}
      <div className="tournament-cards-wrapper">
        {tournaments.map((t, i) => (
          <div className="tournament-card" key={i}>
            <img className="tournament-card-img" src={t.image} alt={t.title} />
            <div className="tournament-card-body">
              <h3 className="tournament-card-title">{t.title}</h3>
              <p className="tournament-card-desc">{t.description}</p>
              <a className="tournament-card-btn" href="/tournaments">Join Here</a>
            </div>
          </div>
        ))}
      </div>
      {/* Prize Breakdown and Description */}
      <div
        style={{
          maxWidth: 1000,
          margin: '2.5rem auto',
          background: '#181c2f',
          borderRadius: 14,
          padding: '2.5rem',
          color: 'white',
          boxShadow: '0 2px 12px rgba(24,28,47,0.10)',
          textAlign: 'center',
        }}
      >
        {/* Responsive centering for mobile */}
        <style>{`
          @media (max-width: 600px) {
            .prize-breakdown-section * {
              text-align: center !important;
              margin-left: 0 !important;
            }
          }
        `}</style>
        <h2 style={{ color: '#ffb400', textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem', fontSize:'2rem' }}>Prize Breakdowns & Details</h2>
        <div className="prize-breakdown-section" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#ffb400', marginBottom: 8 }}>FULLL MAP (BR Per kill Squad Tournament)</h3>
          <ul style={{ marginLeft: 20, marginBottom: 8, display: 'inline-block', textAlign: 'left' }}>
            <li>Entry Fee: ₹40</li>
            <li>Per Kill: ₹7</li>
            <li>Booyah Bonus: ₹40</li>
          </ul>
          <div style={{ color: '#ccc', fontSize: '1rem' }}>Squad up and battle for every kill! Top squads win big with per-kill rewards and a booyah bonus for the last team standing.</div>
        </div>
        <div className="prize-breakdown-section" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#ffb400', marginBottom: 8 }}>CLASH SQUAD (2V2 Onetap Custom)</h3>
          <ul style={{ marginLeft: 20, marginBottom: 8, display: 'inline-block', textAlign: 'left' }}>
            <li>Entry Fee: ₹25</li>
            <li>Booyah Bonus: ₹85 (to duo)</li>
          </ul>
          <div style={{ color: '#ccc', fontSize: '1rem' }}>Team up for intense 2v2 onetap action. Outsmart your opponents and claim the booyah bonus for your duo!</div>
        </div>
        <div className="prize-breakdown-section">
          <h3 style={{ color: '#ffb400', marginBottom: 8 }}>CLASH SQUAD (1V1 Onetap Custom)</h3>
          <ul style={{ marginLeft: 20, marginBottom: 8, display: 'inline-block', textAlign: 'left' }}>
            <li>Entry Fee: ₹20</li>
            <li>Win: ₹50</li>
          </ul>
          <div style={{ color: '#ccc', fontSize: '1rem' }}>Go solo in a 1v1 onetap showdown. Prove your skills and take home the winner’s prize!</div>
        </div>
      </div>
      {/* How to Join the Tournament Section */}
      <div style={{ maxWidth: 1000, margin: '2.5rem auto',background: '#23263a', borderRadius: 14, padding: '2.5rem', color: 'white', boxShadow: '0 2px 12px rgba(24,28,47,0.10)',fontSize:'2rem'}}>
        <h2 style={{ color: '#ffb400', textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem' }}>How to Join the Tournament</h2>
        <ol style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', color: '#ffb400', fontWeight: 500, fontSize: '1.08rem', lineHeight: 1.7 }}>
          <li style={{ marginBottom: '1.1em' }}>
            <b>Step 1: Enter Your Free Fire User ID</b><br/>
            <span style={{ color: '#fff', fontWeight: 400 }}>Fill in your valid Free Fire User ID in the registration form so we can identify you during the match.</span>
          </li>
          <li style={{ marginBottom: '1.1em' }}>
            <b>Step 2: Pay the Entry Fee</b><br/>
            <span style={{ color: '#fff', fontWeight: 400 }}>Complete the entry payment securely using UPI, Razorpay, or the available method shown on the screen.</span>
          </li>
          <li style={{ marginBottom: '1.1em' }}>
            <b>Step 3: Slot Confirmation</b><br/>
            <span style={{ color: '#fff', fontWeight: 400 }}>Once your payment is verified, your slot will be reserved, and your name will appear on the participants list.</span>
          </li>
          <li style={{ marginBottom: '1.1em' }}>
            <b>Step 4: Join the WhatsApp Group</b><br/>
            <span style={{ color: '#fff', fontWeight: 400 }}>After a successful join, you’ll be redirected to our official WhatsApp group where room ID, password, match timing, and updates will be shared.</span>
          </li>
          <li style={{ marginBottom: '1.1em' }}>
            <b>Step 5: Play & Win</b><br/>
            <span style={{ color: '#fff', fontWeight: 400 }}>Enter the match lobby at the given time, play fairly, and compete for the top prizes. Winners will be announced post-match.</span>
          </li>
        </ol>
      </div>
    </>
  );
}

export default Home;