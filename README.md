# Competition Management System

This project is a **Competition Management System** built using **Spring Boot** for the backend and **Angular** for the frontend. It allows users to create, update, delete, and view competitions.

## Features

- **Backend**:
  - CRUD operations for managing competitions.
  - RESTful API endpoints for integration.
  - Database integration with MySQL.
  - Eureka client for service discovery.

- **Frontend**:
  - Angular components for creating, listing, and managing competitions.
  - Integration with the backend API.

## Technologies Used

### Backend
- **Java 17**
- **Spring Boot 3.4.2**
  - Spring Data JPA
  - Spring Web
  - Spring Cloud Netflix Eureka Client
- **MySQL** (Database)
- **Maven** (Build tool)
- **Lombok** (For reducing boilerplate code)

### Frontend
- **Angular**
- **TypeScript**
- **Node.js** (For package management)

## Project Structure

### Backend
- `src/main/java/tn/esprit/microservice/entities/Competition.java`: Entity class for competitions.
- `src/main/java/tn/esprit/microservice/controllers/CompetitionController.java`: REST controller for competition endpoints.
- `src/main/java/tn/esprit/microservice/services/ICompetitionService.java`: Service interface for business logic.
- `src/main/resources/application.properties`: Configuration file for database and server settings.

### Frontend
- `src/app/components/quiz-create`: Component for creating competitions.
- `src/app/components/quiz-list`: Component for listing competitions.
- `src/app/services/quiz.service.ts`: Service for API integration.

## How to Run

### Backend
1. Clone the repository.
2. Navigate to the `backend/microservice` directory.
3. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/competitions
   spring.datasource.username=root
   spring.datasource.password=yourpassword
Run the application:
mvn spring-boot:run
Frontend
1.Navigate to the frontend directory.
2.Install dependencies:
npm install
3.Run the Angular application:
ng serve
API Endpoints
  Competition Endpoints
GET /api: Get all competitions.
GET /api/{id}: Get a competition by ID.
POST /api/create: Create a new competition.
PUT /api/{id}: Update a competition.
DELETE /api/{id}: Delete a competition.

Testing

Use Postman to test the backend API.
Example for creating a competition:
    URL: http://localhost:8082/api/create
    Method: POST
    Body:
    {
        "name": "Spring Boot Competition",
        "description": "A competition to test Spring Boot skills",
        "startDate": "2025-03-01T10:00:00",
        "endDate": "2025-03-05T18:00:00",
        "location": "Online"
    }
    
Future Enhancements
Add user authentication and authorization.
Implement competition registration and participation features.
Add reporting and analytics for competitions.
