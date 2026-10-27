
import { useState } from "react";
import api from "../api/axiosConfig";

function BusSearch() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Search buses by source and destination
  const searchBuses = async (e) => {
    e.preventDefault();

    if (!source.trim() || !destination.trim()) {
      setError("Please enter both source and destination.");
      setBuses([]);
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await api.get("/buses/search", {
        params: {
          source: source.trim(),
          destination: destination.trim(),
        },
      });

      setBuses(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setBuses([]);
      setError(
        err.response?.data?.message ||
        "Unable to search buses. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch all buses only when Show All is clicked
  const showAllBuses = async () => {
    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const response = await api.get("/buses");
      setBuses(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setBuses([]);
      setError(
        err.response?.data?.message ||
        "Unable to load buses. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Search Buses</h1>
      <p>Find a bus for your journey.</p>

      <form onSubmit={searchBuses}>
        <div className="search-form">
          <input
            type="text"
            placeholder="From (e.g. Chennai)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <input
            type="text"
            placeholder="To (e.g. Salem)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            onClick={showAllBuses}
            disabled={loading}
          >
            Show All
          </button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}

      {loading && <p>Loading buses...</p>}

      {!loading && searched && buses.length === 0 && !error && (
        <p>No buses found for this route.</p>
      )}

      {!loading && buses.length > 0 && (
        <div className="bus-list">
          {buses.map((bus) => (
            <div className="bus-card" key={bus.id}>
              <h2>{bus.busName}</h2>

              <p>Bus Number: {bus.busNumber}</p>

              <p>
                Route: {bus.source} → {bus.destination}
              </p>

              <p>Departure: {bus.departureTime}</p>
              <p>Arrival: {bus.arrivalTime}</p>
              <p>Seats: {bus.totalSeats}</p>

              <p className="bus-price">
                Price: ₹{bus.price}
              </p>
              <button
  onClick={() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
      return;
    }

    window.location.href = `/book/${bus.id}`;
  }}
>
  Book Ticket
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BusSearch;
