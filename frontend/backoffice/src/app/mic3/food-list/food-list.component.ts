import { Component, OnInit } from '@angular/core';
import { FoodService, Food } from 'services/mic3/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];
  loading = false;
  error: string | null = null;

  // Modal control
  showModal = false;
  showDeleteModal = false;
  editMode = false;
  currentFood: Food = this.initializeFood();

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(): void {
    this.loading = true;
    this.foodService.getFoods().subscribe({
      next: (data) => {
        this.foods = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load foods: ' + err.message;
        this.loading = false;
      }
    });
  }

  initializeFood(): Food {
    return {
      id: null as any, // Either null or remove from the object entirely
      name: '',
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      serving_size: 0,
      serving_unit: ''
    };
  }

  openCreateDialog(): void {
    this.editMode = false;
    this.currentFood = this.initializeFood();
    this.showModal = true;
  }

  openEditDialog(food: Food): void {
    this.editMode = true;
    this.currentFood = { ...food };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  confirmDelete(food: Food): void {
    this.currentFood = food;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  saveFood(): void {
    if (this.editMode) {
      this.foodService.updateFood(this.currentFood.id, this.currentFood).subscribe({
        next: (updatedFood) => {
          const index = this.foods.findIndex(f => f.id === updatedFood.id);
          if (index !== -1) {
            this.foods[index] = updatedFood;
          }
          this.closeModal();
        },
        error: (err) => {
          this.error = 'Failed to update food: ' + err.message;
        }
      });
    } else {
      this.foodService.createFood(this.currentFood).subscribe({
        next: (newFood) => {
          this.foods.push(newFood);
          this.closeModal();
        },
        error: (err) => {
          this.error = 'Failed to create food: ' + (err.error?.message || err.message || 'Unknown error');
        }
      });
    }
  }

  deleteFood(): void {
    if (this.currentFood && this.currentFood.id) {
      this.foodService.deleteFood(this.currentFood.id).subscribe({
        next: () => {
          this.foods = this.foods.filter(f => f.id !== this.currentFood.id);
          this.closeDeleteModal();
        },
        error: (err) => {
          this.error = 'Failed to delete food: ' + err.message;
          this.closeDeleteModal();
        }
      });
    }
  }
}