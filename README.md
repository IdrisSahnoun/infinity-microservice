Infinity Microservices Project
Project Overview
This project is a microservices-based application that implements a comprehensive system for managing various aspects of sports, competitions, and subscriptions. The architecture follows modern microservices patterns and includes multiple specialized services working together.

Architecture
Backend Services
Service Discovery (Eureka Server)
Port: 8761

Role: Service registration and discovery

Location: backend/eureka

API Gateway
Port: 8088

Role: Central entry point for all API requests

Location: backend/gateway

Config Server
Port: 8888

Role: Centralized configuration management

Location: backend/config-server

Microservices
Subscription Service (backend/subscription-service)
Port: 8085

Role: Manages subscription plans, user subscriptions, and payment history

Description: This service handles all aspects of subscription management, including the creation of subscription plans, tracking user subscriptions, managing payment transactions, and ensuring the active status of users.

Competition Service (backend/competition-service)
Port: 8082

Role: Manages competitions and tournaments

Sports Management Service (backend/sports-service)
Port: 8081

Role: Handles sports and sports facilities management

User Service (backend/user-service)
Port: 8083

Role: Manages user accounts and authentication

Additional Services
Various specialized services for different functionalities (backend/microservice2, backend/microservice3, etc.)

Frontend
Location: frontend/

Description: A modern web application for user interaction, which integrates all microservices including subscription management.

Prerequisites
Java 17 or higher

Maven 3.6 or higher

MySQL 8.0 or higher

Docker and Docker Compose

Node.js and npm (for frontend)

Deployment Steps
1. Database Setup
Start MySQL container:

bash
Copier
Modifier
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0
2. Build and Deploy Services
Option 1: Docker Compose Deployment
Navigate to the backend directory:

bash
Copier
Modifier
cd backend
Build and start all services:

bash
Copier
Modifier
docker-compose up --build
Option 2: Manual Deployment
Start Eureka Server:

bash
Copier
Modifier
cd backend/eureka
mvn spring-boot:run
Start Config Server:

bash
Copier
Modifier
cd backend/config-server
mvn spring-boot:run
Start API Gateway:

bash
Copier
Modifier
cd backend/gateway
mvn spring-boot:run
Start Individual Microservices: For each microservice:

bash
Copier
Modifier
cd backend/[microservice-name]
mvn spring-boot:run
3. Frontend Deployment
bash
Copier
Modifier
cd frontend
npm install
npm start
Service Ports
Service	Port
Eureka Server	8761
Config Server	8888
API Gateway	8088
Subscription Service	8086
Competition Service	8082
Sports Management Service	8081
User Service	8083
Microservice2	8084
Microservice3	8090
Microservice4	8085
Development Guidelines
Code Structure
Each microservice follows a standard Spring Boot structure.

Controller layer for API endpoints

Service layer for business logic

Repository layer for data access

Entity classes for data models

Best Practices
Follow RESTful API design principles

Implement proper error handling

Use appropriate HTTP status codes

Document all API endpoints

Write unit and integration tests

Follow microservices design patterns

Testing
Unit Tests
For each microservice:

bash
Copier
Modifier
cd backend/[microservice-name]
mvn test
Integration Tests
Run integration tests:

bash
Copier
Modifier
mvn verify
Monitoring and Logging
Each service exposes health endpoints

Centralized logging through Eureka

API Gateway provides request tracing

Troubleshooting
Service Registration Issues
Check Eureka server status

Verify service configuration

Check network connectivity

Configuration Issues
Verify Config Server is running

Check property files

Validate environment variables

Database Connection Issues
Verify MySQL is running

Check connection strings

Validate credentials

Contributing
Fork the repository

Create a new branch for your feature or fix

Write unit tests for new features

Ensure all tests pass

Submit a pull request
