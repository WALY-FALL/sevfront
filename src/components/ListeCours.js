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

      console.log("🏫 Classe ID utilisé pour la requête :", classeId);

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/cours/classe/${classeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📚 Cours reçus :", res.data);
        setCoursListe(res.data);
      } catch (err) {
        console.error("❌ Erreur récupération cours :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCours();
  }, [classeId]);

  if (loading) return <p>Chargement des cours...</p>;
  if (coursListe.length === 0) return <p>Aucun cours pour cette classe.</p>;
  console.log("Cours:", c);
  return (
    <div>
      <h3>📚 Cours de la classe </h3>
      <div className="liste-cours-prof">
      {coursListe.map((c) => (
        <div
          key={c._id}
          style={{
            marginBottom: "15px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            width: "160px",
          }}
        >
          <h4>{c.titre}</h4>
          <p>{c.contenu}</p>
          {c.fichiers && c.fichiers.length > 0 && (
            <a
              //href={`http://localhost:8989/${c.fichiers[0].url}`}
              href={c.fichiers[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.fichiers[0].nom || "Ouvrir le fichier"}
            </a>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default ListeCours;



/*import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8989/api";
console.log("🌍 API_URL :", API_URL);

const ListeCours = ({ classeId }) => {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coursListe, setCoursListe] = useState([]);
  const [selectedClasse, setSelectedClasse] = useState([]);

  useEffect(() => {
    const fetchCours = async () => {

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/cours/classe/${selectedClasse._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCoursListe(res.data); // stocke les cours récupérés
      } catch (err) {
        console.error(err);
      }
    };
  
    if (selectedClasse) fetchCours();
  }, [selectedClasse]);
  
  

  /*useEffect(() => {
    const fetchCours = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/cours/classe/${classeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCours(res.data);
      } catch (err) {
        console.error("Erreur récupération cours :", err);
      } finally {
        setLoading(false);
      }
    };

    if (classeId) fetchCours();
  }, [classeId]);*/

  /*if (loading) return <p>Chargement des cours...</p>;
  if (!cours || cours.length === 0) return <p>Aucun cours pour cette classe.</p>;

  return (
    <div>
  {coursListe.length === 0 ? (
    <p>Aucun cours pour cette classe.</p>
  ) : (
    coursListe.map((c) => (
      <div key={c._id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ddd" }}>
        <h4>{c.titre}</h4>
        <p>{c.contenu}</p>
        {c.fichiers && c.fichiers.length > 0 && (
          <a
            href={`http://localhost:8989/${c.fichiers[0].url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.fichiers[0].nom}
          </a>
        )}
      </div>
    ))
  )}
</div>
   /* <div>
      <h3>📚 Cours de la classe</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cours.map((c) => (
          <li key={c._id} style={{ marginBottom: "16px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <strong>{c.titre}</strong>
            <p>{c.contenu}</p>
            {c.fichiers && c.fichiers.length > 0 && (
              <div>
                <h4>Fichiers :</h4>
                <ul>
                  {c.fichiers.map((f, i) => (
                    <li key={i}>
                      <a href={`http://localhost:8989/uploads/${f}`} target="_blank" rel="noopener noreferrer">
                        {f}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>*/
 /* );
};

export default ListeCours;*/
