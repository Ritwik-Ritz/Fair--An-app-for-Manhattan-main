package org.example;

import org.apache.http.client.methods.*;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.json.JSONArray;

public class FlaskClient {

    private static final String PREDICT_WITH_LOCATION_URL = "http://13.60.97.126:5001/predict_with_location";
    private static final String PREDICT_FOR_ALL_GRIDS_URL = "http://13.60.97.126:5001/predict_for_all_grids";

    public static void main(String[] args) throws Exception {
        // Example for predict_with_location
        JSONObject locationInput = new JSONObject();
        locationInput.put("loc_lat", 40.75838928128043);
        locationInput.put("loc_lon", -73.97503124048248);
        locationInput.put("time_stamp", 1780310800);
        locationInput.put("humidity", 62);
        locationInput.put("wind_deg", 259);
        locationInput.put("temp", 286.59444444444443);
        locationInput.put("wind_speed", 5.4704);
        locationInput.put("wind_gust", 0.0);
        locationInput.put("pressure", 1009.482859);
        locationInput.put("weather_id", 502);

        JSONObject locationResult = predictWithLocation(locationInput);
        System.out.println("Location Prediction: " + locationResult);

        // Example for predict_for_all_grids
        JSONObject generalInput = new JSONObject();
        generalInput.put("time_stamp", 1780310800);
        generalInput.put("humidity", 62);
        generalInput.put("wind_deg", 259);
        generalInput.put("temp", 286.59444444444443);
        generalInput.put("wind_speed", 5.4704);
        generalInput.put("wind_gust", 0.0);
        generalInput.put("pressure", 1009.482859);
        generalInput.put("weather_id", 502);

        JSONArray allGridsResult = predictForAllGrids(generalInput);
        System.out.println("All Grids Prediction: " + allGridsResult);
    }

    public static JSONObject predictWithLocation(JSONObject input) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(PREDICT_WITH_LOCATION_URL);

        StringEntity entity = new StringEntity(input.toString());
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);
        String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");

        client.close();
        return new JSONObject(responseString);
    }

    public static JSONArray predictForAllGrids(JSONObject input) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(PREDICT_FOR_ALL_GRIDS_URL);

        StringEntity entity = new StringEntity(input.toString());
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);
        String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");

        client.close();
        return new JSONArray(responseString);
    }
}
