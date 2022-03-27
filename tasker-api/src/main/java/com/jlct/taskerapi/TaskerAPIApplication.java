package com.jlct.taskerapi;

import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;

import org.eclipse.jetty.servlets.CrossOriginFilter;

import com.jlct.taskerapi.api.Task;
import com.jlct.taskerapi.db.TaskDAO;
import com.jlct.taskerapi.resources.H2ServerResource;
import com.jlct.taskerapi.resources.TaskResource;

import io.dropwizard.Application;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.jersey.jackson.JsonProcessingExceptionMapper;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class TaskerAPIApplication extends Application<TaskerAPIConfiguration> {

	public static void main(final String[] args) throws Exception {
		new TaskerAPIApplication().run(args);
	}

	@Override
	public String getName() {
		return "tasker-api";
	}

	@Override
	public void initialize(final Bootstrap<TaskerAPIConfiguration> bootstrap) {
		bootstrap.addBundle(hibernateBundle);
	}

	// Hibernate bundle used in the persistence layer
	private final HibernateBundle<TaskerAPIConfiguration> hibernateBundle = new HibernateBundle<TaskerAPIConfiguration>(
			Task.class) {
		@Override
		public DataSourceFactory getDataSourceFactory(TaskerAPIConfiguration configuration) {
			return configuration.getDataSourceFactory();
		}
	};

	@Override
	public void run(final TaskerAPIConfiguration configuration, final Environment environment) {

		final TaskDAO taskDAO = new TaskDAO(hibernateBundle.getSessionFactory());

		final TaskResource resource = new TaskResource(taskDAO);
		environment.jersey().register(resource);
		environment.jersey().register(new JsonProcessingExceptionMapper(true));

		// Manages H2 in-memory instance
		H2ServerResource h2serverResource = new H2ServerResource();
		environment.lifecycle().manage(h2serverResource);

		// Enable CORS traffic
		enableCORSSupport(environment);
	}

	private void enableCORSSupport(Environment environment) {
		// Enable CORS headers
		final FilterRegistration.Dynamic cors = environment.servlets().addFilter("CORS", CrossOriginFilter.class);

		// Configure CORS parameters
		cors.setInitParameter("allowedOrigins", "*");
		cors.setInitParameter("allowedHeaders", "X-Requested-With,Content-Type,Accept,Origin");
		cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");

		// Add URL mapping
		cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");
	}
}
