package com.jlct.taskerapi.api;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "task")
public class Task {

	@JsonProperty
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotNull
	@JsonProperty
	private String name;

	@NotNull
	@JsonProperty
	@Column(name = "task_date", columnDefinition = "DATE DEFAULT CURRENT_DATE")
	private LocalDate taskDate;

	public Task() {}

	public Task(Integer id, String name, LocalDate taskDate) {
		this.id = id;
		this.name = name;
		this.taskDate = taskDate;
	}

	@JsonProperty
	public Integer getId() {
		return id;
	}

	@JsonProperty
	public void setId(Integer id) {
		this.id = id;
	}

	@JsonProperty
	public String getName() {
		return name;
	}

	@JsonProperty
	public void setName(String name) {
		this.name = name;
	}

	@JsonProperty
	public LocalDate getTaskDate() {
		return taskDate;
	}

	@JsonProperty
	public void setTaskDate(LocalDate taskDate) {
		this.taskDate = taskDate;
	}

}
