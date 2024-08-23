package com.compsci.webapp.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.compsci.webapp.request.AllGridRequest;
import com.compsci.webapp.request.SingleGridRequest;
import com.compsci.webapp.response.AllGridResponse;
import com.compsci.webapp.response.SingleGridResponse;
import com.compsci.webapp.util.MapUtils;

/**
 * Module Name: MapServiceImpl.java
 * Date of Creation: 04-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@Service
public class MapServiceImpl implements MapService{
		
	@Value("${myapp.api.openweather.key}")
    private String openWeatherApiKey;
	
	MapUtils mapUtils = new MapUtils(openWeatherApiKey);

//	@Override
//	public List<AllGridResponse> predictForAllGrids(AllGridRequest input) {
//		// TODO Auto-generated method stub
//		List<AllGridResponse> allPredictedValues = new ArrayList<AllGridResponse>();
//		try {
//			CloseableHttpClient client = HttpClients.createDefault();
//	        HttpPost httpPost = new HttpPost("http://127.0.0.1:5001/predict_for_all_grids");
//	        
//	        ObjectMapper objectMapper = new ObjectMapper();
//	        String jsonString = "";
//	        jsonString = objectMapper.writeValueAsString(input);
//	        StringEntity entity = new StringEntity(jsonString);
//	        httpPost.setEntity(entity);
//	        httpPost.setHeader("Accept", "application/json");
//	        httpPost.setHeader("Content-type", "application/json");
//
//	        CloseableHttpResponse response = client.execute(httpPost);
//	        String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");
//
//	        client.close();
//	        System.out.println("Response from server (predict_with_location): " + responseString);
//	        
//	        AllGridResponse [] allGridResponse = objectMapper.readValue(responseString, AllGridResponse[].class);
//	        allPredictedValues = Arrays.asList(allGridResponse);
//	       
//		}catch(Exception e) {
//			e.printStackTrace();
//		}
//		return allPredictedValues;
//	}
	
	@Override
	public List<AllGridResponse> predictForAllGrids(AllGridRequest input) {
		// TODO Auto-generated method stub
		List<AllGridResponse> allPredictedValues = new ArrayList<AllGridResponse>();
		try {
			MapUtils mapUtils = new MapUtils(openWeatherApiKey);
			
			double manhattan_lat = 40.7830603;
			double manhattan_lng = -73.9712488;
			Long timeStamp = System.currentTimeMillis();
			
			JSONObject weatherInfo = mapUtils.fetchWeatherDetails(manhattan_lat,manhattan_lng);
			allPredictedValues = mapUtils.fetchAQIForManhattanFromDataModel(timeStamp,weatherInfo);
			       
		}catch(Exception e) {
			e.printStackTrace();
		}
		return allPredictedValues;
	}
	
	@Override
	public SingleGridResponse predictForASingleGrid(SingleGridRequest input) {
		// TODO Auto-generated method stub
		SingleGridResponse singleGridResponse = new SingleGridResponse();
		try {
			MapUtils mapUtils = new MapUtils(openWeatherApiKey);
			singleGridResponse.setPredicted_aqi(mapUtils.getAQIForLocation(input.getLocLat(), input.getLocLon(), input.getTimeStamp()));	
		}catch(Exception e) {
			e.printStackTrace();
		}
		return singleGridResponse;
	}

}
