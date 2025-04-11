package tn.esprit.microservice3.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice3.Model.DietRecommendation;
import tn.esprit.microservice3.Model.Food;
import tn.esprit.microservice3.Model.ImcRequest;
import tn.esprit.microservice3.Repo.IFeedRepo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodService {

    @Autowired
    private IFeedRepo foodRepo;

    // Get all foods
    public List<Food> getAllFoods() {
        return foodRepo.findAll();
    }

    // Get food by ID
    public Optional<Food> getFoodById(Long id) {
        return foodRepo.findById(id);
    }

    // Create new food
    public Food saveFood(Food food) {
        return foodRepo.save(food);
    }

    // Update food
    public Food updateFood(Food food) {
        return foodRepo.save(food);
    }

    // Delete food
    public void deleteFood(Long id) {
        foodRepo.deleteById(id);
    }

    public List<Food> saveAllFoods(List<Food> foods) {
        return foodRepo.saveAll(foods);
    }

    public double calculateBMI(double height, double weight) {
        return weight / (height * height);
    }

    public String getBMICategory(double bmi) {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal weight";
        if (bmi < 30) return "Overweight";
        return "Obese";
    }

    public double calculateDailyCalories(ImcRequest request) {
        // Harris-Benedict formula
        double bmr;
        if ("male".equalsIgnoreCase(request.getGender())) {
            bmr = 88.362 + (13.397 * request.getWeight()) + (4.799 * request.getHeight() * 100) - (5.677 * request.getAge());
        } else {
            bmr = 447.593 + (9.247 * request.getWeight()) + (3.098 * request.getHeight() * 100) - (4.330 * request.getAge());
        }

        // Apply activity multiplier
        double activityMultiplier;
        switch (request.getActivityLevel().toLowerCase()) {
            case "sedentary": activityMultiplier = 1.2; break;
            case "light": activityMultiplier = 1.375; break;
            case "moderate": activityMultiplier = 1.55; break;
            case "active": activityMultiplier = 1.725; break;
            case "very_active": activityMultiplier = 1.9; break;
            default: activityMultiplier = 1.2;
        }

        return bmr * activityMultiplier;
    }

    public List<Food> suggestFoods(double targetCalories) {
        List<Food> allFoods = getAllFoods();
        // Filter out foods with null calories
        allFoods = allFoods.stream()
                .filter(food -> food.getCalories() != null)
                .collect(Collectors.toList());

        List<Food> recommended = new ArrayList<>();
        double currentCalories = 0;

        // Simple algorithm to suggest foods reaching target calories
        Collections.shuffle(allFoods); // Add variety

        for (Food food : allFoods) {
            if (currentCalories < targetCalories) {
                recommended.add(food);
                currentCalories += food.getCalories();
            } else {
                break;
            }
        }

        return recommended;
    }

    public DietRecommendation getDietRecommendation(ImcRequest request) {
        double bmi = calculateBMI(request.getHeight(), request.getWeight());
        String category = getBMICategory(bmi);
        double dailyCalories = calculateDailyCalories(request);

        List<Food> recommendedFoods = suggestFoods(dailyCalories);
        double totalMealCalories = recommendedFoods.stream()
                .mapToDouble(Food::getCalories)
                .sum();

        return new DietRecommendation(bmi, category, dailyCalories,
                recommendedFoods, totalMealCalories);
    }
}