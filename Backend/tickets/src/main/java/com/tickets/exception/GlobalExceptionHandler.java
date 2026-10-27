package com.tickets.exception;

import java.util.LinkedHashMap;
import java.util.Map;


import jakarta.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("status", 400);
        response.put("error", "Validation Error");

        Map<String, String> messages = new LinkedHashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> {
                    messages.put(
                            error.getField(),
                            error.getDefaultMessage()
                    );
                });

        response.put("messages", messages);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> handleConstraintViolation(
            ConstraintViolationException ex) {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("status", 400);
        response.put("error", "Validation Error");

        Map<String, String> messages = new LinkedHashMap<>();

        ex.getConstraintViolations()
                .forEach(violation -> {

                    String field = violation
                            .getPropertyPath()
                            .toString();

                    messages.put(
                            field,
                            violation.getMessage()
                    );
                });

        response.put("messages", messages);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(
            ResourceNotFoundException ex) {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("status", 404);
        response.put("error", "Not Found");
        response.put("message", ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(
            RuntimeException ex) {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("status", 400);
        response.put("error", "Bad Request");
        response.put("message", ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(
            Exception ex) {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("status", 500);
        response.put("error", "Internal Server Error");
        response.put("message", "Something went wrong");

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

@ExceptionHandler(BadCredentialsException.class)
public ResponseEntity<Map<String, Object>> handleBadCredentials(
        BadCredentialsException ex) {

    Map<String, Object> response = new LinkedHashMap<>();

    response.put("status", 401);
    response.put("error", "Unauthorized");
    response.put("message", "Invalid email or password");

    return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(response);
}

@ExceptionHandler(AuthenticationException.class)
public ResponseEntity<Map<String, Object>> handleAuthentication(
        AuthenticationException ex) {

    Map<String, Object> response = new LinkedHashMap<>();

    response.put("status", 401);
    response.put("error", "Unauthorized");
    response.put("message", "Authentication failed");

    return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(response);
}
}