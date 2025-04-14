package tn.esprit.microservice3.Rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice3.Model.DietRecommendation;
import tn.esprit.microservice3.Model.Food;
import tn.esprit.microservice3.Model.ImcRequest;
import tn.esprit.microservice3.Service.FoodService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mic3/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping
    public ResponseEntity<List<Food>> getAllFoods() {
        List<Food> foods = foodService.getAllFoods();
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id) {
        Optional<Food> food = foodService.getFoodById(id);
        return food.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        Food savedFood = foodService.saveFood(food);
        return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody Food food) {
        Optional<Food> existingFood = foodService.getFoodById(id);
        if (existingFood.isPresent()) {
            food.setId(id);
            Food updatedFood = foodService.updateFood(food);
            return new ResponseEntity<>(updatedFood, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        Optional<Food> food = foodService.getFoodById(id);
        if (food.isPresent()) {
            foodService.deleteFood(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/diet-recommendation")
    public ResponseEntity<DietRecommendation> getDietRecommendation(@RequestBody ImcRequest request) {
        DietRecommendation recommendation = foodService.getDietRecommendation(request);
        return new ResponseEntity<>(recommendation, HttpStatus.OK);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Food>> createFoods(@RequestBody List<Food> foods) {
        List<Food> savedFoods = foodService.saveAllFoods(foods);
        return new ResponseEntity<>(savedFoods, HttpStatus.CREATED);
    }
}