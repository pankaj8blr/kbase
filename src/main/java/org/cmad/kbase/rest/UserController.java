
package org.cmad.kbase.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.cmad.kbase.api.AppUser;
import org.cmad.kbase.api.User;
import org.cmad.kbase.biz.UserService;



@Path("/users")
public class UserController {
	User userService = null;
	public UserController() {
		System.out.println("UserController.UserController()");
		userService = new UserService();
	}
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
	public AppUser addUser(AppUser user) {
		System.out.println("UserController.addUser() user: "+user);
		return userService.addAppUser(user);
	}

	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
	@Path("/login")
	public AppUser authenticateUser(AppUser user) {
		return userService.authenticatedAppUser(user);
	}
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppUser updateUser(AppUser user) {
		System.out.println("UserController.updateUser() user: "+user);
		return userService.updateAppUser(user);
	}
	
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/logout")
	public AppUser logoutAppUser(AppUser user) {
		return userService.logoutAppUser(user);
	}
	
}
