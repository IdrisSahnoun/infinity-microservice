# 🥗 Nutrition and Diet Recommendation Microservice

## 📋 Overview
This microservice (microservice3) is part of the Infinity Microservice architecture, focusing on nutritional management and personalized diet recommendations. It provides APIs for managing food data and generating dietary recommendations based on user metrics (BMI, calorie needs, etc.).

## ✨ Features
- 🍽️ Food database management (CRUD operations)
- 📊 BMI (Body Mass Index) calculation
- 🔥 Personalized daily calorie requirement calculation
- 🍳 Diet recommendations based on user profiles
- 🧮 Food suggestion algorithm based on nutritional needs

## 🛠️ Technology Stack
- **Backend**: ☕ Java with Spring Boot
- **Database**: 💾 JPA/Hibernate with relational database
- **API**: 🌐 RESTful endpoints
- **Dependencies**: 📦 Lombok for reduced boilerplate code

## 📝 Data Models
- **Food**: 🍎 Nutritional information for food items (calories, macronutrients, serving sizes)
- **DietRecommendation**: 📋 Complete diet plan with BMI metrics and food suggestions
- **ImcRequest**: 📝 Input model containing user metrics (height, weight, age, gender, activity level)

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/mic3/food` | GET | 📋 Retrieve all food items |
| `/mic3/food/{id}` | GET | 🔍 Get food by ID |
| `/mic3/food` | POST | ➕ Create a new food item |
| `/mic3/food/{id}` | PUT | 🔄 Update an existing food item |
| `/mic3/food/{id}` | DELETE | 🗑️ Delete a food item |
| `/mic3/food/diet-recommendation` | POST | 💪 Generate personalized diet recommendations |
| `/mic3/food/bulk` | POST | 📚 Bulk create multiple food items |

## 🧠 Core Algorithms
1. **BMI Calculation**: 📏 `weight / (height * height)`
2. **BMI Categorization**: 📊 Underweight, Normal weight, Overweight, Obese
3. **Daily Calorie Requirement**: 🔥 Harris-Benedict formula with activity level multipliers
4. **Food Suggestion Algorithm**: 🍽️ Selects appropriate foods to match caloric targets

## ⚙️ Setup & Installation

1. Clone the repository:
   ```
   git clone https://github.com/IdrisSahnoun/infinity-microservice.git
   ```

2. Checkout the microservice3-ayoub branch:
   ```
   git checkout microservice3-ayoub
   ```

3. Build the project:
   ```
   ./mvnw clean install
   ```

4. Run the application:
   ```
   ./mvnw spring-boot:run
   ```

## 🔧 Configuration
The application uses standard Spring Boot configuration in `application.properties` or `application.yml`. Ensure database connection details are properly configured.

## 🚀 Example Usage

![image](https://github.com/user-attachments/assets/ed4987b6-484c-44fd-bba0-69cbb55f9732)


### Calculate BMI and Get Diet Recommendations
```
POST /mic3/food/diet-recommendation
{
  "height": 1.75,
  "weight": 70.0,
  "age": 30,
  "gender": "male",
  "activityLevel": "moderate"
}
```

Response:
```json
{
  "bmi": 22.86,
  "bmiCategory": "Normal weight",
  "dailyCalories": 2650.25,
  "recommendedFoods": [
    {
      "id": 1,
      "name": "Chicken Breast",
      "calories": 165.0,
      "protein": 31.0,
      "carbohydrates": 0.0,
      "fat": 3.6,
      "serving_size": 100.0,
      "serving_unit": "g"
    },
    ...
  ],
  "totalCaloriesInMeal": 2200.75
}
```

## ✍️ Author
- Ayoub Touti (@touti-ayoub)
- Created: 2023-04-14

## 📜 License
MIT
