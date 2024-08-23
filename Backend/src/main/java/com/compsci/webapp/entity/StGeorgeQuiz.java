package com.compsci.webapp.entity;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@IdClass(StGeorgeQuizId.class)
@Table(name = "StGeorgeQuiz")
public class StGeorgeQuiz {


	@Id
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userId;
	
	@Id
    @Column(name = "quiz_date", nullable = false)
    private LocalDate quizDate;

    @Column(name = "score")
    private Double score;

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

	public Double getScore() {
		return score;
	}

	public void setScore(Double score) {
		this.score = score;
	}

    
}
