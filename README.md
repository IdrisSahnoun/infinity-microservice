# **Infinity Gym** 🏋️‍♂️

A **Spring Boot** microservices-based gym management system designed to handle competitions, training plans, subscriptions, members, gym locations, and nutrition tracking.

## **Project Overview** 📋
Infinity Gym is a modular system built using **microservices architecture**, where each service handles a specific domain:
1. **Competition** – Manage gym challenges and tournaments.
2. **Plan d'entrainement** – Create and assign workout plans.
3. **Abonnements** – Handle membership subscriptions and payments.
4. **Membre** – Manage member profiles and data.
5. **Salles** – Track gym locations and facilities.
6. **Nutrition** – Provide diet plans and meal tracking.

## **Technologies Used** 🛠️
- **Backend:** Spring Boot, Spring Cloud, Spring Data JPA
- **Database:** MySQL / PostgreSQL (or any preferred DB)
- **API Documentation:** Swagger/OpenAPI
- **Service Discovery:** Eureka Server
- **API Gateway:** Spring Cloud Gateway
- **Communication:** REST APIs, Feign Client
- **Authentication:** Spring Security & JWT (if applicable)

## **Team Members** 👥
| Name | Role | Microservice |
|------|------|--------------|
| [Idris] | Backend Developer | Competition |
| [Nessim] | Backend Developer | Plan d'entrainement |
| [Hedy] | Backend Developer | Abonnements |
| [Mahdi] | Backend Developer | Membre |
| [Taha] | Backend Developer | Salles |
| [Ayoub] | Backend Developer | Nutrition |

## **Getting Started** 🚀
### **Prerequisites**
- Java 17+
- Maven
- Docker
- MySQL

### **Installation & Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/IdrisSahnoun/infinity-microservice.git
   ```
2. Navigate to each microservice and run:
   ```bash
   mvn clean install
   ```
3. Configure databases in `application.yml` for each service.
4. Run the **Eureka Server** first , then other services.

### **Running the Project**
- Run each microservice individually, or use:
  ```bash
  docker-compose up --build
  ```
- Access APIs via the API Gateway .

## **API Documentation** 📚
Each microservice has its own Swagger docs:
- Access via: `http://localhost:<port>/swagger-ui.html`

## **Project Structure** 📂
```
infinity-gym/
├── competition-service/
├── trainingplan-service/
├── subscription-service/
├── member-service/
├── gym-service/
├── nutrition-service/
├── api-gateway/ (if applicable)
└── eureka-server/ (if applicable)
```

## **Contributing** 🤝
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a **Pull Request**.

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

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.


