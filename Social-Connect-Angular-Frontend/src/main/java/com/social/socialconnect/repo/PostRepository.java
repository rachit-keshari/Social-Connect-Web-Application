package com.social.socialconnect.repo;

import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;

import com.social.socialconnect.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

}
