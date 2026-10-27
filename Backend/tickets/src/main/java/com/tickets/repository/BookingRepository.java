package com.tickets.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tickets.entity.Booking;

public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    boolean existsBySeatIdAndStatus(
            Long seatId,
            String status
    );
}