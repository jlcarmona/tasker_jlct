package com.jlct.taskerapi.resources;

import org.h2.tools.Server;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.dropwizard.lifecycle.Managed;

public class H2ServerResource implements Managed {

	private Server tcpServer = null;
	private Server webConsole = null;
	private static final Logger logger = LoggerFactory.getLogger(TaskResource.class);

	public H2ServerResource() {
		super();
	}

	@Override
	public void start() throws Exception {
		logger.info("Starting H2 server");
		tcpServer = Server.createTcpServer("-tcpAllowOthers", "-tcpPort", "20020");
		webConsole = Server.createWebServer("-webPort", "20010");
		tcpServer.start();
		webConsole.start();
		logger.info("H2 server started");
	}

	@Override
	public void stop() throws Exception {
		logger.info("Stopping H2 server");
		tcpServer.stop();
		webConsole.stop();
		logger.info("H2 server stopped");
	}

	public boolean isServerUp() {
		return tcpServer.isRunning(false);
	}
}
