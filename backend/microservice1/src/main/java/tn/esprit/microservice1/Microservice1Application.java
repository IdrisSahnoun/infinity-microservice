package tn.esprit.microservice1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
@EnableScheduling
@EnableAspectJAutoProxy
public class Microservice1Application {
	private static final Logger log = LoggerFactory.getLogger(Microservice1Application.class);

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(Microservice1Application.class);
		Environment env = app.run(args).getEnvironment();
		
		log.info("\n----------------------------------------------------------\n\t" +
				"Application '{}' is running! Access URLs:\n\t" +
				"Local: \t\thttp://localhost:{}\n\t" +
				"Config Server: \t{}\n\t" +
				"Profile(s): \t{}\n----------------------------------------------------------",
				env.getProperty("spring.application.name"),
				env.getProperty("server.port"),
				env.getProperty("spring.cloud.config.uri"),
				env.getActiveProfiles());
	}

}
