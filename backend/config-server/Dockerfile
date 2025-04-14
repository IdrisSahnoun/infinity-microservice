FROM openjdk:17-jdk-slim

# Set a working directory (optional but good practice)
WORKDIR /app

# Copy the JAR file (using wildcard to avoid hardcoding the name)
COPY target/*.jar config-server.jar

# Document the port (optional, since docker-compose.yml already maps it)
EXPOSE 8888

# Run the application
ENTRYPOINT ["java", "-jar", "config-server.jar"]
