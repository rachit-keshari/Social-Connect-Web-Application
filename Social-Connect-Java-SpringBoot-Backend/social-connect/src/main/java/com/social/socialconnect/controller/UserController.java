package com.social.socialconnect.controller;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.social.socialconnect.Service.UserService;
import com.social.socialconnect.Service.impl.StorageService;
import com.social.socialconnect.Service.impl.UserServiceImpl;
import com.social.socialconnect.fileuploadhelper.FileUploadHelper;
import com.social.socialconnect.model.Friend;
import com.social.socialconnect.model.JwtResponse;
import com.social.socialconnect.model.Post;
import com.social.socialconnect.model.Role;
import com.social.socialconnect.model.User;
import com.social.socialconnect.model.UserRole;
import com.social.socialconnect.repo.UserRepository;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private StorageService storageService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserDetailsService userDetailService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	//create user
	@PostMapping("/")
	public Boolean createUser(@RequestBody User user) throws Exception {
		 
		user.setProfile("default.png");
		
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		Set<UserRole> roles = new HashSet<>();
		 
		 Role role = new Role();
		 role.setRoleName("NORMAL");
		 
		 UserRole userRole = new UserRole();
		 userRole.setRole(role);
		 userRole.setUser(user);
		 
		 roles.add(userRole);
		
		return this.userService.createUser(user,roles);
	}
	
	@PostMapping("/user-profile")
	public ResponseEntity<?> uploadUserPro(@RequestParam("userpro") MultipartFile file) throws IOException
	{
		JwtResponse imageUrl = new JwtResponse();	
		try {
			
			if(file.isEmpty())
			{
				return ResponseEntity.ok(imageUrl);
			}
			
			//upload category
			String filename = this.storageService.uploadFile(file);
			if(filename!=null) {
				imageUrl.setProfileUrl(ServletUriComponentsBuilder
						.fromCurrentContextPath()
						.path("/user/download/"+filename).toUriString());
				
				return ResponseEntity.ok(imageUrl);
			}	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(imageUrl);
	}
	
	@PostMapping("/user-cover")
	public ResponseEntity<?> uploadUserCov(@RequestParam("usercov") MultipartFile file)
	{
		JwtResponse imageUrl = new JwtResponse();
		try {
			
			if(file.isEmpty())
			{
				return ResponseEntity.ok(imageUrl);
			}
			
			//validation
//			if(!file.getContentType().equals("image/jpeg") && !file.getContentType().equals("image/jpg"))
//			{
//				return ResponseEntity.ok(imageUrl);
//			}
          			
			//upload category
			String filename = this.storageService.uploadFile(file);
			if(filename!=null) {
				imageUrl.setCoverUrl(ServletUriComponentsBuilder
						.fromCurrentContextPath()
						.path("/user/download/"+filename).toUriString());
				
				return ResponseEntity.ok(imageUrl);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.ok(imageUrl);
	}
	
	
	@PutMapping("/")
	public Boolean updateUser(@RequestBody User user) {
	     return this.userService.updateUser(user);
	}
	
//	@GetMapping("/{username}")
//	public User getUser(@PathVariable String username) {
//		return this.userService.getUser(username);
//	}

	@GetMapping("/{uid}")
	public User getUserById(@PathVariable String uid) {
		return this.userService.getUserById(Long.parseLong(uid));
	}
	
	@GetMapping("/")
	public List<User> getUsers() {
		return this.userService.getUsers();
	}
	
	
	@DeleteMapping("/{id}")
	public Boolean deleteUser(@PathVariable long id) {
		return this.userService.deleteUser(id);
		
	}
	
	@PostMapping("/add-friend/{username}")
	public Boolean addFriend(@PathVariable String username,Principal principal) {
		User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName()); 
		return this.userService.addFriend(localUser,username);
	}
	
	@PostMapping("/remove-friend/{friend_id}")
	public Boolean removeFriend(@PathVariable int friend_id,Principal principal) {
		User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName());
		return this.userService.removeFriend(localUser,friend_id);	
	}
	
	@GetMapping("/get-friends")
	public List<Friend> getFriends(Principal principal) {
		User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName());
		return this.userService.getFriends(localUser);
	}
	
	@PostMapping("/add-post")
	public Boolean addPost(@RequestBody Post post,Principal principal) {
		User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName());
		return this.userService.addPost(localUser,post);
	}
	
	@PostMapping("/edit-post")
	public Boolean editPost(@RequestBody Post post,Principal principal) {
		User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName());
		return this.userService.editPost(localUser,post);
	}
	
	@PostMapping("/edit-friendpost/{uid}")
	public Boolean editPost(@RequestBody Post post,@PathVariable long uid) {
		return this.userService.editFriendPost(uid,post);
	}
	
	@PostMapping("/remove-post/{post_id}")
	public Boolean removePost(@PathVariable int post_id,Principal principal) {
		User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName()); 
		return this.userService.removePost(localUser,post_id);
	}
	
	@GetMapping("/get-posts")
	public List<Post> getPosts(Principal principal) {
		User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName());
		return this.userService.getPosts(localUser);
	}
	
	@GetMapping("/not-friend")
	public List<User> getUserNotFriend(Principal principal){
		User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName());
		return this.userService.getUserNotFriend(localUser);
	}
	
	@GetMapping("/count-friends")
	public int countFriends(Principal principal) {
	 User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName()); 
		return this.userService.countFriends(localUser);
	}
	
	@GetMapping("/count-posts")
	public int countPosts(Principal principal) {
	 User localUser=(User)this.userDetailService.loadUserByUsername(principal.getName()); 
		return this.userService.countPosts(localUser);
	}
}
