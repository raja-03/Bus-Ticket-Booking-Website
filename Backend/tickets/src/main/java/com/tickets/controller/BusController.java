package com.tickets.controller;



	import java.util.List;

	import org.springframework.web.bind.annotation.*;

	import com.tickets.entity.Bus;
	import com.tickets.service.BusService;

	@RestController
	@RequestMapping("/api/buses")
	@CrossOrigin(origins = "http://localhost:5173")
	public class BusController {

	    private final BusService busService;

	    public BusController(BusService busService) {
	        this.busService = busService;
	    }

	    @PostMapping
	    public Bus addBus(@RequestBody Bus bus) {
	        return busService.addBus(bus);
	    }

	    @GetMapping
	    public List<Bus> getAllBuses() {
	        return busService.getAllBuses();
	    }

	    @GetMapping("/search")
	    public List<Bus> searchBuses(
	            @RequestParam String source,
	            @RequestParam String destination) {

	        return busService.searchBuses(
	                source,
	                destination
	        );
	    }

	    @DeleteMapping("/{id}")
	    public String deleteBus(@PathVariable Long id) {

	        busService.deleteBus(id);

	        return "Bus deleted successfully";
	    }
	}


