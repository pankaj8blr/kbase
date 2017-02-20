package org.cmad.kbase.data;

import java.util.List;

import org.cmad.kbase.api.Comment;
import org.cmad.kbase.api.Post;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class AppBlogDAO implements BlogDAO {



	@Override
	public Post createBlogPost(Post blogPost) {
		Session ses = HibernateUtil.currentSession();
		Transaction tx = ses.beginTransaction();
		ses.save(blogPost);
		tx.commit();
		HibernateUtil.closeSession();
		return blogPost;
	}


	@Override
	public Post getBlogPost(int postID) {
		Session ses = HibernateUtil.currentSession();
		Post post = ses.find(Post.class, postID);
		ses.close();
		return post;
	}



	@Override
	public Post updateBlogPost(Post post) {
		System.out.println("AppBlogDAO.updateAppUser()post: " + post);

		Session ses = HibernateUtil.currentSession();

		Transaction tx = ses.beginTransaction();
		ses.update(post);
		// ses.merge(appUser);
		tx.commit();
		HibernateUtil.closeSession();
		System.out.println("AppBlogDAO.updateAppUser()post: " + post);
		return post;
	}


	

	@Override
	public Post deleteBlogPost(Post post) {
		Session ses = HibernateUtil.currentSession();
		Transaction tx = ses.beginTransaction();
		ses.delete(post);
		tx.commit();
		HibernateUtil.closeSession();
		return post;
	}

	@Override
	public Comment addComment(Comment comment) {
		return comment;
	}

	@Override
	public Comment readComment() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comment updateComment(Comment comment) {
		Comment updatedComment=null;
		
		return updatedComment;
	}

	@Override
	public Comment deleteComment(Comment comment) {
		return comment;
		
	}

	


	@Override
	public List<Post> getBlogPosts(String emailId) {
		Session ses = HibernateUtil.currentSession();
		System.out.println("AppBlogDAO.getBlogPosts() emailId: "+ emailId);
		List<Post> userPosts = null;
		Transaction tx = ses.beginTransaction();
		if(emailId==null){
			userPosts = ses.createCriteria(Post.class).list();
		}else{
		userPosts = ses
					.createQuery("SELECT u from Post u where u.author = :author")
					.setParameter("author", emailId).getResultList();
		}
		tx.commit();
		HibernateUtil.closeSession();
		System.out.println("AppBlogDAO.getBlogPosts(emailId) userPosts: "+userPosts);
		if(userPosts!=null){
			System.out.println("AppBlogDAO.getBlogPosts(emailId) Post size: "+ userPosts.size());
		}
		return userPosts;
	}


	@Override
	public List<Post> getBlogPosts() {
		Session ses = HibernateUtil.currentSession();
		List<Post> list = ses.createCriteria(Post.class).list();
		HibernateUtil.closeSession();
		System.out.println("AppBlogDAO.getBlogPosts()list: "+list);
		System.out.println("AppBlogDAO.getBlogPosts()list size: "+list.size());
		return list;
	}


	@Override
	public List<Post> getBlogPosts(int interestId) {
		// TODO Auto-generated method stub
		return null;
	}
}
