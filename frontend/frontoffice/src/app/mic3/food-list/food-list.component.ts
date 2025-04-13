import { Component, OnInit } from '@angular/core';
import { FoodService, Food } from 'src/service/mic3/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];
  loading = true;
  error: string | null = null;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(): void {
    this.loading = true;
    this.foodService.getAllFoods().subscribe({
      next: (data) => {
        this.foods = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load foods';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
