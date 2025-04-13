// src/app/mic3/bmi-calculator/bmi-calculator.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService, ImcRequest, DietRecommendation } from 'src/service/mic3/food.service';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css']
})
export class BmiCalculatorComponent {
  calculatorForm: FormGroup;
  loading = false;
  submitted = false;
  error: string | null = null;
  recommendation: DietRecommendation | null = null;

  activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
    { value: 'light', label: 'Light (exercise 1-3 times/week)' },
    { value: 'moderate', label: 'Moderate (exercise 3-5 times/week)' },
    { value: 'active', label: 'Active (exercise 6-7 times/week)' },
    { value: 'very_active', label: 'Very Active (hard exercise & physical job)' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService
  ) {
    this.calculatorForm = this.formBuilder.group({
      height: ['', [Validators.required, Validators.min(0.5), Validators.max(2.5)]],
      weight: ['', [Validators.required, Validators.min(20), Validators.max(300)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: ['male', Validators.required],
      activityLevel: ['sedentary', Validators.required]
    });
  }

  get f() { return this.calculatorForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.calculatorForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const request: ImcRequest = {
      height: this.f['height'].value,
      weight: this.f['weight'].value,
      age: this.f['age'].value,
      gender: this.f['gender'].value,
      activityLevel: this.f['activityLevel'].value
    };

    this.foodService.getDietRecommendation(request).subscribe({
      next: (data) => {
        this.recommendation = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to calculate diet recommendation';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
