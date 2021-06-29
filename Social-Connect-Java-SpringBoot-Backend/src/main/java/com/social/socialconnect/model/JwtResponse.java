package com.social.socialconnect.model;

public class JwtResponse {
      
	private String token;
	private String ProfileUrl;
	private String CoverUrl;

	public String getProfileUrl() {
		return ProfileUrl;
	}

	public void setProfileUrl(String profileUrl) {
		ProfileUrl = profileUrl;
	}

	public String getCoverUrl() {
		return CoverUrl;
	}

	public void setCoverUrl(String coverUrl) {
		CoverUrl = coverUrl;
	}

	public JwtResponse(String token) {
		super();
		this.token = token;
	}
	
	public JwtResponse() {
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
}
