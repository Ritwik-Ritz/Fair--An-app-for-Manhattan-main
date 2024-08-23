package com.compsci.webapp.util;

import java.time.LocalDate;

/**
 * Module Name: DailyQuizScoreDataObject.java
 * Date of Creation: 26-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class DailyQuizScoreDataObject  {
    private Long userId;
    private LocalDate quizDate;
    private Double quizScore;
    private String indoorLocation;
    private String outdoorLocation;
    private Integer indoorHours;
    private Integer outdoorHours;

    // Constructors, getters, and setters
    public DailyQuizScoreDataObject(Long userId, LocalDate quizDate, Double quizScore, String indoorLocation, String outdoorLocation, Integer indoorHours, Integer outdoorHours) {
        this.userId = userId;
        this.quizDate = quizDate;
        this.quizScore = quizScore;
        this.indoorLocation = indoorLocation;
        this.outdoorLocation = outdoorLocation;
        this.indoorHours = indoorHours;
        this.outdoorHours = outdoorHours;
    }

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
