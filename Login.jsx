import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) return;

   try {
  const res = await axios.post(
    "https://movie-review-backend-vlzn.onrender.com/users/login",
    {
      email,
      password,
    }
  );

  console.log(res.data);

  localStorage.setItem("user", JSON.stringify(res.data.user));

  alert(res.data.message);

  navigate("/home");
} catch (err) {
  alert(err.response?.data || "Login failed");
} 
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h1 className="logo">Movie Hub</h1>

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Search movies, write reviews and manage your favorites.
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {emailError && <p className="error">{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {passwordError && <p className="error">{passwordError}</p>}

          <button type="submit">
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;