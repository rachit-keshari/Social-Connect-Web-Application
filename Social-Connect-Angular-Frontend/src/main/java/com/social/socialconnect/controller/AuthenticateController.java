package com.social.socialconnect.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.social.socialconnect.config.JwtUtil;
import com.social.socialconnect.model.JwtRequest;
import com.social.socialconnect.model.JwtResponse;
import com.social.socialconnect.model.User;

@RestController
@CrossOrigin("*")
public class AuthenticateController {


	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	//generate token
	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
		
		try
		{
			authenticate(jwtRequest.getUsername(),jwtRequest.getPassword());
		}
		catch(UsernameNotFoundException e)
		{
			throw new Exception("User not found ");
		}
		
		///authenticate
		
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
	    String token = this.jwtUtil.generateToken(userDetails);
		
	    JwtResponse tokenObj = new JwtResponse();
	    tokenObj.setToken(token);
		return ResponseEntity.ok(tokenObj);
	}
	
	private void authenticate(String username,String password) throws Exception
	{
		try 
		{	
		   authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		}
		catch(DisabledException e) 
		{	
			throw new Exception("USER DISABLED "+e.getMessage());
		}
		catch(BadCredentialsException e)
		{
			throw new Exception("Invalid Credentials "+e.getMessage());
		}	
	}
	
	//returns the details of current user
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		return (User)this.userDetailsService.loadUserByUsername(principal.getName());
	}
	
	
}
