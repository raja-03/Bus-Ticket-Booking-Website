package com.tickets.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tickets.entity.Booking;
import com.tickets.entity.Bus;
import com.tickets.entity.User;
import com.tickets.repository.BookingRepository;
import com.tickets.repository.BusRepository;
import com.tickets.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final BusRepository busRepository;
    private final BookingRepository bookingRepository;

    public AdminController(UserRepository userRepository,
                           BusRepository busRepository,
                           BookingRepository bookingRepository) {

        this.userRepository = userRepository;
        this.busRepository = busRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/buses")
    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    @PostMapping("/buses")
    public Bus addBus(@RequestBody Bus bus) {
        return busRepository.save(bus);
    }

    @DeleteMapping("/buses/{id}")
    public String deleteBus(@PathVariable Long id) {

        busRepository.deleteById(id);

        return "Bus deleted successfully";
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}