
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("buses");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [busForm, setBusForm] = useState({
    busName: "",
    busNumber: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: 40,
    price: "",
  });

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    const results = await Promise.allSettled([
      api.get("/admin/users"),
      api.get("/buses"),
      api.get("/bookings"),
    ]);

    const errors = [];

    if (results[0].status === "fulfilled") {
      setUsers(results[0].value.data);
    } else {
      errors.push("Users");
    }

    if (results[1].status === "fulfilled") {
      setBuses(results[1].value.data);
    } else {
      errors.push("Buses");
    }

    if (results[2].status === "fulfilled") {
      setBookings(results[2].value.data);
    } else {
      errors.push("Bookings");
    }

    if (errors.length) {
      setError(
        `Could not load: ${errors.join(", ")}. Check your admin token and backend APIs.`
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("role") !== "ADMIN") {
      setError("Please log in using an admin account.");
      setLoading(false);
      return;
    }

    loadDashboard();
  }, []);

  const handleChange = (e) => {
    setBusForm({
      ...busForm,
      [e.target.name]: e.target.value,
    });
  };

  const addBus = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = {
        ...busForm,
        totalSeats: Number(busForm.totalSeats),
        price: Number(busForm.price),
      };

      await api.post("/buses", payload);

      setMessage("Bus added successfully!");

      setBusForm({
        busName: "",
        busNumber: "",
        source: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        totalSeats: 40,
        price: "",
      });

      await loadDashboard();
      setActiveTab("buses");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not add bus. Check your admin role and bus API."
      );
    }
  };

  if (loading) {
    return <div className="container"><p>Loading admin dashboard...</p></div>;
  }

  return (
    <div className="container admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Manage users, buses, seats, and bookings.</p>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <div className="admin-stats">
        <div className="admin-stat">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="admin-stat">
          <h3>Total Buses</h3>
          <p>{buses.length}</p>
        </div>

        <div className="admin-stat">
          <h3>Total Bookings</h3>
          <p>{bookings.length}</p>
        </div>
      </div>

      <div className="admin-tabs">
        <button onClick={() => setActiveTab("buses")}>Manage Buses</button>
        <button onClick={() => setActiveTab("addBus")}>Add Bus</button>
        <button onClick={() => setActiveTab("users")}>View Users</button>
        <button onClick={() => setActiveTab("bookings")}>View Bookings</button>
      </div>

      {activeTab === "addBus" && (
        <section className="admin-section">
          <h2>Add New Bus</h2>

          <form className="admin-form" onSubmit={addBus}>
            <input name="busName" placeholder="Bus Name" value={busForm.busName} onChange={handleChange} required />
            <input name="busNumber" placeholder="Bus Number" value={busForm.busNumber} onChange={handleChange} required />
            <input name="source" placeholder="Source" value={busForm.source} onChange={handleChange} required />
            <input name="destination" placeholder="Destination" value={busForm.destination} onChange={handleChange} required />
            <input name="departureTime" placeholder="Departure (e.g. 09:00)" value={busForm.departureTime} onChange={handleChange} required />
            <input name="arrivalTime" placeholder="Arrival (e.g. 14:00)" value={busForm.arrivalTime} onChange={handleChange} required />
            <input name="totalSeats" type="number" min="1" placeholder="Total Seats" value={busForm.totalSeats} onChange={handleChange} required />
            <input name="price" type="number" min="0" step="0.01" placeholder="Ticket Price" value={busForm.price} onChange={handleChange} required />

            <button type="submit">Add Bus</button>
          </form>
        </section>
      )}

      {activeTab === "buses" && (
        <section className="admin-section">
          <h2>All Buses</h2>

          {buses.length === 0 ? (
            <p>No buses found.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Bus</th>
                    <th>Number</th>
                    <th>Route</th>
                    <th>Departure</th>
                    <th>Price</th>
                    <th>Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.id}>
                      <td>{bus.id}</td>
                      <td>{bus.busName}</td>
                      <td>{bus.busNumber}</td>
                      <td>{bus.source} → {bus.destination}</td>
                      <td>{bus.departureTime}</td>
                      <td>₹{bus.price}</td>
                      <td>{bus.totalSeats}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {activeTab === "users" && (
        <section className="admin-section">
          <h2>Registered Users</h2>

          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {activeTab === "bookings" && (
        <section className="admin-section">
          <h2>All Bookings</h2>

          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User</th>
                    <th>Bus</th>
                    <th>Seat</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.user?.name || booking.user?.email || booking.userId || "—"}</td>
                      <td>{booking.bus?.busName || "—"}</td>
                      <td>{booking.seat?.seatNumber || "—"}</td>
                      <td>{booking.status || booking.bookingStatus || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      <button className="refresh-button" onClick={loadDashboard}>
        Refresh Dashboard
      </button>
    </div>
  );
}

export default AdminDashboard;
