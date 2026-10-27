package com.tickets.service;



	import java.time.LocalDateTime;
	import java.util.List;

	import org.springframework.stereotype.Service;

	import com.tickets.entity.Booking;
	import com.tickets.entity.Bus;
	import com.tickets.entity.Seat;
	import com.tickets.entity.User;
import com.tickets.exception.ResourceNotFoundException;
import com.tickets.repository.BookingRepository;
	import com.tickets.repository.BusRepository;
	import com.tickets.repository.SeatRepository;
	import com.tickets.repository.UserRepository;

	@Service
	public class BookingService {

	    private final BookingRepository bookingRepository;
	    private final UserRepository userRepository;
	    private final BusRepository busRepository;
	    private final SeatRepository seatRepository;

	    public BookingService(
	            BookingRepository bookingRepository,
	            UserRepository userRepository,
	            BusRepository busRepository,
	            SeatRepository seatRepository) {

	        this.bookingRepository = bookingRepository;
	        this.userRepository = userRepository;
	        this.busRepository = busRepository;
	        this.seatRepository = seatRepository;
	    }

	    public Booking createBooking(
	            Long userId,
	            Long busId,
	            Long seatId) {

	        // 1. Find User
	    	User user = userRepository.findById(userId)
	    	        .orElseThrow(() ->
	    	            new ResourceNotFoundException("User not found"));

	        // 2. Find Bus
	    	Bus bus = busRepository.findById(busId)
	    	        .orElseThrow(() ->
	    	            new ResourceNotFoundException("Bus not found"));
	        // 3. Find Seat
	    	Seat seat = seatRepository.findById(seatId)
	    	        .orElseThrow(() ->
	    	            new ResourceNotFoundException("Seat not found"));

	        // 4. Check seat belongs to this bus
	        if (seat.getBus() == null ||
	                !seat.getBus().getId().equals(busId)) {

	            throw new RuntimeException(
	                    "Seat does not belong to this bus");
	        }

	        // 5. Check seat availability
	        if (!seat.isAvailable()) {

	            throw new RuntimeException(
	                    "Seat is already unavailable");
	        }

	        // 6. Check existing confirmed booking
	        boolean alreadyBooked =
	                bookingRepository.existsBySeatIdAndStatus(
	                        seatId,
	                        "CONFIRMED"
	                );

	        if (alreadyBooked) {

	            throw new RuntimeException(
	                    "Seat is already booked");
	        }

	        // 7. Create booking
	        Booking booking = new Booking();

	        booking.setUser(user);
	        booking.setBus(bus);
	        booking.setSeat(seat);

	        booking.setBookingDate(
	                LocalDateTime.now());

	        booking.setTotalPrice(
	                bus.getPrice());

	        booking.setStatus("CONFIRMED");

	        // 8. Make seat unavailable
	        seat.setAvailable(false);

	        seatRepository.save(seat);

	        // 9. Save booking
	        return bookingRepository.save(booking);
	    }

	    public List<Booking> getAllBookings() {

	        return bookingRepository.findAll();
	    }

	    public List<Booking> getBookingsByUser(
	            Long userId) {

	        return bookingRepository
	                .findByUserId(userId);
	    }
	    
	    
	    
	
	public Booking cancelBooking(Long bookingId) {

	    // 1. Find booking
		Booking booking = bookingRepository.findById(bookingId)
		        .orElseThrow(() ->
		            new ResourceNotFoundException("Booking not found"));

	    // 2. Check booking status
	    if (!booking.getStatus().equals("CONFIRMED")) {

	        throw new RuntimeException(
	                "Booking is already cancelled");
	    }

	    // 3. Change booking status
	    booking.setStatus("CANCELLED");

	    // 4. Make the seat available again
	    Seat seat = booking.getSeat();

	    seat.setAvailable(true);

	    seatRepository.save(seat);

	    // 5. Save updated booking
	    return bookingRepository.save(booking);
	}
	}

