package com.tickets.service;



	import java.util.List;

	import org.springframework.stereotype.Service;

	import com.tickets.entity.Bus;
	import com.tickets.repository.BusRepository;

	@Service
	public class BusService {

	    private final BusRepository busRepository;

	    public BusService(BusRepository busRepository) {
	        this.busRepository = busRepository;
	    }

	    public Bus addBus(Bus bus) {
	        return busRepository.save(bus);
	    }

	    public List<Bus> getAllBuses() {
	        return busRepository.findAll();
	    }

	    public List<Bus> searchBuses(
	            String source,
	            String destination) {

	        return busRepository
	                .findBySourceAndDestination(
	                        source,
	                        destination
	                );
	    }

	    public void deleteBus(Long id) {
	        busRepository.deleteById(id);
	    }
	}


