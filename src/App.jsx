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
    <div className="bg-gray-100 text-gray-900 min-h-screen relative">
      <header className="absolute top-4 right-4">
        <img src="/babi-volley/logo.png" alt="Logo" className="h-12 w-12 rounded-full shadow-md" />
      </header>

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Volley-Ball Babi 🏐</h1>
        <p className="mb-6 text-lg">Te dépenser et prendre du plaisir en même temps, tu es au bon endroit.</p>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">📝 Inscription</h2>
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

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">📋 Règles à retenir</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>1 - Votez avant de venir jouer <strong>(Obligatoire)</strong>. Si vous n'avez pas voté, vous ne pourrez pas jouer.</li>
            <li>2 - Essayez d'être à l'heure</li>
            <li>3 - Si nous sommes plus de 12, les équipes seront composées en avance</li>
            <li>4 - Veuillez prévenir si vous comptez inviter quelqu'un</li>
            <li>5 - <strong>Nombre maximum de joueurs</strong> :<br />
              • Lundi : 24 joueurs<br />
              • Jeudi : 18 joueurs
            </li>
            <li>6 - Les +1 sont acceptés si nous ne sommes pas complets, le jour de la séance, après 14h</li>
            <li>7 - Une séance non annulée (enlever son vote dans le sondage) avant 17h sera facturée</li>
          </ul>
        </div>

        <div className="bg-white p-4 mt-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">📍 Infos pratiques</h2>
          <p><strong>Quand ?</strong><br />
            Lundi et Jeudi de 20h à 22h<br />
            À l'université de Cocody (Félix Houphouët Boigny), entre les terrains de handball et basketball
          </p>
          <a href="https://maps.app.goo.gl/axjNVeEMe26jpNqi7" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Voir sur Google Maps</a>

          <p className="mt-4"><strong>Prix :</strong><br />
            3 000 FCFA par séance (pensez à prendre de la monnaie)<br />
            Paiement OM/WAVE (+ frais de retrait) : <strong>0767023211</strong><br />
            Possibilité de payer plusieurs séances à l'avance
          </p>

          <p className="mt-4"><strong>Comment ça marche ?</strong><br />
            La veille de l'entraînement, on publie un petit sondage pour savoir qui vient. Clique sur "oui" pour qu'on puisse organiser les équipes. Premier arrivé, premier servi.
          </p>

          <p className="mt-4"><strong>Contact :</strong><br />
            Patricia 📞 <a href="tel:+2250767023211" className="text-blue-600 underline">+225 07 67 02 32 11</a>
          </p>
        </div>

        <div className="mt-8 flex space-x-4">
          <a href="#/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Accueil</a>
          <a href="#/admin" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">Espace Admin</a>
        </div>
      </main>
    </div>
  );
}
