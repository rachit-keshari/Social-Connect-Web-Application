package com.social.socialconnect.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest req, HttpServletResponse resp, AuthenticationException exp)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
         resp.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Unauthorized:Server");		
	}

}
