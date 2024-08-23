package com.compsci.webapp.request;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Module Name: AllGridRequest.java
 * Date of Creation: 26-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class AllGridRequest {
	
	@JsonProperty("time_stamp")
    private long timeStamp;

	public long getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
	}
	
	
}
