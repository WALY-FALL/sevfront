import React, { useState, useEffect } from "react";
import axios from "axios";
import FormulaireClasse from "./FormulaireClasse";
import PosterCours from "../components/PosterCours";
import DemandesAccesProf from "../components/DemandesAccesProf";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Espaceprofs = () => {
  const [showForm, setShowForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [profId, setProfId] = useState(null);
  const [selectedClasse, setSelectedClasse] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [coursClasse, setCoursClasse] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Charger les classes du prof
  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API_URL}/classes/my-classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data.classes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Charger les cours d'une classe
  const fetchCoursClasse = async (classeId) => {
    try {
      const res = await axios.get(`${API_URL}/cours/classe/${classeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoursClasse(res.data || []);
    } catch (err) {
      console.error("Erreur chargement cours:", err);
    }
  };

  // 🔹 Sélection d'une classe
  const handleSelectClasse = async (classe) => {
    setSelectedClasse(classe);
    fetchCoursClasse(classe._id);
  };

  // 🔹 Supprimer une classe
  const handleDeleteClasse = async (id) => {
    try {
      await axios.delete(`${API_URL}/classes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classes.filter((c) => c._id !== id));
      if (selectedClasse && selectedClasse._id === id) setSelectedClasse(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression de la classe");
    }
  };

  const handleBackToList = () => {
    setSelectedClasse(null);
    setCoursClasse([]);
  };


  const handleDeleteCours = async (coursId) => {
    const confirmSuppression = window.confirm(
      "Voulez-vous vraiment supprimer ce cours ?"
    );
    if (!confirmSuppression) return;
  
    try {
      await axios.delete(`${API_URL}/cours/${coursId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // ✅ Mise à jour correcte du state
      setCoursClasse((prev) => prev.filter((c) => c._id !== coursId));
  
      alert("✅ Cours supprimé avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression du cours :", err);
  
      if (err.response?.status === 404) {
        alert("❌ Cours introuvable.");
      } else {
        alert("❌ Erreur serveur lors de la suppression du cours.");
      }
    }
  };
  

  // 🔹 Charger infos du prof et classes au montage
  useEffect(() => {
    fetchClasses();
    const storedEmail = localStorage.getItem("email");
    const storedProfId = localStorage.getItem("profId");
    if (storedEmail) setEmail(storedEmail);
    if (storedProfId) setProfId(storedProfId);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Menu latéral */}
      <div
        className="menu-vertical-espaceprofs"
        style={{
          width: "220px",
          background: "#f5f5f5",
          padding: "20px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h3>📋 Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>🏠 Tableau de bord</li>
          <li>📚 Mes Classes</li>
          <li>👩‍🏫 Profil</li>
          <li>⚙️ Paramètres</li>
        </ul>
      </div>

      {/* Zone principale */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px" }}>
        {/* En-tête */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Bienvenue, {email} 👋</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {showForm ? "Fermer le formulaire" : "Créer une classe"}
          </button>
        </div>

        {/* Formulaire création classe */}
        {showForm && (
          <div className="mt-4 p-4 border rounded shadow" style={{ marginBottom: "20px" }}>
            <FormulaireClasse
              onClassCreated={() => {
                setShowForm(false);
                fetchClasses();
              }}
            />
          </div>
        )}

        {/* Sélection classe et menu */}
        {selectedClasse && (
          <div>
            <nav style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <button onClick={handleBackToList}>Retour à mes classes</button>
              <button>Liste des élèves</button>
              <button onClick={() => setShowUploadForm(!showUploadForm)}>
                {showUploadForm ? "Fermer le formulaire" : "Poster un cours"}
              </button>
              <button>Poster des exercices</button>
              <button>Poster un devoir</button>
              <button>Poster un Quiz</button>
            </nav>

            {/* Détail classe */}
            <div className="conteneur-classe-cours">
              <div className="titre-classe">
                <h2>📘 Classe</h2>
                <div className="titre">
                  <h2><strong>{selectedClasse.niveau}</strong></h2>
                  <h2><strong>{selectedClasse.serie}</strong></h2>
                  <h2>
                    <strong>Créée le :</strong>{" "}
                    {new Date(selectedClasse.createdAt).toLocaleString()}
                  </h2>
                </div>
              </div>

              {/* Demandes accès */}
              <DemandesAccesProf />

              {/* Liste des cours */}
              <div>
  <h3>📚 Cours de la classe</h3>
  {coursClasse.length === 0 ? (
    <p>Aucun cours pour le moment.</p>
  ) : (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      {coursClasse.map((c) => (
        <li
          key={c._id}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "12px",
            flex: "1 1 180px", // largeur réduite pour plusieurs cartes sur la ligne
            maxWidth: "180px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div>
            <strong style={{ fontSize: "14px", color: "#007bff" }}>{c.titre}</strong>
            <p style={{ margin: "6px 0", color: "#333", fontSize: "13px" }}>{c.contenu}</p>
          </div>

          {c.fichiers && c.fichiers.length > 0 && (
            <div>
              {c.fichiers.map((f, i) => (
                <a
                  key={i}
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    color: "#007bff",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  📎 {f.nom || "Ouvrir le fichier"}
                </a>
              ))}
            </div>
          )}

          <button
            onClick={() => handleDeleteCours(c._id)}
            style={{
              marginTop: "8px",
              /*backgroundColor: "#dc3545",*/
              /*color: "#fff",*/
              border: "none",
              padding: "5px 8px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            🗑 Supprimer
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

         {/* <div>
                <h3>📚 Cours de la classe</h3>
                {coursClasse.length === 0 ? (
                  <p>Aucun cours pour le moment.</p>
                ) : (
                  <ul>
                    {coursClasse.map((c) => (
                      <li key={c._id}>
                        <strong>{c.titre}</strong> - {c.contenu}
                        {c.fichiers && c.fichiers.length > 0 && (
                          <div>
                            <a href={c.fichiers[0].url} target="_blank" rel="noopener noreferrer">
                              {c.fichiers[0].nom}
                            </a>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>*/}

              {/* Formulaire poster un cours */}
              {showUploadForm && selectedClasse && (
                <div style={{ marginBottom: "20px" }}>
                  <PosterCours
                    onClose={() => setShowUploadForm(false)}
                    selectedClasseId={selectedClasse._id}
                    onCoursAjoute={(nouveauCours) =>
                      setCoursClasse(prev => [nouveauCours, ...prev])
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Liste des classes */}
        {!selectedClasse && (
          <>
            <h3>📚 Mes Classes</h3>
            {loading ? (
              <p>Chargement...</p>
            ) : classes.length === 0 ? (
              <p>Aucune classe pour le moment.</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {classes.map((classe) => (
                  <div
                    key={classe._id}
                    onClick={() => handleSelectClasse(classe)}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "16px",
                      width: "200px",
                      height: "150px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <h4 style={{ display: "flex", gap: "15px" }}>
                      <p>{classe.niveau}</p>
                      <p>{classe.serie}</p>
                    </h4>
                    <p>{classe.description}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClasse(classe._id);
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Espaceprofs;


/*import React, { useState, useEffect } from "react";
import FormulaireClasse from "./FormulaireClasse";
import axios from "axios";
import PosterCours from "../components/PosterCours";
import ListeCours from "../components/ListeCours";
import DemandesAccesProf from "../components/DemandesAccesProf";
//import ListeEleves from "../components/ListeEleves";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const API_URL_CLASSE = process.env.REACT_APP_API_URL_CLASSE || "http://localhost:5000/api";

const Espaceprofs = () => {
  const [showForm, setShowForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [profId, setProfId] = useState(null); // ✅ ajouté
  const [selectedClasse, setSelectedClasse] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  

  // Charger les classes du prof
  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/classes/my-classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data.classes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Charger infos du prof depuis localStorage

  useEffect(() => {
    fetchClasses();
    const storedEmail = localStorage.getItem("email");
    const storedProfId = localStorage.getItem("profId");
    if (storedEmail) setEmail(storedEmail);
    if (storedProfId) setProfId(storedProfId);
  }, []);
  
  // Supprimer une classe
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL_CLASSE}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classes.filter((c) => c._id !== id));
      if (selectedClasse && selectedClasse._id === id) setSelectedClasse(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression de la classe");
    }
  };

  const handleSelectClasse = async (classe) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/classes/${classe._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedClasse(res.data.classe);
    } catch (err) {
      console.error("Erreur de chargement de la classe:", err);
    }
  };

  const handleBackToList = () => setSelectedClasse(null);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>*/
      {/* 🧭 Menu latéral 
      <div
        className="menu-vertical-espaceprofs"
        style={{
          width: "220px",
          background: "#f5f5f5",
          padding: "20px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h3>📋 Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>🏠 Tableau de bord</li>
          <li>📚 Mes Classes</li>
          <li>👩‍🏫 Profil</li>
          <li>⚙️ Paramètres</li>
        </ul>
      </div>*/}

      {/* 🌟 Zone principale 
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px" }}>*/}
        {/* En-tête 
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Bienvenue, {email} 👋</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {showForm ? "Fermer le formulaire" : "Créer une classe"}
          </button>
        </div>*/}

        {/* Formulaire création classe 
        {showForm && (
          <div className="mt-4 p-4 border rounded shadow" style={{ marginBottom: "20px" }}>
            <FormulaireClasse
              onClassCreated={() => {
                setShowForm(false);
                fetchClasses();
              }}
            />
          </div>
        )}*/}

            {/* 3️⃣ Menu horizontal pour la classe 
            {selectedClasse && (
              <nav style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>

                <button onClick={handleBackToList}>Retour à mes classes</button>

                <button>Liste des élèves</button>

                <button onClick={() => setShowUploadForm(!showUploadForm)}>
                  {showUploadForm ? "Fermer le formulaire" : "Poster un cours"}
                </button>

                <button>Poster des exercices</button>
                <button>Poster un devoir</button>
                <button>Poster un Quiz</button>
              </nav>
            )}*/}

        {/* 🌍 Détail d’une classe sélectionnée 
        <div>
          {selectedClasse ? (
            <div>
              <div className="conteneur-classe-cours">
                <div className="titre-classe">
                  <h2>📘 Classe</h2>
                  <div className="titre">
                    <h2><strong>{selectedClasse.niveau}</strong> </h2>
                    <h2> <strong>{selectedClasse.serie}</strong> </h2>
                    <h2>  <strong>Créée le :</strong>{" "} {new Date(selectedClasse.createdAt).toLocaleString()}</h2>
                  </div>
                </div>

                <div>*/}
                  {/* ...autres composants 
                  <DemandesAccesProf />
                </div>

                <div>*/}
                 {/* Liste des cours 
                <ListeCours classeId={selectedClasse._id} />
                </div>

              </div>*/}

              {/* ✅ Liste des élèves avec profId */}
             {/*{profId ? (
                <ListeEleves profId={profId} />
              ) : (
                <p style={{ color: "red" }}>⚠️ profId introuvable — vérifie le login.</p>
              )}*/}

              {/* Formulaire upload 
             {showUploadForm && selectedClasse && (
                <div style={{ marginBottom: "20px" }}>
                  <PosterCours onClose={() => setShowUploadForm(false)} 
                  selectedClasseId={selectedClasse._id}
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              <h3>📚 Mes Classes</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : classes.length === 0 ? (
                <p>Aucune classe pour le moment.</p>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  {classes.map((classe) => (
                    <div
                      key={classe._id}
                      onClick={() => handleSelectClasse(classe)}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "16px",
                        width: "1 1 200px",
                        height: "150px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <h4 style={{ display: "flex", gap: "15px" }}>
                        <p>{classe.niveau}</p> <p>{classe.serie}</p>
                      </h4>
                      <p>{classe.description}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(classe._id);
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Espaceprofs;*/}








