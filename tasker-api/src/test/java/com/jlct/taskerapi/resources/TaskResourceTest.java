package com.jlct.taskerapi.resources;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

import com.jlct.taskerapi.api.Task;
import com.jlct.taskerapi.db.TaskDAO;

import io.dropwizard.testing.junit5.DropwizardExtensionsSupport;
import io.dropwizard.testing.junit5.ResourceExtension;

@ExtendWith(DropwizardExtensionsSupport.class)
class TaskResourceTest {

	private final String appURL = "/task/";
	private static final TaskDAO taskDAO = Mockito.mock(TaskDAO.class);
	private static final ResourceExtension resourceExtension = ResourceExtension.builder()
			.addResource(new TaskResource(taskDAO)).build();
	private final ArgumentCaptor<Task> taskCaptor = ArgumentCaptor.forClass(Task.class);
	private Task task;
	private Task[] tasks;

	@BeforeEach
	void setup() {
		task = new Task(1, "Testing task", LocalDate.of(2022, 3, 1));
		tasks = new Task[] { task, new Task(2, "Testing task 2", LocalDate.of(2022, 3, 2)) };
	}

	@AfterEach
	void tearDown() {
		reset(taskDAO);
	}

	@Test
	void getTasks_ServerIsWorkingProperly_AllTasksAreFound() {
		when(taskDAO.findAll()).thenReturn(Arrays.asList(tasks));
		@SuppressWarnings("unchecked")
		List<Task> taskFound = (List<Task>) resourceExtension.target(appURL).request().get(List.class);
		assertThat(taskFound).hasSize(2);
		verify(taskDAO).findAll();
	}

	@Test
	void getTask_AnExistingTaskIDIsProvided_TaskIsFound() {
		when(taskDAO.findById(1)).thenReturn(task);
		Task taskResponse = resourceExtension.target(appURL + 1).request().get(Task.class);

		SoftAssertions taskAssert = new SoftAssertions();
		taskAssert.assertThat(taskResponse.getId()).isEqualTo(task.getId());
		taskAssert.assertThat(taskResponse.getName()).isEqualTo(task.getName());
		taskAssert.assertThat(taskResponse.getTaskDate()).isEqualTo(task.getTaskDate());
		taskAssert.assertAll();

		verify(taskDAO).findById(1);
	}

	@Test
	void getTask_AnUnExistingTaskIDIsProvided_TaskIsNotFound() {
		when(taskDAO.findById(5)).thenReturn(null);
		Response response = resourceExtension.target(appURL + "5").request().get();
		assertThat(response.getStatusInfo().getStatusCode()).isEqualTo(Response.Status.NOT_FOUND.getStatusCode());
	}

	@Test
	void createTask_TaskDataIsCorrectAndProvided_TaskIsCreated() {

		when(taskDAO.insert(any(Task.class))).thenReturn(task);
		final Response response = resourceExtension.target(appURL).request(MediaType.APPLICATION_JSON_TYPE)
				.post(Entity.entity(task, MediaType.APPLICATION_JSON_TYPE));
		assertThat(response.getStatusInfo()).isEqualTo(Response.Status.CREATED);

		verify(taskDAO).insert(taskCaptor.capture());
		Task taskResponse = taskCaptor.getValue();
		SoftAssertions taskAssert = new SoftAssertions();
		taskAssert.assertThat(taskResponse.getId()).isEqualTo(task.getId());
		taskAssert.assertThat(taskResponse.getName()).isEqualTo(task.getName());
		taskAssert.assertThat(taskResponse.getTaskDate()).isEqualTo(task.getTaskDate());
		taskAssert.assertAll();
	}

	@Test
	void createTask_TaskDataIsNotProvided_TaskIsNotCreated() {

		final Response response = resourceExtension.target(appURL).request(MediaType.APPLICATION_JSON_TYPE)
				.post(Entity.entity(task, MediaType.APPLICATION_JSON_TYPE));

		assertThat(response.getStatusInfo()).isEqualTo(Response.Status.NOT_FOUND);
	}

	@Test
	void deleteTaskById_TaskIDIsProvidedAndTaskExist_TaskIsDeleted() {
		Mockito.doReturn(task).when(taskDAO).findById(1);
		final Response response = resourceExtension.target(appURL + 1).request(MediaType.APPLICATION_JSON_TYPE)
				.delete();

		assertThat(response.getStatusInfo()).isEqualTo(Response.Status.OK);
	}

	@Test
	void deleteTaskById__TaskIDIsProvidedAndTaskDoesNotExist_TaskIsNotDeleted() {
		Mockito.doReturn(null).when(taskDAO).findById(1);
		final Response response = resourceExtension.target(appURL + 1).request(MediaType.APPLICATION_JSON_TYPE)
				.delete();

		assertThat(response.getStatusInfo()).isEqualTo(Response.Status.NOT_FOUND);
	}

	@Test
	void updateTask_TaskIDIsProvidedAndTaskExist_TaskIsUpdated() {
		when(taskDAO.findById(1)).thenReturn(task);
		final Response response = resourceExtension.target(appURL + 1).request(MediaType.APPLICATION_JSON_TYPE)
				.put(Entity.entity(task, MediaType.APPLICATION_JSON_TYPE));

		assertThat(response.getStatusInfo()).isEqualTo(Response.Status.OK);
	}

	@Test
	void updateTask_TaskIDIsProvidedAndTaskDoesNotExist_TaskIsNotUpdated() {
		Mockito.doReturn(null).when(taskDAO).findById(1);
		final Response response = resourceExtension.target(appURL + 1).request(MediaType.APPLICATION_JSON_TYPE)
				.put(Entity.entity(task, MediaType.APPLICATION_JSON_TYPE));

		assertThat(response.getStatusInfo()).isEqualTo(Response.Status.NOT_MODIFIED);
	}
}
