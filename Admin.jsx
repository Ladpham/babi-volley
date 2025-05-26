<input value={playerId} onChange={e => setPlayerId(e.target.value)} placeholder="Player ID" className="w-full border p-2 my-2" />
<input value={gameId} onChange={e => setGameId(e.target.value)} placeholder="Game ID" className="w-full border p-2 my-2" />
<input type="number" placeholder="Amount Paid" className="w-full border p-2 mb-2" onChange={e => setAmount(e.target.value)} />

<button
  onClick={() => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "payment",
        player_id: playerId,
        game_id: gameId,
        amount: parseFloat(amount),
      }),
    }).then(() => alert("Payment recorded"));
  }}
  className="bg-purple-600 text-white px-4 py-2 rounded"
>
  Record Payment
</button>


<input value={teamId} onChange={e => setTeamId(e.target.value)} placeholder="Team ID" className="w-full border p-2 my-2" />
<input type="number" placeholder="Score" className="w-full border p-2 mb-2" onChange={e => setScore(e.target.value)} />

<button
  onClick={() => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "score",
        game_id: gameId,
        team_id: teamId,
        score: parseInt(score),
      }),
    }).then(() => alert("Score submitted"));
  }}
  className="bg-red-600 text-white px-4 py-2 rounded"
>
  Submit Score
</button>
