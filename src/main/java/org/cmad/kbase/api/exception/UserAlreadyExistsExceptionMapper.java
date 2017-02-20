package org.cmad.kbase.api.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;

public class UserAlreadyExistsExceptionMapper implements ExceptionMapper<UserAlreadyExistsException> {

	@Override
	public Response toResponse(UserAlreadyExistsException ex) {
		ErrorMessage errorMessage = new ErrorMessage(ex.getMessage(), 404, "http://javabrains.koushik.org");
		return Response.status(Status.CONFLICT)
				.entity(errorMessage)
				.build();
	}

}
