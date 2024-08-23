package com.compsci.webapp.util;

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

    public static String predictForAllGrids(JSONObject input) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(PREDICT_FOR_ALL_GRIDS_URL);

        StringEntity entity = new StringEntity(input.toString());
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);
        String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");

        client.close();
        return responseString;
    }
}
