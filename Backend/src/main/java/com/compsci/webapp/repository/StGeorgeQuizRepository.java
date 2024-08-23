package com.compsci.webapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.compsci.webapp.entity.StGeorgeQuiz;
import com.compsci.webapp.entity.StGeorgeQuizId;
import com.compsci.webapp.entity.UserEntity;


public interface StGeorgeQuizRepository extends JpaRepository<StGeorgeQuiz, StGeorgeQuizId> {
	List<StGeorgeQuiz> findByUserId(UserEntity userEntity);

	List<StGeorgeQuiz> findByUserId_UserId(Long userId);
}
