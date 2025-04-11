# Competition Management Microservice

## Description
This microservice is part of a microservices architecture and is responsible for managing competitions. It provides comprehensive functionality for creating, modifying, deleting, and viewing competitions.

## Main Features

### 1. Competition Management
- Create new competitions
- View existing competitions
- Modify competition details
- Delete competitions
- Search competitions by ID

### 2. Competition Structure
Each competition contains the following information:
- Competition name
- Detailed description
- Start date and time
- End date and time
- Location

## Configuration

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- Config Server (port 8888)
- Eureka Server (port 8761)

### Service Configuration
The service is configured to connect to the Config Server and Eureka.

Main configuration file: `application.properties`
```properties
spring.application.name=microservice

#configServer
spring.cloud.config.enabled=true
spring.config.import=optional:configserver:http://localhost:8888

management.endpoints.web.exposure.include=refresh,health,info
```

## API Endpoints

### Competition Management
- `GET /api`
  - Returns the list of all competitions
  - Example response:
    ```json
    [
        {
            "id": 1,
            "name": "Tennis Tournament",
            "description": "Annual tennis tournament",
            "startDate": "2024-05-01T10:00:00",
            "endDate": "2024-05-03T18:00:00",
            "location": "Olympic Stadium"
        }
    ]
    ```

- `GET /api/{id}`
  - Returns details of a specific competition
  - Parameter: competition ID

- `POST /api/create`
  - Creates a new competition
  - Request body:
    ```json
    {
        "name": "Tennis Tournament",
        "description": "Annual tennis tournament",
        "startDate": "2024-05-01T10:00:00",
        "endDate": "2024-05-03T18:00:00",
        "location": "Olympic Stadium"
    }
    ```

- `PUT /api/{id}`
  - Updates an existing competition
  - Parameter: competition ID
  - Request body: updated Competition object

- `DELETE /api/{id}`
  - Deletes a competition
  - Parameter: competition ID

- `GET /api/test`
  - Test endpoint
  - Returns "Competition API is working!"

## Installation and Execution

1. Clone the project:
```bash
git clone [PROJECT_URL]
cd backend/microservice
```

2. Install dependencies:
```bash
mvn clean install
```

3. Start the service:
```bash
mvn spring-boot:run
```

## Technical Architecture

- **Framework**: Spring Boot
- **Database**: MySQL
- **Service Discovery**: Eureka
- **Configuration**: Spring Cloud Config
- **API Documentation**: Swagger (to be implemented)

## Main Dependencies

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

## Testing

To run tests:
```bash
mvn test
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
