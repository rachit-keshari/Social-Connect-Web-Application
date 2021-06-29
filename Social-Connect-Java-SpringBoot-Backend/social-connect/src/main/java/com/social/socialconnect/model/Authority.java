package com.social.socialconnect.model;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority  {
	
	private String authority;
	
	public Authority(String authority) {
		super();
		this.authority = authority;
	}

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return this.authority;
	}
  
}
