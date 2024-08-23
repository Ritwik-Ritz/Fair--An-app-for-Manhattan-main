package com.compsci.webapp.response;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Module Name: UserRegisterResponse.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@JsonInclude(JsonInclude.Include.NON_NULL)//Will not send fields with null values
public class UserRegisterResponse {
        
    private String userName;
        
    private String userEmail;
    
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }


}