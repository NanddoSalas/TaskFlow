package com.taskflow.server.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.stream.Collectors;

public class EnumValidator implements ConstraintValidator<ValidEnum, String> {
    private String message;
    private String allowedValues;
    private Enum<?>[] enumValues;

    @Override
    public void initialize(ValidEnum constraintAnnotation) {
        enumValues = constraintAnnotation.enumClass().getEnumConstants();
        allowedValues = Arrays.stream(enumValues)
                .map(Enum::name)
                .collect(Collectors.joining(", "));
        message = constraintAnnotation.message().replace("{enumValues}", allowedValues);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) return true; // Null values are handled separately (e.g., @NotNull)

        for (Enum<?> e : enumValues) {
            if (e.name().equals(value)) {
                return true;
            }
        }

        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
        return false;
    }
}
