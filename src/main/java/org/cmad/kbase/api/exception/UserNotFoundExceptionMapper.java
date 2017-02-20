package org.cmad.kbase.api.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;

public class UserNotFoundExceptionMapper implements ExceptionMapper<UserNotFoundException> {

	@Override
	public Response toResponse(UserNotFoundException ex) {
		ErrorMessage errorMessage = new ErrorMessage(ex.getMessage(), 404, "http://javabrains.koushik.org");
		return Response.status(Status.NOT_FOUND)
				.entity(errorMessage)
				.build();
	}

}
