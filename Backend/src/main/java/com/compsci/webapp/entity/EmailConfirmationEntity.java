package com.compsci.webapp.entity;

 /**
 * Module Name: EmailConfirmationEntity.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class holds the entity class for email_confirmation table
 */


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table(name="email_confirmation",
uniqueConstraints = {
@UniqueConstraint(columnNames = "email_confirmation_id")
})
public class EmailConfirmationEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "email_confirmation_id")
    private Long emailConfirmationId;

    @Column(name = "email_confirmation_token",nullable = false)
    private String emailConfirmationToken;

    @Column(name = "email_confirmation_createdat",nullable = false)
    private LocalDateTime emailConfirmationCreatedAt;

    @Column(name = "email_confirmation_expiresat",nullable = false)
    private LocalDateTime emailConfirmationExpiresAt;

    @Column(name = "email_confirmation_confirmedat")
    private LocalDateTime emailConfirmationConfirmedAt;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private UserEntity userId;

	public Long getEmailConfirmationId() {
		return emailConfirmationId;
	}

	public void setEmailConfirmationId(Long emailConfirmationId) {
		this.emailConfirmationId = emailConfirmationId;
	}

	public String getEmailConfirmationToken() {
		return emailConfirmationToken;
	}

	public void setEmailConfirmationToken(String emailConfirmationToken) {
		this.emailConfirmationToken = emailConfirmationToken;
	}

	public LocalDateTime getEmailConfirmationCreatedAt() {
		return emailConfirmationCreatedAt;
	}

	public void setEmailConfirmationCreatedAt(LocalDateTime emailConfirmationCreatedAt) {
		this.emailConfirmationCreatedAt = emailConfirmationCreatedAt;
	}

	public LocalDateTime getEmailConfirmationExpiresAt() {
		return emailConfirmationExpiresAt;
	}

	public void setEmailConfirmationExpiresAt(LocalDateTime emailConfirmationExpiresAt) {
		this.emailConfirmationExpiresAt = emailConfirmationExpiresAt;
	}

	public LocalDateTime getEmailConfirmationConfirmedAt() {
		return emailConfirmationConfirmedAt;
	}

	public void setEmailConfirmationConfirmedAt(LocalDateTime emailConfirmationConfirmedAt) {
		this.emailConfirmationConfirmedAt = emailConfirmationConfirmedAt;
	}

	public UserEntity getUserId() {
		return userId;
	}

	public void setUserId(UserEntity userId) {
		this.userId = userId;
	}
    
}