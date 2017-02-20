package org.cmad.kbase.api;


import java.util.List;

import org.cmad.kbase.api.exception.KBaseException;
import org.cmad.kbase.api.exception.PostNotFoundException;
import org.cmad.kbase.api.exception.TopicNotFoundExcetion;

public interface BlogPost{
	
	public Post addBlogPost(Post post) throws PostNotFoundException,KBaseException;
	
	public Post updateBlogPost(Post post) throws PostNotFoundException,KBaseException;
	
	public Post deleteBlogPost(Post post) throws PostNotFoundException,KBaseException;

	public List<Post> getBlogPosts(String emailId) throws KBaseException;

	public List<Post> getBlogPosts() throws KBaseException;

	public List<Post> getBlogPosts(Topic topic) throws TopicNotFoundExcetion,PostNotFoundException,KBaseException;

	public Post getBlogPost(int postId) throws PostNotFoundException, KBaseException;
	
	public boolean addComment(Comment comment) throws KBaseException;


}
