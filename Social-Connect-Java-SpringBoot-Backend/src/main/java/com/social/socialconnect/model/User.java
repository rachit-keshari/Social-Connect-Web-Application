package com.social.socialconnect.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	private String username;
	private String firstname;
	private String lastname;
	private String email;
	private String phone;
	private String password;
	private String bio="";
	private boolean enable = true;
	private String profile;
	private String imagepro="";
	private String imagecov="";	
	
	//User has many roles
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
	@JsonIgnore
	private Set<UserRole> userRoles = new HashSet<>();
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<Post> posts = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<Friend> friends = new ArrayList<>();
	 
	public String getImagepro() {
		return imagepro;
	}
	public void setImagepro(String imagepro) {
		this.imagepro = imagepro;
	}
	public String getImagecov() {
		return imagecov;
	}
	public void setImagecov(String imagecov) {
		this.imagecov = imagecov;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public List<Friend> getFriends() {
		return friends;
	}
	public void setFriends(List<Friend> friends) {
		this.friends = friends;
	}
	public List<Post> getPosts() {
		return posts;
	}
	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}
	public Set<UserRole> getUserRoles() {
		return userRoles;
	}
	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public boolean isEnable() {
		return enable;
	}
	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public User() {
	}

	public User(long id, String username, String firstname, String lastname, String email, String phone,
			String password, String bio, boolean enable, String profile, String image_pro, String image_cov,
			Set<UserRole> userRoles, List<Post> posts, List<Friend> friends) {
		super();
		this.id = id;
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.bio = bio;
		this.enable = enable;
		this.profile = profile;
		this.imagepro = image_pro;
		this.imagecov = image_cov;
		this.userRoles = userRoles;
		this.posts = posts;
		this.friends = friends;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		
		Set<Authority> set = new HashSet<>();
		
		this.userRoles.forEach(userRole->{
			set.add(new Authority(userRole.getRole().getRoleName()));
		});
		
		return set;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
}
