
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
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
      await api.post("/users/register", form);

      setMessage("Registration successful! Please log in.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      const data = error.response?.data;

      if (data && typeof data === "object") {
        setMessage(
          data.message ||
          Object.values(data.errors || {}).join(", ") ||
          "Registration failed. Please check your details."
        );
      } else {
        setMessage(
          data || error.message || "Registration failed."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Register to book and manage tickets.</p>

        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />

        {message && <p className="form-message">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
