package com.jlct.taskerapi.db;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import com.jlct.taskerapi.api.Task;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

import org.assertj.core.api.SoftAssertions;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TaskDAOTest {

	private SessionFactory factory = mock(SessionFactory.class);
	private Session session = mock(Session.class);
	private TaskDAO taskDAO = null;
	private Task task = null;
	private List<Task> tasks;

	@BeforeEach
	void setup() {
		taskDAO = new TaskDAO(factory);
		task = new Task(1, "Testing task", LocalDate.of(2022, 3, 1));
		tasks = new ArrayList<Task>();
		tasks.add(task);
		tasks.add(new Task(2, "Testing task 2", LocalDate.of(2022, 3, 2)));
	}

	@Test
	void update_TaskIsProvided_TaskReturnTaskUpdated() {
		when(factory.getCurrentSession()).thenReturn(session);

		taskDAO.update(task);
		assertTasksAreEquals(task, new Task(1, "Testing task", (LocalDate.of(2022, 3, 1))));
	}

	@Test
	void delete_TaskIsProvided_TaskIsDeleted() {
		when(factory.getCurrentSession()).thenReturn(session);

		taskDAO.delete(task);
		assertTasksAreEquals(task, new Task(1, "Testing task", (LocalDate.of(2022, 3, 1))));
	}

	@Test
	void findById_TaskIDIsProvided_TaskIsFound() {
		when(factory.getCurrentSession()).thenReturn(session);
		when(session.get(Task.class, 1)).thenReturn(task);

		Task taskFound = taskDAO.findById(1);
		assertTasksAreEquals(task, taskFound);
	}

	@Test
	void findAll_ACriteriaQueryIsCreated_AllTasksAreFound() {
		when(factory.getCurrentSession()).thenReturn(session);
		CriteriaBuilder criteriaBuilderMock = mock(CriteriaBuilder.class);
		CriteriaQuery<Task> criteriaQueryMock = mock(CriteriaQuery.class);
		Query<Task> queryMock = mock(Query.class);
		when(session.getCriteriaBuilder()).thenReturn(criteriaBuilderMock);
		when(criteriaBuilderMock.createQuery(Task.class)).thenReturn(criteriaQueryMock);
		when(session.createQuery(criteriaQueryMock)).thenReturn(queryMock);
		when(queryMock.getResultList()).thenReturn(tasks);

		List<Task> findAll = taskDAO.findAll();
		assertThat(findAll.size(), equalTo(2));
	}

	// Test if two tasks have the same information 
	private void assertTasksAreEquals(Task task1, Task task2) {
		SoftAssertions taskAssert = new SoftAssertions();
		taskAssert.assertThat(task1.getId()).isEqualTo(task2.getId());
		taskAssert.assertThat(task1.getName()).isEqualTo(task2.getName());
		taskAssert.assertThat(task1.getTaskDate()).isEqualTo(task2.getTaskDate());
		taskAssert.assertAll();
	}
}