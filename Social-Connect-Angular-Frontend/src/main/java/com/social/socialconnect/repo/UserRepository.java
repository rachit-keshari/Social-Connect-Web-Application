package com.social.socialconnect.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.social.socialconnect.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  
	public User findByUsername(String username);
}
