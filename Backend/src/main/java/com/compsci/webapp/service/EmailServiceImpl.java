package com.compsci.webapp.service;

 /**
 * Module Name: EmailServiceImpl.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

import java.io.UnsupportedEncodingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService {

    private static final Logger LOGGER = LoggerFactory
            .getLogger(EmailServiceImpl.class);
    private static final String TEAM_EMAIL_ID = "fairquality.ny@gmail.com";
    private static final String SENDER_NAME = "F-Air";

    @Autowired
    private JavaMailSender mailSender;

    @Override
    @Async
    public void send(String emailTo, String emailContent) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(emailContent, true);
            helper.setTo(emailTo);
            helper.setSubject("Confirm your email");
            try {
				helper.setFrom(TEAM_EMAIL_ID, SENDER_NAME);
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }
    }
}