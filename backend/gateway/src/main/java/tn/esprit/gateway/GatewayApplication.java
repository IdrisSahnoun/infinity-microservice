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
				.route("microservice1", r-> r.path("/api/salles/**").uri("lb://microservice1"))
				.route("microservice5", r-> r.path("/abonnements/**").uri("lb://microservice5"))
				.route("microservice2", r-> r.path("/membre/**").uri("lb://microservice2"))
				.route("microservice", r-> r.path("/competition/**").uri("lb://microservice"))
				.route("microservice4", r -> r.path("/plans/**").uri("lb://microservice4"))
				.route("microservice3", r -> r.path("/mic3/**").uri("lb://microservice3"))
				.route("user-microservice", r -> r.path("/auth/**").uri("lb://user-microservice"))
				.build();
	}
}

