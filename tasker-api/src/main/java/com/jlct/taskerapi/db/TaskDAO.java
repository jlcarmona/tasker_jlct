package com.jlct.taskerapi.db;

import java.util.List;

import javax.persistence.criteria.CriteriaQuery;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.jlct.taskerapi.api.Task;

import io.dropwizard.hibernate.AbstractDAO;

public class TaskDAO extends AbstractDAO<Task> {

	public TaskDAO(SessionFactory factory) {
		super(factory);
	}

	public Task insert(Task task) {
		return persist(task);
	}

	public void update(Task task) {
		currentSession().update(task);
	}

	public void delete(Task task) {
		currentSession().delete(task);
	}

	public Task findById(Integer id) {
		return (Task) currentSession().get(Task.class, id);
	}

	public List<Task> findAll() {
		CriteriaQuery<Task> query = currentSession().getCriteriaBuilder().createQuery(Task.class);
		query.from(Task.class);
		Query<Task> queryTask = currentSession().createQuery(query);
		return queryTask.getResultList();
	}

}
