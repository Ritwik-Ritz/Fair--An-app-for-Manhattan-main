package com.compsci.webapp.service;

 import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * Module Name: UserServiceImpl.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.compsci.webapp.config.JwtService;
import com.compsci.webapp.entity.EmailConfirmationEntity;
import com.compsci.webapp.entity.UserEntity;
import com.compsci.webapp.exception.InactiveUserException;
import com.compsci.webapp.exception.InvalidCredentialsException;
import com.compsci.webapp.exception.UserNotFoundException;
import com.compsci.webapp.repository.EmailConfirmationRepository;
import com.compsci.webapp.repository.UserRepository;
import com.compsci.webapp.request.ResendVerificationEmailReqeust;
import com.compsci.webapp.request.UserRegisterRequest;
import com.compsci.webapp.request.UserSignInRequest;
import com.compsci.webapp.response.ResendVerificationEmailResponse;
import com.compsci.webapp.response.UserRegisterResponse;
import com.compsci.webapp.response.UserSignInResponse;
import com.compsci.webapp.util.Constants;

import freemarker.template.Configuration;
import freemarker.template.Template;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private EmailConfirmationRepository emailConfirmationRepository;
	
	@Autowired
	private EmailService emailService;
	
	 @Autowired
	 private Configuration freemarkerConfig;

	@Override
	public UserRegisterResponse registerUser(UserRegisterRequest userRegisterRequest) {

		if (Boolean.TRUE.equals(userRepository.existsByUserEmail(userRegisterRequest.getUserEmail()))) {
			UserRegisterResponse response = new UserRegisterResponse();
            response.setMessage(Constants.EMAIL_ALREADY_IN_USE.getMessage());
            return response;
		}
        
		UserEntity user = new UserEntity();
		
        user.setUserName(userRegisterRequest.getUserName());
        user.setUserEmail(userRegisterRequest.getUserEmail());
        user.setUserPassword(passwordEncoder.encode(userRegisterRequest.getUserPassword()));
        
        userRepository.save(user);
        
        String token = UUID.randomUUID().toString();

        EmailConfirmationEntity confirmationToken = new EmailConfirmationEntity();
        
        confirmationToken.setEmailConfirmationCreatedAt(LocalDateTime.now());
        confirmationToken.setEmailConfirmationExpiresAt(LocalDateTime.now().plusMinutes(15));
        confirmationToken.setUserId(user);
        confirmationToken.setEmailConfirmationToken(token);
        
        emailConfirmationRepository.save(confirmationToken);

        constructandSendVerificationEmail(token,user);
        
        return mapToUserRegisterResponse(user);
		
	}
	
	private void constructandSendVerificationEmail(String token,UserEntity user) {
		String link = "http://localhost:8080/api/v1/auth/confirm?token=" + token;
        try {
        	Template verificationEmailTemplate = freemarkerConfig.getTemplate("verification_email.ftl");
        	Map<String, Object> verificationEmailValueMapper = new HashMap<>();
            verificationEmailValueMapper.put("name", user.getUsername());
            verificationEmailValueMapper.put("link", link);
            emailService.send(
            		user.getUserEmail(),
            		FreeMarkerTemplateUtils.processTemplateIntoString(verificationEmailTemplate, verificationEmailValueMapper));
        }catch(Exception e) {
        	System.out.println("Failed to send verification email");
        }
	}
	
	@Override
	public ResendVerificationEmailResponse resendVerificationEmail(ResendVerificationEmailReqeust resendEmailReqeust) {
		if (Boolean.TRUE.equals(userRepository.existsByUserEmail(resendEmailReqeust.getEmailId()))) {
			UserEntity user = userRepository.findByUserEmail(resendEmailReqeust.getEmailId()).orElseThrow();
			Long userId = user.getUserId();
			String token = UUID.randomUUID().toString();
			int updated = emailConfirmationRepository.updateEmailConfirmationDetails(userId,token , LocalDateTime.now().plusMinutes(15), LocalDateTime.now());
			constructandSendVerificationEmail(token,user);
		}else {
			throw new UserNotFoundException(Constants.USER_NOT_FOUND.getMessage());
		}
		return null;
	}
	
	

	private UserRegisterResponse mapToUserRegisterResponse(UserEntity user){
		UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
		userRegisterResponse.setUserName(user.getUserName());
		userRegisterResponse.setUserEmail(user.getUserEmail());
		userRegisterResponse.setMessage(Constants.REGISTERED_SUCCESSFULL.getMessage());
        return userRegisterResponse;
    }

	@Override
	public UserSignInResponse userSignIn(UserSignInRequest userSignInRequest) {
		UserEntity user = userRepository.findByUserEmail(userSignInRequest.getUserEmail())
                .orElseThrow(() -> new UserNotFoundException(Constants.USER_NOT_FOUND.getMessage()));

        if (!user.isEnabled()) {
            throw new InactiveUserException(Constants.INACTIVE_USER.getMessage());
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userSignInRequest.getUserEmail(), userSignInRequest.getUserPassword()));
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException(Constants.BAD_CREDENTIALS.getMessage());
        }
        
		var jwtToken = jwtService.generateToken(user);
		UserSignInResponse userSignInResponse = new UserSignInResponse();
		userSignInResponse.setToken(jwtToken);
		userSignInResponse.setMessage(Constants.LOGIN_SUCCESSFULL.getMessage());
		userSignInResponse.setUserId(user.getUserId());
		userSignInResponse.setUserEmail(user.getUserEmail());
		userSignInResponse.setUserName(user.getUserName());
		return userSignInResponse;
	}

	@Override
	@Transactional
    public String confirmToken(String token) {
		Optional<EmailConfirmationEntity> emailConfirmationEntity = emailConfirmationRepository.findByEmailConfirmationToken(token);

		if(emailConfirmationEntity.isEmpty()) {
			return Constants.USER_NOT_FOUND.getMessage();
		}

		EmailConfirmationEntity emailConfirmation = emailConfirmationEntity.get();

        if (emailConfirmation.getEmailConfirmationConfirmedAt() != null) {
            return Constants.EMAIL_ALREADY_VERIFIED.getMessage();
        }

        LocalDateTime expiredAt = emailConfirmation.getEmailConfirmationExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            return "Activation expired";
        }

        emailConfirmationRepository.updateEmailConfirmationConfirmedAt(token, LocalDateTime.now());

        userRepository.enableUserEntity(emailConfirmation.getUserId().getUserEmail());
        String emailcontent="";
        try {
        	Template verificationEmailTemplate = freemarkerConfig.getTemplate("confirmation_email.ftl");
        	Map<String, Object> verificationEmailValueMapper = new HashMap<>();
        	emailcontent = FreeMarkerTemplateUtils.processTemplateIntoString(verificationEmailTemplate, verificationEmailValueMapper);
        }catch(Exception e) {
        	System.out.println("Failed to send verification email");
        }
        return emailcontent;
    }

	@Override
	public void validateToken(String token) {
		jwtService.validateToken(token);
	}

}