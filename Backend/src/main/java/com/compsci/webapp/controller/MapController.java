package com.compsci.webapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.compsci.webapp.request.AllGridRequest;
import com.compsci.webapp.request.SingleGridRequest;
import com.compsci.webapp.response.AllGridResponse;
import com.compsci.webapp.response.SingleGridResponse;
import com.compsci.webapp.service.MapService;

import jakarta.validation.Valid;


/**
 * Module Name: MapController.java
 * Date of Creation: 04-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@RestController
@RequestMapping("/api/v1/map")
public class MapController {
	
	@Autowired
	private MapService mapService;
	
	@PostMapping("/getAllAQIValues")
	public ResponseEntity<?> predictForAllGrids(@Valid @RequestBody AllGridRequest input) {
		List<AllGridResponse> predictedValueForAllGrids = new ArrayList<>();
		try {
			predictedValueForAllGrids = mapService.predictForAllGrids(input);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(predictedValueForAllGrids);
	}
    
	@PostMapping("/getAQIValueForALocation")
	public ResponseEntity<?> predictForASingleGrid(@Valid @RequestBody SingleGridRequest input) {
    	SingleGridResponse predictedValueForSingleGrid = new SingleGridResponse();
    	predictedValueForSingleGrid = mapService.predictForASingleGrid(input);
    	return ResponseEntity.ok(predictedValueForSingleGrid);
	}
}
