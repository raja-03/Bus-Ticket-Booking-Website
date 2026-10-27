package com.tickets.entity;


	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.ManyToOne;

	@Entity
	public class Seat {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String seatNumber;

	    private boolean available;

	    @ManyToOne
	    @JoinColumn(name = "bus_id")
	    private Bus bus;

	    public Seat() {
	    }

	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }

	    public String getSeatNumber() {
	        return seatNumber;
	    }

	    public void setSeatNumber(String seatNumber) {
	        this.seatNumber = seatNumber;
	    }

	    public boolean isAvailable() {
	        return available;
	    }

	    public void setAvailable(boolean available) {
	        this.available = available;
	    }

	    public Bus getBus() {
	        return bus;
	    }

	    public void setBus(Bus bus) {
	        this.bus = bus;
	    }
	}


