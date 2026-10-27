
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";

function BookTicket() {
  const { busId } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [busResponse, seatResponse] = await Promise.all([
          api.get("/buses"),
          api.get(`/seats/bus/${busId}`),
        ]);

        const foundBus = busResponse.data.find(
          (item) => String(item.id) === String(busId)
        );

        setBus(foundBus || null);
        setSeats(seatResponse.data);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          "Unable to load bus or seats. Please log in and try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [busId]);

  const bookSeat = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    if (!selectedSeat) {
      setMessage("Please select an available seat.");
      return;
    }

    try {
      const response = await api.post(
        `/bookings?userId=${userId}&busId=${busId}&seatId=${selectedSeat}`
      );

      setMessage("Ticket booked successfully!");

      setSeats((previousSeats) =>
        previousSeats.map((seat) =>
          String(seat.id) === String(selectedSeat)
            ? { ...seat, available: false }
            : seat
        )
      );

      setSelectedSeat("");

      console.log("Booking response:", response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.response?.data ||
        "Booking failed. Please try again."
      );
    }
  };

  if (loading) return <p>Loading seats...</p>;

  return (
    <div className="container">
      <h1>Book Your Ticket</h1>

      {bus && (
        <div className="bus-card">
          <h2>{bus.busName}</h2>
          <p>Route: {bus.source} → {bus.destination}</p>
          <p>Departure: {bus.departureTime}</p>
          <p>Price: ₹{bus.price}</p>
        </div>
      )}

      <h2>Select an Available Seat</h2>

      {seats.length === 0 && <p>No seats found for this bus.</p>}

      <div className="seat-grid">
        {seats.map((seat) => (
          <button
            key={seat.id}
            disabled={!seat.available}
            onClick={() => setSelectedSeat(String(seat.id))}
            className={
              !seat.available
                ? "seat booked"
                : String(selectedSeat) === String(seat.id)
                ? "seat selected"
                : "seat available"
            }
          >
            {seat.seatNumber ?? seat.id}
            {!seat.available ? " (Booked)" : ""}
          </button>
        ))}
      </div>

      {selectedSeat && (
        <p>
          Selected seat:{" "}
          {seats.find(
            (seat) => String(seat.id) === String(selectedSeat)
          )?.seatNumber ?? selectedSeat}
        </p>
      )}

      <button onClick={bookSeat} disabled={!selectedSeat}>
        Confirm Booking
      </button>

      {message && <p>{String(message)}</p>}
    </div>
  );
}

export default BookTicket;
