package com.taskflow.server.controllers;

import com.taskflow.server.dtos.ResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDTO> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseDTO.badRequest(errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDTO> handleGenericMessageException(Exception ex) {
        Map<String, String> errors = new HashMap<>();

        errors.put("message", ex.getMessage());

        return ResponseDTO.badRequest(errors);
    }

}