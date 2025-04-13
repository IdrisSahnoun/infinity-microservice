package tn.esprit.microservice3.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImcRequest {
    private double height; // in meters
    private double weight; // in kg
    private int age;
    private String gender; // "male" or "female"
    private String activityLevel; // "sedentary", "light", "moderate", "active", "very_active"
}