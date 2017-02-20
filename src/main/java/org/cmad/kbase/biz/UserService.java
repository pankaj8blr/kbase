package org.cmad.kbase.biz;

import java.util.List;

import org.cmad.kbase.api.AppUser;
import org.cmad.kbase.api.PersonalInfo;
import org.cmad.kbase.api.User;
import org.cmad.kbase.api.exception.UserAlreadyExistsException;
import org.cmad.kbase.api.exception.UserNotFoundException;
import org.cmad.kbase.data.AppUserDAO;
import org.cmad.kbase.data.UserDAO;
import org.hibernate.Session;

public class UserService implements User {

	private UserDAO userDao = new AppUserDAO();

	
	public UserService() {
		super();
		this.userDao = new AppUserDAO();
	}
	
	public UserService(UserDAO userDao) {
		super();
		this.userDao = userDao;
	}

	
	
	@Override
	public AppUser addAppUser(AppUser appUser) throws UserNotFoundException {
		System.out.println("UserService.addAppUser()appUser: "+appUser);
		System.out.println("UserService.addAppUser()userDao: "+userDao);
		if(!isUserExist(appUser)){
			if(isUserPersonalInfoProper(appUser)){
				return userDao.addAppUser(appUser);
			}
		}else{
			throw new UserAlreadyExistsException(UserAlreadyExistsException.USER_ALREADY_EXISTS);
		}
		return appUser;
	}

	@Override
	public AppUser authenticatedAppUser(AppUser appUser) throws UserNotFoundException {
		return userDao.authenticateAppUser(appUser);
	}
	
	@Override
	public AppUser updateAppUser(AppUser appUser) throws UserNotFoundException {
		System.out.println("UserService.updateAppUser()appUser: "+appUser);
		AppUser updatedUser = appUser;
		if(isUserExist(appUser)){
			return userDao.updateAppUser(appUser);
		}
		System.out.println("UserService.updateAppUser()appUser: "+appUser);
		return updatedUser;
	}

	@Override
	public AppUser logoutAppUser(AppUser appUser) throws UserNotFoundException {
		if(isUserExist(appUser)){
			return userDao.logoutAppUser(appUser);
		}
		System.out.println("UserService.updateAppUser()appUser: "+appUser);
		return appUser;
	}
	
	
	private boolean isUserExist(AppUser user) throws UserNotFoundException{
		boolean isUserExist = false;
		System.out.println("UserService.isUserExist()user: "+user);
		if(user!=null){
			List userList = getAppUsers();
			if(userList!=null){
				for(int index=0;index<userList.size();index++){
					AppUser appUser = (AppUser)userList.get(index);
					System.out.println("UserService.isUserExist()appUser.getEmail(): "+appUser.getEmail());
					System.out.println("UserService.isUserExist()user.getEmail(): "+user.getEmail());
					if(appUser.getEmail().toString().trim().equals(user.getEmail().toString().trim())){
						isUserExist = true;
						return isUserExist;
					}
				}
			}
		}
		System.out.println("UserService.isUserExist()isUserExist: "+isUserExist);
		/*if(!isUserExist){
			throw new UserNotFoundException(UserNotFoundException.USER_NOT_FOUND);
		}*/
		return isUserExist;
	}
	
	
	
	private boolean isUserPersonalInfoProper(AppUser user) throws UserNotFoundException{
		boolean isUserPersonalInfoProper = false;
		PersonalInfo personInfo = user.getPersonalInfo();
		if(personInfo.getName()!=null 
				&& personInfo.getName().trim().length()>0  
				&& personInfo.getPhoneNum()!=null 
				&& personInfo.getPhoneNum().trim().length()>0){
			isUserPersonalInfoProper = true;
		}else{
			throw new UserNotFoundException(UserNotFoundException.USER_DETAILS_NOT_PROPER);
		}
		System.out.println("UserService.isUserPersonalInfoProper()isUserPersonalInfoProper: "+isUserPersonalInfoProper);
		return isUserPersonalInfoProper;
	}

	

	@Override
	public List<AppUser> getAppUsers() throws UserNotFoundException {
		return userDao.getAppUsers();
	}

	@Override
	public AppUser getAppUser(String appUserEmailId) throws UserNotFoundException {
		return userDao.getAppUser(appUserEmailId);
	}

}


