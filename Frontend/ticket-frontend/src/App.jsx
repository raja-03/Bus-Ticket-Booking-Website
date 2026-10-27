
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookTicket from "./pages/BookTicket";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusSearch from "./pages/BusSearch";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <main className="page-container">
        <h2>Please log in first.</h2>
      </main>
    );
  }

  return children;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "ADMIN") {
    return (
      <main className="page-container">
        <h2>Admin access required.</h2>
      </main>
    );
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buses" element={<BusSearch />} />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/book/:busId" element={<BookTicket />} />

        <Route
          path="*"
          element={
            <main className="page-container">
              <h2>404 - Page Not Found</h2>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
