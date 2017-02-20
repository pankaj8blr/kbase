package org.cmad.kbase.api;

import java.util.List;

import org.cmad.kbase.api.exception.UserAlreadyExistsException;
import org.cmad.kbase.api.exception.UserNotFoundException;

public interface User {

	AppUser addAppUser(AppUser user) throws UserAlreadyExistsException;

	AppUser authenticatedAppUser(AppUser user) throws UserNotFoundException;

	AppUser updateAppUser(AppUser user) throws UserNotFoundException;

	AppUser logoutAppUser(AppUser user) throws UserNotFoundException;

	List<AppUser> getAppUsers() throws UserNotFoundException;

	AppUser getAppUser(String appUserEmailId) throws UserNotFoundException;

}