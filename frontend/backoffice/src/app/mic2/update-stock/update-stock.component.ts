import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

interface StockItem {
  id: number;
  itemCode: string;
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  reorderThreshold: number;
  supplierInfo: string;
}

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {
  stockForm!: FormGroup;
  itemId!: number;
  isLoading = true;
  isSubmitting = false;
  submitted = false;
  errorMessage: string | null = null;
  notFound = false;

  constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.initForm();

    // Get the item ID from route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.itemId = +id;
        this.loadStockItem(this.itemId);
      } else {
        this.notFound = true;
        this.isLoading = false;
        this.errorMessage = 'No item ID provided';
      }
    });
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

  loadStockItem(id: number): void {
    this.isLoading = true;
    this.http.get<StockItem>(`http://localhost:8088/stock/${id}`)
        .subscribe({
          next: (data) => {
            // Populate the form with the item data
            this.stockForm.patchValue({
              itemCode: data.itemCode,
              itemName: data.itemName,
              description: data.description || '',
              quantity: data.quantity,
              price: data.price,
              reorderThreshold: data.reorderThreshold,
              supplierInfo: data.supplierInfo || ''
            });
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading stock item:', error);
            this.isLoading = false;

            if (error.status === 404) {
              this.notFound = true;
              this.errorMessage = `Stock item with ID ${id} not found`;
            } else {
              this.errorMessage = `Failed to load stock item details: ${error.message}`;
            }
          }
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
    const stockItem: any = {
      ...this.stockForm.value,
      id: this.itemId
    };

    this.http.put(`http://localhost:8088/stock/${this.itemId}`, stockItem)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            alert('Stock item updated successfully!');
            this.router.navigate(['/stock/list']);
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Error updating stock item:', error);

            if (error.status === 400) {
              this.errorMessage = 'Invalid data. Please check your input.';
            } else if (error.status === 404) {
              this.errorMessage = `Stock item with ID ${this.itemId} not found`;
            } else if (error.status === 409) {
              this.errorMessage = 'Item code already exists. Please use another code.';
            } else {
              this.errorMessage = 'Failed to update stock item. Please try again.';
            }
          }
        });
  }

  cancel(): void {
    this.router.navigate(['/stock/list']);
  }
}