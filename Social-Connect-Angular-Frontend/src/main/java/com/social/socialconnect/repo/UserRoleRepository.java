package com.social.socialconnect.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.social.socialconnect.model.User;
import com.social.socialconnect.model.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long>{
	
	public UserRole findByUser(User user);

}
