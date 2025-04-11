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
├── api-gateway/ 
└── eureka-server/ 
```

## **Contributing** 🤝
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a **Pull Request**.


