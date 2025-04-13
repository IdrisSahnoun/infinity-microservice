// src/app/services/food.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Food {
  id?: number;
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  serving_size: number;
  serving_unit: string;
}

export interface ImcRequest {
  height: number;  // in meters
  weight: number;  // in kg
  age: number;
  gender: string;  // "male" or "female"
  activityLevel: string;  // "sedentary", "light", "moderate", "active", "very_active"
}

export interface DietRecommendation {
  bmi: number;
  bmiCategory: string;
  dailyCalories: number;
  recommendedFoods: Food[];
  totalCaloriesInMeal: number;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseUrl = 'http://localhost:8088/mic3/food';

  constructor(private http: HttpClient) { }

  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.baseUrl);
  }

  getDietRecommendation(request: ImcRequest): Observable<DietRecommendation> {
    return this.http.post<DietRecommendation>(`${this.baseUrl}/diet-recommendation`, request);
  }
}
