package com.compsci.webapp.exception;

 /**
 * Module Name: UserNotFoundException.java
 * Date of Creation: 21-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class UserNotFoundException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserNotFoundException(String message) {
        super(message);
    }
}
