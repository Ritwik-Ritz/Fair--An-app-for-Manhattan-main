package com.compsci.webapp.response;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Module Name: AllGridResponse.java
 * Date of Creation: 04-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class AllGridResponse {
	
	@JsonProperty("grid_code")
    private String gridCode;

    @JsonProperty("max_lat")
    private double maxLat;

    @JsonProperty("max_lon")
    private double maxLon;

    @JsonProperty("min_lat")
    private double minLat;

    @JsonProperty("min_lon")
    private double minLon;

    @JsonProperty("predicted_aqi")
    private double predictedAqi;

	public String getGridCode() {
		return gridCode;
	}

	public void setGridCode(String gridCode) {
		this.gridCode = gridCode;
	}

	public double getMaxLat() {
		return maxLat;
	}

	public void setMaxLat(double maxLat) {
		this.maxLat = maxLat;
	}

	public double getMaxLon() {
		return maxLon;
	}

	public void setMaxLon(double maxLon) {
		this.maxLon = maxLon;
	}

	public double getMinLat() {
		return minLat;
	}

	public void setMinLat(double minLat) {
		this.minLat = minLat;
	}

	public double getMinLon() {
		return minLon;
	}

	public void setMinLon(double minLon) {
		this.minLon = minLon;
	}

	public double getPredictedAqi() {
		return predictedAqi;
	}

	public void setPredictedAqi(double predictedAqi) {
		this.predictedAqi = predictedAqi;
	}
    
    
}
