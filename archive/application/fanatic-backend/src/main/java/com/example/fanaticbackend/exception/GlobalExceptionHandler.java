package com.example.fanaticbackend.exception;

import com.example.fanaticbackend.exception.custom.FanaticDatabaseException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.Date;


@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

    @ExceptionHandler(FanaticDatabaseException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorMessage fanaticDatabaseException(FanaticDatabaseException ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                new Date(),
                ex.getMessage(),
                request.getDescription(false)
        );

        return message;
    }


    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage globalException(Exception ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                new Date(),
                ex.getMessage(),
                request.getDescription(false)
        );

        return message;
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ErrorMessage handleMaxSizeException() {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.PAYLOAD_TOO_LARGE.value(),
                new Date(),
                "File too large!",
                "Please upload an image smaller than 4MB"
        );

        return message;
    }


}
