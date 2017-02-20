package org.cmad.kbase.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.cmad.kbase.api.Comment;
import org.cmad.kbase.api.Post;
import org.cmad.kbase.biz.BlogService;

@Path("/blogs")
public class BlogController {
	
	private BlogService blogService;
	public BlogController() {
		System.out.println("BlogController.BlogController()");
		blogService = new BlogService();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Post createBlogPost(Post post) {
		System.out.println("BlogController.createBlogPost() post: "+post);
		System.out.println("BlogController.createBlogPost()blogPostService: "+blogService);
		/*Post blogPost = blogPostService.addBlogPost(post);*/
		
		/*System.out.println("blogPost: "+blogPost);*/
		if(post!=null)
		{
			System.out.println("BlogController.createBlogPost() Id: "+post.getId());
			System.out.println("BlogController.createBlogPost() AppUserId: "+post.getAuthor());
			System.out.println("BlogController.createBlogPost() Title: "+post.getTitle());
			System.out.println("BlogController.createBlogPost() Descriptio: "+post.getDescription());
		}
		return blogService.addBlogPost(post);
	}



	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Post updateBlogPost(Post blog) {
		System.out.println("BlogController.updateBlogPost() blog: "+blog);
		return blogService.updateBlogPost(blog);
	}
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	public Post deletePost(Post post) {
		return blogService.deleteBlogPost(post);
	}
	
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/comment")
	public Response addComment(Comment comment) {
		return Response.ok().entity(comment).build();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/user")
	public Response updateComment(Comment comment) {
		return Response.ok().entity(comment).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.TEXT_PLAIN)
	@Path("/{param}")
	public List getUserBlogPosts(@PathParam("param") String emailId) {
		System.out.println("BlogController.getUserBlogPosts()emailId: "+emailId);
//		System.out.println("BlogController.getUserBlogPosts()blogService: "+blogService);
		return blogService.getBlogPosts(emailId);
	}

	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/singlePost/{postId}")
	public Post getBlog(@PathParam("postId") int postId) {
		System.out.println("BlogController.getBlog()postId: "+postId);
//		System.out.println("BlogController.getBlog()blogService: "+blogService);
		Post post = blogService.getBlogPost(postId);;
		System.out.println("BlogController.getBlog()post: "+post);
		return post;
	}
}
