package org.cmad.kbase.api;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
@Table (name="POST")
public class Post {
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="POST_ID")
	private int id;
	
	@Column(name="POST_TITLE")
	private String title;
	
	@Column(name="POST_DESC")
	private String description;
	
	
	@Column(name="POST_CREATION_TIME")
	@Temporal(value = TemporalType.DATE)
//	private String creationTime;
	private Date creationTime;
	//private Date modifiedTime;
	
	private String author;
	
	/*@OneToOne(cascade = CascadeType.ALL)
	@JoinTable(name="POST_TOPIC",joinColumns=@JoinColumn(name="POST_ID"),
	inverseJoinColumns=@JoinColumn(name="TOPIC_ID")
	)
	private Topic topic;*/
	
	@Column(name="INTEREST_FOR_POST",nullable=false)
	private String interestForPost;

/*	@OneToMany
	@JoinTable(name="POST_COMMENT",joinColumns=@JoinColumn(name="POST_ID"),
	inverseJoinColumns=@JoinColumn(name="COMMENT_ID")
	)
	private Collection<Comment> comment = new ArrayList<Comment>();
*/	
	public Post(){
		
	}
	
	public Post(String title, String description, Date creationTime, String author,String interestForPost) {
		super();
		this.title = title;
		this.description = description;
		this.creationTime = creationTime;
		this.author = author;
		this.interestForPost=interestForPost;
//		this.comment = (Collection<Comment>) comment;
	}
	
	/*public Post(int id, String title, String description, String createdTime, Topic topic, Comment comment) {
	this(title,description,createdTime,topic,comment);
	this.id = id;
	}*/

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}

	public String getInterestForPost() {
		return interestForPost;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public void setInterestForPost(String interestForPost) {
		this.interestForPost = interestForPost;
	}
	

}
