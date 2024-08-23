package com.compsci.webapp.repository;

import com.compsci.webapp.entity.DailyQuizID;
import com.compsci.webapp.entity.DailyQuizScore;
import com.compsci.webapp.entity.UserEntity;
import com.compsci.webapp.util.DailyQuizScoreDataObject;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface DailyQuizScoreRepository extends JpaRepository<DailyQuizScore, DailyQuizID> {
    
    List<DailyQuizScore> findByUserId(UserEntity userEntity);
    
    
    @Query("SELECT new com.compsci.webapp.util.DailyQuizScoreDataObject(d.userId.userId, d.quizDate, d.quizScore, d.indoorLocation, d.outdoorLocation, d.indoorHours, d.outdoorHours) " +
            "FROM DailyQuizScore d WHERE d.userId.userId = :userId")
    List<DailyQuizScoreDataObject> findByUserId_UserId(@Param("userId") Long userId);

}
