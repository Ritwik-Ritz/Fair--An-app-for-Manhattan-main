package com.compsci.webapp.request;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Module Name: DailyQuizScoreRequest.java
 * Date of Creation: 22-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class DailyQuizScoreRequest {
	
	@JsonProperty("user_id")
	private Long userId;
	
	@JsonProperty("quiz_date")
	private LocalDate quizDate;
	
	@JsonProperty("indoor_location")
	private String indoorLocation;
	
	@JsonProperty("outdoor_location")
	private String outdoorLocation;
	
	@JsonProperty("indoor_hours")
	private Integer indoorHours;
	
	@JsonProperty("outdoor_hours")
	private Integer outdoorHours;

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

	public String getIndoorLocation() {
		return indoorLocation;
	}

	public void setIndoorLocation(String indoorLocation) {
		this.indoorLocation = indoorLocation;
	}

	public String getOutdoorLocation() {
		return outdoorLocation;
	}

	public void setOutdoorLocation(String outdoorLocation) {
		this.outdoorLocation = outdoorLocation;
	}

	public Integer getIndoorHours() {
		return indoorHours;
	}

	public void setIndoorHours(Integer indoorHours) {
		this.indoorHours = indoorHours;
	}

	public Integer getOutdoorHours() {
		return outdoorHours;
	}

	public void setOutdoorHours(Integer outdoorHours) {
		this.outdoorHours = outdoorHours;
	}
	
	
}
