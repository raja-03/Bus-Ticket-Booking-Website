
package com.tickets.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tickets.entity.Bus;
import com.tickets.entity.Seat;
import com.tickets.repository.BusRepository;
import com.tickets.repository.SeatRepository;

@Service
public class SeatService {

    private final SeatRepository seatRepository;
    private final BusRepository busRepository;

    public SeatService(
            SeatRepository seatRepository,
            BusRepository busRepository) {

        this.seatRepository = seatRepository;
        this.busRepository = busRepository;
    }

    // Add a single seat
    public Seat addSeat(Long busId, Seat seat) {

        Bus bus = busRepository.findById(busId)
                .orElseThrow(() ->
                        new RuntimeException("Bus not found"));

        seat.setBus(bus);
        seat.setAvailable(true);

        if (seat.getSeatNumber() == null ||
                seat.getSeatNumber().trim().isEmpty()) {
            throw new RuntimeException("Seat number is required");
        }

        return seatRepository.save(seat);
    }

    // Automatically create all seats for a bus
    @Transactional
    public List<Seat> createSeatsForBus(Long busId) {

        Bus bus = busRepository.findById(busId)
                .orElseThrow(() ->
                        new RuntimeException("Bus not found"));

        List<Seat> existingSeats =
                seatRepository.findByBusId(busId);

        int existingCount = existingSeats.size();

        if (existingCount >= bus.getTotalSeats()) {
            throw new RuntimeException(
                    "All seats already exist for this bus");
        }
        List<Seat> seats = new ArrayList<>();

        for (int i = 1; i <= bus.getTotalSeats(); i++) {

            final String seatNumber = String.valueOf(i);

            boolean alreadyExists = existingSeats.stream()
                    .anyMatch(seat ->
                            seatNumber.equals(seat.getSeatNumber()));

            if (!alreadyExists) {
                Seat seat = new Seat();
                seat.setSeatNumber(seatNumber);
                seat.setAvailable(true);
                seat.setBus(bus);

                seats.add(seat);
            }
        }

        return seatRepository.saveAll(seats);
    }

    // Get seats by bus
    public List<Seat> getSeatsByBus(Long busId) {

        return seatRepository.findByBusId(busId);
    }
}
