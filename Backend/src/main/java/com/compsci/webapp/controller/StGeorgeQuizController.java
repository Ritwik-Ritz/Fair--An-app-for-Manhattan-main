package com.compsci.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.compsci.webapp.entity.StGeorgeQuiz;
import com.compsci.webapp.request.StGeorgeQuizRequest;
import com.compsci.webapp.service.StGeorgeQuizService;
import com.compsci.webapp.util.Constants;

import jakarta.validation.Valid;

import java.sql.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/stgeorgequiz")
public class StGeorgeQuizController {

    @Autowired
    private StGeorgeQuizService stGeorgeQuizService;


//    @GetMapping("/{userId}/{quizDate}")
//    public ResponseEntity<StGeorgeQuiz> getScore(
//            @PathVariable Long userId,
//            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date quizDate) {
//        Optional<StGeorgeQuiz> stGeorgeQuiz = stGeorgeQuizService.getScore(userId, quizDate);
//        return stGeorgeQuiz.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
    
    @PostMapping("/savescore")
    public String saveScore(@Valid @RequestBody StGeorgeQuizRequest stGeorgeQuizRequest) {
        StGeorgeQuiz stGeorgeQuiz = stGeorgeQuizService.saveScore(stGeorgeQuizRequest.getUserId(), stGeorgeQuizRequest.getQuizDate(), stGeorgeQuizRequest.getScore());
    	return Constants.SUBMITTED_SUCCESSFULLY.getMessage();
    }
    
    
    
}
