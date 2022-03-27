package com.jlct.taskerapi;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

import java.io.FileNotFoundException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.dropwizard.configuration.ResourceConfigurationSourceProvider;
import io.dropwizard.testing.DropwizardTestSupport;
import io.dropwizard.testing.junit5.DropwizardExtensionsSupport;

@ExtendWith(DropwizardExtensionsSupport.class)
class TaskerAPIApplicationTest {

	@Test
	void startApplication_ConfigurationFileDoesNotExist_ErrorIsThrown() throws Exception {

		DropwizardTestSupport<TaskerAPIConfiguration> dropWizardTestSupport = null;
		try {
			dropWizardTestSupport = new DropwizardTestSupport<>(TaskerAPIApplication.class, "no-config.yml");
			assertThatExceptionOfType(FileNotFoundException.class).isThrownBy(dropWizardTestSupport::before)
					.withMessage("File no-config.yml not found");
		} finally {
			dropWizardTestSupport.after();
		}
	}

	@Test
	void startApplication_ConfigurationFileExist_ApplicationRunsProperly() throws Exception {
		DropwizardTestSupport<TaskerAPIConfiguration> dropWizardTestSupport = null;
		try {
			dropWizardTestSupport = new DropwizardTestSupport<>(TaskerAPIApplication.class, "config_test.yml",
					new ResourceConfigurationSourceProvider());
			dropWizardTestSupport.before();
			assertThat(dropWizardTestSupport.getEnvironment().getName()).isEqualTo("tasker-api");
			dropWizardTestSupport.after();
		} finally {
			dropWizardTestSupport.after();
		}
	}

}
