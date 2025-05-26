// File: src/Admin.jsx
import { useEffect, useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbz1bnZTtzP2lu4MqzzdyAYeoaRgoPL9JHMXJX-ItGX2dl_HMBrIL5Lw7q77zozDvWlE_A/exec";

export default function Admin() {
  const [gameId, setGameId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [level, setLevel] = useState("");
  const [amount, setAmount] = useState("");
  const [teamId, setTeamId] = useState("");
  const [score, setScore] = useState("");
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}?action=getPlayers`)
      .then(res => res.json())
      .then(setPlayers);

    fetch(`${API_URL}?action=getTeams`)
      .then(res => res.json())
      .then(setTeams);
  }, []);

  const handleShuffle = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "shuffle", game_id: gameId })
    }).then(() => alert("Teams shuffled"));
  };

  const handleFinalize = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "finalize", game_id: gameId })
    }).then(() => alert("Teams finalized"));
  };

  const handleLevelUpdate = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_level",
        player_id: playerId,
        level: level
      })
    }).then(() => alert("Level updated"));
  };

  const handlePayment = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "payment",
        player_id: playerId,
        game_id: gameId,
        amount: parseFloat(amount)
      })
    }).then(() => alert("Payment recorded"));
  };

  const handleScoreSubmit = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "score",
        game_id: gameId,
        team_id: teamId,
        score: parseInt(score)
      })
    }).then(() => alert("Score submitted"));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      <input
        value={gameId}
        onChange={e => setGameId(e.target.value)}
        className="mb-4 w-full border p-2"
        placeholder="Game ID"
      />

      <button onClick={handleShuffle} className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded">Shuffle Teams</button>
      <button onClick={handleFinalize} className="bg-green-600 text-white px-4 py-2 rounded">Finalize Teams</button>

      <hr className="my-6" />

      <select
        value={playerId}
        onChange={e => setPlayerId(e.target.value)}
        className="mb-2 w-full border p-2"
      >
        <option value="">Select Player</option>
        {players.map(p => (
          <option key={p.player_id} value={p.player_id}>{p.name}</option>
        ))}
      </select>

      <input
        value={level}
        onChange={e => setLevel(e.target.value)}
        className="mb-4 w-full border p-2"
        placeholder="New Level (1–4)"
      />

      <button onClick={handleLevelUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Update Level</button>

      <hr className="my-6" />

      <input
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="mb-2 w-full border p-2"
        placeholder="Payment Amount"
      />

      <button onClick={handlePayment} className="bg-purple-600 text-white px-4 py-2 rounded">Record Payment</button>

      <hr className="my-6" />

      <select
        value={teamId}
        onChange={e => setTeamId(e.target.value)}
        className="mb-2 w-full border p-2"
      >
        <option value="">Select Team</option>
        {teams.map(t => (
          <option key={t.team_id} value={t.team_id}>{t.team_name}</option>
        ))}
      </select>

      <input
        value={score}
        onChange={e => setScore(e.target.value)}
        className="mb-4 w-full border p-2"
        placeholder="Score"
      />

      <button onClick={handleScoreSubmit} className="bg-red-600 text-white px-4 py-2 rounded">Submit Score</button>
    </div>
  );
}
