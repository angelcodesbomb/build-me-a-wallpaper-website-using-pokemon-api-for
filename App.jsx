import React, { useEffect, useState } from "react";

// Helper to construct official artwork URL from Pokémon ID
function getArtworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch first 30 Pokémon on mount
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
        const data = await res.json();
        const enriched = data.results.map((p, idx) => {
          const id = idx + 1; // API returns ordered list starting at 1
          return { name: p.name, id, img: getArtworkUrl(id) };
        });
        setPokemon(enriched);
      } catch (e) {
        // In a real app you would handle errors gracefully
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  const containerStyle = {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    backgroundColor: "#fffbf0",
    minHeight: "100vh",
    padding: "1rem",
    color: "#222",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "2rem",
    color: "#d62828",
    textShadow: "2px 2px #ff9f1c",
  };

  const inputStyle = {
    padding: "0.5rem",
    fontSize: "1rem",
    border: "3px solid #d62828",
    borderRadius: "4px",
    marginBottom: "1rem",
    width: "100%",
    maxWidth: "300px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "1rem",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    border: "4px solid #d62828",
    borderRadius: "8px",
    padding: "0.5rem",
    textAlign: "center",
    boxShadow: "4px 4px 0 #ff9f1c",
  };

  const buttonStyle = {
    marginTop: "0.5rem",
    padding: "0.4rem 0.8rem",
    backgroundColor: "#ff9f1c",
    border: "2px solid #d62828",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>Poké‑Wallpaper Gallery</header>
      <input
        type="text"
        placeholder="Search Pokémon…"
        aria-label="Search Pokémon"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={inputStyle}
      />
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading…</p>
      ) : (
        <section style={gridStyle} aria-label="Pokémon wallpaper grid">
          {filteredPokemon.map(p => (
            <article key={p.id} style={cardStyle}>
              <img
                src={p.img}
                alt={p.name + " artwork"}
                loading="lazy"
                style={{ width: "100%", height: "auto", borderRadius: "4px" }}
              />
              <h3 style={{ textTransform: "capitalize", margin: "0.5rem 0 0" }}>{p.name}</h3>
              <button
                aria-label={`Set ${p.name} as wallpaper`}
                style={buttonStyle}
                onClick={() => alert(`Wallpaper set to ${p.name}!`)}
              >
                Set Wallpaper
              </button>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
