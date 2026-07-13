import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    authService
      .login(username, password)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/admin");
      })
      .catch(() => {
        setError("Identifiants incorrects");
      });
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Connexion Admin</h1>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Identifiant"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Se connecter</button>
      </form>
    </main>
  );
}

export default Login;