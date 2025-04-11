# Food Service Microservice

## Overview
Spring Boot microservice for managing food nutrition data and generating diet recommendations.

## Features
- 🍎 Food CRUD operations
- 🧮 BMI calculation
- 💪 Macronutrient tracking
- 📊 Diet recommendations
- 🚀 Bulk food import

## API Endpoints

### Food Management
| Method | Path               | Description                |
|--------|--------------------|----------------------------|
| POST   | `/food`            | Create single food         |
| POST   | `/food/bulk`       | Bulk create foods          |
| GET    | `/food`            | List all foods             |
| GET    | `/food/{id}`       | Get food by ID             |
| PUT    | `/food/{id}`       | Update food                |
| DELETE | `/food/{id}`       | Delete food                |


## License
MIT
