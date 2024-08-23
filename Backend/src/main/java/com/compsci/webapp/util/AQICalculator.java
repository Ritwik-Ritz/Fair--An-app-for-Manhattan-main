package com.compsci.webapp.util;

public class AQICalculator {
    // method that converts AQI to PM2.5
    public static double aqiToPm25(int aqi) {
        double pm25;
        if (aqi < 0) {
            pm25 = 0.0;
        } else if (aqi <= 50) {
            pm25 = lerp(0.0, 12.0, 0, 50, aqi);
        } else if (aqi <= 100) {
            pm25 = lerp(12.1, 35.4, 51, 100, aqi);
        } else if (aqi <= 150) {
            pm25 = lerp(35.5, 55.4, 101, 150, aqi);
        } else if (aqi <= 200) {
            pm25 = lerp(55.5, 150.4, 151, 200, aqi);
        } else if (aqi <= 300) {
            pm25 = lerp(150.5, 250.4, 201, 300, aqi);
        } else if (aqi <= 400) {
            pm25 = lerp(250.5, 350.4, 301, 400, aqi);
        } else if (aqi <= 500) {
            pm25 = lerp(350.5, 500.4, 401, 500, aqi);
        } else {
            pm25 = 500.0; //  limit of PM2.5
        }
        return pm25;
    }

    //  linear interpolation method
    private static double lerp(double ylo, double yhi, double xlo, double xhi, double x) {
        return ylo + (yhi - ylo) * ((x - xlo) / (xhi - xlo));
    }
}
