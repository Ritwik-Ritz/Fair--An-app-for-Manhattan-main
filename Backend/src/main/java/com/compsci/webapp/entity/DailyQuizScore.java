package com.compsci.webapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@IdClass(DailyQuizID.class)
@Table(name = "dailyquizscore")
public class DailyQuizScore {   
	
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userId;

    @Id
    @Column(name = "quiz_date")
    private LocalDate quizDate;

    @Column(name = "quiz_score")
    private Double quizScore;
        
    @Column(name = "indoor_location")
    private String indoorLocation;
    
    @Column(name = "outdoor_location")
    private String outdoorLocation;
    
    @Column(name = "indoor_hours")
    private Integer indoorHours;
    
    @Column(name = "outdoor_hours")
    private Integer outdoorHours;
    
    public UserEntity getUserId() {
		return userId;
	}

	public void setUserId(UserEntity userId) {
		this.userId = userId;
	}

	public LocalDate getQuizDate() {
		return quizDate;
	}

	public void setQuizDate(LocalDate quizDate) {
		this.quizDate = quizDate;
	}

	public Double getQuizScore() {
		return quizScore;
	}

	public void setQuizScore(Double quizScore) {
		this.quizScore = quizScore;
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
