package com.compsci.webapp.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Module Name: SingleGridRequest.java
 * Date of Creation: 04-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingleGridRequest {
	
	@JsonProperty("loc_lat")
    private double locLat;

    @JsonProperty("loc_lon")
    private double locLon;

    @JsonProperty("time_stamp")
    private long timeStamp;

	public double getLocLat() {
		return locLat;
	}

	public void setLocLat(double locLat) {
		this.locLat = locLat;
	}

	public double getLocLon() {
		return locLon;
	}

	public void setLocLon(double locLon) {
		this.locLon = locLon;
	}

	public long getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
	}

   
	
}
