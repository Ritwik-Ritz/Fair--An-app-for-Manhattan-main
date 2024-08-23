package com.compsci.webapp.controller;

import com.compsci.webapp.entity.DailyQuizScore;
import com.compsci.webapp.request.DailyQuizScoreRequest;
import com.compsci.webapp.service.DailyQuizScoreService;
import com.compsci.webapp.util.DailyQuizScoreDataObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dailyquizscores")
public class DailyQuizScoreController {

    private final DailyQuizScoreService dailyQuizScoreService;

    @Autowired
    public DailyQuizScoreController(DailyQuizScoreService dailyQuizScoreService) {
        this.dailyQuizScoreService = dailyQuizScoreService;
    }

    @GetMapping("getQuizScore/{id}")
    public List<DailyQuizScoreDataObject> getDailyQuizScoreById(@PathVariable Long id) {
        return dailyQuizScoreService.getDailyQuizScoreById(id);
    }

    @PostMapping("/createDailyQuizScore")
    public String createDailyQuizScore(@RequestBody DailyQuizScoreRequest dailyQuizScoreRequest) {
        return dailyQuizScoreService.createDailyQuizScore(dailyQuizScoreRequest); 
    }

    @PutMapping("updateQuiz/{id}/{quizDate}")
    public DailyQuizScore updateDailyQuizScore(@PathVariable Long id, @PathVariable LocalDate quizDate, @RequestBody DailyQuizScore quizScoreDetails) {
        return dailyQuizScoreService.updateDailyQuizScore(id, quizDate, quizScoreDetails);
    }

    @DeleteMapping("deleteQuiz/{id}/{quizDate}")
    public void deleteDailyQuizScore(@PathVariable Long id, @PathVariable LocalDate quizDate) {
        dailyQuizScoreService.deleteDailyQuizScore(id, quizDate);
    }

    @GetMapping("/getaqitoday")
    public double getAqiForToday() {
        return dailyQuizScoreService.getAqiForToday();
    }


}
