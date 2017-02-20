package org.cmad.kbase.data;

import java.util.List;

import org.cmad.kbase.api.Comment;
import org.cmad.kbase.api.Post;

public interface BlogDAO {
	
	public Post createBlogPost(Post post);

	public Post updateBlogPost(Post post) ;

	public Post deleteBlogPost(Post post);

	public Post getBlogPost(int postID);
	
	public List<Post> getBlogPosts() ;
	
	public List<Post> getBlogPosts(int interestId) ;
	
	public List<Post> getBlogPosts(String emailId) ;
		
	public Comment addComment(Comment comment);
	public Comment readComment();
	public Comment updateComment(Comment comment) ;
	public Comment deleteComment(Comment comment);

}
