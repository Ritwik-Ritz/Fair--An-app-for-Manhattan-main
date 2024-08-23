package com.compsci.webapp.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * Module Name: ResendVerificationEmailReqeust.java
 * Date of Creation: 27-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@NoArgsConstructor
@AllArgsConstructor
public class ResendVerificationEmailReqeust {
	
	@NotEmpty(message = "Email should not be empty")
    @Email(message = "Email is not valid")
	private String emailId;

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	
	
}