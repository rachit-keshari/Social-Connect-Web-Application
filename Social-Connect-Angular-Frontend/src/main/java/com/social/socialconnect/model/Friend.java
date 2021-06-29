package com.social.socialconnect.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name ="friends")
public class Friend {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long friend_id;
	
	private long uid;
	private String name;
	private String imagepro;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	private User user;
	
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImagepro() {
		return imagepro;
	}
	public void setImagepro(String imagepro) {
		this.imagepro = imagepro;
	}
	public long getUid() {
		return uid;
	}
	public void setUid(long uid) {
		this.uid = uid;
	}
	public long getFriend_id() {
		return friend_id;
	}
	public void setFriend_id(long friend_id) {
		this.friend_id = friend_id;
	}

	public Friend() {
		super();
	}
	public Friend(long friend_id, long uid, String name, String imagepro, User user) {
		super();
		this.friend_id = friend_id;
		this.uid = uid;
		this.name = name;
		this.imagepro = imagepro;
		this.user = user;
	}
	
}
