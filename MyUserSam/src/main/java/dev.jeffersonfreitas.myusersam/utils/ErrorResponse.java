package dev.jeffersonfreitas.myusersam.utils;

import java.util.Date;

public class ErrorResponse {

    private String message;
    private int code;
    private Date timestamp;

    public ErrorResponse(String message, int code){
        this.message = message;
        this.code = code;
        this.timestamp = new Date();
    }

    public ErrorResponse(String message) {
        this.message = message;
        this.timestamp = new Date();
    }
}
