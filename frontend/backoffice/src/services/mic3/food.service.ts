import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define Food interface outside the service
export interface Food {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    serving_size: number;
    serving_unit: string;
}

@Injectable({
    providedIn: 'root'
})
export class FoodService {
    private apiUrl = 'http://localhost:8088/mic3/food';

    constructor(private http: HttpClient) { }

    getFoods(): Observable<Food[]> {
        return this.http.get<Food[]>(this.apiUrl);
    }

    getFoodById(id: number): Observable<Food> {
        return this.http.get<Food>(`${this.apiUrl}/${id}`);
    }

    createFood(food: Food): Observable<Food> {
        return this.http.post<Food>(this.apiUrl, food);
    }

    updateFood(id: number, food: Food): Observable<Food> {
        return this.http.put<Food>(`${this.apiUrl}/${id}`, food);
    }

    deleteFood(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    createBulkFoods(foods: Food[]): Observable<Food[]> {
        return this.http.post<Food[]>(`${this.apiUrl}/bulk`, foods);
    }
}