package com.compsci.webapp.repository;

 import java.util.Optional;

/**
 * Module Name: UserRepository.java
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

import com.compsci.webapp.entity.UserEntity;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    
    Optional<UserEntity> findByUserEmail(String userEmail);
    Optional<UserEntity> findByUserId(Long userId);
    Boolean existsByUserEmail(String email);
    
    @Transactional
    @Modifying
    @Query("UPDATE UserEntity u " +
            "SET u.userStatus = TRUE WHERE u.userEmail = ?1")
    int enableUserEntity(String email);
    
    @Query("SELECT u FROM UserEntity u WHERE u.userId = ?1")
    UserEntity getUserById(Long userId);
}