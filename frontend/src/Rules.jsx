import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Rules.css';

const tournaments = [
  {
    id: 'full-map',
    name: 'FULL MAP',
    title: 'FULLL MAP (Per Kill)',
    rules: {
      eligibility: [
        'Free Id Must Be level 40 or above',
        'Only mobile Players Are Allowed',
        'Cs Career headshot rate must not be above 70',
      ],
      joining: [
        ' Enter Account Name: Please enter your FF MAX account name accurately during registration.',
        ' Note: Changes to the account name will not be allowed once submitted.',
        'Verify Account Name: Ensure that the account name entered matches your registered in-game name to avoid disqualification.',
        'Match Room ID & Password: The Match Room ID and Password will be provided 3-10 minutes before the match begins.'
      ],
      room: [
        'Character Skill - Yes',
        'Gun Attributes - Yes',
        'Vehicle - Yes'
      ],
      Hacking: [
        '  Tell us about hacker on whatsapp ',
        ' You Can Visit Our Contact Us page for help'
      ],
      prohibited: [
        'Using Any Type of panel/hack or third party application is prohibited',
        'Teaming up with opponents',
        'Inviting unregistered players'
      ],
      Notes: [
        'Violeting any rules cause you penalty or no rewards or permanent account ban',
        ' After registration must join room if room id and Password came,if you fail to join no refund',
        ' Using abusing words against host may cause you penalty',
        'CLASSY TOURNAMENT have rights to modify rules and prizes'
      ],
    },
  },
  {
    id: 'clash-squad-2v2',
    name: 'CLASH SQUAD',
    title: 'CLASH SQUAD (2V2 Onetap Custom)',
    rules: {
      eligibility: [
        ' Free Id Must Be level 40 or above',
        'Only mobile Players Are Allowed',
        'Cs Career headshot rate must not be above 70'
      ],
      joining: [
        'Enter Account Name: Please enter your FF MAX account name accurately during registration.',

        ' Note: Changes to the account name will not be allowed once submitted.',
        ' Verify Account Name: Ensure that the account name entered matches your registered in-game name to avoid disqualification.',
        ' Match Room ID & Password: The Match Room ID and Password will be provided 3-10 minutes before the match begins.'
      ],
      room: [
        ' Character Skill - No',
        'Gun Attributes - Yes',
        'Airdrop - No(Any Type)',
        'Limited Ammo - No'
      ],
      Hacking: [
        '  Tell us about hacker on whatsapp ',
        ' You Can Visit Our Contact Us page for help'
      ],
      prohibited: [
        'Using Any Type of panel/hack or third party application is prohibited',
        'Inviting unregistered players',
        'Prohibited throwable items: Grenade, smoke, flash freeze, flashbang, etc.',
        'Zone Pack'
      ],
      Notes: [
        '  Violeting any rules cause you penalty or no rewards or permanent account ban',
        ' After registration must join room if room id and Password came,if you fail to join no refund',
        'Using abusing words against host may cause you penalty',
        '  CLASSY TOURNAMENT have rights to modify rules and prizes'
      ],
    },
  },
  {
    id: 'clash-squad-1v1',
    name: 'SOLO',
    title: 'CLASH SQUAD (1V1 Onetap Custom)',
    rules: {
      eligibility: [
        'Free Id Must Be level 40 or above',
        'Only mobile Players Are Allowed',
        'Cs Career headshot rate must not be above 70'
      ],
      joining: [
        ' Enter Account Name: Please enter your FF MAX account name accurately during registration.',

        ' Note: Changes to the account name will not be allowed once submitted.',
        'Verify Account Name: Ensure that the account name entered matches your registered in-game name to avoid disqualification.',
        'Match Room ID & Password: The Match Room ID and Password will be provided 3-10 minutes before the match begins.'
      ],
      room: [
        'Character Skill : No',
        'Gun Attributes : Yes',
        'Airdrop: No(Any Type)',
        'Limited Ammo: No'
      ],
      Hacking: [
        '  Tell us about hacker on whatsapp ',
        ' You Can Visit Our Contact Us page for help'
      ],
      prohibited: [
        ' Using Any Type of panel/hack or third party application is prohibited',
        ' Inviting unregistered players',
        '   Prohibited throwable items: Grenade, smoke, flash freeze, flashbang, etc.',
        'Zone Pack'
      ],
      Notes: [
        ' Violeting any rules cause you penalty or no rewards or permanent account ban',
        ' After registration must join room if room id and Password came,if you fail to join no refund',
        '  Using abusing words against host may cause you penalty',
        '  CLASSY TOURNAMENT have rights to modify rules and prizes'
      ],
    },
  },
];

const API_BASE = import.meta.env.VITE_API_BASE;
const TOURNAMENT_NAME = 'Default Tournament'; // Change as needed for other tournaments

function Rules() {
  const { id } = useParams();
  const tournament = tournaments.find(t => t.id === id);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (!tournament) return;
    fetch(`${API_BASE}/slots?tournamentName=${encodeURIComponent(tournament.name)}`)
      .then(res => res.json())
      .then(data => setSlots(Array.isArray(data) ? data : []))
      .catch(() => setSlots([]));
  }, [tournament]);

  if (!tournament) {
    return <div style={{ minHeight: '300px', padding: '3rem 1rem', textAlign: 'center' }}><h2>Rules Not Found</h2></div>;
  }

  const { rules, title } = tournament;

  return (
    <>
      <div className="rules-container">
        <h1 className="rules-title">{title}</h1>
        <h2 className="rules-section-title">Must Follow Given Rules</h2>
        <div className="rules-section">
          <h3 className="rules-heading">Eligibility</h3>
          <ul>{rules.eligibility.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
        <div className="rules-section">
          <h3 className="rules-heading">Joining Instructions</h3>
          <ul>{rules.joining.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
        <div className="rules-section">
          <h3 className="rules-heading">Room Setting</h3>
          <ul>{rules.room.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
        <div className="rules-section">
          <h3 className="rules-heading">Report Hacker or Contact Us</h3>
          <ul>{rules.Hacking.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
        <div className="rules-section">
          <h3 className="rules-heading">Prohibited Activities</h3>
          <ul>{rules.prohibited.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
        <div className="rules-section">
          <h3 className="rules-heading">Notes </h3>
          <ul>{rules.Notes.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
      </div>
      {/* Joined Participants section outside the rules card */}
      <div className="rules-container" style={{ marginTop: '2.5rem', background: '#23263a' }}>
        <h3 className="rules-heading" style={{ color: '#ffb400', marginTop: 0 }}>Joined Participants</h3>
        <ul>
          {slots.length === 0 && <li>No participants yet.</li>}
          {slots.map((slot, idx) => (
            <li key={slot.slotNumber || idx}>
              Team {slot.slotNumber}: {slot.userIds && slot.userIds.length > 0 ? slot.userIds.join(', ') : '-'}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/tournaments" className="rules-back-link">&#8592; Back to Tournaments</Link>
      </div>
    </>
  );
}

export default Rules; 