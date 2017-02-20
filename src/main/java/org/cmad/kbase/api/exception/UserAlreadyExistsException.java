package org.cmad.kbase.api.exception;

public class UserAlreadyExistsException extends KBaseException {

public static final int USER_ALREADY_EXISTS = 1;
	
	private int exceptionID;
	
	public UserAlreadyExistsException() {
	}
	
	public UserAlreadyExistsException(int exceptionID) {
		super(exceptionID);
	}
	
	public static String getMessage(final int exceptionID) {

		String ErrMsg = null;

		switch (exceptionID) {
		case USER_ALREADY_EXISTS:
			ErrMsg = "User alreadyt available.";
			break;
		
		default:
			ErrMsg = "Incorrect Exception ID";
			break;
		}

		return ErrMsg;
	}

}
