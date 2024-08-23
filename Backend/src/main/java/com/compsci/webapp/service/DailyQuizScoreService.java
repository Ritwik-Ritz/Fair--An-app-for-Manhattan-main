package com.compsci.webapp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.compsci.webapp.entity.DailyQuizID;
import com.compsci.webapp.entity.DailyQuizScore;
import com.compsci.webapp.entity.UserEntity;
import com.compsci.webapp.repository.DailyQuizScoreRepository;
import com.compsci.webapp.repository.UserRepository;
import com.compsci.webapp.request.DailyQuizScoreRequest;
import com.compsci.webapp.util.AQICalculator;
import com.compsci.webapp.util.Constants;
import com.compsci.webapp.util.DailyQuizScoreDataObject;
import com.compsci.webapp.util.MapUtils;
import org.slf4j.Logger;

@Service

public class DailyQuizScoreService {
    // api key should be placed in yml file
    @Value("${myapp.api.openweather.key}")
    private String openWeatherApiKey;

    private static final String OPENWEATHER_URL = "http://api.openweathermap.org/data/2.5/weather";
    
    private final DailyQuizScoreRepository dailyQuizScoreRepository;
    private static final Logger logger = LoggerFactory.getLogger(DailyQuizScoreService.class);

    @Autowired
    public DailyQuizScoreService(DailyQuizScoreRepository dailyQuizScoreRepository) {
        this.dailyQuizScoreRepository = dailyQuizScoreRepository;
    }
    
    @Autowired
    private UserRepository userRepository;
    

    public List<DailyQuizScoreDataObject> getDailyQuizScoreById(Long id) {
    	List<DailyQuizScoreDataObject> dailyQuizScore = new ArrayList<>();
    	try {
    		dailyQuizScore = dailyQuizScoreRepository.findByUserId_UserId(id);
    	}catch(Exception e) {
    		System.out.println("Failed to fetch dailyscore for id : " +  id + " " );
    	}
    	return dailyQuizScore;
    }

    public String createDailyQuizScore(DailyQuizScoreRequest dailyQuizScoreRequest) {
    	DailyQuizScore dailyQuizScoreEntity = new DailyQuizScore();
    	try {
    		//Fetching AQI data for indoor and outdoor locations

    	    MapUtils mapUtils = new MapUtils(openWeatherApiKey);
            double indoorAQI = mapUtils.getAQIForLocation(dailyQuizScoreRequest.getIndoorLocation());
            double outdoorAQI = mapUtils.getAQIForLocation(dailyQuizScoreRequest.getOutdoorLocation());
            logger.info("Indoor AQI: {}, Outdoor AQI: {}", indoorAQI, outdoorAQI);

            // converting AQI to PM2.5
            double indoorPM25 = AQICalculator.aqiToPm25((int) indoorAQI);
            double outdoorPM25 = AQICalculator.aqiToPm25((int) outdoorAQI);
            logger.info("Indoor PM2.5: {}, Outdoor PM2.5: {}", indoorPM25, outdoorPM25);

            // risk score based on PM2.5 and hours
            double riskScore = calculateRiskScore(indoorPM25, outdoorPM25, dailyQuizScoreRequest.getIndoorHours(), dailyQuizScoreRequest.getOutdoorHours());
            logger.info("Calculated Risk Score: {}", riskScore);

            // calculated risk score
            UserEntity user = userRepository.getUserById(dailyQuizScoreRequest.getUserId());
            
            
            dailyQuizScoreEntity.setUserId(user);
            dailyQuizScoreEntity.setQuizDate(dailyQuizScoreRequest.getQuizDate());
            dailyQuizScoreEntity.setQuizScore(riskScore);
            dailyQuizScoreEntity.setIndoorLocation(dailyQuizScoreRequest.getIndoorLocation());
            dailyQuizScoreEntity.setOutdoorLocation(dailyQuizScoreRequest.getOutdoorLocation());
            dailyQuizScoreEntity.setIndoorHours(dailyQuizScoreRequest.getIndoorHours());
            dailyQuizScoreEntity.setOutdoorHours(dailyQuizScoreRequest.getOutdoorHours());
            
            
    	}catch(Exception e) {
    		System.out.println("Failed to create a new entry in dailyQuizScore");
    	}
     	dailyQuizScoreRepository.save(dailyQuizScoreEntity);
     	return Constants.SUBMITTED_SUCCESSFULLY.getMessage();
        
    }

  public DailyQuizScore updateDailyQuizScore(Long id, LocalDate quizDate, DailyQuizScore quizScoreDetails) {
    DailyQuizID dailyQuizID = new DailyQuizID(id, quizDate);
    DailyQuizScore quizScore = dailyQuizScoreRepository.findById(dailyQuizID)
            .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id + " and quizDate: " + quizDate));
            // .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));

        quizScore.setUserId(quizScoreDetails.getUserId());
        quizScore.setQuizDate(quizScoreDetails.getQuizDate());
        quizScore.setQuizScore(quizScoreDetails.getQuizScore());

        return dailyQuizScoreRepository.save(quizScore);
    }

    public void deleteDailyQuizScore(Long id, LocalDate quizDate) {
        DailyQuizID dailyQuizID = new DailyQuizID();
        dailyQuizID.setUserId(id);
        dailyQuizID.setQuizDate(quizDate);

        DailyQuizScore quizScore = dailyQuizScoreRepository.findById(dailyQuizID)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id + " and quizDate: " + quizDate));

        dailyQuizScoreRepository.delete(quizScore);
    }

    

    private double calculateRiskScore(double indoorPM, double outdoorPM, int indoorHours, int outdoorHours) {
        double maskFactor = 1.0;
        double indoorFactor = 3.0;

        double rawPM = (outdoorPM * outdoorHours / maskFactor) + ((indoorPM / indoorFactor) * indoorHours);
        return rawPM / 24.0;
    }

        public double getAqiForToday() {
        // LocalDate currentDate = LocalDate.now();

        String location = "40.776676, -73.971321";

        // long timestamp = currentDate.atStartOfDay(ZoneId.systemDefault()).toEpochSecond();
        MapUtils mapUtils = new MapUtils(openWeatherApiKey);
        double aqi = mapUtils.getAQIForLocation(location);

        return aqi;
    }

}