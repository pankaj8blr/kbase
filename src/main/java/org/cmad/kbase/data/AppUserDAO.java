package org.cmad.kbase.data;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Persistence;

import org.cmad.kbase.api.AppUser;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

public class AppUserDAO implements UserDAO {

	static SessionFactory factory = (SessionFactory) Persistence.createEntityManagerFactory("kbase");

	@Override
	public AppUser addAppUser(AppUser appUser) {
		System.out.println("UserBlogDAO.addAppUser()appUser: " + appUser);
		Session ses = HibernateUtil.currentSession();

		Transaction tx = ses.beginTransaction();
		ses.save(appUser);
		tx.commit();
		HibernateUtil.closeSession();

		return appUser;
	}

	@Override
	public AppUser updateAppUser(AppUser appUser) {
		System.out.println("AppUserDAO.updateAppUser()appUser: " + appUser);

		Session ses = HibernateUtil.currentSession();

		Transaction tx = ses.beginTransaction();
		ses.update(appUser);
		// ses.merge(appUser);
		tx.commit();
		HibernateUtil.closeSession();
		System.out.println("AppUserDAO.updateAppUser()appUser: " + appUser);
		return appUser;

	}

	@Override
	public AppUser authenticateAppUser(AppUser appUser) {
		AppUser user = null;
		Session ses = HibernateUtil.currentSession();

		Transaction tx = ses.beginTransaction();
		String emailId = appUser.getEmail();
		String pwd = appUser.getPassword();
		System.out.println("UserBlogDAO.authenticateAppUser() email: " + emailId + ",pwd: " + pwd);

		user = (AppUser) ses.createQuery("SELECT u from AppUser u where u.email = :emailId and u.password = :pwd")
				.setParameter("emailId", emailId).setParameter("pwd", pwd).getSingleResult();

		user.setPassword("");
		HibernateUtil.closeSession();

		return user;
	}

	public AppUser logoutAppUser(AppUser appUser) {
		Session ses = HibernateUtil.currentSession();
		Transaction tx = ses.beginTransaction();
		ses.delete(appUser);
		tx.commit();
		HibernateUtil.closeSession();
		return appUser;
	}

	@Override
	public AppUser getAppUser(String userName, String pwd) {
		Session ses = HibernateUtil.currentSession();
		try {
			AppUser appUser = (AppUser) ses
					.createQuery("SELECT u from AppUser u where u.nameUser = :name and u.password = :password")
					.setParameter("name", userName).setParameter("password", pwd).getSingleResult();
			HibernateUtil.closeSession();
			return appUser;
		} catch (NoResultException e) {
			HibernateUtil.closeSession();
			return null;
		}
	}

	public AppUser getAppUser(String appUserEmailId) {
		Session ses = HibernateUtil.currentSession();

		Criteria crit = ses.createCriteria(AppUser.class);
		System.out.println("AppUserDAO.getAppUser()appUserEmailId: " + appUserEmailId);
		crit.add(Restrictions.idEq(appUserEmailId));
		AppUser u = (AppUser) crit.uniqueResult();
		HibernateUtil.closeSession();
		return u;

	}

	public List<AppUser> getAppUsers() {
		Session ses = HibernateUtil.currentSession();
		List<AppUser> list = ses.createCriteria(AppUser.class).list();
		HibernateUtil.closeSession();
		System.out.println("AppUserDAO.getAppUsers()list: "+list);
		return list;

	}

	public boolean insertAppUser(AppUser appUser) {
		/*
		 * EntityManager em = factory.createEntityManager(); try {
		 * em.persist(appUser); return true; } catch (Exception e) {
		 * e.printStackTrace(); return false; }
		 */
		return false;
	}

	public boolean deleteAppUser(AppUser appUser) {
		/*
		 * EntityManager em = factory.createEntityManager(); try {
		 * em.remove(appUser); return true; } catch (Exception e) {
		 * e.printStackTrace(); return false; }
		 */
		return false;
	}

}
