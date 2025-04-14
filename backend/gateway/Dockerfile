FROM openjdk:17-jdk-slim

# Set a working directory (optional but good practice)
WORKDIR /app

# Copy the JAR file (using wildcard to avoid hardcoding the name)
COPY target/*.jar gateway.jar

# Document the port (optional, since docker-compose.yml already maps it)
EXPOSE 8088

# Run the application
ENTRYPOINT ["java", "-jar", "gateway.jar"]
