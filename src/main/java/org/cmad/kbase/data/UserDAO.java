package org.cmad.kbase.data;

import java.util.List;

import org.cmad.kbase.api.AppUser;

public interface UserDAO {

	AppUser addAppUser(AppUser appUser);

	AppUser authenticateAppUser(AppUser appUser);

	AppUser updateAppUser(AppUser appUser);

	AppUser logoutAppUser(AppUser appUser);

	AppUser getAppUser(String appUserName, String appUserPwd);
	
	AppUser getAppUser(String appUserEmailId);
	
	public List<AppUser> getAppUsers() ;
	
	boolean insertAppUser(AppUser appUser);

	boolean deleteAppUser(AppUser appUser);


}