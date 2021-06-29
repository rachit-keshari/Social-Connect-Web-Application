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
@Table(name="posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long post_id;
	private String title;
	private String msg;
	private String image;
	private int likes;
	private int dislike;
	private int share;
	private Boolean fav;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	private User user;
		
	

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public int getDislike() {
		return dislike;
	}

	public void setDislike(int dislike) {
		this.dislike = dislike;
	}

	public int getShare() {
		return share;
	}

	public void setShare(int share) {
		this.share = share;
	}

	public Boolean getFav() {
		return fav;
	}

	public void setFav(Boolean fav) {
		this.fav = fav;
	}

	public void setPost_id(long post_id) {
		this.post_id = post_id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public long getPost_id() {
		return post_id;
	}


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Post() {
		super();
	}

	public Post(long post_id, String title, String msg, String image, int likes, int dislike, int share, Boolean fav,
			User user) {
		super();
		this.post_id = post_id;
		this.title = title;
		this.msg = msg;
		this.image = image;
		this.likes = likes;
		this.dislike = dislike;
		this.share = share;
		this.fav = fav;
		this.user = user;
	}
}
