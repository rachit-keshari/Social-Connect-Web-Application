package com.social.socialconnect;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.social.socialconnect.Service.UserService;
import com.social.socialconnect.model.Role;
import com.social.socialconnect.model.User;
import com.social.socialconnect.model.UserRole;

@SpringBootApplication
public class SocialConnectApplication implements CommandLineRunner {

	
	public static void main(String[] args) {
		SpringApplication.run(SocialConnectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		System.err.println("starting code");
        
	}

}
