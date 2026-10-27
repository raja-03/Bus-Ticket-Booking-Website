package com.tickets.controller;



	import java.util.List;

	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.*;

	import com.tickets.entity.Booking;
	import com.tickets.service.BookingService;

	@RestController
	@RequestMapping("/api/bookings")
	@CrossOrigin(origins = "http://localhost:5173")
	public class BookingController {

	    private final BookingService bookingService;

	    public BookingController(
	            BookingService bookingService) {

	        this.bookingService = bookingService;
	    }

	    @PostMapping
	    public ResponseEntity<?> createBooking(
	            @RequestParam Long userId,
	            @RequestParam Long busId,
	            @RequestParam Long seatId) {

	        try {

	            Booking booking =
	                    bookingService.createBooking(
	                            userId,
	                            busId,
	                            seatId
	                    );

	            return ResponseEntity.ok(booking);

	        } catch (RuntimeException e) {

	            return ResponseEntity
	                    .badRequest()
	                    .body(e.getMessage());
	        }
	    }

	    @GetMapping
	    public List<Booking> getAllBookings() {

	        return bookingService.getAllBookings();
	    }

	    @GetMapping("/user/{userId}")
	    public List<Booking> getBookingsByUser(
	            @PathVariable Long userId) {

	        return bookingService
	                .getBookingsByUser(userId);
	    }
	    
	    
	    
	    
	    
	    @PutMapping("/{bookingId}/cancel")
	    public ResponseEntity<?> cancelBooking(
	            @PathVariable Long bookingId) {

	        try {

	            Booking booking =
	                    bookingService.cancelBooking(bookingId);

	            return ResponseEntity.ok(booking);

	        } catch (RuntimeException e) {

	            return ResponseEntity
	                    .badRequest()
	                    .body(e.getMessage());
	        }
	    }
	}


