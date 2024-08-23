package com.compsci.webapp.exception;

 /**
 * Module Name: InvalidCredentialsException.java
 * Date of Creation: 21-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class InvalidCredentialsException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidCredentialsException(String message) {
        super(message);
    }
}
