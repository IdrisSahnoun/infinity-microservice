package tn.esprit.microservice3.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DietRecommendation {
    private double bmi;
    private String bmiCategory;
    private double dailyCalories;
    private List<Food> recommendedFoods;
    private double totalCaloriesInMeal;
}