package com.jlct.taskerapi.resources;

import java.net.URI;
import java.net.URISyntaxException;

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
import javax.ws.rs.core.Response.Status;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jlct.taskerapi.api.Task;
import com.jlct.taskerapi.db.TaskDAO;

import io.dropwizard.hibernate.UnitOfWork;

@Path("/task")
@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class TaskResource {

	private final TaskDAO taskDAO;
	private static final Logger logger = LoggerFactory.getLogger(TaskResource.class);

	public TaskResource(TaskDAO taskDAO) {
		this.taskDAO = taskDAO;
	}

	@GET
	@UnitOfWork
	public Response getTasks() {
		logger.info("Searching all tasks ...");
		return Response.ok(taskDAO.findAll()).build();
	}

	@GET
	@UnitOfWork
	@Path("/{id}")
	public Response getTaskById(@PathParam("id") Integer id) {
		logger.info("Searching task with id: " + id);
		Task task = taskDAO.findById(id);
		if (task != null)
			return Response.ok(task).build();
		else
			return Response.status(Status.NOT_FOUND).build();
	}

	@POST
	@UnitOfWork
	public Response createTask(Task newTask) throws URISyntaxException {
		logger.info("Creating task ...");
		Task task = taskDAO.insert(newTask);
		if (task != null) {
			return Response.created(new URI("/task/" + task.getId())).build();
		} else
			return Response.status(Status.NOT_FOUND).build();
	}

	@PUT
	@UnitOfWork
	@Path("/{id}")
	public Response updateTaskById(@PathParam("id") Integer id, Task task) {
		logger.info("Updating task with id: " + id);
		Task taskFromDB = taskDAO.findById(id);
		if (taskFromDB != null) {
			taskFromDB.setName(task.getName());
			taskFromDB.setTaskDate(task.getTaskDate());
			taskDAO.update(taskFromDB);
			return Response.ok(taskFromDB).build();
		} else
			return Response.status(Status.NOT_MODIFIED).build();
	}

	@DELETE
	@UnitOfWork
	@Path("/{id}")
	public Response deleteTaskById(@PathParam("id") Integer id) {
		logger.info("Deleting task with id: " + id);
		Task task = taskDAO.findById(id);
		if (task != null) {
			taskDAO.delete(taskDAO.findById(id));
			return Response.ok().build();
		} else
			return Response.status(Status.NOT_FOUND).build();
	}

}