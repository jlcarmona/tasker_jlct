package com.jlct.taskerapi.resources;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class H2ServerResourceTest {

	private H2ServerResource h2 = null;
	private static final Logger logger = LoggerFactory.getLogger(TaskResource.class);

	@BeforeEach
	void setup() {
		h2 = new H2ServerResource();
		try {
			h2.start();
		} catch (Exception e) {
			logger.error("Error starting H2 server", e);
		}
	}

	@AfterEach
	void tearDown() {
		if (h2.isServerUp())
			try {
				h2.stop();
			} catch (Exception e) {
				logger.error("Error stopping H2 server.", e);
			}
		h2 = null;
	}

	@Test
	void start_ServedConfiguredProperly_ServerIsUp() {
		assertThat(h2.isServerUp()).isEqualTo(true);
	}

	@Test
	void stop_ServedConfiguredProperly_SeverIsDown() {
		try {
			h2.stop();
		} catch (Exception e) {
			logger.error("Error testing H2 server stop", e);
		}
		assertThat(h2.isServerUp()).isEqualTo(false);
	}
}
