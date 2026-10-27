package com.tickets.entity;



	import java.time.LocalDateTime;

	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.ManyToOne;

	@Entity
	public class Booking {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private LocalDateTime bookingDate;

	    private double totalPrice;

	    private String status;

	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private User user;

	    @ManyToOne
	    @JoinColumn(name = "bus_id")
	    private Bus bus;

	    @ManyToOne
	    @JoinColumn(name = "seat_id")
	    private Seat seat;

	    public Booking() {
	    }

	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }

	    public LocalDateTime getBookingDate() {
	        return bookingDate;
	    }

	    public void setBookingDate(LocalDateTime bookingDate) {
	        this.bookingDate = bookingDate;
	    }

	    public double getTotalPrice() {
	        return totalPrice;
	    }

	    public void setTotalPrice(double totalPrice) {
	        this.totalPrice = totalPrice;
	    }

	    public String getStatus() {
	        return status;
	    }

	    public void setStatus(String status) {
	        this.status = status;
	    }

	    public User getUser() {
	        return user;
	    }

	    public void setUser(User user) {
	        this.user = user;
	    }

	    public Bus getBus() {
	        return bus;
	    }

	    public void setBus(Bus bus) {
	        this.bus = bus;
	    }

	    public Seat getSeat() {
	        return seat;
	    }

	    public void setSeat(Seat seat) {
	        this.seat = seat;
	    }
	}


