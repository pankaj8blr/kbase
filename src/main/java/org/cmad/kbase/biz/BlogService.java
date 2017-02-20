package org.cmad.kbase.biz;

import java.util.List;

import org.cmad.kbase.api.AppUser;
import org.cmad.kbase.api.BlogPost;
import org.cmad.kbase.api.Comment;
import org.cmad.kbase.api.Post;
import org.cmad.kbase.api.Topic;
import org.cmad.kbase.api.exception.InvalidCommentException;
import org.cmad.kbase.api.exception.InvalidPostException;
import org.cmad.kbase.api.exception.KBaseException;
import org.cmad.kbase.api.exception.PostNotFoundException;
import org.cmad.kbase.api.exception.TopicNotFoundExcetion;
import org.cmad.kbase.api.exception.UserNotFoundException;
import org.cmad.kbase.data.AppBlogDAO;
import org.cmad.kbase.data.BlogDAO;

public class BlogService implements BlogPost{
	private BlogDAO blogDAO;

	public BlogService() {
		super();
		this.blogDAO = new AppBlogDAO();
	}
	
	public BlogService(AppBlogDAO blogDao) {
		super();
		this.blogDAO = blogDao;
	}
	@Override
	public Post addBlogPost(Post post) throws KBaseException {
		System.out.println("BlogService.addPost()post: "+post);
//		Post blogPost = null;
		int postId = -1;
		if(isPostValid(post)){
//			blogPost = blogDAO.createBlogPost(post);
			if(post!=null){
				System.out.println("BlogService.addBlogPost() Id: "+post.getId());
				System.out.println("BlogService.addBlogPost() author: "+post.getAuthor());
				System.out.println("BlogService.addBlogPost() Title: "+post.getTitle());
				System.out.println("BlogService.addBlogPost() Descriptio: "+post.getDescription());
			}
			return blogDAO.createBlogPost(post);
		} 
		System.out.println("BlogService.addPost()postId: "+postId);

		return post;
	}
	
	@Override
	public Post updateBlogPost(Post post) throws PostNotFoundException, KBaseException {
		System.out.println("BlogService.updateBlogPost()post: "+post);
		Post updatedPost = post;
		if(isPostValid(post)){
			return blogDAO.updateBlogPost(post);
		}
		System.out.println("BlogService.updateBlogPost()updatedPost: "+updatedPost);
		return updatedPost;
	}

	@Override
	public Post deleteBlogPost(Post post) throws PostNotFoundException, KBaseException {
		if(isPostExist(post)){
			return blogDAO.deleteBlogPost(post);
		}
		System.out.println("BlogService.deleteBlogPost()post: "+post);
		return post;
	}

	@Override
	public List<Post> getBlogPosts(String emailId) throws KBaseException {
		if(emailId==null){
			System.out.println("BlogService.getBlogPosts()emailId==null");
			return blogDAO.getBlogPosts();
		}else{
			System.out.println("BlogService.getBlogPosts()emailId: "+emailId);
			return blogDAO.getBlogPosts(emailId);
		}
	}

	@Override
	public List<Post> getBlogPosts() throws KBaseException {
		System.out.println("BlogService.getBlogPosts() emailId NULL");
		return blogDAO.getBlogPosts();
	}
	
	@Override
	public List<Post> getBlogPosts(Topic topic) throws KBaseException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Post getBlogPost(int postId) throws PostNotFoundException, KBaseException {
		Post post = blogDAO.getBlogPost(postId);
		System.out.println("BlogService.getBlogPost()post: "+post);
//		if(post==null){
//			throw new PostNotFoundException(PostNotFoundException.POST_NOT_FOUND);
//		}
		return post;
	}
	
	private boolean isPostExist(Post post) throws UserNotFoundException{
		boolean isPostExist = false;
		if(post!=null){
			List postList = getBlogPosts();
			for(int index=0;index<postList.size();index++){
				Post blogPost = (Post)postList.get(index);
				System.out.println("BlogService.isPostExist()post.getId(): "+post.getId());
				System.out.println("BlogService.isPostExist()blogPost.getId(): "+blogPost.getId());
				if(blogPost.getId()==post.getId()){
					isPostExist = true;
					return isPostExist;
				}
			}
			
		}
		if(!isPostExist){
			throw new PostNotFoundException(PostNotFoundException.POST_NOT_FOUND);
		}
		System.out.println("BlogService.isPostExist()isUserExist: "+isPostExist);
		return isPostExist;
	}
	
	private boolean isPostValid(Post post) throws InvalidPostException{
		boolean isPostValid = false;
		if(isPostTitleValid(post) && isPostDescValid(post)){
			isPostValid = true;
		} 
		return isPostValid;
	}

	private boolean isPostTitleValid(Post post) throws InvalidPostException{
		boolean isPostTitleValid = false;
		if(post!=null && post.getTitle()!=null && post.getTitle().trim().length() >0){
			isPostTitleValid = true;
		} else{
			throw new InvalidPostException(InvalidPostException.INVALID_POST_TITLE);
		}
		System.out.println("BlogService.isPostTitleValid()isPostTitleValid : "+isPostTitleValid);
		return isPostTitleValid;
	}
	
	private boolean isPostDescValid(Post post) throws InvalidPostException{
		boolean isPostDescValid = false;
		if(post!=null && post.getDescription()!=null && post.getDescription().trim().length() >0){
			isPostDescValid = true;
		} else{
			throw new InvalidPostException(InvalidPostException.INVALID_POST_DESCRIPTION);
		}
		System.out.println("BlogService.isPostDescValid()isPostDescValid: "+isPostDescValid);
		return isPostDescValid;
	}
	
	@Override
	public boolean addComment(Comment comment) throws KBaseException {
		boolean isCommentAdded = false;
		if(isCommentValid(comment)){
			blogDAO.addComment(comment);
			isCommentAdded = true;
		}
		return isCommentAdded;
	}
	
	private boolean isCommentValid(Comment comment)  throws InvalidCommentException{
		boolean isValidComment = false;
		if(comment!=null && comment.getCommentDesc()!=null && comment.getCommentDesc().trim().length()>0){
			isValidComment = true;
		}else{
			throw new InvalidCommentException(InvalidCommentException.INVALID_COMMENT);
		}
		return isValidComment;
	}
	
	
}