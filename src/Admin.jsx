// File: src/Admin.jsx
import { useEffect, useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbz1bnZTtzP2lu4MqzzdyAYeoaRgoPL9JHMXJX-ItGX2dl_HMBrIL5Lw7q77zozDvWlE_A/exec";

export default function Admin() {
  const [gameId, setGameId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [level, setLevel] = useState("");
  const [isPasser, setIsPasser] = useState(false);
  const [amount, setAmount] = useState("");
  const [teamId, setTeamId] = useState("");
  const [score, setScore] = useState("");
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamCompositions, setTeamCompositions] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}?action=getPlayers`)
      .then(res => res.json())
      .then(setPlayers);

    fetch(`${API_URL}?action=getTeams`)
      .then(res => res.json())
      .then(setTeams);
  }, []);

  useEffect(() => {
    if (gameId) {
      fetch(`${API_URL}?action=getTeamCompositions&game_id=${gameId}`)
        .then(res => res.json())
        .then(setTeamCompositions);
    }
  }, [gameId]);

  const handleShuffle = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "shuffle", game_id: gameId })
    }).then(() => {
      alert("Teams shuffled");
      fetch(`${API_URL}?action=getTeamCompositions&game_id=${gameId}`)
        .then(res => res.json())
        .then(setTeamCompositions);
    });
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
        level: level,
        is_passer: isPasser
      })
    }).then(() => alert("Player updated"));
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

  const handleMovePlayer = (player, fromTeamId, toTeamId) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "move_player",
        player_id: player,
        from_team_id: fromTeamId,
        to_team_id: toTeamId,
        game_id: gameId
      })
    }).then(() => {
      alert("Player moved");
      fetch(`${API_URL}?action=getTeamCompositions&game_id=${gameId}`)
        .then(res => res.json())
        .then(setTeamCompositions);
    });
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

      <select value={playerId} onChange={e => setPlayerId(e.target.value)} className="mb-2 w-full border p-2">
        <option value="">Select Player</option>
        {players.map(p => (
          <option key={p.player_id} value={p.player_id}>{p.name}</option>
        ))}
      </select>

      <input
        value={level}
        onChange={e => setLevel(e.target.value)}
        className="mb-2 w-full border p-2"
        placeholder="New Level (1–4)"
      />

      <label className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          checked={isPasser}
          onChange={e => setIsPasser(e.target.checked)}
        />
        <span>Set as dedicated passer</span>
      </label>

      <button onClick={handleLevelUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Update Player</button>

      <hr className="my-6" />

      <input
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="mb-2 w-full border p-2"
        placeholder="Payment Amount"
      />

      <button onClick={handlePayment} className="bg-purple-600 text-white px-4 py-2 rounded">Record Payment</button>

      <hr className="my-6" />

      <select value={teamId} onChange={e => setTeamId(e.target.value)} className="mb-2 w-full border p-2">
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

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-2">Team Compositions</h3>
      {teamCompositions.map((team, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-white">
          <p className="font-bold">{team.team_name}</p>
          <ul className="list-disc ml-4">
            {team.members.map((member, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{member}</span>
                {editingTeam === team.team_name && (
                  <select
                    className="ml-2 border"
                    onChange={e => handleMovePlayer(member, team.team_id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="">Move to...</option>
                    {teamCompositions
                      .filter(t => t.team_name !== team.team_name)
                      .map(t => (
                        <option key={t.team_name} value={t.team_id}>{t.team_name}</option>
                      ))}
                  </select>
                )}
              </li>
            ))}
          </ul>
          <button
            className="mt-2 text-sm text-blue-600 underline"
            onClick={() => setEditingTeam(editingTeam === team.team_name ? null : team.team_name)}
          >
            {editingTeam === team.team_name ? "Cancel Edit" : "Edit Team"}
          </button>
        </div>
      ))}
    </div>
  );
}
