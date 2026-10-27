
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchBookings = async () => {
    if (!userId) {
      setError("Please log in to view your bookings.");
      setLoading(false);
      return;
    }

    try {
      setError("");
      const response = await api.get(`/bookings/user/${userId}`);
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load bookings. Please log in again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const cancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      await api.put(`/bookings/${bookingId}/cancel`);

      setMessage("Booking cancelled successfully.");
      await fetchBookings();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Unable to cancel booking. Please try again."
      );
    }
  };

  if (loading) {
    return <div className="container"><p>Loading your bookings...</p></div>;
  }

  return (
    <div className="container">
      <h1>My Bookings</h1>
      <p>Your booking history and cancellation options.</p>

      {error && <p className="error-message">{error}</p>}
      {message && <p>{message}</p>}

      {!error && bookings.length === 0 && (
        <p>No bookings found for your account.</p>
      )}

      <div className="booking-list">
        {bookings.map((booking) => {
          const bus = booking.bus || {};
          const seat = booking.seat || {};

          const status =
            booking.status ||
            booking.bookingStatus ||
            (booking.cancelled ? "CANCELLED" : "BOOKED");

          const cancelled =
            String(status).toUpperCase() === "CANCELLED";

          return (
            <div className="bus-card" key={booking.id}>
              <h2>{bus.busName || "Bus Booking"}</h2>

              <p>Booking ID: {booking.id}</p>
              <p>
                Route: {bus.source || "—"} → {bus.destination || "—"}
              </p>
              <p>Bus Number: {bus.busNumber || "—"}</p>
              <p>Seat Number: {seat.seatNumber || "—"}</p>
              <p>Departure: {bus.departureTime || "—"}</p>
              <p>Arrival: {bus.arrivalTime || "—"}</p>
              <p>Price: ₹{bus.price ?? booking.amount ?? "—"}</p>
              <p>Status: {status}</p>

              {!cancelled && (
                <button
                  type="button"
                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel Ticket
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyBookings;
