package com.compsci.webapp.request;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Module Name: StGeorgeQuizRequest.java
 * Date of Creation: 25-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class StGeorgeQuizRequest {
		
	@JsonProperty("user_id")
	private Long userId;
	
	@JsonProperty("quiz_date")
	private LocalDate quizDate;
	
	@JsonProperty("score")
	private Double Score;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public LocalDate getQuizDate() {
		return quizDate;
	}

	public void setQuizDate(LocalDate quizDate) {
		this.quizDate = quizDate;
	}

	public Double getScore() {
		return Score;
	}

	public void setScore(Double score) {
		Score = score;
	}
}
