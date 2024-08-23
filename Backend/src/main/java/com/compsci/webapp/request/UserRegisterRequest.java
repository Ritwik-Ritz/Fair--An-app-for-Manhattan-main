package com.compsci.webapp.request;

 /**
 * Module Name: UserRegisterRequest.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterRequest {

    @NotEmpty(message = "First Name should not be empty")
    private String userName;
        
    @NotEmpty(message = "Email should not be empty")
    @Email(message = "Email is not valid")
    private String userEmail;
    
    @NotEmpty(message = "Password should not be empty")
    private String userPassword;

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

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

}