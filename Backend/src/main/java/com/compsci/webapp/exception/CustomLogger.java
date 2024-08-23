package com.compsci.webapp.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
 /**
 * Module Name: CustomLogger.java
 * Date of Creation: 03-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class CustomLogger {

    private static final Logger logger = LoggerFactory.getLogger(CustomLogger.class);

    public static void info(String message) {
        logger.info(enrichMessage(message));
    }

    public static void debug(String message) {
        logger.debug(enrichMessage(message));
    }

    public static void error(String message, Throwable t) {
        logger.error(enrichMessage(message), t);
    }

    public static void setContext(String key, String value) {
        MDC.put(key, value);
    }

    public static void clearContext() {
        MDC.clear();
    }

    private static String enrichMessage(String message) {
        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
        StackTraceElement element = stackTrace[3]; // 0 is getStackTrace, 1 is enrichMessage, 2 is log method, 3 is the caller
        String className = element.getClassName();
        String methodName = element.getMethodName();
        return String.format("[%s.%s] %s", className, methodName, message);
    }
}