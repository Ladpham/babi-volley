// File: src/App.jsx
import { useEffect, useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbz1bnZTtzP2lu4MqzzdyAYeoaRgoPL9JHMXJX-ItGX2dl_HMBrIL5Lw7q77zozDvWlE_A/exec";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [newName, setNewName] = useState("");
  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    fetch(`${API_URL}?action=getGames`)
      .then(res => res.json())
      .then(data => setGames(data));
  }, []);

  const handleRegister = () => {
    const player = newName || selectedPlayer;
    if (!player || !selectedGame) return alert("Please select a player and game");

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        player_id: player,
        game_id: selectedGame
      })
    })
    .then(() => alert("Registered!"))
    .catch(() => alert("Failed to register"));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🏐 Volleyball Registration</h1>

      <label className="block mb-2">Pick your name:</label>
      <select value={selectedPlayer} onChange={e => setSelectedPlayer(e.target.value)} className="mb-4 w-full border p-2">
        <option value="">-- Existing Players --</option>
        {players.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <label className="block mb-2">or Enter new name:</label>
      <input value={newName} onChange={e => setNewName(e.target.value)} className="mb-4 w-full border p-2" placeholder="New Name" />

      <label className="block mb-2">Select Game:</label>
      <select value={selectedGame} onChange={e => setSelectedGame(e.target.value)} className="mb-4 w-full border p-2">
        <option value="">-- Upcoming Games --</option>
        {games.map(g => (
          <option key={g.game_id} value={g.game_id}>{g.date}</option>
        ))}
      </select>

      <button onClick={handleRegister} className="bg-blue-600 text-white px-4 py-2 rounded">
        Register to Play
      </button>
    </div>
  );
}

// File: src/Admin.jsx
import { useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbz1bnZTtzP2lu4MqzzdyAYeoaRgoPL9JHMXJX-ItGX2dl_HMBrIL5Lw7q77zozDvWlE_A/exec";

export default function Admin() {
  const [gameId, setGameId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [level, setLevel] = useState("");

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

      <input
        value={playerId}
        onChange={e => setPlayerId(e.target.value)}
        className="mb-2 w-full border p-2"
        placeholder="Player ID"
      />
      <input
        value={level}
        onChange={e => setLevel(e.target.value)}
        className="mb-4 w-full border p-2"
        placeholder="New Level (1–4)"
      />

      <button onClick={handleLevelUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Update Level</button>
    </div>
  );
}

// File: src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Admin from "./Admin.jsx";

const isAdmin = window.location.pathname.includes("admin");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdmin ? <Admin /> : <App />}
  </React.StrictMode>
);

// File: index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Volley-Ball Babi</title>
    <script type="module" crossorigin src="/src/index.jsx"></script>
  </head>
  <body class="bg-gray-100">
    <div id="root"></div>
  </body>
</html>
