package com.compsci.webapp.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;

import com.compsci.webapp.response.AllGridResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Module Name: MapUtils.java
 * Date of Creation: 26-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class MapUtils {
	
	private String openWeatherAPIkey;
	
	public MapUtils(String openWeatherAPIkey) {
		this.openWeatherAPIkey = openWeatherAPIkey;
	}

    private static final String OPENWEATHER_URL = "http://api.openweathermap.org/data/2.5/weather";
	
    public double getAQIForLocation(String location) {
    	double predictedAQI = 0;
    	try {
    		String[] coords = location.split(",");
    		Double locLat = Double.parseDouble(coords[0]);
            Double locLon = Double.parseDouble(coords[1]);
            Long timeStamp = System.currentTimeMillis() / 1000L;
            
            predictedAQI = getAQIForLocation(locLat,locLon,timeStamp);
    	}catch(Exception e) {
    		System.out.println("Exception while fetching AQI details from Python Model");
    	}
    	return predictedAQI;
    }
    
	public double getAQIForLocation(Double lat, Double lng, Long timeStamp) {
		double predictedAQI = 0;
		try {
			JSONObject weatherDetails = fetchWeatherDetails(lat, lng);
			predictedAQI = fetchAqiFromDataModel(lat,lng,timeStamp,weatherDetails);
		}catch(Exception e) {
			System.out.println("Exception while fetching AQI details from Python Model");
		}
		return predictedAQI;
	}
	
	public JSONObject fetchWeatherDetails(double locLat, double locLon) throws Exception {
        String url = OPENWEATHER_URL + "?lat=" + locLat + "&lon=" + locLon + "&appid=" + openWeatherAPIkey;
        JSONObject jsonResponse = null;
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpGet httpGet = new HttpGet(url);
            CloseableHttpResponse response = client.execute(httpGet);

            String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");
            jsonResponse = new JSONObject(responseString);
            
        }catch(Exception e) {
        	System.out.println("Error while fetching weather details");
        }
        return jsonResponse;
    }
	
	public List<AllGridResponse> fetchAQIForManhattanFromDataModel(long timeStamp, JSONObject weatherDetails) {
		List<AllGridResponse> allPredictedValues = new ArrayList<AllGridResponse>();
		try {
			JSONObject jsonInput = new JSONObject();
	        jsonInput.put("time_stamp", timeStamp);
	        jsonInput.put("humidity", weatherDetails.getJSONObject("main").getInt("humidity"));
	        jsonInput.put("temp", weatherDetails.getJSONObject("main").getDouble("temp"));
	        jsonInput.put("pressure", weatherDetails.getJSONObject("main").getDouble("pressure"));
	        jsonInput.put("wind_speed", weatherDetails.getJSONObject("wind").getDouble("speed"));
	        jsonInput.put("wind_deg", weatherDetails.getJSONObject("wind").getInt("deg"));
	        jsonInput.put("wind_gust", weatherDetails.getJSONObject("wind").optDouble("gust", 0.0));
	        jsonInput.put("weather_id", weatherDetails.getJSONArray("weather").getJSONObject(0).getInt("id"));
	        String predictedString = FlaskClient.predictForAllGrids(jsonInput);
	        ObjectMapper objectMapper = new ObjectMapper();
	        AllGridResponse [] allGridResponse = objectMapper.readValue(predictedString, AllGridResponse[].class);
	        allPredictedValues = Arrays.asList(allGridResponse);
		}catch(Exception e) {
			System.out.println("Exception while fetching AQI acrooss Manhattan ");
		}
		
		return allPredictedValues;
	}
	
	public double fetchAqiFromDataModel(double locLat, double locLon, long timeStamp, JSONObject weatherDetails) throws Exception {

    	double predictedAQI = 0;
        JSONObject jsonInput = new JSONObject();
        jsonInput.put("loc_lat", locLat);
        jsonInput.put("loc_lon", locLon);
        jsonInput.put("time_stamp", timeStamp);
        jsonInput.put("humidity", weatherDetails.getJSONObject("main").getInt("humidity"));
        jsonInput.put("temp", weatherDetails.getJSONObject("main").getDouble("temp"));
        jsonInput.put("pressure", weatherDetails.getJSONObject("main").getDouble("pressure"));
        jsonInput.put("wind_speed", weatherDetails.getJSONObject("wind").getDouble("speed"));
        jsonInput.put("wind_deg", weatherDetails.getJSONObject("wind").getInt("deg"));
        jsonInput.put("wind_gust", weatherDetails.getJSONObject("wind").optDouble("gust", 0.0));
        jsonInput.put("weather_id", weatherDetails.getJSONArray("weather").getJSONObject(0).getInt("id"));

	    try { 
	    	predictedAQI = FlaskClient.predictWithLocation(jsonInput).getDouble("predicted_aqi");
	    }catch(Exception e) {
	    	System.out.println("Error while fetching data from data model");
	    }
	    
	    return predictedAQI;
    }

}
