package com.compsci.webapp.util;

 /**
 * Module Name: Constants.java
 * Date of Creation: 21-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public enum Constants {
	EMAIL_ALREADY_IN_USE("Email is already in use!"),
	INACTIVE_USER("Account is not verified. Please verify it"),
	BAD_CREDENTIALS("Incorrect Credentials!"),
	USER_NOT_FOUND("User not found"),
	LOGIN_SUCCESSFULL("Login Successfull"),
	REGISTERED_SUCCESSFULL("User registered successfully! "),
	EMAIL_ALREADY_VERIFIED("Email already Confirmed"),
	SUBMITTED_SUCCESSFULLY("Submitted Successfully");
	
	
    private final String message;

    Constants(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
