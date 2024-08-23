package com.compsci.webapp.config;

 /**
 * Module Name: JwtAuthenticationFilter.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class is a custom security filter used for JWT Authentication that processes incoming HTTP requests to validate JWT tokens.
 * This class will validate all incoming HTTP request and ensures that the filter is executed only once.
 */


import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private static final String AUTHORIZATION_HEADER = "Authorization";
	private static final String BEARER_HEADER = "Bearer ";

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserDetailsService userDetailsService;


	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, 
			@NonNull HttpServletResponse response, 
			@NonNull FilterChain filterChain)
					throws ServletException, IOException {
		final String authHeader = request.getHeader(AUTHORIZATION_HEADER);
		final String jwt;
		final String userEmail;

		if(authHeader == null || !authHeader.startsWith(BEARER_HEADER)) {
			filterChain.doFilter(request, response);
			return;
		}

		jwt = authHeader.substring(7);//First Seven Letter will be 'Bearer '
		userEmail = jwtService.extractUsername(jwt);

		if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() ==null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
			if(jwtService.isTokenValid(jwt, userDetails)) {
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken
						(userDetails, null, userDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		filterChain.doFilter(request, response);
	}


}