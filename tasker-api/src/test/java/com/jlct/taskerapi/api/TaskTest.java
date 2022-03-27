package com.jlct.taskerapi.api;

import static io.dropwizard.jackson.Jackson.newObjectMapper;
import static org.assertj.core.api.Assertions.assertThat;

import io.dropwizard.testing.FixtureHelpers;
import java.time.LocalDate;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.ObjectMapper;



class TaskTest {

	private static final ObjectMapper MAPPER = newObjectMapper();
	final Task task = new Task(1, "Task test 1", LocalDate.of(2022, 3, 15));

	@Test
	void seralizesToJSON_ATaskIsSerialized_JSONGeneratedMatchsJSONExpected() throws Exception {
		String taskFromObject = MAPPER.writeValueAsString(task).strip();
		String expectedString = FixtureHelpers.fixture("fixtures/task2.json");
		assertThat(taskFromObject).isEqualTo(expectedString);
	}

	@Test
	public void deseralizesJSON_AJSONIsProvided_TaskCreatedMatchsTaskExisting() throws Exception {
		Task taskFromFixture = MAPPER.readValue(FixtureHelpers.fixture("fixtures/task.json"), Task.class);
		SoftAssertions taskBundle = new SoftAssertions();
		taskBundle.assertThat(taskFromFixture.getId()).isEqualTo(task.getId());
		taskBundle.assertThat(taskFromFixture.getName()).isEqualTo(task.getName());
		taskBundle.assertThat(taskFromFixture.getTaskDate()).isEqualTo(task.getTaskDate());
		taskBundle.assertAll();
	}

}