package com.social.socialconnect.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.social.socialconnect.model.Friend;

public interface FriendRepository extends JpaRepository<Friend, Long> {
         
    public Friend findByUid(long u);	
}
