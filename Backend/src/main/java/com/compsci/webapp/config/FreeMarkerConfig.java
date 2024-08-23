package com.compsci.webapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

/**
 * Module Name: FreeMarkerConfig.java
 * Date of Creation: 18-Jun-2024
 * Author: navee
 *
 * Description:
 * This class set up Free Marker as a templating engine and specify where the Freemarkers templates are located
 */

@Configuration
public class FreeMarkerConfig {
	
	private static final String FREE_MARKER_TEMPLATE_DIRECTORY_PATH = "classpath:/templates";
	
	@Bean
	@Primary
    FreeMarkerConfigurationFactoryBean freemarkerConfiguration() {
        FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
        bean.setTemplateLoaderPath(FREE_MARKER_TEMPLATE_DIRECTORY_PATH);
        return bean;
    }
}