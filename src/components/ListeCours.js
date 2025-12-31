import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const ListeCours = ({ classeId }) => {
  const [coursListe, setCoursListe] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCours = async () => {
      if (!classeId) {
        console.warn("⚠️ Aucun classeId reçu :", classeId);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/cours/classe/${classeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCoursListe(res.data);
      } catch (err) {
        console.error("❌ Erreur récupération cours :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCours();
  }, [classeId]);

  // 🗑️ SUPPRESSION D’UN COURS
  const handleDelete = async (coursId) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer ce cours ?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/cours/${coursId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ⚡ Mise à jour immédiate de la liste
      setCoursListe((prev) => prev.filter((c) => c._id !== coursId));
    } catch (err) {
      console.error("❌ Erreur suppression cours :", err);
      alert("Erreur lors de la suppression du cours");
    }
  };

  if (loading) return <p>Chargement des cours...</p>;
  if (coursListe.length === 0) return <p>Aucun cours pour cette classe.</p>;

  return (
    <div>
      <h3>📚 Cours de la classe</h3>

      <div className="liste-cours-prof">
        {coursListe.map((c) => (
          <div
            key={c._id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "180px",
            }}
          >
            <h4>{c.titre}</h4>
            <p>{c.contenu}</p>

            {c.fichiers && c.fichiers.length > 0 && (
              <a
                href={c.fichiers[0].url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", marginBottom: "8px" }}
              >
                📎 {c.fichiers[0].nom || "Ouvrir le fichier"}
              </a>
            )}

            {/* 🗑️ BOUTON SUPPRIMER */}
            <button
              onClick={() => handleDelete(c._id)}
            
            >
              🗑 Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeCours;

