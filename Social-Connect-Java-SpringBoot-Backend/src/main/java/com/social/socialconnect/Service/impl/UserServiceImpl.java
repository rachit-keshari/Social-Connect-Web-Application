package com.social.socialconnect.Service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.AbstractResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.social.socialconnect.Service.UserService;
import com.social.socialconnect.model.Friend;
import com.social.socialconnect.model.Post;
import com.social.socialconnect.model.Role;
import com.social.socialconnect.model.User;
import com.social.socialconnect.model.UserRole;
import com.social.socialconnect.repo.FriendRepository;
import com.social.socialconnect.repo.PostRepository;
import com.social.socialconnect.repo.RoleRepository;
import com.social.socialconnect.repo.UserRepository;
import com.social.socialconnect.repo.UserRoleRepository;


@Service
public class UserServiceImpl implements UserService {

	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private FriendRepository friendRepository;
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private UserRoleRepository userRoleRepository;
	
	
	//creating user
	@Override
	public Boolean createUser(User user, Set<UserRole> userRoles) {
		// TODO Auto-generated method stub
        User local = this.userRepository.findByUsername(user.getUsername());		
		Boolean flag=true;
        if(local != null)
		{
			System.out.println("User is already there !!");
			flag=false;
		}
		else
		{
			//create user
			for(UserRole ur:userRoles)
			{
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local = userRepository.save(user);
		}    
		return flag;
	}
	
	@Override
	public Boolean updateUser(User user){
		// TODO Auto-generated method stub
//		try {
//			File resource = new ClassPathResource("static/image/abc.txt").getFile();
//			String UPLOAD_DIR = new String(Files.readAllBytes(resource.toPath()));
//			java.net.URI reso = new ClassPathResource("static/image/abc.txt").getURI();
//			String reso1 = new ClassPathResource("static/image/abc.txt").getPath();
//			System.err.println(UPLOAD_DIR);
//			System.err.println("reso Value:"+reso.toString());
//			System.err.println("reso1 Value:"+reso1.toString());
//			System.out.println("This is Rachit:("+UPLOAD_DIR +")Success!!!!!!!!!");
//			System.out.println("This is Rachit:("+resource.toPath().toString().substring(0, resource.toPath().toString().length() - 7) +")Success!!!!!!!!!");
//			System.err.println("This is Rachit:()Success!!!!!!!!!");
//		} catch (IOException e) {
//			
//			e.printStackTrace();
//			System.err.println("This is Rachit:()Success!!!!!!!!!");
//			// TODO: handle exception
//		}
//		
		
		Boolean flag=false;
	    User local = this.userRepository.save(user);
	    if(local!=null)
	     { flag=true; }
	    
	    return flag;
	    	
	}
	
	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
        User local = this.userRepository.findByUsername(username);		
		if(local == null)
		{
			System.out.println("User not exist !!");
		}
		return local;
	}

	@Override
	public Boolean deleteUser(long id) {
		// TODO Auto-generated method stub
		Optional<User> local = this.userRepository.findById(id);
		UserRole localuserRole = userRoleRepository.findByUser(local.get());
		this.userRepository.deleteById(id);
		this.roleRepository.deleteById(localuserRole.getRole().getRoleId());
		return true;
	}

	@Override
	public List<User> getUsers() {
		// TODO Auto-generated method stub
		List<User> users = this.userRepository.findAll();
		return users;
	}

	@Override
	public Boolean addFriend(User user,String username) {
		// TODO Auto-generated method stub
		User local = this.userRepository.findByUsername(username);
		List<Friend> friends = user.getFriends();
		for(Friend f :friends) {
		if(f.getUid()==local.getId()) { return false; }
		}
		if(local.getUsername()==user.getUsername()) {return false;}
		Friend friend = new Friend();
		friend.setUser(user);
		friend.setName(local.getFirstname()+" "+local.getLastname());
		friend.setUid(local.getId());
		friend.setImagepro(local.getImagepro());
		friends.add(friend);
		user.setFriends(friends);
		this.userRepository.save(user);
		return true;
	}

	@Override
	public Boolean removeFriend(User user,long friend_id) {
		// TODO Auto-generated method stub
		List<Friend> friends = user.getFriends();
		Boolean flag = friends.removeIf(f->f.getFriend_id()==friend_id);
		if(!flag){return false;}		
		user.setFriends(friends);
		this.userRepository.save(user);
		this.friendRepository.deleteById(friend_id);
		return true;
	}

	@Override
	public List<Friend> getFriends(User user) {
		
		List<Friend> friends = user.getFriends();
		// TODO Auto-generated method stub
		return friends;
	}

	@Override
	public Boolean addPost(User user,Post post) {
		// TODO Auto-generated method stub
		post.setUser(user);
		List<Post> posts = user.getPosts();
		posts.add(post);
		user.setPosts(posts);
		this.userRepository.save(user);
		return true;
	}

	@Override
	public Boolean removePost(User user,long post_id) {
		// TODO Auto-generated method stub
		List<Post> posts = user.getPosts();
		Boolean flag = posts.removeIf(p->p.getPost_id()==post_id);
		if(!flag){return false;}
		user.setPosts(posts);
		this.userRepository.save(user);
		this.postRepository.deleteById(post_id);
		return true;
	}

	@Override
	public List<Post> getPosts(User user) {
		// TODO Auto-generated method stub
		List<Post> posts = user.getPosts();
		return posts;
	}

	@Override
	public List<User> getUserNotFriend(User user) {
		// TODO Auto-generated method stub
		List<User> allUser = this.userRepository.findAll();
		List<Friend> friends = user.getFriends();
		for(Friend f:friends)
		{
		   allUser.removeIf(u->u.getId()==f.getUid());
		}
		allUser.remove(user);
		return allUser;
	}

	@Override
	public User getUserById(long uid) {
		
		Optional<User> oplocal = this.userRepository.findById(uid);		
		User local = oplocal.get();
		if(local == null)
		{
			System.out.println("User not exist !!");
		}
		return local;
		// TODO Auto-generated method stub
	}

	@Override
	public Boolean editPost(User user, Post post) {
		// TODO Auto-generated method stub
		post.setUser(user);
		this.postRepository.save(post);
		return true;
	}

	@Override
	public Boolean editFriendPost(long uid, Post post) {
		// TODO Auto-generated method stub
		Optional<User> local = this.userRepository.findById(uid);
		User user= local.get();
		post.setUser(user);
		this.postRepository.save(post);
		return true;
	}

	@Override
	public int countFriends(User user) {
		// TODO Auto-generated method stub
		List<Friend> friends=user.getFriends();
		return friends.size();
	}

	@Override
	public int countPosts(User user) {
		// TODO Auto-generated method stub
		List<Post> posts=user.getPosts();
		return posts.size();
	}



}
