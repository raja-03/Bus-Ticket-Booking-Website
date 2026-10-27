
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-container">
      <section className="hero">
        <p className="hero-label">YOUR JOURNEY STARTS HERE</p>

        <h1>Book Your Tickets Easily</h1>

        <p>
          Search available buses, choose your seat, and manage
          your bookings from one place.
        </p>

        <Link to="/buses" className="primary-button">
          Search Buses
        </Link>
      </section>

      <section className="features">
        <article className="feature-card">
          <h3>Easy Search</h3>
          <p>Find buses by source and destination.</p>
        </article>

        <article className="feature-card">
          <h3>Seat Selection</h3>
          <p>View available seats before booking.</p>
        </article>

        <article className="feature-card">
          <h3>Manage Bookings</h3>
          <p>View your booking history and cancel tickets.</p>
        </article>
      </section>
    </main>
  );
}
