# Competition Microservice 🏆

This microservice is part of the **Infinity Gym** project and is responsible for managing gym competitions. It provides RESTful APIs for creating, retrieving, updating, and deleting competition data.

## Features ✨
- **CRUD Operations**: Create, Read, Update, and Delete competitions.
- **Search Competitions**: Filter competitions by name, date range, or location.
- **API Health Check**: Test endpoint to verify the service is running.

## Technologies Used 🛠️
- **Framework**: Spring Boot
- **Database**: MySQL (or any preferred relational database)
- **API Documentation**: Swagger/OpenAPI
- **Dependency Injection**: Spring Framework with Lombok
- **Build Tool**: Maven

## Endpoints 📚
| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | `/api`                    | Get all competitions                 |
| GET    | `/api/{id}`               | Get a competition by ID              |
| POST   | `/api/create`             | Create a new competition             |
| PUT    | `/api/{id}`               | Update an existing competition       |
| DELETE | `/api/{id}`               | Delete a competition                 |
| GET    | `/api/test`               | Test the API                         |
| GET    | `/api/search`             | Search competitions by filters       |

## Installation & Setup 🚀
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/competition-microservice.git
2.Navigate to the project directory:
 cd competition-microservice
3.Configure the database in application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/competition_db
    username: your-username
    password: your-password
4.Build and run the application:
   mvn clean install
   mvn spring-boot:run
   
API Documentation 📖   
Swagger documentation is available at:
http://localhost:8080/swagger-ui.html
Contributing 🤝
1.Fork the repository.
2.Create a new branch (git checkout -b feature/your-feature).
3.Commit your changes (git commit -m 'Add some feature').
4.Push to the branch (git push origin feature/your-feature).
5.Open a Pull Request.
License 📜
This project is licensed under the MIT License. See the LICENSE file for details.
