package tn.esprit.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("microservice1", r -> r.path("/candidat/**")
						.uri("lb://microservice1"))
				.route("microservice2", r -> r.path("/membre/**")
						.uri("lb://microservice2"))
				.route("microservice3", r -> r.path("/competition/**")
						.uri("lb://microservice3"))
				.route("microservice4", r -> r.path("/plan-entrainement/**")
						.uri("lb://microservice4")) // Ajout du microservice4
				.build();
	}
}

