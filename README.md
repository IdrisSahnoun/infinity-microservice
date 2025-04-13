# Infinity Microservices Project

## Project Overview
This project is a microservices-based application that implements a comprehensive system for managing various aspects of sports and competitions. The architecture follows modern microservices patterns and includes multiple specialized services working together.

## Architecture

### Backend Services

1. **Service Discovery (Eureka Server)**
   - Port: 8761
   - Role: Service registration and discovery
   - Location: `backend/eureka`

2. **API Gateway**
   - Port: 8088
   - Role: Central entry point for all API requests
   - Location: `backend/gateway`

3. **Config Server**
   - Port: 8888
   - Role: Centralized configuration management
   - Location: `backend/config-server`

4. **Microservices**
   - **Competition Service** (`backend/microservice`)
     - Port: 8082
     - Manages competitions and tournaments
   
   - **Sports Management Service** (`backend/microservice1`)
     - Port: 8081
     - Handles sports and sports facilities management
   
   - **User Service** (`backend/user-microservice`)
     - Manages user accounts and authentication
   
   - **Additional Services** (`backend/microservice2`, `backend/microservice3`, `backend/microservice4`, `backend/microservice5`)
     - Various specialized services for different functionalities

### Frontend
- Location: `frontend/`
- Modern web application for user interaction

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- Docker and Docker Compose
- Node.js and npm (for frontend)

## Deployment Steps

### 1. Database Setup
```bash
# Start MySQL container
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0
```

### 2. Build and Deploy Services

#### Option 1: Docker Compose Deployment
```bash
# Navigate to backend directory
cd backend

# Build and start all services
docker-compose up --build
```

#### Option 2: Manual Deployment

1. **Start Eureka Server**
```bash
cd backend/eureka
mvn spring-boot:run
```

2. **Start Config Server**
```bash
cd backend/config-server
mvn spring-boot:run
```

3. **Start API Gateway**
```bash
cd backend/gateway
mvn spring-boot:run
```

4. **Start Individual Microservices**
```bash
# For each microservice
cd backend/[microservice-name]
mvn spring-boot:run
```

### 3. Frontend Deployment
```bash
cd frontend
npm install
npm start
```

## Service Ports

| Service | Port |
|---------|------|
| Eureka Server | 8761 |
| Config Server | 8888 |
| API Gateway | 8088 |
| Competition Service | 8082 |
| Sports Management Service | 8081 |
| Microservice2 | 8082 |
| Microservice3 | 8090 |
| Microservice5 | 8085 |

## Development Guidelines

### Code Structure
- Each microservice follows a standard Spring Boot structure
- Common patterns:
  - Controller layer for API endpoints
  - Service layer for business logic
  - Repository layer for data access
  - Entity classes for data models

### Best Practices
1. Follow RESTful API design principles
2. Implement proper error handling
3. Use appropriate HTTP status codes
4. Document all API endpoints
5. Write unit and integration tests
6. Follow microservices design patterns

## Testing

### Unit Tests
```bash
# For each microservice
cd backend/[microservice-name]
mvn test
```

### Integration Tests
```bash
# Run integration tests
mvn verify
```

## Monitoring and Logging

- Each service exposes health endpoints
- Centralized logging through Eureka
- API Gateway provides request tracing

## Troubleshooting

1. **Service Registration Issues**
   - Check Eureka server status
   - Verify service configuration
   - Check network connectivity

2. **Configuration Issues**
   - Verify Config Server is running
   - Check property files
   - Validate environment variables

3. **Database Connection Issues**
   - Verify MySQL is running
   - Check connection strings
   - Validate credentials

## Contributing