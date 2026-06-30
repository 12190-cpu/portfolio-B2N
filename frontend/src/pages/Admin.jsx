import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("admin");

  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  function logout() {
    localStorage.removeItem("admin");
    navigate("/login");
  }

  return (
    <main className="page">
      <h1>Dashboard Admin</h1>

      <button onClick={logout} className="logout-btn">
        Déconnexion
      </button>

      <section className="admin-box">
        <h2>Gestion du menu</h2>
        <p>
          Dans cette première version, les produits sont dans le fichier :
        </p>
        <code>frontend/src/pages/Menu.jsx</code>

        <p>
          Pour ajouter un produit, ajoute un nouvel objet dans le tableau
          <strong> products</strong>.
        </p>
      </section>

      <section className="admin-box">
        <h2>Gestion des secteurs</h2>
        <p>
          Les secteurs sont dans le fichier :
        </p>
        <code>frontend/src/pages/Sectors.jsx</code>

        <p>
          Pour modifier une ville, modifie le tableau <strong>sectors</strong>.
        </p>
      </section>
    </main>
  );
}

export default Admin;