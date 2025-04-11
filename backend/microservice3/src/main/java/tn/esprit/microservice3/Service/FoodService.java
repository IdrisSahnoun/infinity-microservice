package tn.esprit.microservice3.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice3.Model.Food;
import tn.esprit.microservice3.Repo.IFeedRepo;

import java.util.List;
import java.util.Optional;

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
}