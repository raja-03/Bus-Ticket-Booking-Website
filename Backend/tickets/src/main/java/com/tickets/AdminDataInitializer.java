
package com.tickets;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tickets.entity.User;
import com.tickets.repository.UserRepository;

@Configuration
public class AdminDataInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            // Check whether admin already exists
            if (userRepository.findByEmail("admin@gmail.com")
                    .isEmpty()) {

                User admin = new User();

                admin.setName("Administrator");
                admin.setEmail("admin@gmail.com");

                // Encrypt the password
                admin.setPassword(
                    passwordEncoder.encode("Admin@123")
                );

                admin.setPhone("9999999999");

                // Assign ADMIN role
                admin.setRole("ADMIN");

                // Save admin in database
                userRepository.save(admin);

                System.out.println(
                    "Admin account created successfully!"
                );

            } else {

                System.out.println(
                    "Admin account already exists!"
                );
            }
        };
    }
}