package com.compsci.webapp.response;

 /**
 * Module Name: ResendVerificationEmailResponse.java
 * Date of Creation: 27-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class ResendVerificationEmailResponse {
	private String userName;
	private String userEmailId;
	private String message;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserEmailId() {
		return userEmailId;
	}
	public void setUserEmailId(String userEmailId) {
		this.userEmailId = userEmailId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}