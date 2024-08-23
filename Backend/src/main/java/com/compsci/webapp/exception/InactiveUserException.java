package com.compsci.webapp.exception;

 /**
 * Module Name: InactiveUserException.java
 * Date of Creation: 21-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class InactiveUserException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InactiveUserException(String message) {
        super(message);
    }
}
