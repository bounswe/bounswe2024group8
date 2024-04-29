package com.example.fanaticbackend.exception.custom;

public class FanaticDatabaseException extends RuntimeException {

    public FanaticDatabaseException(String message) {
        super(message);
    }

    public FanaticDatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}
