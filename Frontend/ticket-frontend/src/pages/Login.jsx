
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/users/login", form);
      const data = response.data;

      if (!data.token) {
        throw new Error("Login response did not contain a token.");
      }

      localStorage.setItem("token", data.token);

      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      if (data.userId != null) {
        localStorage.setItem("userId", String(data.userId));
      }

      if (data.name) {
        localStorage.setItem("name", data.name);
      }

      if (data.email) {
        localStorage.setItem("email", data.email);
      }

      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/buses");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Welcome back! Sign in to your account.</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {message && <p className="error-message">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
