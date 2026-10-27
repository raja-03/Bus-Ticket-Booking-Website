package com.tickets.controller;



	import java.util.List;

	import org.springframework.web.bind.annotation.*;

	import com.tickets.entity.Seat;
	import com.tickets.service.SeatService;

	@RestController
	@RequestMapping("/api/seats")
	@CrossOrigin(origins = "http://localhost:5173")
	public class SeatController {

	    private final SeatService seatService;

	    public SeatController(SeatService seatService) {
	        this.seatService = seatService;
	    }

	    @PostMapping("/bus/{busId}")
	    public Seat addSeat(
	            @PathVariable Long busId,
	            @RequestBody Seat seat) {

	        return seatService.addSeat(busId, seat);
	    }

	    @GetMapping("/bus/{busId}")
	    public List<Seat> getSeatsByBus(
	            @PathVariable Long busId) {

	        return seatService.getSeatsByBus(busId);
	    }

@PostMapping("/bus/{busId}/generate")
public List<Seat> createSeatsForBus(@PathVariable Long busId) {
    return seatService.createSeatsForBus(busId);
}

	}

