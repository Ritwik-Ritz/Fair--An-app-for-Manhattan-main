package com.compsci.webapp.service;

import java.util.List;

import org.json.JSONArray;

import com.compsci.webapp.request.AllGridRequest;
import com.compsci.webapp.request.SingleGridRequest;
import com.compsci.webapp.response.AllGridResponse;
import com.compsci.webapp.response.SingleGridResponse;

/**
 * Module Name: MapService.java
 * Date of Creation: 04-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */


public interface MapService {
	
	List<AllGridResponse> predictForAllGrids(AllGridRequest input);
	SingleGridResponse predictForASingleGrid(SingleGridRequest input);
}
