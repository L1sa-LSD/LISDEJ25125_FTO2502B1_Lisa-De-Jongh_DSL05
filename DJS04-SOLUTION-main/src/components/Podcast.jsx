import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Maps genre IDs to their titles for display.
 * @param {number[]} ids - Array of genre IDs
 * @param {Array<{id:number,title:string}>} genres - Genre mapping
 * @returns {string[]} Array of genre titles
 */
function mapGenreIdsToTitles(ids, genres) {
  const names = ids.map(id => {
    const found = genres.find(g => g.id === id);
    if (found) return found.title; // If found, return the genre title
    if (id === 0) return "All"; // 0 is often used for 'All' genres
    if (id === 10) return "Featured"; // 10 might be used for 'Featured' genres
    return null; // Return null for truly unknown genres
  }).filter(Boolean); // Remove nulls

  // If no known genres, show a single 'Unknown Genre' tag
  if (names.length === 0) return ["Unknown Genre"];
  // Remove duplicates
  return [...new Set(names)];
}

/**
 * Podcast details page. Fetches show data by ID and displays all details, seasons, and episodes.
 * @param {{genres: Array<{id:number,title:string}>}} props
 */
export default function Podcast({ genres }) {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setShow(null);
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setShow(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading podcast details...</div>;
  }
  if (error) {
    return <div style={{ padding: 40, textAlign: "center", color: "#d32f2f" }}>Error: {error}</div>;
  }
  if (!show) {
    return <div style={{ padding: 40, textAlign: "center" }}>Show not found.</div>;
  }

  const genreTitles = mapGenreIdsToTitles(show.genres, genres);
  const seasons = show.seasons || [];
  const currentSeason = seasons[selectedSeason] || {};

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ background: "#fff", borderRadius: 10, padding: 32, display: "flex", gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
        <img src={show.image} alt="Podcast Cover" style={{ width: 200, height: 200, borderRadius: 8, objectFit: "cover", background: "#d1d5db" }} />
        <div style={{ flex: 1, minWidth: 250 }}>
          <h1 style={{ margin: 0 }}>{show.title}</h1>
          <p style={{ color: "#555", margin: "16px 0" }}>{show.description}</p>
          <div style={{ display: "flex", gap: 32, marginBottom: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 600, color: "#888", fontSize: 14 }}>GENRES</div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                {genreTitles.map((g) => (
                  <span key={g} style={{ background: "#eee", borderRadius: 6, padding: "2px 10px", fontSize: 13 }}>{g}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "#888", fontSize: 14 }}>LAST UPDATED</div>
              <div style={{ fontSize: 15, marginTop: 4 }}>{new Date(show.updated).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "#888", fontSize: 14 }}>TOTAL SEASONS</div>
              <div style={{ fontSize: 15, marginTop: 4 }}>{seasons.length} Seasons</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "#888", fontSize: 14 }}>TOTAL EPISODES</div>
              <div style={{ fontSize: 15, marginTop: 4 }}>{show.episodes || 0} Episodes</div>
            </div>
          </div>
        </div>
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>Seasons</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {seasons.map((season, idx) => (
          <button
            key={season.season}
            onClick={() => setSelectedSeason(idx)}
            style={{
              padding: '8px 18px',
              borderRadius: 6,
              border: idx === selectedSeason ? '2px solid #2563eb' : '1px solid #ccc',
              background: idx === selectedSeason ? '#2563eb' : '#f3f4f6',
              color: idx === selectedSeason ? '#fff' : '#222',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 15,
              marginBottom: 8
            }}
          >
            Season {season.season}
          </button>
        ))}
      </div>
      {currentSeason && (
        <div style={{ background: "#fff", borderRadius: 10, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <img src={currentSeason.image || show.image} alt={`Season ${currentSeason.season} Cover`} style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", background: "#d1d5db" }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{currentSeason.title || `Season ${currentSeason.season}`}</div>
              <div style={{ color: "#555", fontSize: 15 }}>{currentSeason.description}</div>
              <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>{(currentSeason.episodes || []).length} Episodes</div>
            </div>
          </div>
          {(currentSeason.episodes || []).length === 0 && <div style={{ color: '#888', padding: 16 }}>No episodes found for this season.</div>}
          {(currentSeason.episodes || []).map((ep, i) => (
            <div key={ep.episode || i} style={{ background: "#f3f4f6", borderRadius: 8, padding: 16, marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ fontWeight: 700, color: "#888", fontSize: 16, minWidth: 40 }}>S{currentSeason.season}E{ep.episode}</div>
              <img src={ep.image || currentSeason.image || show.image} alt={ep.title} style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", background: "#d1d5db" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{ep.title}</div>
                <div style={{ color: "#555", fontSize: 15 }}>{ep.description ? ep.description.slice(0, 120) + (ep.description.length > 120 ? '...' : '') : ''}</div>
                <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>{ep.file ? `${Math.round((ep.file.duration || 0) / 60)} min` : ''} {ep.date ? `• ${new Date(ep.date).toLocaleDateString()}` : ''}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 