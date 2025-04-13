import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface StockItem {
  itemCode: string;
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  reorderThreshold: number;
  supplierInfo: string;
}

@Component({
  selector: 'app-add-stock-item',
  templateUrl: './add-stock-item.component.html',
  styleUrls: ['./add-stock-item.component.scss']
})
export class AddStockItemComponent implements OnInit {
  stockForm!: FormGroup;
  isSubmitting = false;
  submitted = false;
  errorMessage: string | null = null;

  constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.stockForm = this.fb.group({
      itemCode: ['', [Validators.required, Validators.maxLength(20)]],
      itemName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      reorderThreshold: [5, [Validators.required, Validators.min(0)]],
      supplierInfo: ['', [Validators.maxLength(200)]]
    });
  }

  // Getter for form controls to simplify access in the template
  get f() {
    return this.stockForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.stockForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const stockItem: StockItem = this.stockForm.value;

    this.http.post('http://localhost:8088/stock', stockItem)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            // Show success notification
            alert('Stock item added successfully!');
            // Navigate back to stock list
            this.router.navigate(['/stock/list']);
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Error adding stock item:', error);
            this.errorMessage = 'Failed to add stock item. Please try again.';

            if (error.status === 400) {
              this.errorMessage = 'Invalid data. Please check your input.';
            } else if (error.status === 409) {
              this.errorMessage = 'Item code already exists. Please use another code.';
            }
          }
        });
  }

  cancel(): void {
    this.router.navigate(['/stock/list']);
  }

  resetForm(): void {
    this.submitted = false;
    this.errorMessage = null;
    this.stockForm.reset({
      quantity: 0,
      price: 0,
      reorderThreshold: 5
    });
  }
}