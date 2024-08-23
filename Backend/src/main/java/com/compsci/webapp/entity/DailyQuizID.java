package com.compsci.webapp.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class DailyQuizID implements Serializable {

    private static final long serialVersionUID = 1L;
    private Long userId;
    private LocalDate quizDate;

    // Default constructor
    public DailyQuizID() {}

    // Parameterized constructor
    public DailyQuizID(Long userId, LocalDate quizDate) {
        this.userId = userId;
        this.quizDate = quizDate;
    }

    // Getters and setters
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

    // hashCode and equals
    @Override
    public int hashCode() {
        return Objects.hash(userId, quizDate);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        DailyQuizID that = (DailyQuizID) obj;
        return Objects.equals(userId, that.userId) &&
               Objects.equals(quizDate, that.quizDate);
    }
}
