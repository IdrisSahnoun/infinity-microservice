import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: StockItem[] = [];
  loading: boolean = true;
  error: string | null = null;
  $index: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.http.get<StockItem[]>('http://localhost:8088/stock')
      .subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.error = 'Failed to load products. Please try again later.';
          this.loading = false;
        }
      });
  }
}
