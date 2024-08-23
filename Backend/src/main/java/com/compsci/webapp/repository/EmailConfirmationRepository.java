package com.compsci.webapp.repository;

 import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Module Name: EmailConfirmationRepository.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */
	
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.compsci.webapp.entity.EmailConfirmationEntity;

@Repository
@Transactional(readOnly = true)
public interface EmailConfirmationRepository extends JpaRepository<EmailConfirmationEntity, Long> {

    Optional<EmailConfirmationEntity> findByEmailConfirmationToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE EmailConfirmationEntity e " +
            "SET e.emailConfirmationConfirmedAt = ?2 " +
            "WHERE e.emailConfirmationToken = ?1")
    int updateEmailConfirmationConfirmedAt(String token,
                          LocalDateTime confirmedAt);
    
    @Transactional
    @Modifying
    @Query("UPDATE EmailConfirmationEntity e " +
           "SET e.emailConfirmationToken = ?2, " +
           "e.emailConfirmationExpiresAt = ?3, " +
           "e.emailConfirmationCreatedAt = ?4 " +
           "WHERE e.userId.id = ?1")
    int updateEmailConfirmationDetails(Long userId, String newToken, LocalDateTime newExpiresAt, LocalDateTime newCreatedAt);
}